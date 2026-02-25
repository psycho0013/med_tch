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

// PUT: Update a product
export async function PUT(request: NextRequest) {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
        return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
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

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
