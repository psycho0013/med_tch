import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { orderText } = body;

        // Try to get token and ID from different common environment variable names
        const botToken = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_ID || process.env.ADMIN_ID;

        if (!botToken || !chatId) {
            return NextResponse.json(
                { error: "لم يتم تكوين إعدادات بوت التليكرام في السيرفر (Vercel Env Variables)." },
                { status: 500 }
            );
        }

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: orderText,
                parse_mode: "HTML"
            })
        });

        const data = await response.json();

        if (!data.ok) {
            console.error("Telegram Error:", data);
            return NextResponse.json({ error: "فشل في إرسال الرسالة إلى تليكرام." }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ error: "حدث خطأ غير متوقع." }, { status: 500 });
    }
}
