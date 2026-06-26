"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useCurrency } from "./CurrencyContext";
import { useCart } from "@/lib/CartContext";
import { useFavorites } from "@/lib/FavoritesContext";
import { Keyboard, Mouse, Headphones, Wifi, ChevronLeft, ChevronRight, Tag, ShoppingCart, Heart } from "lucide-react";
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
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    if (products.length === 0) return null;

    return (
        <section id="accessories" className="py-16 relative z-10 bg-[#050505] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-bold mb-4 border border-white/20"><Mouse className="w-4 h-4" /> القطع والإكسسوارات</div>
                        <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 leading-tight">أفضل <span className="text-zinc-400">الملحقات التقنية</span> لكافة الاستخدامات</h2>
                        <p className="text-zinc-400 font-medium text-lg">كيبوردات احترافية، ماوسات سريعة، سماعات نقية وراوترات جبّارة.</p>
                    </div>
                    <Link href="/category/accessories" className="relative overflow-hidden flex items-center justify-center gap-2 bg-zinc-900 text-white font-bold px-6 py-3 rounded-xl border border-white/10 transition-all shadow-sm group hover:border-white/30">
                        <span className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                        <span className="relative flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                            عرض كل القطع <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 inline-block transition-transform duration-300" />
                        </span>
                    </Link>
                </div>
                <div className="relative group/carousel">
                    <button onClick={() => scroll('right')} className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-zinc-900/90 hover:bg-white hover:text-black text-white rounded-full border border-white/20 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all translate-x-4 opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 cursor-pointer">
                        <ChevronRight className="w-6 h-6 ml-1" />
                    </button>
                    <button onClick={() => scroll('left')} className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-zinc-900/90 hover:bg-white hover:text-black text-white rounded-full border border-white/20 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all -translate-x-4 opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 cursor-pointer">
                        <ChevronLeft className="w-6 h-6 mr-1" />
                    </button>
                    <div ref={scrollContainerRef} className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {products.map((product, index) => {
                        const IconComponent = guessIcon(product);
                        return (
                            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -5 }}
                                className="w-[85vw] sm:w-[280px] md:w-[300px] lg:w-[320px] max-w-[360px] snap-start shrink-0 bg-zinc-900/80 backdrop-blur-md rounded-3xl p-5 relative group overflow-hidden border border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-white/30 transition-all flex flex-col h-full cursor-pointer">
                                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
                                    <div className="px-2 py-1.5 rounded-md bg-white/10 backdrop-blur-sm text-white text-xs font-bold shadow-sm border border-white/20 flex items-center gap-1"><IconComponent className="w-3 h-3" />{product.tag}</div>
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
                                    className="absolute top-4 left-4 p-2 rounded-full bg-black/50 backdrop-blur-sm text-zinc-400 hover:text-red-500 hover:bg-white/10 transition-colors z-20 shadow-sm border border-white/10"
                                >
                                    <Heart fill={isFavorite(product.id) ? "currentColor" : "none"} className={isFavorite(product.id) ? "text-red-500 w-4 h-4" : "w-4 h-4"} />
                                </button>
                                <div className={`w-full aspect-square rounded-2xl ${product.bg_color ? product.bg_color.replace('bg-blue-50', 'bg-blue-900/20').replace('bg-indigo-50', 'bg-indigo-900/20').replace('bg-purple-50', 'bg-purple-900/20').replace('bg-slate-50', 'bg-zinc-800') : 'bg-white/5'} mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500 mt-2`}>
                                    {product.image_url ? (
                                        <img src={product.image_url} alt={product.name} className="w-full h-full object-contain p-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 flex items-center justify-center"><IconComponent className="w-24 h-24 text-zinc-700/30" /></div>
                                            <div className="bg-zinc-800/80 backdrop-blur-md px-4 py-2 rounded-xl text-white font-black shadow-lg border border-white/10 z-10">{product.brand}</div>
                                        </>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-3">
                                        <div><h3 className="text-lg font-black text-white leading-tight mb-1 group-hover:text-zinc-300 transition-colors">{product.name}</h3><p className="text-sm text-zinc-400 font-medium">{product.type}</p></div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {product.features.map((feat, i) => (<span key={i} className="px-2.5 py-1 text-xs font-bold text-zinc-300 bg-white/5 rounded-md border border-white/10">{feat}</span>))}
                                    </div>
                                    <div className="pt-4 border-t border-white/10 mt-auto space-y-3">
                                        <div className="flex items-end justify-center mb-2">
                                            <div className="text-xl font-black text-white bg-white/10 px-4 py-1.5 rounded-xl border border-white/20">{formatPrice(product.price_usd)}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(product);
                                                }} 
                                                className="flex-1 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-sm"
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                                سلة
                                            </button>
                                            <button onClick={() => setSelectedProduct(product)} className="flex-[1.5] py-2.5 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2">مواصفات</button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                    </div>
                </div>
            </div>
            <SpecsModal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} product={selectedProduct}
                titleIcon={selectedProduct ? (() => { const Icon = guessIcon(selectedProduct); return <Icon className="w-6 h-6 text-white" />; })() : undefined} />
        </section>
    );
}
