import { Bot, webhookCallback, InlineKeyboard } from 'grammy';
import { supabase } from '@/lib/supabase';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_ID = process.env.TELEGRAM_ADMIN_ID;

const bot = new Bot(BOT_TOKEN || "DUMMY_TOKEN");

// Auth middleware
bot.use(async (ctx, next) => {
    if (!ADMIN_ID) return;
    if (ctx.from?.id.toString() !== ADMIN_ID) return;
    await next();
});

// === KEYBOARDS ===

const mainKeyboard = new InlineKeyboard()
    .text("💵 تحديث سعر الصرف", "action:rate")
    .row()
    .text("📱 إضافة منتج", "action:product")
    .row()
    .text("❌ إلغاء", "action:cancel");

const categoryKeyboard = new InlineKeyboard()
    .text("أندرويد", "cat:android").row()
    .text("آبل (iOS)", "cat:ios").row()
    .text("لابتوبات", "cat:laptops").row()
    .text("تجميعات PC", "cat:pcs").row()
    .text("شاشات", "cat:monitors").row()
    .text("ساعات آبل", "cat:apple-watches").row()
    .text("ساعات أخرى", "cat:other-watches").row()
    .text("إكسسوارات", "cat:accessories").row()
    .text("🔙 رجوع", "action:back");

// === COMMANDS ===

bot.command("start", async (ctx) => {
    await ctx.reply(
        "أهلاً بك يا مدير النظام! 👋\n\nماذا تريد أن تفعل اليوم؟",
        { reply_markup: mainKeyboard }
    );
});

// === CALLBACK QUERY HANDLERS ===

// Main menu: Update exchange rate
bot.callbackQuery("action:rate", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("قم بإرسال سعر الصرف الجديد (مثلاً: 1520):", {
        reply_markup: { force_reply: true }
    });
});

// Main menu: Add product
bot.callbackQuery("action:product", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText("اختر قسم المنتج الجديد:", {
        reply_markup: categoryKeyboard
    });
});

// Main menu: Cancel
bot.callbackQuery("action:cancel", async (ctx) => {
    await ctx.answerCallbackQuery("تم الإلغاء");
    await ctx.deleteMessage();
});

// Back to main menu
bot.callbackQuery("action:back", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText("أهلاً بك يا مدير النظام! 👋\n\nماذا تريد أن تفعل اليوم؟", {
        reply_markup: mainKeyboard
    });
});

// Category selection
bot.callbackQuery(/^cat:(.+)$/, async (ctx) => {
    const category = ctx.match[1];
    await ctx.answerCallbackQuery();
    await ctx.deleteMessage();
    await ctx.reply(`القسم: ${category}\n\nالآن، أرسل *اسم المنتج* (مثال: iPhone 15) كردّ على هذه الرسالة:`, {
        parse_mode: "Markdown",
        reply_markup: { force_reply: true }
    });
});

// === TEXT MESSAGE HANDLERS (Reply-based stateless flow) ===

