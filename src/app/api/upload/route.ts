import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file type (basic)
        if (!file.type.startsWith("image/")) {
            return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Create a unique filename
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

        // Upload to Supabase Storage bucket named "images"
        const { error: uploadError } = await supabase.storage
            .from("images")
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: false,
            });

        if (uploadError) {
            console.error("Supabase storage upload error:", uploadError);
            return NextResponse.json({ error: uploadError.message }, { status: 500 });
        }

        // Get the public URL
        const { data: publicUrlData } = supabase.storage
            .from("images")
            .getPublicUrl(fileName);

        return NextResponse.json({ url: publicUrlData.publicUrl }, { status: 200 });
    } catch (error: any) {
        console.error("API Upload Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
