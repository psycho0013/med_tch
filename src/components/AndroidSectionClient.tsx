"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCurrency } from "./CurrencyContext";
import { ChevronRight, Cpu, Battery, Camera, Star, Smartphone } from "lucide-react";
import SpecsModal from "./SpecsModal";
import type { Product } from "@/lib/types";
import Link from "next/link";

export default function AndroidSectionClient({ products }: { products: Product[] }) {
    const { formatPrice } = useCurrency();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    if (products.length === 0) return null;

    return (
        <section id="android" className="py-20 relative z-10 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/50 text-emerald-700 text-sm font-bold mb-4 border border-emerald-200">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            هواتف ذكية
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
                            أقوى أجهزة <span className="text-emerald-600">الأندرويد</span>
                        </h2>
                        <p className="text-slate-600 font-medium text-lg">
                            تشكيلة واسعة من روائع الأندرويد، استكشف الإمكانيات واختر ما يناسب تطلعاتك.
                        </p>
                    </div>
                    <Link href="/category/android" className="relative overflow-hidden flex items-center justify-center gap-2 bg-white text-slate-700 font-bold px-6 py-3 rounded-xl border border-slate-200 transition-all shadow-sm group">
                        <span className="absolute inset-0 w-0 bg-emerald-500 transition-all duration-300 ease-out group-hover:w-full"></span>
                        <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                            عرض كل هواتف أندرويد <ChevronRight className="w-5 h-5 group-hover:translate-x-1 inline-block transition-transform duration-300" />
                        </span>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="glass-panel rounded-3xl p-5 relative group overflow-hidden border border-slate-200 hover:shadow-xl hover:border-emerald-300 transition-all bg-white flex flex-col h-full"
                        >
                            <div className="absolute top-4 right-4 z-10 px-2 py-1.5 rounded-md bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-bold shadow-sm border border-slate-100">
                                {product.tag}
                            </div>

                            <div className={`w-full aspect-[4/5] rounded-2xl ${product.bg_color} mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500`}>
                                <div className="w-3/5 h-[85%] bg-slate-900 rounded-[2rem] shadow-xl border-4 border-slate-800 flex flex-col items-center justify-between p-2 relative">
                                    <div className="w-1/3 h-4 bg-black rounded-full absolute top-2"></div>
                                    <div className="my-auto text-white/20 text-xl font-black">{product.brand}</div>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 leading-tight mb-1">{product.name}</h3>
                                        <p className="text-sm text-slate-500 font-medium">{product.brand}</p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-2 py-1 rounded-md text-xs font-bold border border-yellow-100 shadow-sm">
                                        <Star className="w-3 h-3 fill-current" /> {product.rating}
                                    </div>
                                </div>

                                <div className="space-y-2 mb-5">
                                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <Cpu className="w-4 h-4 text-slate-400 shrink-0" /> <span className="line-clamp-1">{product.features[0]}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <Battery className="w-4 h-4 text-slate-400 shrink-0" /> <span className="line-clamp-1">{product.features[1]}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <Camera className="w-4 h-4 text-slate-400 shrink-0" /> <span className="line-clamp-1">{product.features[2]}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 mt-auto space-y-4">
                                    <div className="flex items-end justify-center">
                                        <div className="text-xl font-black text-brand-dark bg-brand-light/10 px-4 py-1.5 rounded-xl border border-brand-light/20">{formatPrice(product.price_usd)}</div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProduct(product)}
                                        className="w-full py-2.5 rounded-xl border-2 border-emerald-100 text-emerald-700 font-bold text-sm hover:bg-emerald-50 hover:border-emerald-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        عرض المواصفات كاملة
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <SpecsModal
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                product={selectedProduct}
                titleIcon={<Smartphone className="w-6 h-6 text-emerald-600" />}
            />
        </section>
    );
}
