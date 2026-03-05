"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency } from "@/components/CurrencyContext";
import { Search, X, Plus, ArrowRight, Zap, Battery, Cpu, Camera, Star, Monitor, Smartphone, Laptop, Watch, Headphones, Info } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/types";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CategoryIcons: Record<string, any> = {
    android: Smartphone,
    ios: Smartphone,
    laptops: Laptop,
    pcs: Monitor,
    monitors: Monitor,
    accessories: Headphones,
    "apple-watches": Watch,
    "other-watches": Watch
};

export default function CompareClient({ products }: { products: Product[] }) {
    const { formatPrice } = useCurrency();
    const [slot1, setSlot1] = useState<Product | null>(null);
    const [slot2, setSlot2] = useState<Product | null>(null);

    // Modal state for selecting a product
    const [isSelectingForSlot, setIsSelectingForSlot] = useState<1 | 2 | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    // Extract unique categories for filter tabs
    const categories = useMemo(() => {
        const cats = Array.from(new Set(products.map(p => p.category)));
        return ["all", ...cats];
    }, [products]);

    // Filter products for the modal
    const filteredProducts = useMemo(() => {
        let filtered = products;
        if (selectedCategory !== "all") {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }
        if (searchQuery) {
            const lowerQ = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(lowerQ) ||
                p.brand.toLowerCase().includes(lowerQ)
            );
        }
        return filtered;
    }, [products, searchQuery, selectedCategory]);

    const handleSelectProduct = (product: Product) => {
        if (isSelectingForSlot === 1) setSlot1(product);
        if (isSelectingForSlot === 2) setSlot2(product);
        setIsSelectingForSlot(null);
        setSearchQuery("");
    };

    const getMaxPrice = () => {
        if (!slot1 && !slot2) return 1;
        return Math.max(slot1?.price_usd || 0, slot2?.price_usd || 0, 1);
    };

    const maxPrice = getMaxPrice();

    const renderSpecRow = (title: string, val1: string | undefined, val2: string | undefined) => {
        if (!val1 && !val2) return null;

        return (
            <div className="grid grid-cols-3 gap-4 py-4 border-b border-slate-100 hover:bg-slate-50/50 transition-colors px-4 rounded-xl items-center">
                <div className="text-center font-bold text-slate-800 text-sm">{val1 || "-"}</div>
                <div className="text-center font-black text-slate-400 text-xs uppercase tracking-wider">{title}</div>
                <div className="text-center font-bold text-slate-800 text-sm">{val2 || "-"}</div>
            </div>
        );
    };

    // Extract all unique spec keys from both products
    const allSpecKeys = useMemo(() => {
        if (!slot1 && !slot2) return [];
        const keys = new Set<string>();
        if (slot1?.full_specs) Object.keys(slot1.full_specs).forEach(k => keys.add(k));
        if (slot2?.full_specs) Object.keys(slot2.full_specs).forEach(k => keys.add(k));
        return Array.from(keys);
    }, [slot1, slot2]);

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col pt-24 font-sans">
            <Navbar />

            <main className="flex-grow pb-24 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-light/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="mb-12 text-center relative z-10">
                        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold mb-6 absolute right-0 top-2">
                            <ArrowRight className="w-5 h-5" /> رجوع
                        </Link>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-brand-dark text-sm font-bold mb-4 shadow-sm border border-brand-light/20">
                            <Zap className="w-4 h-4 fill-current" />
                            ساحة المنافسة
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight mb-4">
                            المقارنة <span className="text-gradient">الذكية</span>
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                            اختر جهازين لاكتشاف الفروقات الدقيقة بينهما، وتحديد الأفضل لاحتياجاتك بخطوات بسيطة.
                        </p>
                    </div>

                    {/* Comparison Arena */}
                    <div className="bg-white rounded-[2.5rem] p-6 lg:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 relative z-10">

                        {/* Headers / Slot Selectors */}
                        <div className="grid grid-cols-2 gap-6 lg:gap-12 mb-12">
                            {/* Slot 1 */}
                            <div className="flex flex-col items-center text-center">
                                <AnimatePresence mode="wait">
                                    {slot1 ? (
                                        <motion.div
                                            key="slot1-filled"
                                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                            className="w-full"
                                        >
                                            <div className="relative group mx-auto w-40 h-40 lg:w-48 lg:h-48 rounded-3xl mb-6 bg-slate-50 border-2 border-slate-100 flex items-center justify-center p-4">
                                                <button onClick={() => setSlot1(null)} className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors z-10 shadow-sm opacity-0 group-hover:opacity-100">
                                                    <X className="w-4 h-4" />
                                                </button>
                                                {slot1.image_url ? (
                                                    <img src={slot1.image_url} alt={slot1.name} className="max-h-full object-contain drop-shadow-md" />
                                                ) : (
                                                    <div className={`w-full h-full rounded-2xl ${slot1.bg_color || 'bg-slate-200'} shadow-inner flex items-center justify-center`}>
                                                        {CategoryIcons[slot1.category] && (
                                                            <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                                                                {(() => { const Icon = CategoryIcons[slot1.category]; return <Icon className="w-8 h-8 text-slate-800" />; })()}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="text-xl lg:text-3xl font-black text-slate-900 mb-1">{slot1.name}</h3>
                                            <p className="text-slate-500 font-bold">{slot1.brand}</p>
                                        </motion.div>
                                    ) : (
                                        <motion.button
                                            key="slot1-empty"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            onClick={() => setIsSelectingForSlot(1)}
                                            className="w-full aspect-square max-w-[200px] mx-auto rounded-3xl border-3 border-dashed border-slate-300 hover:border-brand-dark hover:bg-brand-light/5 flex flex-col items-center justify-center gap-4 transition-all group"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-slate-100 group-hover:bg-brand-light/20 flex items-center justify-center transition-colors">
                                                <Plus className="w-8 h-8 text-slate-400 group-hover:text-brand-dark transition-colors" />
                                            </div>
                                            <span className="font-bold text-slate-500 group-hover:text-brand-dark">اختر الجهاز الأول</span>
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Slot 2 */}
                            <div className="flex flex-col items-center text-center">
                                <AnimatePresence mode="wait">
                                    {slot2 ? (
                                        <motion.div
                                            key="slot2-filled"
                                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                            className="w-full"
                                        >
                                            <div className="relative group mx-auto w-40 h-40 lg:w-48 lg:h-48 rounded-3xl mb-6 bg-slate-50 border-2 border-slate-100 flex items-center justify-center p-4">
                                                <button onClick={() => setSlot2(null)} className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors z-10 shadow-sm opacity-0 group-hover:opacity-100">
                                                    <X className="w-4 h-4" />
                                                </button>
                                                {slot2.image_url ? (
                                                    <img src={slot2.image_url} alt={slot2.name} className="max-h-full object-contain drop-shadow-md" />
                                                ) : (
                                                    <div className={`w-full h-full rounded-2xl ${slot2.bg_color || 'bg-slate-200'} shadow-inner flex items-center justify-center`}>
                                                        {CategoryIcons[slot2.category] && (
                                                            <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                                                                {(() => { const Icon = CategoryIcons[slot2.category]; return <Icon className="w-8 h-8 text-slate-800" />; })()}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="text-xl lg:text-3xl font-black text-slate-900 mb-1">{slot2.name}</h3>
                                            <p className="text-slate-500 font-bold">{slot2.brand}</p>
                                        </motion.div>
                                    ) : (
                                        <motion.button
                                            key="slot2-empty"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            onClick={() => setIsSelectingForSlot(2)}
                                            className="w-full aspect-square max-w-[200px] mx-auto rounded-3xl border-3 border-dashed border-slate-300 hover:border-brand-dark hover:bg-brand-light/5 flex flex-col items-center justify-center gap-4 transition-all group"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-slate-100 group-hover:bg-brand-light/20 flex items-center justify-center transition-colors">
                                                <Plus className="w-8 h-8 text-slate-400 group-hover:text-brand-dark transition-colors" />
                                            </div>
                                            <span className="font-bold text-slate-500 group-hover:text-brand-dark">اختر الجهاز الثاني</span>
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* VS Divider Overlay (Only for large screens, decorative) */}
                        <div className="hidden lg:flex absolute top-32 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white shadow-xl border border-slate-100 items-center justify-center z-20">
                            <span className="font-black text-xl bg-clip-text text-transparent bg-gradient-to-br from-brand-light to-brand-dark italic">VS</span>
                        </div>

                        {/* Details Comparison Area */}
                        {slot1 || slot2 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                                className="bg-slate-50/50 rounded-3xl p-4 lg:p-8"
                            >
                                {/* Quick Stats section */}
                                <div className="mb-10">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Info className="w-5 h-5 text-slate-400" />
                                        <h4 className="text-xl font-black text-slate-800">نظرة سريعة</h4>
                                    </div>

                                    {/* Price Comparison */}
                                    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center mb-8 relative">
                                        <div className="flex flex-col items-end">
                                            <span className="font-bold text-slate-800 text-lg lg:text-2xl">{slot1 ? formatPrice(slot1.price_usd) : "-"}</span>
                                            {slot1 && (
                                                <div className="w-full bg-slate-200 h-2 rounded-full mt-2 flex justify-end overflow-hidden flex-row-reverse">
                                                    <motion.div initial={{ width: 0 }} animate={{ width: `${(slot1.price_usd / maxPrice) * 100}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-emerald-500 rounded-full" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-center font-black text-slate-400 text-xs px-4 w-24">السعر</div>
                                        <div className="flex flex-col items-start">
                                            <span className="font-bold text-slate-800 text-lg lg:text-2xl">{slot2 ? formatPrice(slot2.price_usd) : "-"}</span>
                                            {slot2 && (
                                                <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden flex flex-row">
                                                    <motion.div initial={{ width: 0 }} animate={{ width: `${(slot2.price_usd / maxPrice) * 100}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-emerald-500 rounded-full" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Rating Comparison */}
                                    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                                        <div className="flex gap-1 items-center justify-end">
                                            <span className="font-bold text-slate-800 text-lg">{slot1?.rating || "-"}</span>
                                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                        </div>
                                        <div className="text-center font-black text-slate-400 text-xs px-4 w-24">التقييم</div>
                                        <div className="flex gap-1 items-center justify-start">
                                            <span className="font-bold text-slate-800 text-lg">{slot2?.rating || "-"}</span>
                                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                        </div>
                                    </div>
                                </div>

                                {/* Full Specs */}
                                <div>
                                    <div className="flex items-center gap-2 mb-6">
                                        <Zap className="w-5 h-5 text-brand-dark" />
                                        <h4 className="text-xl font-black text-slate-800">المواصفات التقنية التفصيلية</h4>
                                    </div>

                                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                        {allSpecKeys.length === 0 ? (
                                            <div className="p-8 text-center text-slate-500 font-medium">لا توجد مواصفات مفصلة لعرضها.</div>
                                        ) : (
                                            allSpecKeys.map((key, i) => (
                                                <div key={key}>
                                                    {renderSpecRow(
                                                        key,
                                                        slot1?.full_specs?.[key] || (slot1 ? "غير متوفر" : undefined),
                                                        slot2?.full_specs?.[key] || (slot2 ? "غير متوفر" : undefined)
                                                    )}
                                                </div>
                                            ))
                                        )}
                                        {renderSpecRow('أبرز الميزات', slot1?.features?.join(' • '), slot2?.features?.join(' • '))}
                                    </div>
                                </div>

                            </motion.div>
                        ) : (
                            <div className="py-20 text-center flex flex-col items-center justify-center opacity-50">
                                <Zap className="w-16 h-16 text-slate-300 mb-4" />
                                <p className="text-xl font-bold text-slate-400">اختر جهازين لتبدأ المقارنة الممتعة!</p>
                            </div>
                        )}

                    </div>
                </div>
            </main>
            <Footer />

            {/* Selection Modal */}
            <AnimatePresence>
                {isSelectingForSlot && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSelectingForSlot(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative z-10 border border-slate-100"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h3 className="text-2xl font-black text-slate-800">اختر جهازاً للمقارنة</h3>
                                <button onClick={() => setIsSelectingForSlot(null)} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 flex-1 overflow-y-auto bg-white custom-scrollbar">
                                {/* Search and Filter Controls */}
                                <div className="flex flex-col md:flex-row gap-4 mb-8">
                                    <div className="relative flex-1">
                                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="ابحث عن اسم الجهاز أو الماركة..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pr-12 pl-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-brand-dark/30 focus:outline-none focus:ring-4 focus:ring-brand-light/10 text-slate-800 font-medium transition-all"
                                        />
                                    </div>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="px-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-brand-dark/30 focus:outline-none bg-white text-slate-700 font-bold min-w-[200px]"
                                    >
                                        <option value="all">جميع الفئات</option>
                                        {categories.filter(c => c !== "all").map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Results Grid */}
                                {filteredProducts.length === 0 ? (
                                    <div className="text-center py-20 text-slate-400 font-bold text-lg">
                                        لا توجد نتائج مطابقة لبحثك.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {filteredProducts.map((product) => (
                                            <div
                                                key={product.id}
                                                onClick={() => handleSelectProduct(product)}
                                                className="group cursor-pointer bg-slate-50 rounded-2xl border border-slate-200 p-4 hover:border-brand-dark hover:shadow-lg hover:bg-white transition-all text-center flex flex-col"
                                            >
                                                <div className={`w-full aspect-square rounded-xl ${product.bg_color || 'bg-slate-200'} mb-3 mx-auto flex items-center justify-center p-2 relative overflow-hidden`}>
                                                    {product.image_url ? (
                                                        <img src={product.image_url} alt={product.name} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                                                    ) : (
                                                        CategoryIcons[product.category] && (
                                                            <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                                {(() => { const Icon = CategoryIcons[product.category]; return <Icon className="w-6 h-6 text-slate-800" />; })()}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                                <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">{product.name}</h4>
                                                <p className="text-xs text-slate-500 font-medium mb-2">{product.brand}</p>
                                                <div className="mt-auto px-3 py-1 bg-brand-light/10 text-brand-dark font-black rounded-lg text-sm inline-block mx-auto border border-brand-light/20">
                                                    {formatPrice(product.price_usd)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
