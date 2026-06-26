-- قم بنسخ هذا الكود وتشغيله في محرر الـ SQL (SQL Editor) داخل Supabase الخاص بك

-- 1. إضافة عمود السعر الأصلي بالدولار
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS original_price_usd INTEGER;

-- 2. إضافة عمود السعر الأصلي بالدينار
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS original_price_iqd INTEGER;

-- (اختياري) تحديث المنتجات القديمة التي عليها عروض حالياً
-- لجعل السعر الأصلي يساوي السعر الحالي مؤقتاً لتجنب الأخطاء
UPDATE products 
SET original_price_usd = price_usd,
    original_price_iqd = price_iqd
WHERE is_offer = true AND original_price_usd IS NULL;
