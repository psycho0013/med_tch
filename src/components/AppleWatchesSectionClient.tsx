"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCurrency } from "./CurrencyContext";
import { ChevronRight, Cpu, Battery, Activity, Star, Watch } from "lucide-react";
import SpecsModal from "./SpecsModal";
import type { Product } from "@/lib/types";

export default function AppleWatchesSectionClient({ products }: { products: Product[] }) {
    const { formatPrice } = useCurrency();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    if (products.length === 0) return null;

    return (
        <section id="apple-watches" className="py-20 relative z-10 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100/50 text-red-700 text-sm font-bold mb-4 border border-red-200">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            ساعات ذكية
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
                            ساعات <span className="text-red-600">أبل</span>
                        </h2>
                        <p className="text-slate-600 font-medium text-lg">
                            راقب صحتك، تلقى التنبيهات، وابق متصلاً دائماً مع أحدث إصدارات Apple Watch.
                        </p>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-slate-50 text-red-700 font-bold px-6 py-3 rounded-xl border border-red-200 hover:bg-red-50 hover:border-red-500 transition-all shadow-sm">
                        عرض الساعات <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-3xl p-5 relative group overflow-hidden border border-slate-200 hover:shadow-xl hover:border-red-300 transition-all flex flex-col h-full"
                        >
                            {product.tag && (
                                <div className="absolute top-4 right-4 z-10 px-2 py-1.5 rounded-md bg-white/90 backdrop-blur-sm text-red-700 text-xs font-bold shadow-sm border border-slate-100">
                                    {product.tag}
                                </div>
                            )}

                            <div className={`w-full aspect-square rounded-2xl ${product.bg_color || 'bg-slate-100'} mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500`}>
                                <div className="w-1/2 h-1/2 rounded-[2rem] border-4 border-slate-800 bg-black flex items-center justify-center shadow-lg relative">
                                    <Watch className="w-12 h-12 text-white/30" />
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
                                    {product.features[0] && (
                                        <div className="flex items-center gap-3 text-sm text-slate-600 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">
                                            <Cpu className="w-4 h-4 text-slate-400 shrink-0" /> <span className="line-clamp-1">{product.features[0]}</span>
                                        </div>
                                    )}
                                    {product.features[1] && (
                                        <div className="flex items-center gap-3 text-sm text-slate-600 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">
                                            <Activity className="w-4 h-4 text-slate-400 shrink-0" /> <span className="line-clamp-1">{product.features[1]}</span>
                                        </div>
                                    )}
                                    {product.features[2] && (
                                        <div className="flex items-center gap-3 text-sm text-slate-600 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">
                                            <Battery className="w-4 h-4 text-slate-400 shrink-0" /> <span className="line-clamp-1">{product.features[2]}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-slate-100 mt-auto space-y-4">
                                    <div className="flex items-end justify-center">
                                        <div className="text-xl font-black text-brand-dark bg-brand-light/10 px-4 py-1.5 rounded-xl border border-brand-light/20">{formatPrice(product.price_usd)}</div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProduct(product)}
                                        className="w-full py-2.5 rounded-xl border-2 border-red-100 text-red-700 font-bold text-sm hover:bg-red-50 hover:border-red-200 transition-colors flex items-center justify-center gap-2"
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
                titleIcon={<Watch className="w-6 h-6 text-red-600" />}
            />
        </section>
    );
}
