export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Fetch all hero banners
export async function GET() {
    // Order by id to keep a consistent order, or use a specific order_index if added later
    const { data, error } = await supabase.from("hero_content").select("*").order("id", { ascending: true });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
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

// POST: Create new hero banner
export async function POST(request: NextRequest) {
    const body = await request.json();

    const { data, error } = await supabase
        .from("hero_content")
        .insert([body])
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

// PUT: Update hero banner
export async function PUT(request: NextRequest) {
    const body = await request.json();
    const id = body.id;

    if (!id) {
        return NextResponse.json({ error: "Missing banner ID" }, { status: 400 });
    }

    // Check if image changed
    if (body.hero_image_url !== undefined) {
        const { data: oldHero } = await supabase.from("hero_content").select("hero_image_url").eq("id", id).single();
        if (oldHero?.hero_image_url && oldHero.hero_image_url !== body.hero_image_url) {
            await deleteImage(oldHero.hero_image_url);
        }
    }

    const { data, error } = await supabase
        .from("hero_content")
        .update(body)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

// DELETE: Remove hero banner
export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Missing banner ID" }, { status: 400 });
    }

    // First get the banner to delete its image if it exists
    const { data: oldHero } = await supabase.from("hero_content").select("hero_image_url").eq("id", id).single();
    if (oldHero?.hero_image_url) {
        await deleteImage(oldHero.hero_image_url);
    }

    const { error } = await supabase
        .from("hero_content")
        .delete()
        .eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
