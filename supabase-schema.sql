-- =============================================
-- Supabase SQL Schema for TechCompare IQ CMS
-- Run this in Supabase SQL Editor
-- =============================================

-- Products table (all categories in one table)
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('android', 'ios', 'laptops', 'pcs', 'monitors', 'accessories')),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  price_usd INTEGER NOT NULL DEFAULT 0,
  price_iqd INTEGER NOT NULL DEFAULT 0,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  full_specs JSONB NOT NULL DEFAULT '{}'::jsonb,
  rating REAL NOT NULL DEFAULT 0,
  tag TEXT NOT NULL DEFAULT '',
  bg_color TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  type TEXT,
  is_offer BOOLEAN NOT NULL DEFAULT false,
  offer_discount TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offers table
CREATE TABLE IF NOT EXISTS offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  desc_text TEXT NOT NULL,
  image_color TEXT NOT NULL DEFAULT 'bg-brand-dark',
  badge TEXT NOT NULL DEFAULT 'عرض خاص',
  time_left TEXT NOT NULL DEFAULT 'فترة محدودة',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hero content (single row)
CREATE TABLE IF NOT EXISTS hero_content (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  title TEXT NOT NULL DEFAULT '',
  subtitle TEXT NOT NULL DEFAULT '',
  cta_text TEXT NOT NULL DEFAULT '',
  badge_title TEXT NOT NULL DEFAULT 'أفضل سعر',
  badge_text TEXT NOT NULL DEFAULT '-15% خصم',
  badge_visible BOOLEAN NOT NULL DEFAULT true
);

-- Site settings (single row)
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_name TEXT NOT NULL DEFAULT 'TechCompare IQ',
  description TEXT NOT NULL DEFAULT '',
  exchange_rate INTEGER NOT NULL DEFAULT 1500
);

-- Insert default hero content
INSERT INTO hero_content (id, title, subtitle, cta_text, badge_title, badge_text, badge_visible)
VALUES (1, 'قارن، اختار، واشتري بذكاء', 'نقارن لك أفضل الهواتف الذكية واللابتوبات المتوفرة في العراق. اكتشف الأسعار الحقيقية، الميزات، واختر الأنسب لميزانيتك واحتياجاتك بخطوات بسيطة.', 'تصفح الأجهزة', 'أفضل سعر', '-15% خصم', true)
ON CONFLICT (id) DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (id, site_name, description, exchange_rate)
VALUES (1, 'تك كومبير IQ', 'منصة عراقية لمقارنة الأجهزة التقنية', 1500)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (allow public read, authenticated writes)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- Allow public SELECT on all tables
CREATE POLICY "Allow public read on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read on hero_content" ON hero_content FOR SELECT USING (true);
CREATE POLICY "Allow public read on site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read on offers" ON offers FOR SELECT USING (true);

-- Allow anon INSERT/UPDATE/DELETE for CMS admin (for now, no auth)
CREATE POLICY "Allow anon insert on products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update on products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete on products" ON products FOR DELETE USING (true);
CREATE POLICY "Allow anon update on hero_content" ON hero_content FOR UPDATE USING (true);
CREATE POLICY "Allow anon update on site_settings" ON site_settings FOR UPDATE USING (true);
CREATE POLICY "Allow anon insert on offers" ON offers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update on offers" ON offers FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete on offers" ON offers FOR DELETE USING (true);

-- Create index for faster category queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
