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
    let deliveryInside = 0;
    let deliveryOutside = 0;
    let socialLinks = {};
    try {
        const parsed = JSON.parse(data.description);
        if (parsed && typeof parsed === 'object' && parsed.text !== undefined) {
            descText = parsed.text;
            logoUrl = parsed.logo || "";
            partnerName = parsed.partner_name || "";
            partnerUrl = parsed.partner_url || "";
            deliveryInside = parsed.delivery_inside || 0;
            deliveryOutside = parsed.delivery_outside || 0;
            socialLinks = parsed.social_links || {};
        }
    } catch (e) {
        // Not JSON, just normal text
    }

    return NextResponse.json({ ...data, description: descText, logo_url: logoUrl, partner_name: partnerName, partner_url: partnerUrl, delivery_inside: deliveryInside, delivery_outside: deliveryOutside, social_links: socialLinks });
}

export async function PUT(request: Request) {
    const body = await request.json();

    const dbPayload = { ...body };
    
    // Serialize description, logo_url, partner link, and delivery into the description field
    if (body.description !== undefined || body.logo_url !== undefined || body.partner_url !== undefined || body.delivery_inside !== undefined || body.social_links !== undefined) {
        dbPayload.description = JSON.stringify({
            text: body.description || "",
            logo: body.logo_url || "",
            partner_name: body.partner_name || "",
            partner_url: body.partner_url || "",
            delivery_inside: body.delivery_inside || 0,
            delivery_outside: body.delivery_outside || 0,
            social_links: body.social_links || {}
        });
        delete dbPayload.logo_url;
        delete dbPayload.partner_name;
        delete dbPayload.partner_url;
        delete dbPayload.delivery_inside;
        delete dbPayload.delivery_outside;
        delete dbPayload.social_links;
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
