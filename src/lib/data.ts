import { supabase } from "./supabase";
import type { Product, ProductCategory, HeroContent, SiteSettings } from "./types";

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false });

    if (error) {
        console.error(`Error fetching ${category}:`, error.message);
        return [];
    }

    return data || [];
}

export async function getHeroContent(): Promise<HeroContent | null> {
    const { data, error } = await supabase
        .from("hero_content")
        .select("*")
        .eq("id", 1)
        .single();

    if (error) {
        console.error("Error fetching hero content:", error.message);
        return null;
    }

    return data;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
    const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .single();

    if (error) {
        console.error("Error fetching site settings:", error.message);
        return null;
    }

    return data;
}

export async function getOfferProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_offer", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching offers:", error.message);
        return [];
    }

    return data || [];
}
