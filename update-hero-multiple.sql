-- =============================================
-- تحديث جدول البطل (Hero) لدعم إضافة إعلانات متعددة
-- يرجى تشغيل هذا السكربت في Supabase SQL Editor
-- =============================================

-- 1. إزالة قيد الإعلان الواحد (id = 1)
ALTER TABLE hero_content DROP CONSTRAINT IF EXISTS hero_content_id_check;

-- 2. إزالة القيمة الافتراضية القديمة لمعرف الإعلان
ALTER TABLE hero_content ALTER COLUMN id DROP DEFAULT;

-- 3. إنشاء تسلسل أرقام للمعرفات الجديدة (لتصبح مثل SERIAL)
CREATE SEQUENCE IF NOT EXISTS hero_content_id_seq;

-- 4. ربط التسلسل بالجدول لتبدأ المعرفات الجديدة من الرقم 2
SELECT setval('hero_content_id_seq', COALESCE((SELECT MAX(id) FROM hero_content), 1));
ALTER TABLE hero_content ALTER COLUMN id SET DEFAULT nextval('hero_content_id_seq');

-- 5. إضافة عامود لترتيب الإعلانات (اختياري، للتحكم بترتيب عرض الإعلانات)
ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;
ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- 6. إضافة صلاحيات الإضافة والحذف (RLS Policies) للوحة التحكم
DROP POLICY IF EXISTS "Allow anon insert on hero_content" ON hero_content;
CREATE POLICY "Allow anon insert on hero_content" ON hero_content FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon delete on hero_content" ON hero_content;
CREATE POLICY "Allow anon delete on hero_content" ON hero_content FOR DELETE USING (true);
