// Seed script: Run with `npx tsx src/lib/seed.ts` after setting up .env
// This migrates all existing hardcoded product data to Supabase

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const allProducts = [
    // ===== PCs =====
    {
        category: "pcs", name: "تجميعة RTX 4090", brand: "Custom",
        price_usd: 3500, price_iqd: 5425000,
        features: ["Core i9-14900K", "RTX 4090 24GB", "64GB DDR5 XMP", "2TB NVMe Gen5"],
        rating: 4.9, tag: "وحش الإطارات",
        bg_color: "bg-gradient-to-br from-purple-100 to-purple-50",
        type: "Extreme",
        full_specs: {
            "المعالج (CPU)": "Intel Core i9-14900K (24 Cores, 32 Threads, up to 6.0 GHz)",
            "كرت الشاشة (GPU)": "NVIDIA GeForce RTX 4090 24GB GDDR6X",
            "اللوحة الأم (Motherboard)": "ASUS ROG MAXIMUS Z790 HERO",
            "الذاكرة (RAM)": "64GB (2x32GB) Corsair Dominator Titanium DDR5 6400MHz",
            "التخزين (Storage)": "2TB WD Black SN850X NVMe PCIe Gen 4.0",
            "التبريد (Cooling)": "مبرد مائي NZXT Kraken Elite 360mm RGB",
            "مزود الطاقة (PSU)": "Corsair RM1200x SHIFT 80 PLUS Gold Fully Modular",
            "الكيس (Case)": "Lian Li O11 Dynamic EVO XL",
            "المراوح (Fans)": "10 مراوح Lian Li UNI FAN SL-INFINITY 120",
            "الأداء المتوقع": "4K Ultra بجميع الألعاب (120+ FPS)"
        },
        is_offer: false,
    },
    {
        category: "pcs", name: "تجميعة 2K احترافية", brand: "Custom",
        price_usd: 1600, price_iqd: 2480000,
        features: ["Ryzen 7 7800X3D", "RTX 4070 Ti SUPER", "32GB DDR5", "1TB NVMe"],
        rating: 4.8, tag: "القيمة مقابل الأداء",
        bg_color: "bg-gradient-to-br from-blue-100 to-blue-50",
        type: "High-End",
        full_specs: {
            "المعالج (CPU)": "AMD Ryzen 7 7800X3D (أفضل معالج ألعاب لتوجيه الإطارات)",
            "كرت الشاشة (GPU)": "NVIDIA GeForce RTX 4070 Ti SUPER 16GB",
            "اللوحة الأم (Motherboard)": "MSI MAG B650 TOMAHAWK WIFI",
            "الذاكرة (RAM)": "32GB (2x16GB) G.Skill Trident Z5 Neo RGB DDR5 6000MHz",
            "التخزين (Storage)": "1TB Samsung 990 PRO NVMe M.2 SSD",
            "التبريد (Cooling)": "مبرد هوائي Thermalright Peerless Assassin 120 SE",
            "مزود الطاقة (PSU)": "MSI MPG A850G PCIE5 850W 80+ Gold",
            "الكيس (Case)": "NZXT H6 Flow RGB",
            "الأداء المتوقع": "ألعاب 1440p (2K) على أعلى إعدادات (100+ FPS)"
        },
        is_offer: false,
    },
    {
        category: "pcs", name: "تجميعة اقتصادية 1080p", brand: "Custom",
        price_usd: 650, price_iqd: 1000000,
        features: ["Core i5-12400F", "RTX 4060 8GB", "16GB DDR4", "1TB SSD"],
        rating: 4.7, tag: "الأكثر مبيعاً",
        bg_color: "bg-gradient-to-br from-slate-100 to-slate-50",
        type: "Entry",
        full_specs: {
            "المعالج (CPU)": "Intel Core i5-12400F (6 Cores, 12 Threads)",
            "كرت الشاشة (GPU)": "NVIDIA GeForce RTX 4060 8GB",
            "اللوحة الأم (Motherboard)": "ASUS PRIME H610M-A D4",
            "الذاكرة (RAM)": "16GB (2x8GB) Kingston FURY Beast DDR4 3200MHz",
            "التخزين (Storage)": "1TB Crucial P3 Plus NVMe SSD",
            "التبريد (Cooling)": "تبريد المعالج المصنعي (Stock Cooler) من إنتل",
            "مزود الطاقة (PSU)": "Corsair CV650 650W 80 PLUS Bronze",
            "الكيس (Case)": "DeepCool CC560 V2 مع 4 مراوح مضيئة LED",
            "الأداء المتوقع": "ألعاب 1080p إعدادات High/Ultra بأكثر من 60 إطاراً."
        },
        is_offer: false,
    },

    // ===== MONITORS =====
    {
        category: "monitors", name: "Samsung Odyssey OLED G9", brand: "Samsung",
        price_usd: 1799, price_iqd: 2788000,
        features: ["49 إنش Dual QHD", "240Hz OLED", "0.03ms استجابة"],
        rating: 4.9, tag: "شاشة الأحلام",
        bg_color: "bg-gradient-to-br from-blue-900 to-indigo-900",
        type: "شاشة قيمنق فائقة العرض",
        full_specs: {
            "حجم ونوع الشاشة": "49 إنش مقوسة 1800R، لوحة QD-OLED فائقة الاتساع (32:9)",
            "الدقة (Resolution)": "Dual QHD (5120 x 1440)",
            "معدل التحديث (Refresh Rate)": "240Hz حقيقي وسلس جداً",
            "زمن الاستجابة (Response Time)": "0.03ms GTG (أسرع استجابة في السوق)",
            "التقنيات المدعومة": "AMD FreeSync Premium Pro, دعم G-Sync",
            "المنافذ": "HDMI 2.1 Micro, DisplayPort 1.4, USB Hub",
            "الاستخدام الأمثل": "ألعاب السباقات والطيران، الإنتاجية المتعددة"
        },
        is_offer: false,
    },
    {
        category: "monitors", name: "LG UltraGear 27GR95QE", brand: "LG",
        price_usd: 899, price_iqd: 1393000,
        features: ["27 إنش QHD", "240Hz OLED", "تقنية مضادة للانعكاس"],
        rating: 4.8, tag: "خيار المحترفين",
        bg_color: "bg-gradient-to-br from-red-900 to-slate-900",
        type: "شاشة قيمنق تنافسية",
        full_specs: {
            "حجم ونوع الشاشة": "27 إنش مسطحة، لوحة OLED احترافية",
            "الدقة (Resolution)": "QHD (2560 x 1440)",
            "معدل التحديث (Refresh Rate)": "240Hz",
            "زمن الاستجابة (Response Time)": "0.03ms GTG",
            "التقنيات المدعومة": "NVIDIA G-SYNC Compatible, AMD FreeSync Premium",
            "المنافذ": "2x HDMI 2.1, 1x DisplayPort 1.4, مخرج صوت بصري",
            "الاستخدام الأمثل": "ألعاب الـ E-Sports التنافسية"
        },
        is_offer: false,
    },
    {
        category: "monitors", name: "Dell UltraSharp U2723QE", brand: "Dell",
        price_usd: 650, price_iqd: 1007000,
        features: ["27 إنش 4K", "IPS Black", "Hub بـ 90W"],
        rating: 4.8, tag: "لصناع المحتوى",
        bg_color: "bg-gradient-to-br from-slate-200 to-slate-300",
        type: "شاشة مونتاج وإنتاجية",
        full_specs: {
            "حجم ونوع الشاشة": "27 إنش مسطحة، لوحة (IPS Black) لتباين مضاعف",
            "الدقة (Resolution)": "4K UHD (3840 x 2160)",
            "معدل التحديث (Refresh Rate)": "60Hz",
            "الألوان والسطوع": "تغطية 100% sRGB و 98% DCI-P3",
            "المنافذ والـ Hub": "منفذ USB-C يوفر شحن 90W للابتوب",
            "الاستخدام الأمثل": "للمونتاج، التصميم الجرافيكي، البرمجة"
        },
        is_offer: false,
    },
    {
        category: "monitors", name: "AOC 24G2SP", brand: "AOC",
        price_usd: 180, price_iqd: 279000,
        features: ["24 إنش FHD", "165Hz IPS", "ألوان ممتازة"],
        rating: 4.6, tag: "الأكثر مبيعاً",
        bg_color: "bg-gradient-to-br from-gray-800 to-gray-900",
        type: "شاشة قيمنق إقتصادية",
        full_specs: {
            "حجم ونوع الشاشة": "24 إنش مسطحة، لوحة IPS",
            "الدقة (Resolution)": "FHD (1920 x 1080)",
            "معدل التحديث (Refresh Rate)": "165Hz",
            "زمن الاستجابة (Response Time)": "1ms MPRT",
            "التقنيات المدعومة": "Adaptive-Sync",
            "المنافذ": "1x DisplayPort 1.2, 2x HDMI 1.4, 1x VGA",
            "الاستخدام الأمثل": "لتجميعات الحاسب الاقتصادية المخصصة للاعبين"
        },
        is_offer: false,
    },

    // ===== ACCESSORIES =====
    {
        category: "accessories", name: "Wooting 60HE+", brand: "Wooting",
        price_usd: 175, price_iqd: 271000,
        features: ["Rapid Trigger", "أسرع استجابة", "60% Layout"],
        rating: 4.9, tag: "رقم 1 للقيمنق",
        bg_color: "bg-gradient-to-br from-yellow-50 to-orange-50",
        type: "كيبورد كهرومغناطيسي",
        full_specs: {
            "النوع": "كيبورد ألعاب احترافي (Analog Mechanical)",
            "السويتشات (Switches)": "Lekker Linear60 switches (Magnetic/Hall Effect)",
            "الميزة الرئيسية": "Rapid Trigger & Adjustable Actuation (من 0.1mm إلى 4.0mm)",
            "الحجم (Layout)": "60% (بدون أزرار أرقام أو أسهم مخصصة)",
            "المواد": "إطار بلاستيك قوي + لوحة ألومنيوم (Aluminum Key Switch Plate)",
            "الاتصال": "سلكي (USB-C قابل للفك)"
        },
        is_offer: false,
    },
    {
        category: "accessories", name: "Razer DeathAdder V3 Pro", brand: "Razer",
        price_usd: 140, price_iqd: 217000,
        features: ["63 غرام", "30,000 DPI", "HyperPolling 4000Hz"],
        rating: 4.8, tag: "أفضل ماوس ESport",
        bg_color: "bg-gradient-to-br from-green-50 to-emerald-50",
        type: "ماوس وايرلس خفيف",
        full_specs: {
            "النوع": "ماوس ألعاب لاسلكي مريح جدًا لليد اليمنى (Ergonomic)",
            "المستشعر (Sensor)": "Focus Pro 30K Optical Sensor",
            "الوزن": "63 غرام فقط (بدون ثقوب في الهيكل)",
            "عمر البطارية": "حتى 90 ساعة متواصلة",
            "أزرار الماوس": "Optical Mouse Switches Gen-3",
            "الاتصال": "Razer HyperSpeed Wireless / سلكي Type-C"
        },
        is_offer: false,
    },
    {
        category: "accessories", name: "Razer Viper V3 Pro (2026 Edition)", brand: "Razer",
        price_usd: 150, price_iqd: 228000,
        features: ["وزن خفيف جداً يبلغ 52غرام", "مستشعر Focus Pro Gen-3 بدقة 40,000 DPI", "معدل إرسال لاسلكي 8000Hz (HyperPolling مدمج)", "أزرار بصرية للجيل الرابع للسرعة"],
        rating: 4.9, tag: "للألعاب التنافسية",
        bg_color: "bg-gradient-to-br from-slate-100 to-slate-200",
        type: "ماوس ألعاب رياضي احترافي",
        full_specs: {
            "الوزن": "52 غرام",
            "المستشعر": "Razer Focus Pro 40K Optical",
            "السرعة القسوى": "750 IPS",
            "التسارع": "70G",
            "معدل التحديث": "8000 Hz لاسلكي",
            "البطارية": "حتى 100 ساعة"
        },
        is_offer: false,
    },
    {
        category: "accessories", name: "ASUS ROG Rapture GT-AXE16000", brand: "ASUS",
        price_usd: 599, price_iqd: 928000,
        features: ["Quad-Band", "منافذ 10G", "WiFi 6E 6GHz"],
        rating: 4.9, tag: "راوتر وحش",
        bg_color: "bg-gradient-to-br from-rose-50 to-red-50",
        type: "راوتر قيمنق WiFi 6E",
        full_specs: {
            "النوع": "راوتر ألعاب بتغطية واسعة (Quad-Band WiFi 6E)",
            "النطاقات (Bands)": "1 نطاق 2.4GHz + 2 نطاق 5GHz + 1 نطاق 6GHz",
            "السرعة القصوى": "16000 Mbps كمجموع السرعات",
            "المعالج (CPU)": "Broadcom رباعي النواة 2.0GHz",
            "المنافذ": "2 منافذ 10 Gbps + 4 منافذ Gigabit LAN + منفذ 2.5 Gbps WAN",
            "الحماية": "AiProtection Pro مجانية مدى الحياة من Trend Micro"
        },
        is_offer: false,
    },
];

