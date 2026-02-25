"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Monitor, ChevronRight } from "lucide-react";
import SpecsModal from "./SpecsModal";
import type { Product } from "@/lib/types";

export default function PCsSectionClient({ products }: { products: Product[] }) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    if (products.length === 0) return null;

    return (
        <section id="pc" className="py-16 relative z-10 bg-gradient-to-br from-white to-purple-50/50 border-y border-slate-200">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-bold mb-3 border border-purple-200 shadow-sm"><Monitor className="w-4 h-4" /> تجميعات PC</div>
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2">حاسبات <span className="text-purple-600">بي سي</span> للقيمنق والمونتاج</h2>
                        <p className="text-slate-500 font-medium text-lg">تجميعات جاهزة بأفضل القطع العالمية بضمان محلي وأداء استثنائي.</p>
                    </div>
                    <button className="flex items-center gap-2 text-purple-600 font-bold hover:text-purple-800 hover:gap-3 transition-all">استكشف التجميعات <ChevronLeft className="w-5 h-5" /></button>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -5 }}
                            className="relative p-[2px] rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden group hover:from-purple-400 hover:to-blue-400 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl">
                            <div className="bg-white/95 backdrop-blur-sm rounded-[1.4rem] h-full p-6 flex flex-col relative z-10 border border-white">
                                <div className="absolute top-6 right-6 px-3 py-1 rounded-md bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200">{product.tag}</div>
                                <div className="mb-6 h-32 flex items-center justify-center">
                                    <div className="w-24 h-32 bg-slate-50 rounded-lg border-2 border-slate-200 shadow-[0_0_20px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] transition-all flex flex-col justify-between p-2">
                                        <div className="w-full flex justify-between">
                                            <div className="w-5 h-5 rounded-full bg-purple-500/20 animate-pulse border border-purple-500/50" />
                                            <div className="w-5 h-5 rounded-full bg-blue-500/20 animate-pulse border border-blue-500/50 delay-75" />
                                        </div>
                                        <div className="w-full h-1/2 bg-slate-100 rounded-md border border-slate-200 flex items-center justify-center overflow-hidden">
                                            <div className="w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 opacity-40 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-purple-700 transition-colors">{product.name}</h3>
                                <p className="text-sm text-slate-500 font-medium mb-6">فئة {product.type || ''}</p>
                                <div className="space-y-3 mb-8 flex-1">
                                    {product.features.map((feat, i) => (
                                        <div key={i} className="flex items-center gap-3 text-slate-600 text-sm font-medium"><ChevronRight className="w-4 h-4 text-purple-500" /><span>{feat}</span></div>
                                    ))}
                                </div>
                                <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
                                    <div className="flex items-end justify-between">
                                        <div><div className="text-slate-400 text-xs font-medium mb-1">السعر التقريبي</div><div className="text-2xl font-black text-slate-900">${product.price_usd}</div></div>
                                        <div className="text-sm font-bold text-slate-600">{product.price_iqd.toLocaleString('ar-IQ')} <span className="text-[10px]">د.ع</span></div>
                                    </div>
                                    <button onClick={() => setSelectedProduct(product)} className="w-full py-2.5 rounded-xl border-2 border-purple-100 text-purple-700 font-bold text-sm hover:bg-purple-50 hover:border-purple-200 transition-colors flex items-center justify-center gap-2">مواصفات القطع</button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <SpecsModal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} product={selectedProduct} titleIcon={<Monitor className="w-6 h-6 text-purple-600" />} />
        </section>
    );
}