bot.on("message:text", async (ctx) => {
    const text = ctx.message.text.trim();
    const replyTo = ctx.message.reply_to_message?.text;

    if (text === '/cancel' || text === 'الغاء' || text === 'إلغاء') {
        await ctx.reply("تم الإلغاء. اضغط /start للعودة للقائمة.");
        return;
    }

    if (!replyTo) {
        if (text !== "/start") {
            await ctx.reply("استخدم أمر /start لفتح القائمة، أو قم بالرد (Reply) على رسائل البوت.");
        }
        return;
    }

    // 1. Exchange Rate
    if (replyTo.includes("سعر الصرف الجديد")) {
        const newRate = Number(text);
        if (isNaN(newRate) || newRate <= 0) {
            await ctx.reply("❌ رقم غير صحيح. أرسل رقماً صحيحاً كردّ:", {
                reply_markup: { force_reply: true }
            });
            return;
        }
        try {
            const { error } = await supabase.from('site_settings').update({ exchange_rate: newRate }).eq('id', 1);
            if (error) throw error;
            await ctx.reply(`✅ تم تحديث سعر الصرف بنجاح!\nالسعر الجديد: ${newRate} د.ع`);
        } catch (err) {
            console.error(err);
            await ctx.reply("❌ حدث خطأ أثناء التحديث.");
        }
        return;
    }

    // 2. Product Name
    if (replyTo.includes("القسم:") && replyTo.includes("اسم المنتج")) {
        const categoryMatch = replyTo.match(/القسم: (\S+)/);
        const category = categoryMatch ? categoryMatch[1] : "android";
        await ctx.reply(`القسم: ${category}\nالاسم: ${text}\n\nالآن، أرسل *الشركة المصنعة* كردّ على هذه الرسالة:`, {
            parse_mode: "Markdown",
            reply_markup: { force_reply: true }
        });
        return;
    }

    // 3. Product Brand
    if (replyTo.includes("الاسم:") && replyTo.includes("الشركة المصنعة")) {
        const categoryMatch = replyTo.match(/القسم: (\S+)/);
        const nameMatch = replyTo.match(/الاسم: (.+)/);
        const category = categoryMatch ? categoryMatch[1] : "android";
        const name = nameMatch ? nameMatch[1].trim() : "";
        await ctx.reply(`القسم: ${category}\nالاسم: ${name}\nالشركة: ${text}\n\nالآن، أرسل *السعر بالدولار USD* كـ رقم فقط (مثال: 1200) كردّ:`, {
            parse_mode: "Markdown",
            reply_markup: { force_reply: true }
        });
        return;
    }

    // 4. Product Price
    if (replyTo.includes("الشركة:") && replyTo.includes("السعر بالدولار")) {
        const categoryMatch = replyTo.match(/القسم: (\S+)/);
        const nameMatch = replyTo.match(/الاسم: (.+)/);
        const brandMatch = replyTo.match(/الشركة: (.+)/);
        const category = categoryMatch ? categoryMatch[1] : "android";
        const name = nameMatch ? nameMatch[1].trim() : "";
        const brand = brandMatch ? brandMatch[1].trim() : "";

        const price = Number(text);
        if (isNaN(price) || price <= 0) {
            await ctx.reply(`القسم: ${category}\nالاسم: ${name}\nالشركة: ${brand}\n\n❌ أرسل السعر كرقم صحيح كردّ:`, {
                reply_markup: { force_reply: true }
            });
            return;
        }
        await ctx.reply(`القسم: ${category}\nالاسم: ${name}\nالشركة: ${brand}\nالسعر: $${price}\n\nأرسل *أهم الميزات* مفصولة بفاصلة أو شرطة كردّ:`, {
            parse_mode: "Markdown",
            reply_markup: { force_reply: true }
        });
        return;
    }

    // 5. Product Features -> Save
    if (replyTo.includes("السعر:") && replyTo.includes("أهم الميزات")) {
        const categoryMatch = replyTo.match(/القسم: (\S+)/);
        const nameMatch = replyTo.match(/الاسم: (.+)/);
        const brandMatch = replyTo.match(/الشركة: (.+)/);
        const priceMatch = replyTo.match(/السعر: \$([0-9.]+)/);

        const category = categoryMatch ? categoryMatch[1] : "android";
        const name = nameMatch ? nameMatch[1].trim() : "";
        const brand = brandMatch ? brandMatch[1].trim() : "";
        const price_usd = priceMatch ? Number(priceMatch[1]) : 0;
        const features = text.split(/[-،,]/).map(f => f.trim()).filter(f => f.length > 0);

        try {
            await ctx.reply("⏳ جاري إنشاء المنتج...");
            const { data, error } = await supabase
                .from('products')
                .insert([{
                    category,
                    name,
                    brand,
                    price_usd,
                    price_iqd: price_usd * 1500,
                    features,
                    bg_color: 'bg-slate-100',
                    rating: 5.0,
                    tag: 'جديد',
                    is_offer: false,
                    full_specs: {}
                }])
                .select()
                .single();

            if (error) throw error;
            await ctx.reply(`✅ تم إضافة المنتج بنجاح!\n\n📱 *${data.name}*\n🏷️ ${data.brand}\n💵 $${data.price_usd}\n\nالآن أصبح المنتج متاحاً على موقعك!`, { parse_mode: "Markdown" });
        } catch (err) {
            console.error("Supabase insert error:", err);
            await ctx.reply("❌ حدث خطأ أثناء حفظ المنتج.");
        }
        return;
    }
});

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const POST = webhookCallback(bot, 'std/http');
