-- =============================================
-- بيانات موقع TechCompare PC لعام 2026
-- صُممت لتطبيقها مباشرة في Supabase SQL Editor
-- =============================================

-- تفريغ البيانات السابقة إذا أردت (اختياري)
-- TRUNCATE TABLE products CASCADE;
-- TRUNCATE TABLE offers CASCADE;

INSERT INTO products (category, name, brand, price_usd, price_iqd, features, full_specs, rating, tag, bg_color, image_url, type, is_offer, offer_discount)
VALUES
('pcs', 'Alienware Aurora R18', 'Dell', 3999, 6078480, '["معالج Intel Core i9-15900K", "بطاقة رسوميات RTX 5090", "تبريد مائي متقدم Cyro-Tech", "هيكل بتصميم فضائي متطور وإضاءة RGB شاملة"]'::jsonb, '{"المعالج": "Intel Core i9-15900K 24-Core", "الرام": "64GB DDR5 7200MHz", "التخزين": "4TB NVMe M.2 PCIe 5.0", "بطاقة الشاشة": "NVIDIA GeForce RTX 5090 32GB", "الماذربورد": "Z890 Custom", "مزود الطاقة": "1500W 80+ Platinum", "النظام": "Windows 12 Pro"}'::jsonb, 4.9, 'الوحش المطلق', 'bg-gradient-to-br from-gray-800 to-black', '/images/products/alienware-r18.jpg', 'كمبيوتر ألعاب مكتبي مجنون', false, ''),
('pcs', 'ROG Strix G35CA (2026)', 'Asus', 2799, 4254480, '["معالج AMD Ryzen 9 9950X", "بطاقة رسوميات RTX 5080", "تبريد هوائي ومائي هجين", "سهولة الترقية وتصميم رياضي"]'::jsonb, '{"المعالج": "AMD Ryzen 9 9950X 16-Core", "الرام": "32GB DDR5 6400MHz", "التخزين": "2TB NVMe M.2", "بطاقة الشاشة": "NVIDIA GeForce RTX 5080 16GB", "الماذربورد": "X870E ROG Strix", "مزود الطاقة": "1000W 80+ Gold", "النظام": "Windows 12 Home"}'::jsonb, 4.8, '', 'bg-gradient-to-br from-gray-800 to-black', '/images/products/rog-strix-pc.jpg', 'كمبيوتر ألعاب عالي الأداء', false, ''),
('pcs', 'HP OMEN 45L', 'HP', 2199, 3342480, '["معالج Intel Core i7-15700K", "بطاقة رسوميات RTX 5070 Ti", "حجرة تبريد مائي مستقلة (OMEN Cryo Chamber)", "زجاج مقوى من الجانبين وتصميم أنيق"]'::jsonb, '{"المعالج": "Intel Core i7-15700K 20-Core", "الرام": "32GB DDR5 6000MHz Kingston Fury", "التخزين": "2TB WD Black PCIe 4.0", "بطاقة الشاشة": "NVIDIA GeForce RTX 5070 Ti 16GB", "الماذربورد": "Z890 OMEN Custom", "مزود الطاقة": "850W 80+ Gold", "النظام": "Windows 12"}'::jsonb, 4.7, 'تبريد ممتاز', 'bg-gradient-to-br from-gray-800 to-black', '/images/products/hp-omen-45l.jpg', 'كمبيوتر ألعاب', false, ''),
('monitors', 'Samsung Odyssey Neo G9 (2026) 57"', 'Samsung', 2499, 3798480, '["شاشة منحنية ضخمة 57 بوصة بدقة Dual UHD 8K", "معدل تحديث 240Hz", "تقنية Quantum Mini-LED بـ 4000 منطقة تعتيم", "دعم DisplayPort 2.1 و HDMI 2.1"]'::jsonb, '{"حجم الشاشة": "57 بوصة منحنية 1000R", "اللوحة": "Quantum Mini-LED VA", "الدقة": "7680 x 2160 (Dual UHD)", "معدل التحديث": "240Hz", "زمن الاستجابة": "1ms GTG", "السطوع": "2000 nits (HDR2000)", "المنافذ": "DP 2.1, 3x HDMI 2.1, USB Hub"}'::jsonb, 4.9, 'شاشة الأحلام', 'bg-gradient-to-br from-gray-800 to-black', '/images/products/odyssey-g9-57.jpg', 'شاشة ألعاب Ultra-Wide', false, ''),
('monitors', 'LG UltraGear OLED 32" 4K', 'LG', 1199, 1822480, '["شاشة 32 بوصة بدقة 4K وتقنية OLED", "معدل تحديث 240Hz (مع وضع 1080p بـ 480Hz)", "زمن استجابة خيالي 0.03ms", "الجيل الثالث من لوحات MLA OLED سطوع أعلى بنسبة 30%"]'::jsonb, '{"حجم الشاشة": "32 بوصة مسطحة", "اللوحة": "WOLED (MLA+) الجيل الثالث", "الدقة": "3840 x 2160 (4K UHD)", "معدل التحديث": "240Hz / 480Hz Dual Mode", "زمن الاستجابة": "0.03ms", "دعم": "G-Sync Compatible, FreeSync Premium Pro"}'::jsonb, 4.8, 'الأكثر طلباً للألعاب', 'bg-gradient-to-br from-gray-800 to-black', '/images/products/lg-ultragear-32-oled.jpg', 'شاشة ألعاب تنافسية وقصة', false, ''),
('monitors', 'Asus ProArt Display 27" 5K', 'Asus', 1499, 2278480, '["شاشة احترافية 27 بوصة بدقة 5K", "دقة ألوان متناهية ∆E < 1", "إضاءة Mini-LED", "معايرة ألوان هارداوير مدمجة"]'::jsonb, '{"حجم الشاشة": "27 بوصة مسطحة", "اللوحة": "IPS Mini-LED", "الدقة": "5120 x 2880 (5K)", "معدل التحديث": "120Hz", "تصحيح الألوان": "99% DCI-P3, 100% sRGB", "المنافذ": "Thunderbolt 4 (96W PD), HDMI 2.1"}'::jsonb, 4.9, 'للمصممين', 'bg-gradient-to-br from-gray-800 to-black', '/images/products/asus-proart-27.jpg', 'شاشة إنتاجية وصناعة محتوى', false, ''),
('accessories', 'Razer Viper V3 Pro (2026 Edition)', 'Razer', 150, 228000, '["وزن خفيف جداً يبلغ 52غرام", "مستشعر Focus Pro Gen-3 بدقة 40,000 DPI", "معدل إرسال لاسلكي 8000Hz (HyperPolling مدمج)", "أزرار بصرية للجيل الرابع للسرعة"]'::jsonb, '{"الوزن": "52 غرام", "المستشعر": "Razer Focus Pro 40K Optical", "السرعة القسوى": "750 IPS", "التسارع": "70G", "معدل التحديث": "8000 Hz لاسلكي", "البطارية": "حتى 100 ساعة"}'::jsonb, 4.9, 'للألعاب التنافسية', 'bg-gradient-to-br from-gray-800 to-black', '/images/products/razer-viper-v3-pro.jpg', 'ماوس ألعاب رياضي احترافي', false, '');

