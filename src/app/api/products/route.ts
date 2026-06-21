export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Fetch products (optionally filter by category)
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = supabase.from("products").select("*").order("created_at", { ascending: false });

    if (category) {
        query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

// POST: Add a new product
export async function POST(request: NextRequest) {
    const body = await request.json();

    const { data, error } = await supabase.from("products").insert([body]).select().single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
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

// PUT: Update a product
export async function PUT(request: NextRequest) {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
        return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Check if image changed
    if (updates.image_url !== undefined) {
        const { data: oldProduct } = await supabase.from("products").select("image_url").eq("id", id).single();
        if (oldProduct?.image_url && oldProduct.image_url !== updates.image_url) {
            await deleteImage(oldProduct.image_url);
        }
    }

    const { data, error } = await supabase.from("products").update(updates).eq("id", id).select().single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

// DELETE: Remove a product
export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Fetch the product first to get the image URL
    const { data: oldProduct } = await supabase.from("products").select("image_url").eq("id", id).single();

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // If successfully deleted from DB, delete the image from storage
    if (oldProduct?.image_url) {
        await deleteImage(oldProduct.image_url);
    }

    return NextResponse.json({ success: true });
}
