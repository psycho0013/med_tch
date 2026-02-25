// Seed script: Run with `npx tsx src/lib/seed.ts` after setting up .env.local
// This migrates all existing hardcoded product data to Supabase

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const allProducts = [
    // ===== ANDROID =====
    {
        category: "android", name: "Galaxy S24 Ultra", brand: "Samsung",
        price_usd: 1150, price_iqd: 1780000,
        features: ["Snapdragon 8 Gen 3", "5000mAh", "200MP + 50MP"],
        rating: 4.8, tag: "ملك الأندرويد",
        bg_color: "bg-gradient-to-br from-indigo-100 to-indigo-50",
        full_specs: {
            "الشاشة": "6.8 إنش Dynamic LTPO AMOLED 2X, 120Hz, 2600 nits",
            "المعالج (CPU)": "Snapdragon 8 Gen 3 (4 nm) مخصص لجلاكسي",
            "الذاكرة و التخزين": "RAM 12GB | سعات 256GB, 512GB, 1TB UFS 4.0",
            "الكاميرات الخلفية": "200MP رئيسية + 50MP تقريب x5 + 10MP تقريب x3 + 12MP واسعة جداً",
            "الكاميرا الأمامية": "12MP مع دعم فيديو 4K@60fps",
            "البطارية والشحن": "5000 mAh قوة 45W سلكي، 15W لاسلكي، 4.5W عكسي",
            "نظام التشغيل": "Android 14 مع واجهة One UI 6.1 (دعم الذكاء الاصطناعي Galaxy AI)",
            "مواد التصنيع": "إطار من التيتانيوم، زجاج Gorilla Armor",
            "الوزن": "232 غرام",
            "المقاومة": "مقاوم للماء والغبار معيار IP68"
        },
        is_offer: false,
    },
    {
        category: "android", name: "Xiaomi 14 Ultra", brand: "Xiaomi",
        price_usd: 1050, price_iqd: 1625000,
        features: ["Snapdragon 8 Gen 3", "5300mAh", "Leica Quad 50MP"],
        rating: 4.7, tag: "وحش التصوير",
        bg_color: "bg-gradient-to-br from-orange-100 to-orange-50",
        full_specs: {
            "الشاشة": "6.73 إنش LTPO AMOLED, 120Hz, 68B colors, 3000 nits",
            "المعالج (CPU)": "Snapdragon 8 Gen 3 (4 nm)",
            "الذاكرة و التخزين": "12GB/16GB LPDDR5X RAM | 256GB/512GB/1TB UFS 4.0",
            "الكاميرات الخلفية": "عدسات Leica الاحترافية: 50MP رئيسية + 50MP ماكرو/تيليفوتو + 50MP منظار + 50MP واسعة",
            "الكاميرا الأمامية": "32MP داعمة للـ HDR الممتاز و 4K@60fps",
            "البطارية والشحن": "5000/5300 mAh عالميا/صينيا مع 90W سلكي و 80W لاسلكي مجنون!",
            "نظام التشغيل": "Android 14 مع واجهة HyperOS الجديدة",
            "مواد التصنيع": "ظهر جلدي، إطار من الألومنيوم/التيتانيوم",
            "الوزن": "219-229 غرام حسب الإصدار",
            "المقاومة": "مقاوم للماء والغبار IP68 و مقاوم لـ 1.5 متر لمدة 30 دقيقة"
        },
        is_offer: false,
    },
    {
        category: "android", name: "Pixel 8 Pro", brand: "Google",
        price_usd: 900, price_iqd: 1395000,
        features: ["Tensor G3", "5050mAh", "ذكاء اصطناعي متطور"],
        rating: 4.6, tag: "أذكى كاميرا",
        bg_color: "bg-gradient-to-br from-emerald-100 to-emerald-50",
        full_specs: {
            "الشاشة": "6.7 إنش Super Actua LTPO OLED, 120Hz, 2400 nits",
            "المعالج (CPU)": "Google Tensor G3 (4 nm)",
            "الذاكرة و التخزين": "RAM 12GB | تخزين 128GB/256GB/512GB/1TB UFS 3.1",
            "الكاميرات الخلفية": "50MP رئيسية + 48MP تقريب بصري x5 + 48MP واسعة جداً بضبط تلقائي",
            "الكاميرا الأمامية": "10.5MP واسعة جدا",
            "البطارية والشحن": "5050 mAh سرعة 30W سلكي، و 23W لاسلكي",
            "نظام التشغيل": "Android 14 أندرويد خام (مع 7 سنوات من تحديثات النظام والأمان الكاملة)",
            "مواد التصنيع": "إطار ألومنيوم خلفية زجاج Gorilla Glass Victus 2",
            "الوزن": "213 غرام",
            "الميزات الإضافية": "مقياس حرارة مدمج (Thermometer)، أحدث تقنيات Google AI للتعديل الصوتي والصوري"
        },
        is_offer: false,
    },
    {
        category: "android", name: "Phone (2)", brand: "Nothing",
        price_usd: 650, price_iqd: 1000000,
        features: ["Snapdragon 8+ Gen 1", "4700mAh", "تصميم Glyph"],
        rating: 4.5, tag: "تصميم فريد",
        bg_color: "bg-gradient-to-br from-slate-200 to-slate-100",
        full_specs: {
            "الشاشة": "6.7 إنش LTPO OLED, 120Hz, 10-bit, 1600 nits",
            "المعالج (CPU)": "Snapdragon 8+ Gen 1 (4 nm)",
            "الذاكرة و التخزين": "RAM 8GB/12GB | تخزين 128GB/256GB/512GB UFS 3.1",
            "الكاميرات الخلفية": "50MP رئيسية (مع مستشعر Sony IMX890) + 50MP كاميرا واسعة (Samsung JN1)",
            "الكاميرا الأمامية": "32MP واسعة",
            "البطارية والشحن": "4700 mAh شحن 45W سلكي متكامل (100% في 55 دقيقة)، 15W لاسلكي، 5W عكسي",
            "نظام التشغيل": "Android 13 وقابل للتحديث لـ Android 14، بواجهة Nothing OS 2.5 الصافية",
            "التصميم المميز": "واجهة Glyph Interface المضيئة بالخلف (تنبيهات وأمور تفاعلية)، زجاج ومعدن",
            "الوزن": "201.2 غرام",
            "المقاومة": "تغطية مائية بسيطة بتقييم IP54"
        },
        is_offer: false,
    },

    // ===== iOS =====
    {
        category: "ios", name: "iPhone 15 Pro Max", brand: "Apple",
        price_usd: 1199, price_iqd: 1858000,
        features: ["A17 Pro", "تيتانيوم", "عدسة تقريب x5"],
        rating: 4.9, tag: "الأفضل من أبل",
        bg_color: "bg-gradient-to-br from-stone-200 to-stone-100",
        full_specs: {
            "الشاشة": "6.7 إنش LTPO Super Retina XDR OLED, 120Hz, 2000 nits",
            "المعالج (CPU)": "A17 Pro (3 nm) سداسي النواة مع معالج رسومي سداسي النواة",
            "الذاكرة و التخزين": "RAM 8GB | سعات 256GB, 512GB, 1TB NVMe",
            "الكاميرات الخلفية": "48MP رئيسية + 12MP تقريب بصري x5 + 12MP واسعة جداً + TOF 3D LiDAR",
            "الكاميرا الأمامية": "12MP واسعة مع مستشعر SL 3D (بصمة الوجه)",
            "البطارية والشحن": "4442 mAh شحن 50% في 30 دقيقة (سلكي)، 15W لاسلكي (MagSafe)",
            "نظام التشغيل": "iOS 17 وقابل للتحديث لـ iOS 18",
            "مواد التصنيع": "إطار من التيتانيوم من الدرجة الخامسة (Grade 5)، ظهر زجاجي (Corning-made)",
            "الوزن": "221 غرام",
            "الميزات الإضافية": "منفذ Type-C 3.2، زر الأكشن السريع (Action Button)، مقاوم للماء IP68"
        },
        is_offer: false,
    },
    {
        category: "ios", name: "iPhone 15 Pro", brand: "Apple",
        price_usd: 999, price_iqd: 1548000,
        features: ["A17 Pro", "تيتانيوم", "كاميرا 48MP"],
        rating: 4.8, tag: "قوة بحجم مثالي",
        bg_color: "bg-gradient-to-br from-slate-200 to-slate-100",
        full_specs: {
            "الشاشة": "6.1 إنش LTPO Super Retina XDR OLED, 120Hz, 2000 nits",
            "المعالج (CPU)": "A17 Pro (3 nm) الأحدث من أبل",
            "الذاكرة و التخزين": "RAM 8GB | سعات 128GB, 256GB, 512GB, 1TB NVMe",
            "الكاميرات الخلفية": "48MP رئيسية + 12MP تقريب بصري x3 + 12MP واسعة جداً + LiDAR",
            "الكاميرا الأمامية": "12MP مع تصوير 4K@60fps",
            "البطارية والشحن": "3274 mAh شحن سريع، MagSafe 15W",
            "نظام التشغيل": "iOS 17",
            "مواد التصنيع": "إطار تيتانيوم أخف وأصلب، زجاج خلفي مطفي",
            "الوزن": "187 غرام",
            "الميزات الإضافية": "زر الأكشن (Action Button)، منفذ USB-C"
        },
        is_offer: false,
    },
    {
        category: "ios", name: "iPhone 15", brand: "Apple",
        price_usd: 799, price_iqd: 1238000,
        features: ["A16 Bionic", "Dynamic Island", "USB-C"],
        rating: 4.7, tag: "الاختيار الذكي",
        bg_color: "bg-gradient-to-br from-blue-100 to-blue-50",
        full_specs: {
            "الشاشة": "6.1 إنش Super Retina XDR OLED, 60Hz, 2000 nits",
            "المعالج (CPU)": "A16 Bionic (4 nm)",
            "الذاكرة و التخزين": "RAM 6GB | سعات 128GB, 256GB, 512GB NVMe",
            "الكاميرات الخلفية": "48MP رئيسية (تقريب x2 بصري) + 12MP واسعة جداً",
            "الكاميرا الأمامية": "12MP",
            "البطارية والشحن": "3349 mAh شحن 50% بـ 30 دقيقة، 15W MagSafe",
            "نظام التشغيل": "iOS 17",
            "مواد التصنيع": "إطار ألومنيوم، ظهر زجاجي مدمج بالألوان",
            "الوزن": "171 غرام",
            "الميزات الإضافية": "جزيرة تفاعلية (Dynamic Island)، منفذ USB-C"
        },
        is_offer: false,
    },
    {
        category: "ios", name: "iPhone 13", brand: "Apple",
        price_usd: 599, price_iqd: 928000,
        features: ["A15 Bionic", "بطارية ممتازة", "قيمة ممتازة"],
        rating: 4.8, tag: "ملك الفئة المتوسطة",
        bg_color: "bg-gradient-to-br from-rose-100 to-rose-50",
        full_specs: {
            "الشاشة": "6.1 إنش Super Retina XDR OLED, 60Hz, 1200 nits",
            "المعالج (CPU)": "A15 Bionic (5 nm)",
            "الذاكرة و التخزين": "RAM 4GB | سعات 128GB, 256GB, 512GB NVMe",
            "الكاميرات الخلفية": "12MP رئيسية بحساس كبير + 12MP واسعة جداً",
            "الكاميرا الأمامية": "12MP",
            "البطارية والشحن": "3240 mAh (أداء بطارية أسطوري للفئة)",
            "نظام التشغيل": "يدعم التحديث حتى iOS 18 وما بعده",
            "مواد التصنيع": "إطار ألومنيوم و واجهة Ceramic Shield",
            "الوزن": "174 غرام",
            "الميزات الإضافية": "Face ID، مقاومة للماء IP68"
        },
        is_offer: false,
    },

    // ===== LAPTOPS =====
    {
        category: "laptops", name: "MacBook Pro 16", brand: "Apple",
        price_usd: 2499, price_iqd: 3870000,
        features: ["M3 Max Chip", "36GB Unified", "1TB SSD"],
        rating: 4.9, tag: "للمحترفين",
        bg_color: "bg-slate-200",
        full_specs: {
            "الشاشة": "16.2 إنش Liquid Retina XDR تصنيف 120Hz ProMotion بجودة 3456x2234 بكسل مع سطوع يصل لـ 1600nits",
            "المعالج (CPU/GPU)": "Apple M3 Max مع 14 نواة للمعالج المطور و 30 نواة لمعالج الرسوميات (GPU) وتتبع أشعة حقيقي",
            "الذاكرة (RAM)": "36GB Unified Memory الجيل الثالث سريع جداً",
            "التخزين (Storage)": "1TB SSD",
            "البطارية والشحن": "100Wh تصل لـ 22 ساعة استخدام مع شاحن 140W سلكي (MagSafe 3)",
            "المنافذ": "3 منفذ Thunderbolt 4 / USB-C, منفذ HDMI 2.1, منفذ SDXC Card, منفذ سماعة",
            "الوزن والتصميم": "وزن 2.14 كيلوغرام، إطار كامل من الألومنيوم المعاد تدويره",
            "نظام التشغيل": "macOS Sonoma جاهز",
            "إضافات أخرى": "كاميرا 1080p بميزات حصرية، واي فاي 6E، وستة مكبرات صوت تدعم الصوت المكاني"
        },
        is_offer: false,
    },
    {
        category: "laptops", name: "ROG Zephyrus G14", brand: "ASUS",
        price_usd: 1899, price_iqd: 2940000,
        features: ["Ryzen 9 8945HS", "RTX 4070", "32GB RAM / 1TB"],
        rating: 4.8, tag: "أفضل لابتوب قيمنق",
        bg_color: "bg-zinc-800",
        full_specs: {
            "الشاشة": "14 إنش OLED دقة 3K وضوح استثنائي، 120Hz, زمن استجابة 0.2ms مع تقنية G-Sync",
            "المعالج (CPU)": "AMD Ryzen 9 8945HS معزز بالذكاء الاصطناعي (Ryzen AI)",
            "كرت الشاشة (GPU)": "NVIDIA GeForce RTX 4070 8GB GDDR6 (90W TGP)",
            "الذاكرة (RAM)": "32GB LPDDR5X ملحومة على البورد",
            "التخزين (Storage)": "1TB PCIe 4.0 NVMe M.2 SSD",
            "البطارية والشحن": "73Wh شحن عبر Type-C وشاحن قوي للأداء",
            "المنافذ": "منفذ Type-C (دعم شاشة وطاقة), ومنافذ Type-A و HDMI 2.1, وقارئ بطاقات",
            "الوزن والتصميم": "هيكل خفيف ونحيف بإطار من الألومنيوم، وزن 1.5 كيلوغرام، إضاءة خلفية مائلة (Slash Lighting)",
            "نظام التشغيل": "Windows 11 Home"
        },
        is_offer: false,
    },
    {
        category: "laptops", name: "XPS 15", brand: "Dell",
        price_usd: 1750, price_iqd: 2710000,
        features: ["Intel Core i7 P", "RTX 4050", "OLED Touch"],
        rating: 4.7, tag: "أناقة وقوة",
        bg_color: "bg-emerald-100",
        full_specs: {
            "الشاشة": "15.6 إنش OLED مقاس (3456x2160) تدعم اللمس بدقة هائلة 3.5K",
            "المعالج (CPU)": "Intel Core i7-13700H",
            "كرت الشاشة (GPU)": "NVIDIA RTX 4050 6GB GDDR6 (للمونتاج والألعاب المتوسطة)",
            "الذاكرة (RAM)": "16GB DDR5 4800MHz (قابلة للتطوير)",
            "التخزين (Storage)": "1TB PCIe 4.0 SSD",
            "البطارية والشحن": "86Wh (بطارية ممتازة للشاشات غير الـ OLED، متوسطة مع الـ OLED)",
            "المنافذ": "منفذين Thunderbolt 4, ومنفذ USB 3.2 Gen 2 Type-C، وقارئ بطاقات SD من الحجم الكامل",
            "الوزن والتصميم": "إطار من الألومنيوم المكشوف وألياف الكربون، الوزن 1.92 كيلوغرام",
            "نظام التشغيل": "Windows 11 Pro"
        },
        is_offer: false,
    },
    {
        category: "laptops", name: "Legion Pro 5i", brand: "Lenovo",
        price_usd: 1450, price_iqd: 2240000,
        features: ["Intel Core i7 HX", "RTX 4060", "240Hz Display"],
        rating: 4.8, tag: "أعلى قيمة للألعاب",
        bg_color: "bg-neutral-200",
        full_specs: {
            "الشاشة": "16 إنش IPS بدقة WQXGA (2560x1600)، تردد عالي 240Hz, 500 nits, G-Sync",
            "المعالج (CPU)": "Intel Core i7-14650HX مكسور السرعة للألعاب الثقيلة",
            "كرت الشاشة (GPU)": "NVIDIA GeForce RTX 4060 8GB GDDR6 سحب طاقة عالي (140W TGP)",
            "الذاكرة (RAM)": "16GB DDR5 5600MHz (2x8GB) يمكن وضع 32GB",
            "التخزين (Storage)": "1TB PCIe 4.0 NVMe SSD M.2",
            "نظام التبريد": "Lenovo Legion Coldfront 5.0 لتبريد فائق تحت الضغط",
            "المنافذ": "منافذ شاملة يمين ويسار وخلف: USB-A, USB-C (دعم شحن 140W), HDMI 2.1, و Ethernet LAN",
            "الوزن والتصميم": "مظهر مكتبي وغطى ألومنيوم قوي، وزن 2.5 كيلوغرام",
            "نظام التشغيل": "Windows 11 Home مع Lenovo Vantage AI Engine"
        },
        is_offer: false,
    },

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
        category: "accessories", name: "Sony WH-1000XM5", brand: "Sony",
        price_usd: 340, price_iqd: 527000,
        features: ["أفضل عزل للضجيج", "30 ساعة بطارية", "Hi-Res Audio"],
        rating: 4.8, tag: "عزل ركيزة",
        bg_color: "bg-gradient-to-br from-slate-100 to-slate-200",
        type: "سماعات عزل محيطي",
        full_specs: {
            "النوع": "سماعات رأس لاسلكية فوق الأذن (Over-Ear)",
            "تقنية العزل (ANC)": "Multi Noise Sensor + Auto NC Optimizer",
            "حجم المشغل (Driver)": "30mm (مصمم خصيصاً للصوت عالي الدقة)",
            "البطارية": "حتى 30 ساعة مع فتح العزل",
            "الشحن السريع": "3 دقائق شحن يعطي 3 ساعات استماع",
            "الاتصال": "Bluetooth 5.2 / تدعم التوصيل بجهازين (Multipoint)"
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
    const { data, error } = await supabase.from("products").insert(allProducts).select();

    if (error) {
        console.error("❌ خطأ في إدراج البيانات:", error.message);
        return;
    }

    console.log(`✅ تم إدراج ${data.length} منتج بنجاح!`);
}

seed();