-- =============================================
-- إضافة عروض لعام 2026 (PC-centric)
INSERT INTO offers (title, desc_text, image_color, badge, time_left)
VALUES
('تجميعات قيمنق خارقة 2026', 'اشترِ تجميعة ألعاب معتمدة لعام 2026 بكرت شاشة RTX 5000 واحصل على ماوس ولوحة مفاتيح احترافية مجاناً.', 'bg-gradient-to-r from-red-900 to-red-700', 'عرض جيمرز', 'الكمية محدودة'),
('شاشات الأحلام للألعاب', 'وفر حتى 200$ عند شراء شاشات Samsung Odyssey أو LG UltraGear OLED الأحدث.', 'bg-gradient-to-r from-indigo-900 to-blue-900', 'تخفيض خاص', 'فترة محدودة');

-- =============================================
-- تحديث الواجهة الرئيسية (Hero Content) لعام 2026
UPDATE hero_content SET 
  title = 'بوابة المستقبل.. اختر قطع البي سي بذكاء',
  subtitle = 'نقارن لك أفضل تجميعات الـ PC، الشاشات، وإكسسوارات القيمنق المتاحة في العراق. اكتشف الأسعار الحقيقية، الميزات، واختر الأنسب لميزانيتك واحتياجاتك بخطوات بسيطة.',
  cta_text = 'استكشف التجميعات',
  badge_title = 'أفضل تجميعات',
  badge_text = 'تجميعات RTX 5000 & شاشات OLED وصلوا !!',
  badge_visible = true
WHERE id = 1;

-- =============================================
-- تحديث إعدادات الموقع لعام 2026
UPDATE site_settings SET 
  description = 'المنصة رقم 1 في العراق لمقارنة تجميعات الـ PC والشاشات وملحقات الألعاب لعام 2026.',
  exchange_rate = 1520
WHERE id = 1;
