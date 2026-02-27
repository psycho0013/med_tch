"use server";

import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const validUsername = process.env.ADMIN_USERNAME || "admin";
    const validPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (username === validUsername && password === validPassword) {
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/"
        });
        
        return { success: true };
    }

    return { success: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة" };
}

export async function checkSessionAction() {
    const cookieStore = await cookies();
    return cookieStore.has("admin_session");
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
}
