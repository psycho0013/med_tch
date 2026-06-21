// ===== Product Types =====
export type ProductCategory = "pcs" | "parts" | "monitors" | "accessories";

export interface Product {
    id: string;
    category: ProductCategory;
    name: string;
    brand: string;
    price_usd: number;
    price_iqd: number;
    features: string[];
    full_specs: Record<string, string>;
    rating: number;
    tag: string;
    bg_color: string;
    image_url?: string;
    type?: string;           // For monitors/accessories sub-type label
    is_offer: boolean;
    offer_discount?: string;
    created_at?: string;
}

// ===== Hero Content =====
export interface HeroContent {
    id: number;
    title: string;
    subtitle: string;
    cta_text: string;
    cta_link?: string;
    secondary_cta_text?: string;
    secondary_cta_link?: string;
    badge_title?: string;
    badge_text?: string;
    badge_visible?: boolean;
    hero_image_url?: string;
    hero_icon?: string;
}

// ===== Site Settings =====
export interface SiteSettings {
    id: number;
    site_name: string;
    description: string;
}

// ===== Form helpers =====
export type ProductFormData = Omit<Product, "id" | "created_at">;
