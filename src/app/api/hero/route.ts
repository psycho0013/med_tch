export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Fetch hero content
export async function GET() {
    const { data, error } = await supabase.from("hero_content").select("*").eq("id", 1).single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

// Helper function to delete old images
async function deleteImage(url?: string | null) {
    if (!url || !url.includes("/storage/v1/object/public/images/")) return;
    const parts = url.split("/images/");
    if (parts.length === 2) {
        const fileName = parts[1];
        await supabase.storage.from("images").remove([fileName]);
    }
}

// PUT: Update hero content
export async function PUT(request: NextRequest) {
    const body = await request.json();

    // Check if image changed
    if (body.hero_image_url !== undefined) {
        const { data: oldHero } = await supabase.from("hero_content").select("hero_image_url").eq("id", 1).single();
        if (oldHero?.hero_image_url && oldHero.hero_image_url !== body.hero_image_url) {
            await deleteImage(oldHero.hero_image_url);
        }
    }

    const { data, error } = await supabase
        .from("hero_content")
        .update(body)
        .eq("id", 1)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
