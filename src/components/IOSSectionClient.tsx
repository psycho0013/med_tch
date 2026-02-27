"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCurrency } from "./CurrencyContext";
import { ChevronRight, Cpu, Battery, Camera, Star, Apple } from "lucide-react";
import SpecsModal from "./SpecsModal";
import type { Product } from "@/lib/types";

export default function IOSSectionClient({ products }: { products: Product[] }) {
    const { formatPrice } = useCurrency();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    if (products.length === 0) return null;

    return (
        <section id="ios" className="py-20 relative z-10 bg-white border-t border-slate-200 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-light/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-bold mb-4 shadow-lg shadow-slate-900/20">
                            <Apple className="w-4 h-4" /> أجهزة آيفون
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
                            نظام <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">iOS</span> المتكامل
                        </h2>
                        <p className="text-slate-600 font-medium text-lg">أداء استثنائي، كاميرات احترافية، ونظام تشغيل هو الأكثر استقراراً وأماناً.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-xl border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                        عرض كل أجهزة آيفون <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -5 }}
                            className="glass-panel rounded-3xl p-5 relative group overflow-hidden border border-slate-200 hover:shadow-2xl hover:border-slate-300 transition-all bg-white/80 flex flex-col h-full">
                            <div className="absolute top-4 left-4 z-10 px-2 py-1.5 rounded-md bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold shadow-sm border border-slate-100">{product.tag}</div>
                            <div className={`w-full aspect-[4/5] rounded-3xl ${product.bg_color} mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-[1.03] transition-transform duration-700 ease-out`}>
                                <div className="w-3/5 h-[85%] bg-slate-900 rounded-[2.5rem] shadow-2xl border-[6px] border-slate-800 flex flex-col items-center p-2 relative">
                                    <div className="w-1/3 h-5 bg-black rounded-full mt-1"></div>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-black text-slate-900 leading-tight mb-1">{product.name}</h3>
                                    <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-2 py-1 rounded-md text-xs font-bold border border-yellow-100 shadow-sm shrink-0">
                                        <Star className="w-3 h-3 fill-current" /> {product.rating}
                                    </div>
                                </div>
                                <div className="space-y-2 mb-5">
                                    {product.features.slice(0, 3).map((feat, i) => {
                                        const Icon = [Cpu, Battery, Camera][i];
                                        return (
                                            <div key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium bg-slate-50/80 p-2 rounded-xl border border-slate-100">
                                                <Icon className="w-4 h-4 text-slate-400 shrink-0" /> <span className="line-clamp-1">{feat}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="pt-4 border-t border-slate-100 mt-auto space-y-4">
                                    <div className="flex items-end justify-center">
                                        <div className="text-xl font-black text-brand-dark bg-brand-light/10 px-4 py-1.5 rounded-xl border border-brand-light/20">{formatPrice(product.price_usd)}</div>
                                    </div>
                                    <button onClick={() => setSelectedProduct(product)} className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                                        عرض المواصفات كاملة
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <SpecsModal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} product={selectedProduct} titleIcon={<Apple className="w-6 h-6 text-slate-900" />} />
        </section>
    );
}
