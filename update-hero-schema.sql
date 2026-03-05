-- تحديث جدول البطل (Hero) لدعم شكل الأيقونات والصور
ALTER TABLE hero_content 
ADD COLUMN IF NOT EXISTS hero_image_url TEXT,
ADD COLUMN IF NOT EXISTS hero_icon TEXT DEFAULT 'Smartphone';
