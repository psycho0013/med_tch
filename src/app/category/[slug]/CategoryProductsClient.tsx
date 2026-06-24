"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCurrency } from "@/components/CurrencyContext";
import { useCart } from "@/lib/CartContext";
import { Star, Monitor, Keyboard, Gamepad2, ArrowRight, ShoppingCart } from "lucide-react";
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
        bg: "bg-rose-500/10",
        text: "text-rose-400",
        border: "border-rose-500/20",
        hoverBorder: "hover:border-rose-500/30",
        hoverBg: "hover:bg-rose-500/10",
        buttonBorder: "border-rose-500/20",
        buttonText: "text-rose-400",
        buttonHoverBg: "hover:bg-rose-500/10",
        buttonHoverBorder: "hover:border-rose-500/30",
        spanText: "text-rose-500",
    },
    cyan: {
        bg: "bg-cyan-500/10",
        text: "text-cyan-400",
        border: "border-cyan-500/20",
        hoverBorder: "hover:border-cyan-500/30",
        hoverBg: "hover:bg-cyan-500/10",
        buttonBorder: "border-cyan-500/20",
        buttonText: "text-cyan-400",
        buttonHoverBg: "hover:bg-cyan-500/10",
        buttonHoverBorder: "hover:border-cyan-500/30",
        spanText: "text-cyan-500",
    },
    amber: {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/20",
        hoverBorder: "hover:border-amber-500/30",
        hoverBg: "hover:bg-amber-500/10",
        buttonBorder: "border-amber-500/20",
        buttonText: "text-amber-400",
        buttonHoverBg: "hover:bg-amber-500/10",
        buttonHoverBorder: "hover:border-amber-500/30",
        spanText: "text-amber-500",
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
    const { addToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const config = categoryMap[category] || { title: "الأجهزة", icon: Monitor, color: "brand" };
    const Icon = config.icon;
    const styles = colorStyles[config.color] || colorStyles.brand;

    return (
        <div className="bg-[#000000] min-h-screen flex flex-col pt-24 font-sans">
            <Navbar />

            <main className="flex-grow pb-20 mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-bold mb-6">
                            <ArrowRight className="w-5 h-5" /> العودة للرئيسية
                        </Link>

                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${styles.bg} ${styles.text} text-sm font-bold mb-4 border ${styles.border}`}>
                            <Icon className="w-4 h-4" />
                            {config.title}
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight">
                            جميع أجهزة <span className={styles.spanText}>{config.title}</span>
                        </h1>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-20 text-zinc-500 font-medium text-lg">
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
                                    className={`rounded-3xl p-5 relative group overflow-hidden border border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] ${styles.hoverBorder} transition-all bg-[#0a0a0a] flex flex-col h-full`}
                                >
                                    {product.tag && (
                                        <div className={`absolute top-4 right-4 z-10 px-2 py-1.5 rounded-md bg-[#000000]/80 backdrop-blur-sm ${styles.text} text-xs font-bold shadow-sm border border-white/10`}>
                                            {product.tag}
                                        </div>
                                    )}

                                    <div className={`w-full aspect-[4/5] rounded-2xl ${product.bg_color || 'bg-zinc-900/50'} mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 border border-white/5`}>
                                        {/* Simple visualization based on category */}
                                        <div className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg">
                                            <Icon className="w-8 h-8 text-zinc-400" />
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="text-lg font-black text-white leading-tight mb-1">{product.name}</h3>
                                                <p className="text-sm text-zinc-400 font-medium">{product.brand}</p>
                                            </div>
                                            <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-md text-xs font-bold border border-yellow-500/20 shadow-sm">
                                                <Star className="w-3 h-3 fill-current" /> {product.rating}
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-5">
                                            {product.features.slice(0, 3).map((feat, i) => (
                                                <div key={i} className="flex items-center gap-3 text-sm text-zinc-300 font-medium bg-white/5 p-2 rounded-lg border border-white/5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0" />
                                                    <span className="line-clamp-1">{feat}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-4 border-t border-white/10 mt-auto space-y-4">
                                            <div className="flex items-end justify-center">
                                                <div className="text-xl font-black text-white bg-white/5 px-4 py-1.5 rounded-xl border border-white/10">{formatPrice(product.price_usd)}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToCart(product);
                                                    }}
                                                    className={`flex-1 py-2.5 rounded-xl border ${styles.buttonBorder} font-bold text-sm bg-white text-black transition-colors flex items-center justify-center gap-2 hover:bg-zinc-200`}
                                                >
                                                    <ShoppingCart className="w-4 h-4" />
                                                    إضافة للسلة
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedProduct(product);
                                                    }}
                                                    className={`flex-1 py-2.5 rounded-xl border ${styles.buttonBorder} ${styles.buttonText} font-bold text-sm bg-transparent ${styles.buttonHoverBg} ${styles.buttonHoverBorder} transition-colors flex items-center justify-center gap-2`}
                                                >
                                                    التفاصيل
                                                </button>
                                            </div>
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
