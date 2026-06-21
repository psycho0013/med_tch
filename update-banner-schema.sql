-- =============================================
-- تحديث جدول البطل (Hero) لدعم روابط وإعدادات البانر الجديد (Apple Banner)
-- يرجى تشغيل هذا السكربت في Supabase SQL Editor
-- =============================================

ALTER TABLE hero_content 
ADD COLUMN IF NOT EXISTS cta_link TEXT DEFAULT '/compare',
ADD COLUMN IF NOT EXISTS secondary_cta_text TEXT DEFAULT 'اعرف المزيد',
ADD COLUMN IF NOT EXISTS secondary_cta_link TEXT DEFAULT '/learn-more';
