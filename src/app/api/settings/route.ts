import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Fetch site settings
export async function GET() {
    const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

// PUT: Update site settings
export async function PUT(request: Request) {
    const body = await request.json();

    const { data, error } = await supabase
        .from("site_settings")
        .update(body)
        .eq("id", 1)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
