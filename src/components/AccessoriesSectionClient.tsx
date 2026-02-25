"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Keyboard, Mouse, Headphones, Wifi, ChevronLeft, Star, Tag } from "lucide-react";
import SpecsModal from "./SpecsModal";
import type { Product } from "@/lib/types";

const categoryIcons: Record<string, any> = { keyboard: Keyboard, mouse: Mouse, audio: Headphones, router: Wifi };

function guessIcon(product: Product) {
    const t = (product.type || product.name || "").toLowerCase();
    if (t.includes("كيبورد") || t.includes("keyboard")) return Keyboard;
    if (t.includes("ماوس") || t.includes("mouse")) return Mouse;
    if (t.includes("سماع") || t.includes("audio") || t.includes("headphone")) return Headphones;
    if (t.includes("راوتر") || t.includes("router") || t.includes("wifi")) return Wifi;
    return Tag;
}

export default function AccessoriesSectionClient({ products }: { products: Product[] }) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    if (products.length === 0) return null;

    return (
        <section id="accessories" className="py-16 relative z-10 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200 text-slate-700 text-sm font-bold mb-4 border border-slate-300"><Mouse className="w-4 h-4" /> القطع والإكسسوارات</div>
                        <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">أفضل <span className="text-brand-dark">الملحقات التقنية</span> لكافة الاستخدامات</h2>
                        <p className="text-slate-600 font-medium text-lg">كيبوردات احترافية، ماوسات سريعة، سماعات نقية وراوترات جبّارة.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-white text-brand-dark font-bold px-6 py-3 rounded-xl border border-slate-200 hover:border-brand-dark transition-all shadow-sm">عرض كل القطع <ChevronLeft className="w-5 h-5" /></button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => {
                        const IconComponent = guessIcon(product);
                        return (
                            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -5 }}
                                className="glass-panel rounded-3xl p-5 relative group overflow-hidden border border-slate-200 hover:shadow-xl hover:border-brand-dark transition-all bg-white flex flex-col h-full cursor-pointer">
                                <div className="absolute top-4 left-4 z-10 px-2 py-1.5 rounded-md bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold shadow-sm border border-slate-100 flex items-center gap-1"><IconComponent className="w-3 h-3" />{product.tag}</div>
                                <div className={`w-full aspect-square rounded-2xl ${product.bg_color} mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                                    <div className="absolute inset-0 flex items-center justify-center"><IconComponent className="w-24 h-24 text-slate-900/10" /></div>
                                    <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl text-slate-900 font-black shadow-lg border border-white/50 z-10">{product.brand}</div>
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-3">
                                        <div><h3 className="text-lg font-black text-slate-900 leading-tight mb-1">{product.name}</h3><p className="text-sm text-slate-500 font-medium">{product.type}</p></div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {product.features.map((feat, i) => (<span key={i} className="px-2.5 py-1 text-xs font-bold text-slate-600 bg-slate-100 rounded-md border border-slate-200">{feat}</span>))}
                                    </div>
                                    <div className="pt-4 border-t border-slate-100 mt-auto space-y-4">
                                        <div className="flex items-end justify-between">
                                            <div className="text-2xl font-black text-slate-800">${product.price_usd}</div>
                                            <div className="text-sm font-bold text-slate-500">{product.price_iqd.toLocaleString('ar-IQ')} <span className="text-[10px]">د.ع</span></div>
                                        </div>
                                        <button onClick={() => setSelectedProduct(product)} className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-colors flex items-center justify-center">قراءة المواصفات</button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            <SpecsModal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} product={selectedProduct}
                titleIcon={selectedProduct ? (() => { const Icon = guessIcon(selectedProduct); return <Icon className="w-6 h-6 text-slate-600" />; })() : undefined} />
        </section>
    );
}
