import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Fetch site settings
export async function GET() {
    const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let descText = data.description || "";
    let logoUrl = "";
    let partnerName = "";
    let partnerUrl = "";
    try {
        const parsed = JSON.parse(data.description);
        if (parsed && typeof parsed === 'object' && parsed.text !== undefined) {
            descText = parsed.text;
            logoUrl = parsed.logo || "";
            partnerName = parsed.partner_name || "";
            partnerUrl = parsed.partner_url || "";
        }
    } catch (e) {
        // Not JSON, just normal text
    }

    return NextResponse.json({ ...data, description: descText, logo_url: logoUrl, partner_name: partnerName, partner_url: partnerUrl });
}

export async function PUT(request: Request) {
    const body = await request.json();

    const dbPayload = { ...body };
    
    // Serialize description, logo_url, and partner link into the description field
    if (body.description !== undefined || body.logo_url !== undefined || body.partner_url !== undefined) {
        dbPayload.description = JSON.stringify({
            text: body.description || "",
            logo: body.logo_url || "",
            partner_name: body.partner_name || "",
            partner_url: body.partner_url || ""
        });
        delete dbPayload.logo_url;
        delete dbPayload.partner_name;
        delete dbPayload.partner_url;
    }

    const { data, error } = await supabase
        .from("site_settings")
        .update(dbPayload)
        .eq("id", 1)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
