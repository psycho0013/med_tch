import { Bot, webhookCallback, session, Context, SessionFlavor } from 'grammy';
import { Menu, MenuFlavor } from '@grammyjs/menu';
import { supabase } from '@/lib/supabase';
import type { ProductCategory } from '@/lib/types';

// Define session data structure
interface SessionData {
    step: 'idle' | 'awaiting_rate' | 'awaiting_product_name' | 'awaiting_product_brand' | 'awaiting_product_price' | 'awaiting_product_features';
    draftProduct: {
        category?: ProductCategory;
        name?: string;
        brand?: string;
        price_usd?: number;
        features?: string[];
        tag?: string;
        bg_color?: string;
        rating?: number;
    };
}

// Flavor the context to include sessions and menus
type MyContext = Context & SessionFlavor<SessionData> & MenuFlavor;

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_ID = process.env.TELEGRAM_ADMIN_ID;

const bot = new Bot<MyContext>(BOT_TOKEN || "DUMMY_TOKEN");

// Install session middleware
bot.use(session({ initial: (): SessionData => ({ step: 'idle', draftProduct: {} }) }));

// Auth middleware
bot.use(async (ctx, next) => {
    if (!ADMIN_ID) {
        await ctx.reply("لم يتم تعيين معرف الإدارة (TELEGRAM_ADMIN_ID).");
        return;
    }
    if (ctx.from?.id.toString() !== ADMIN_ID) {
        await ctx.reply("عذراً، غير مصرح لك باستخدام هذا البوت. 🛑");
        return;
    }
    await next();
});

// Create menus
const mainMenu = new Menu<MyContext>("main-menu")
    .text("💵 تحديث سعر الصرف", async (ctx) => {
        ctx.session.step = 'awaiting_rate';
        await ctx.reply("قم بإرسال سعر الصرف الجديد (مثلاً: 1520):");
        await ctx.menu.close();
    }).row()
    .text("📱 إضافة منتج جديد", async (ctx) => {
        ctx.session.step = 'idle';
        ctx.session.draftProduct = {}; // Reset draft
        await ctx.reply("اختر قسم المنتج الجديد:", { reply_markup: categoryMenu });
        await ctx.menu.close();
    }).row()
    .text("❌ إلغاء", async (ctx) => {
        ctx.session.step = 'idle';
        await ctx.reply("تم الإلغاء.");
        await ctx.menu.close();
    });

const categoryMenu = new Menu<MyContext>("category-menu")
    .text("أندرويد", (ctx) => handleCategorySelect(ctx, "android")).row()
    .text("آبل (iOS)", (ctx) => handleCategorySelect(ctx, "ios")).row()
    .text("لابتوبات", (ctx) => handleCategorySelect(ctx, "laptops")).row()
    .text("تجميعات PC", (ctx) => handleCategorySelect(ctx, "pcs")).row()
    .text("شاشات", (ctx) => handleCategorySelect(ctx, "monitors")).row()
    .text("ساعات آبل", (ctx) => handleCategorySelect(ctx, "apple-watches")).row()
    .text("ساعات أخرى", (ctx) => handleCategorySelect(ctx, "other-watches")).row()
    .text("إكسسوارات", (ctx) => handleCategorySelect(ctx, "accessories")).row()
    .text("🔙 رجوع", async (ctx) => {
        ctx.session.step = 'idle';
        await ctx.reply("تم الإلغاء. يمكنك البدء من جديد عبر /start");
        await ctx.menu.close();
    });

async function handleCategorySelect(ctx: MyContext, category: ProductCategory) {
    ctx.session.draftProduct.category = category;
    ctx.session.step = 'awaiting_product_name';
    await ctx.reply(`قمت باختيار: ${category}\n\nالآن، أرسل *اسم المنتج* (مثال: iPhone 15 Pro Max):`, { parse_mode: "Markdown" });
    await ctx.menu.close();
}

bot.use(mainMenu);
bot.use(categoryMenu);

// Command: /start
bot.command("start", async (ctx) => {
    ctx.session.step = 'idle';
    await ctx.reply(
        "أهلاً بك يا مدير النظام! 👋\n\nماذا تريد أن تفعل اليوم؟",
        { reply_markup: mainMenu }
    );
});

