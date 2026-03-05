"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCurrency } from "@/components/CurrencyContext";
import { ChevronRight, Cpu, Battery, Camera, Star, Smartphone, Activity, Monitor, Laptop, Keyboard, Gamepad2, Watch, ArrowRight } from "lucide-react";
import SpecsModal from "@/components/SpecsModal";
import type { Product } from "@/lib/types";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categoryMap: Record<string, any> = {
    "android": { title: "هواتف أندرويد", icon: Smartphone, color: "emerald" },
    "ios": { title: "أجهزة أبل (iOS)", icon: Smartphone, color: "blue" },
    "laptops": { title: "لابتوبات", icon: Laptop, color: "purple" },
    "pcs": { title: "تجميعات PC", icon: Gamepad2, color: "rose" },
    "monitors": { title: "شاشات", icon: Monitor, color: "cyan" },
    "accessories": { title: "قطع وإكسسوارات", icon: Keyboard, color: "amber" },
    "apple-watches": { title: "ساعات أبل", icon: Watch, color: "slate" },
    "other-watches": { title: "ساعات أخرى", icon: Watch, color: "orange" },
};

export default function CategoryProductsClient({ products, category }: { products: Product[], category: string }) {
    const { formatPrice } = useCurrency();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const config = categoryMap[category] || { title: "الأجهزة", icon: Smartphone, color: "brand" };
    const Icon = config.icon;

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col pt-24">
            <Navbar />

            <main className="flex-grow pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold mb-6">
                            <ArrowRight className="w-5 h-5" /> العودة للرئيسية
                        </Link>

                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${config.color}-100/50 text-${config.color}-700 text-sm font-bold mb-4 border border-${config.color}-200`}>
                            <Icon className="w-4 h-4" />
                            {config.title}
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight">
                            جميع أجهزة <span className={`text-${config.color}-600`}>{config.title}</span>
                        </h1>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-20 text-slate-500 font-medium text-lg">
                            لا توجد أجهزة متوفرة في هذا القسم حالياً.
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.4 }}
                                    whileHover={{ y: -5 }}
                                    className={`glass-panel rounded-3xl p-5 relative group overflow-hidden border border-slate-200 hover:shadow-xl hover:border-${config.color}-300 transition-all bg-white flex flex-col h-full`}
                                >
                                    {product.tag && (
                                        <div className={`absolute top-4 right-4 z-10 px-2 py-1.5 rounded-md bg-white/90 backdrop-blur-sm text-${config.color}-700 text-xs font-bold shadow-sm border border-slate-100`}>
                                            {product.tag}
                                        </div>
                                    )}

                                    <div className={`w-full aspect-[4/5] rounded-2xl ${product.bg_color || 'bg-slate-100'} mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500`}>
                                        {/* Simple visualization based on category */}
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
                                            <Icon className="w-8 h-8 text-slate-800" />
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
                                            {product.features.slice(0, 3).map((feat, i) => (
                                                <div key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                                                    <span className="line-clamp-1">{feat}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-4 border-t border-slate-100 mt-auto space-y-4">
                                            <div className="flex items-end justify-center">
                                                <div className="text-xl font-black text-brand-dark bg-brand-light/10 px-4 py-1.5 rounded-xl border border-brand-light/20">{formatPrice(product.price_usd)}</div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedProduct(product)}
                                                className={`w-full py-2.5 rounded-xl border-2 border-${config.color}-100 text-${config.color}-700 font-bold text-sm hover:bg-${config.color}-50 hover:border-${config.color}-200 transition-colors flex items-center justify-center gap-2`}
                                            >
                                                عرض المواصفات كاملة
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                <SpecsModal
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    product={selectedProduct}
                    titleIcon={<Icon className={`w-6 h-6 text-${config.color}-600`} />}
                />
            </main>
            <Footer />
        </div>
    );
}