async function seed() {
    console.log("🌱 بدء إدراج البيانات في Supabase...");

    // Clear existing products
    const { error: deleteError } = await supabase.from("products").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (deleteError) {
        console.error("❌ خطأ في حذف البيانات القديمة:", deleteError.message);
        return;
    }

    // Insert all products
    const { data: insertedProducts, error } = await supabase.from("products").insert(allProducts).select();

    if (error) {
        console.error("❌ خطأ في إدراج البيانات:", error.message);
        return;
    }

    console.log(`✅ تم إدراج ${insertedProducts.length} منتج بنجاح!`);

    // Clean up offers table and insert PC-only offer
    await supabase.from("offers").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    const { error: offersError } = await supabase.from("offers").insert([
        {
            title: "تجميعات قيمنق خارقة 2026",
            desc_text: "اشترِ تجميعة ألعاب معتمدة لعام 2026 بكرت شاشة RTX 5000 واحصل على ماوس ولوحة مفاتيح احترافية مجاناً.",
            image_color: "bg-gradient-to-r from-red-900 to-red-700",
            badge: "عرض جيمرز",
            time_left: "الكمية محدودة"
        },
        {
            title: "شاشات الأحلام للألعاب",
            desc_text: "وفر حتى 200$ عند شراء شاشات Samsung Odyssey أو LG UltraGear OLED الأحدث.",
            image_color: "bg-gradient-to-r from-indigo-900 to-blue-900",
            badge: "تخفيض خاص",
            time_left: "فترة محدودة"
        }
    ]);

    if (offersError) {
        console.error("❌ خطأ في إدراج العروض:", offersError.message);
    } else {
        console.log("✅ تم إدراج عروض الـ PC بنجاح!");
    }

    // Update hero content
    const { error: heroError } = await supabase.from("hero_content").update({
        title: "بوابة المستقبل.. اختر قطع البي سي بذكاء",
        subtitle: "نقارن لك أفضل تجميعات الـ PC، الشاشات، وإكسسوارات القيمنق المتاحة في العراق. اكتشف الأسعار الحقيقية، الميزات، واختر الأنسب لميزانيتك واحتياجاتك بخطوات بسيطة.",
        cta_text: "استكشف التجميعات",
        badge_title: "أفضل تجميعات",
        badge_text: "تجميعات RTX 5000 & شاشات OLED وصلوا !!",
        badge_visible: true
    }).eq("id", 1);

    if (heroError) {
        console.error("❌ خطأ في تحديث الهيرو:", heroError.message);
    } else {
        console.log("✅ تم تحديث الهيرو ليكون PC-centric!");
    }

    // Update site settings
    const { error: settingsError } = await supabase.from("site_settings").update({
        site_name: "مركز الروان",
        description: "المنصة رقم 1 في العراق لمقارنة تجميعات الـ PC والشاشات وملحقات الألعاب لعام 2026."
    }).eq("id", 1);

    if (settingsError) {
        console.error("❌ خطأ في تحديث إعدادات الموقع:", settingsError.message);
    } else {
        console.log("✅ تم تحديث إعدادات الموقع!");
    }
}

seed();
