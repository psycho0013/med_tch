import { Bot, webhookCallback } from 'grammy';
import { supabase } from '@/lib/supabase';

// Telegram Bot Token and the specific Admin's Telegram User ID from environment variables
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_ID = process.env.TELEGRAM_ADMIN_ID;

// Allow execution only if variables are provided
if (!BOT_TOKEN) {
    console.warn("TELEGRAM_BOT_TOKEN is not set in environment variables.");
}

const bot = new Bot(BOT_TOKEN || "DUMMY_TOKEN");

// Restrict bot usage to the specific admin ID
bot.use(async (ctx, next) => {
    if (!ADMIN_ID) {
        await ctx.reply("لم يتم تعيين معرف الإدارة (TELEGRAM_ADMIN_ID) في النظام. يرجى مراجعة الإعدادات.");
        return;
    }

    // Check if the sender is the authorized admin
    if (ctx.from?.id.toString() !== ADMIN_ID) {
        console.warn(`Unauthorized access attempt by Telegram User ID: ${ctx.from?.id}`);
        await ctx.reply("عذراً، غير مصرح لك باستخدام هذا البوت. 🛑");
        return;
    }
    await next();
});

// Command: /start
bot.command("start", async (ctx) => {
    await ctx.reply(
        "أهلاً بك يا مدير النظام! 👋\n\nأنا بوت تحديث سعر صرف الدولار (USD) إلى الدينار العراقي (IQD). 💸\n\nلتحديث السعر، فقط أرسل لي الرقم الجديد."
    );
});

// Listener for text messages (expecting numeric exchange rate)
bot.on("message:text", async (ctx) => {
    const text = ctx.message.text.trim();

    // Check if the input is a valid positive number
    const newRate = Number(text);

    if (isNaN(newRate) || newRate <= 0) {
        await ctx.reply("❌ يرجى إرسال رقم صحيح وموجب، مثل: 1530");
        return;
    }

    // Attempt to update Supabase site_settings table (where ID = 1)
    try {
        const { error } = await supabase
            .from('site_settings')
            .update({ exchange_rate: newRate })
            .eq('id', 1);

        if (error) {
            console.error("Supabase update error:", error);
            await ctx.reply("❌ حدث خطأ أثناء تحديث سعر الصرف في قاعدة البيانات. الرجاء المحاولة لاحقاً.");
            return;
        }

        await ctx.reply(`✅ تم تحديث سعر الصرف بنجاح!\nالسعر الجديد: ${newRate} د.ع`);
    } catch (err) {
        console.error("Bot catch block error:", err);
        await ctx.reply("❌ حدث خطأ غير متوقع. الرجاء مسح سجلات الخطأ.");
    }
});

// Export the webhook handler for Next.js app router
export const POST = webhookCallback(bot, 'std/http');
