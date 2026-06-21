"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCurrency } from "@/components/CurrencyContext";
import { Star, Monitor, Keyboard, Gamepad2, ArrowRight } from "lucide-react";
import SpecsModal from "@/components/SpecsModal";
import type { Product } from "@/lib/types";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categoryMap: Record<string, any> = {
    "pcs": { title: "تجميعات PC", icon: Gamepad2, color: "rose" },
    "monitors": { title: "شاشات", icon: Monitor, color: "cyan" },
    "accessories": { title: "قطع وإكسسوارات", icon: Keyboard, color: "amber" },
};

const colorStyles: Record<string, {
    bg: string;
    text: string;
    border: string;
    hoverBorder: string;
    hoverBg: string;
    buttonBorder: string;
    buttonText: string;
    buttonHoverBg: string;
    buttonHoverBorder: string;
    spanText: string;
}> = {
    rose: {
        bg: "bg-rose-100/50",
        text: "text-rose-700",
        border: "border-rose-200",
        hoverBorder: "hover:border-rose-300",
        hoverBg: "hover:bg-rose-50",
        buttonBorder: "border-rose-100",
        buttonText: "text-rose-700",
        buttonHoverBg: "hover:bg-rose-50",
        buttonHoverBorder: "hover:border-rose-200",
        spanText: "text-rose-600",
    },
    cyan: {
        bg: "bg-cyan-100/50",
        text: "text-cyan-700",
        border: "border-cyan-200",
        hoverBorder: "hover:border-cyan-300",
        hoverBg: "hover:bg-cyan-50",
        buttonBorder: "border-cyan-100",
        buttonText: "text-cyan-700",
        buttonHoverBg: "hover:bg-cyan-50",
        buttonHoverBorder: "hover:border-cyan-200",
        spanText: "text-cyan-600",
    },
    amber: {
        bg: "bg-amber-100/50",
        text: "text-amber-700",
        border: "border-amber-200",
        hoverBorder: "hover:border-amber-300",
        hoverBg: "hover:bg-amber-50",
        buttonBorder: "border-amber-100",
        buttonText: "text-amber-700",
        buttonHoverBg: "hover:bg-amber-50",
        buttonHoverBorder: "hover:border-amber-200",
        spanText: "text-amber-600",
    },
    brand: {
        bg: "bg-brand-light/10",
        text: "text-brand-dark",
        border: "border-brand-light/20",
        hoverBorder: "hover:border-brand-light/30",
        hoverBg: "hover:bg-brand-light/5",
        buttonBorder: "border-brand-light/20",
        buttonText: "text-brand-dark",
        buttonHoverBg: "hover:bg-brand-light/5",
        buttonHoverBorder: "hover:border-brand-light/30",
        spanText: "text-brand-dark",
    }
};

export default function CategoryProductsClient({ products, category }: { products: Product[], category: string }) {
    const { formatPrice } = useCurrency();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const config = categoryMap[category] || { title: "الأجهزة", icon: Monitor, color: "brand" };
    const Icon = config.icon;
    const styles = colorStyles[config.color] || colorStyles.brand;

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col pt-24 font-sans">
            <Navbar />

            <main className="flex-grow pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold mb-6">
                            <ArrowRight className="w-5 h-5" /> العودة للرئيسية
                        </Link>

                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${styles.bg} ${styles.text} text-sm font-bold mb-4 border ${styles.border}`}>
                            <Icon className="w-4 h-4" />
                            {config.title}
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight">
                            جميع أجهزة <span className={styles.spanText}>{config.title}</span>
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
                                    className={`glass-panel rounded-3xl p-5 relative group overflow-hidden border border-slate-200 hover:shadow-xl ${styles.hoverBorder} transition-all bg-white flex flex-col h-full`}
                                >
                                    {product.tag && (
                                        <div className={`absolute top-4 right-4 z-10 px-2 py-1.5 rounded-md bg-white/90 backdrop-blur-sm ${styles.text} text-xs font-bold shadow-sm border border-slate-100`}>
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
                                                className={`w-full py-2.5 rounded-xl border-2 ${styles.buttonBorder} ${styles.buttonText} font-bold text-sm ${styles.buttonHoverBg} ${styles.buttonHoverBorder} transition-colors flex items-center justify-center gap-2`}
                                            >
                                                عرض المواصفات كاملة
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )
                    }
                </div>

                <SpecsModal
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    product={selectedProduct}
                    titleIcon={<Icon className={`w-6 h-6 ${styles.spanText}`} />}
                />
            </main>
            <Footer />
        </div>
    );
}
