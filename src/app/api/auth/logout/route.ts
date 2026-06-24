import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true });
    
    // Clear the cookie by setting it to expire immediately
    response.cookies.set({
        name: "admin_token",
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(0),
    });

    return response;
}
