import { Bot, webhookCallback, Context } from 'grammy';
import { Menu, MenuFlavor } from '@grammyjs/menu';
import { supabase } from '@/lib/supabase';
import type { ProductCategory } from '@/lib/types';

// Flavor the context to include menus
type MyContext = Context & MenuFlavor;

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_ID = process.env.TELEGRAM_ADMIN_ID;

const bot = new Bot<MyContext>(BOT_TOKEN || "DUMMY_TOKEN");

// Auth middleware
bot.use(async (ctx, next) => {
    if (!ADMIN_ID) {
        await ctx.reply("لم يتم تعيين معرف الإدارة (TELEGRAM_ADMIN_ID).");
        return;
    }
    if (ctx.from?.id.toString() !== ADMIN_ID) {
        // Skip unauthorized access
        return;
    }
    await next();
});

// Create menus
const mainMenu = new Menu<MyContext>("main-menu")
    .text("💵 تحديث سعر الصرف", async (ctx) => {
        await ctx.reply("قم بإرسال سعر الصرف الجديد (مثلاً: 1520):", {
            reply_markup: { force_reply: true }
        });
        await ctx.answerCallbackQuery();
    }).row()
    .text("📱 إضافة منتج", (ctx) => {
        ctx.menu.nav("category-menu");
    }).row()
    .text("❌ إلغاء", async (ctx) => {
        await ctx.deleteMessage();
        await ctx.answerCallbackQuery("تم الإلغاء");
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
    .text("🔙 إلغاء", async (ctx) => {
        await ctx.deleteMessage();
        await ctx.answerCallbackQuery("تم الإلغاء");
    });

async function handleCategorySelect(ctx: MyContext, category: ProductCategory) {
    await ctx.reply(`القسم: ${category}\n\nالآن، أرسل *اسم المنتج* (مثال: iPhone 15) كردّ على هذه الرسالة:`, {
        parse_mode: "Markdown",
        reply_markup: { force_reply: true }
    });
    // Close the original menu
    await ctx.menu.close();
}

mainMenu.register(categoryMenu);
bot.use(mainMenu);

// Command: /start
bot.command("start", async (ctx) => {
    await ctx.reply(
        "أهلاً بك يا مدير النظام! 👋\n\nماذا تريد أن تفعل اليوم؟",
        { reply_markup: mainMenu }
    );
});

// Listener for text messages
bot.on("message:text", async (ctx) => {
    const text = ctx.message.text.trim();
    const replyTo = ctx.message.reply_to_message?.text;

    if (text.toLowerCase() === '/cancel' || text === 'الغاء' || text === 'إلغاء') {
        await ctx.reply("تم الإلغاء. اضغط /start للعودة للقائمة.");
        return;
    }

    if (!replyTo) {
        // Not a reply to a prompt. Ignore or show menu.
        if (text !== "/start") {
            await ctx.reply("استخدم أمر /start لفتح القائمة، أو انقر للرد (Reply) على رسائل البوت.");
        }
        return;
    }

    // 1. Awaiting Exchange Rate
    if (replyTo.includes("سعر الصرف الجديد")) {
        const newRate = Number(text);
        if (isNaN(newRate) || newRate <= 0) {
            await ctx.reply("❌ رقم غير صحيح. انقر 'رد' على الرسالة السابقة وأرسل رقماً.", { reply_markup: { force_reply: true } });
            return;
        }

        try {
            const { error } = await supabase.from('site_settings').update({ exchange_rate: newRate }).eq('id', 1);
            if (error) throw error;
            await ctx.reply(`✅ تم تحديث سعر الصرف بنجاح!\nالسعر الجديد: ${newRate} د.ع`);
        } catch (err) {
            await ctx.reply("❌ حدث خطأ أثناء التحديث.");
            console.error(err);
        }
        return;
    }

    // 2. Awaiting Product Name
    if (replyTo.includes("القسم:") && replyTo.includes("اسم المنتج")) {
        const categoryMatch = replyTo.match(/القسم: (\S+)/);
        const category = categoryMatch ? categoryMatch[1] : "android";

        await ctx.reply(`القسم: ${category}\nالاسم: ${text}\n\nالآن، أرسل *الشركة المصنعة* كردّ على هذه الرسالة:`, {
            parse_mode: "Markdown",
            reply_markup: { force_reply: true }
        });
        return;
    }

    // 3. Awaiting Product Brand
    if (replyTo.includes("الاسم:") && replyTo.includes("الشركة المصنعة")) {
        const categoryMatch = replyTo.match(/القسم: (\S+)/);
        const nameMatch = replyTo.match(/الاسم: (.+)/);
        const category = categoryMatch ? categoryMatch[1] : "android";
        const name = nameMatch ? nameMatch[1].trim() : "Unknown";

        await ctx.reply(`القسم: ${category}\nالاسم: ${name}\nالشركة: ${text}\n\nالآن، أرسل *السعر بالدولار USD* كـ رقم فقط (مثال: 1200) كردّ على هذه الرسالة:`, {
            parse_mode: "Markdown",
            reply_markup: { force_reply: true }
        });
        return;
    }

    // 4. Awaiting Product Price
    if (replyTo.includes("الشركة:") && replyTo.includes("السعر بالدولار")) {
        const categoryMatch = replyTo.match(/القسم: (\S+)/);
        const nameMatch = replyTo.match(/الاسم: (.+)/);
        const brandMatch = replyTo.match(/الشركة: (.+)/);

        const category = categoryMatch ? categoryMatch[1] : "android";
        const name = nameMatch ? nameMatch[1].trim() : "Unknown";
        const brand = brandMatch ? brandMatch[1].trim() : "Unknown";

        const price = Number(text);
        if (isNaN(price) || price <= 0) {
            await ctx.reply(`القسم: ${category}\nالاسم: ${name}\nالشركة: ${brand}\n\n❌ يرجى إرسال السعر كرقم صحيح كردّ على هذه الرسالة:`, {
                parse_mode: "Markdown",
                reply_markup: { force_reply: true }
            });
            return;
        }

        await ctx.reply(`القسم: ${category}\nالاسم: ${name}\nالشركة: ${brand}\nالسعر: $${price}\n\nأرسل *أهم الميزات* مفصولة بفاصلة أو شرطة (مثال: كاميرا 48MP - شاشة 120Hz) كردّ:`, {
            parse_mode: "Markdown",
            reply_markup: { force_reply: true }
        });
        return;
    }

    // 5. Awaiting Product Features -> Final Save
    if (replyTo.includes("السعر:") && replyTo.includes("أهم الميزات")) {
        const categoryMatch = replyTo.match(/القسم: (\S+)/);
        const nameMatch = replyTo.match(/الاسم: (.+)/);
        const brandMatch = replyTo.match(/الشركة: (.+)/);
        const priceMatch = replyTo.match(/السعر: \$([0-9.]+)/);

        const category = categoryMatch ? categoryMatch[1] : "android";
        const name = nameMatch ? nameMatch[1].trim() : "Unknown";
        const brand = brandMatch ? brandMatch[1].trim() : "Unknown";
        const price_usd = priceMatch ? Number(priceMatch[1]) : 0;
        const features = text.split(/[-،,]/).map(f => f.trim()).filter(f => f.length > 0);

        try {
            await ctx.reply("⏳ جاري إنشاء المنتج...");

            const { data, error } = await supabase
                .from('products')
                .insert([{
                    category: category,
                    name: name,
                    brand: brand,
                    price_usd: price_usd,
                    price_iqd: price_usd * 1500, // Fallback conversion
                    features: features,
                    bg_color: 'bg-slate-100', // Default
                    rating: 5.0, // Default
                    tag: 'جديد', // Default
                    is_offer: false,
                    full_specs: {} // empty object for now
                }])
                .select()
                .single();

            if (error) throw error;

            await ctx.reply(`✅ تم إضافة المنتج بنجاح!\n\n📱 *${data.name}*\n🏷️ ${data.brand}\n💵 $${data.price_usd}\n\nالآن أصبح المنتج متاحاً على موقعك!`, { parse_mode: "Markdown" });

        } catch (err) {
            console.error("Supabase insert error:", err);
            await ctx.reply("❌ حدث خطأ أثناء حفظ المنتج في قاعدة البيانات.");
        }
        return;
    }
});

// Using a custom POST handler ensures Vercel waits for Webhook processing.
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// Using grammy's built-in standard http adapter for Next.js App Router
export const POST = webhookCallback(bot, 'std/http');