// Listener for text messages
bot.on("message:text", async (ctx) => {
    const text = ctx.message.text.trim();
    const step = ctx.session.step;

    if (text.toLowerCase() === '/cancel' || text === 'الغاء' || text === 'إلغاء') {
        ctx.session.step = 'idle';
        await ctx.reply("تم الإلغاء. اضغط /start للعودة للقائمة.");
        return;
    }

    if (step === 'awaiting_rate') {
        const newRate = Number(text);
        if (isNaN(newRate) || newRate <= 0) {
            await ctx.reply("❌ يرجى إرسال رقم صحيح وموجب.");
            return;
        }

        try {
            const { error } = await supabase.from('site_settings').update({ exchange_rate: newRate }).eq('id', 1);
            if (error) throw error;
            ctx.session.step = 'idle';
            await ctx.reply(`✅ تم تحديث سعر الصرف بنجاح!\nالسعر الجديد: ${newRate} د.ع`);
        } catch (err) {
            console.error(err);
            await ctx.reply("❌ حدث خطأ أثناء تحديث سعر الصرف.");
        }
        return;
    }

    if (step === 'awaiting_product_name') {
        ctx.session.draftProduct.name = text;
        ctx.session.step = 'awaiting_product_brand';
        await ctx.reply(`الاسم: ${text}\nالآن، أرسل *الشركة المصنعة* (مثال: Apple, Samsung):`, { parse_mode: "Markdown" });
        return;
    }

    if (step === 'awaiting_product_brand') {
        ctx.session.draftProduct.brand = text;
        ctx.session.step = 'awaiting_product_price';
        await ctx.reply(`الشركة: ${text}\nالآن، أرسل *السعر بالدولار USD* كـ رقم فقط (مثال: 1200):`, { parse_mode: "Markdown" });
        return;
    }

    if (step === 'awaiting_product_price') {
        const price = Number(text);
        if (isNaN(price) || price <= 0) {
            await ctx.reply("❌ يرجى إرسال السعر كرقم صحيح (مثال: 999)");
            return;
        }
        ctx.session.draftProduct.price_usd = price;
        ctx.session.step = 'awaiting_product_features';
        await ctx.reply(`السعر: $${price}\nالآن أرسل *أهم الميزات* مفصولة بفاصلة أو شرطة (مثال: كاميرا 48MP - بطارية 5000mAh - شاشة 120Hz):`, { parse_mode: "Markdown" });
        return;
    }

    if (step === 'awaiting_product_features') {
        // Parse features
        const features = text.split(/[-،,]/).map(f => f.trim()).filter(f => f.length > 0);
        ctx.session.draftProduct.features = features;

        // Setup some defaults before saving
        ctx.session.draftProduct.bg_color = 'bg-slate-100'; // Default background
        ctx.session.draftProduct.rating = 5.0; // Default rating
        ctx.session.draftProduct.tag = 'جديد'; // Default tag

        const product = ctx.session.draftProduct;

        try {
            await ctx.reply("⏳ جاري حفظ المنتج في قاعدة البيانات...");

            const { data, error } = await supabase
                .from('products')
                .insert([{
                    category: product.category,
                    name: product.name,
                    brand: product.brand,
                    price_usd: product.price_usd,
                    price_iqd: (product.price_usd || 0) * 1500, // Will be overridden dynamically by context but needs a value
                    features: product.features,
                    bg_color: product.bg_color,
                    rating: product.rating,
                    tag: product.tag,
                    is_offer: false,
                    full_specs: {} // empty object for now
                }])
                .select()
                .single();

            if (error) throw error;

            ctx.session.step = 'idle';
            ctx.session.draftProduct = {};

            await ctx.reply(`✅ تم إضافة المنتج بنجاح!\n\n📱 *${data.name}*\n🏷️ ${data.brand}\n💵 $${data.price_usd}\n\nاضغط /start للعودة للقائمة.`, { parse_mode: "Markdown" });

        } catch (err) {
            console.error("Supabase insert error:", err);
            await ctx.reply("❌ حدث خطأ أثناء حفظ المنتج. الرجاء المحاولة لاحقاً.");
            ctx.session.step = 'idle';
        }
        return;
    }

    // Fallback if idle and text is sent
    if (step === 'idle') {
        await ctx.reply("لتحديث السعر أو إضافة منتج، يرجى استخدام أمر /start وإتباع القائمة.");
    }
});

// Export the webhook handler for Next.js app router
export const POST = webhookCallback(bot, 'std/http');
