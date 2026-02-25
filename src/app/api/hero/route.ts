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

// PUT: Update hero content
export async function PUT(request: NextRequest) {
    const body = await request.json();

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
