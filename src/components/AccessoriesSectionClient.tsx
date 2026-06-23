"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCurrency } from "./CurrencyContext";
import { useCart } from "@/lib/CartContext";
import { useFavorites } from "@/lib/FavoritesContext";
import { Keyboard, Mouse, Headphones, Wifi, ChevronLeft, Tag, ShoppingCart, Heart } from "lucide-react";
import SpecsModal from "./SpecsModal";
import type { Product } from "@/lib/types";
import Link from "next/link";

const categoryIcons: Record<string, React.ElementType> = { keyboard: Keyboard, mouse: Mouse, audio: Headphones, router: Wifi };

function guessIcon(product: Product) {
    const t = (product.type || product.name || "").toLowerCase();
    if (t.includes("كيبورد") || t.includes("keyboard")) return Keyboard;
    if (t.includes("ماوس") || t.includes("mouse")) return Mouse;
    if (t.includes("سماع") || t.includes("audio") || t.includes("headphone")) return Headphones;
    if (t.includes("راوتر") || t.includes("router") || t.includes("wifi")) return Wifi;
    return Tag;
}

export default function AccessoriesSectionClient({ products }: { products: Product[] }) {
    const { formatPrice } = useCurrency();
    const { addToCart } = useCart();
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
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
                    <Link href="/category/accessories" className="relative overflow-hidden flex items-center justify-center gap-2 bg-white text-brand-dark font-bold px-6 py-3 rounded-xl border border-slate-200 transition-all shadow-sm group">
                        <span className="absolute inset-0 w-0 bg-brand-dark transition-all duration-300 ease-out group-hover:w-full"></span>
                        <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                            عرض كل القطع <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 inline-block transition-transform duration-300" />
                        </span>
                    </Link>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => {
                        const IconComponent = guessIcon(product);
                        return (
                            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -5 }}
                                className="glass-panel rounded-3xl p-5 relative group overflow-hidden border border-slate-200 hover:shadow-xl hover:border-brand-dark transition-all bg-white flex flex-col h-full cursor-pointer">
                                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
                                    <div className="px-2 py-1.5 rounded-md bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold shadow-sm border border-slate-100 flex items-center gap-1"><IconComponent className="w-3 h-3" />{product.tag}</div>
                                    {product.is_offer && (
                                        <div className="px-2 py-1.5 rounded-md bg-red-500 text-white text-xs font-bold shadow-md shadow-red-500/20">
                                            {product.offer_discount || 'عرض خاص'}
                                        </div>
                                    )}
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (isFavorite(product.id)) {
                                            removeFromFavorites(product.id);
                                        } else {
                                            addToFavorites(product);
                                        }
                                    }}
                                    className="absolute top-4 left-4 p-2 rounded-full bg-white/90 backdrop-blur-sm text-slate-400 hover:text-red-500 transition-colors z-20 shadow-sm border border-slate-100"
                                >
                                    <Heart fill={isFavorite(product.id) ? "currentColor" : "none"} className={isFavorite(product.id) ? "text-red-500 w-4 h-4" : "w-4 h-4"} />
                                </button>
                                <div className={`w-full aspect-square rounded-2xl ${product.bg_color} mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500 mt-2`}>
                                    {product.image_url ? (
                                        <img src={product.image_url} alt={product.name} className="w-full h-full object-contain p-4 drop-shadow-xl mix-blend-multiply" />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 flex items-center justify-center"><IconComponent className="w-24 h-24 text-slate-900/10" /></div>
                                            <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl text-slate-900 font-black shadow-lg border border-white/50 z-10">{product.brand}</div>
                                        </>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-3">
                                        <div><h3 className="text-lg font-black text-slate-900 leading-tight mb-1">{product.name}</h3><p className="text-sm text-slate-500 font-medium">{product.type}</p></div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {product.features.map((feat, i) => (<span key={i} className="px-2.5 py-1 text-xs font-bold text-slate-600 bg-slate-100 rounded-md border border-slate-200">{feat}</span>))}
                                    </div>
                                    <div className="pt-4 border-t border-slate-100 mt-auto space-y-3">
                                        <div className="flex items-end justify-center mb-2">
                                            <div className="text-xl font-black text-brand-dark bg-brand-light/10 px-4 py-1.5 rounded-xl border border-brand-light/20">{formatPrice(product.price_usd)}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(product);
                                                }} 
                                                className="flex-1 py-2.5 rounded-xl bg-brand-dark text-white font-bold text-sm hover:bg-brand-light transition-colors flex items-center justify-center gap-2 shadow-sm"
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                                سلة
                                            </button>
                                            <button onClick={() => setSelectedProduct(product)} className="flex-[1.5] py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-colors flex items-center justify-center gap-2">مواصفات</button>
                                        </div>
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
