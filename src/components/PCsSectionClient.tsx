"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useCurrency } from "./CurrencyContext";
import { useCart } from "@/lib/CartContext";
import { useFavorites } from "@/lib/FavoritesContext";
import { ChevronLeft, Monitor, ChevronRight, ShoppingCart, Heart } from "lucide-react";
import SpecsModal from "./SpecsModal";
import type { Product } from "@/lib/types";
import Link from "next/link";

export default function PCsSectionClient({ products }: { products: Product[] }) {
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
        <section id="pc" className="py-16 relative z-10 bg-[#050505]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-bold mb-3 border border-white/20 shadow-sm"><Monitor className="w-4 h-4" /> تجميعات PC</div>
                        <h2 className="text-3xl lg:text-4xl font-black text-white mb-2">حاسبات <span className="text-zinc-400">بي سي</span> للقيمنق والمونتاج</h2>
                        <p className="text-zinc-400 font-medium text-lg">تجميعات جاهزة بأفضل القطع العالمية بضمان محلي وأداء استثنائي.</p>
                    </div>
                    <Link href="/category/pcs" className="relative overflow-hidden flex items-center justify-center gap-2 bg-zinc-900 text-white font-bold px-6 py-3 rounded-xl border border-white/10 transition-all shadow-sm group hover:border-white/30">
                        <span className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                        <span className="relative flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                            استكشف التجميعات <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 inline-block transition-transform duration-300" />
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
                    <div ref={scrollContainerRef} className="flex overflow-x-auto gap-8 pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {products.map((product, index) => (
                        <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -5 }}
                            className="w-[85vw] sm:w-[300px] md:w-[360px] max-w-[400px] snap-start shrink-0 relative p-[1px] rounded-3xl bg-gradient-to-br from-white/20 to-white/5 overflow-hidden group hover:from-white/40 hover:to-white/10 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <div className="bg-zinc-900/90 backdrop-blur-md rounded-[1.4rem] h-full p-6 flex flex-col relative z-10">
                                <div className="absolute top-6 right-6 px-3 py-1 rounded-md bg-white/10 text-white text-xs font-bold border border-white/20">{product.tag}</div>
                                {product.is_offer && (
                                    <div className="absolute top-14 right-6 px-3 py-1 rounded-md bg-red-500 text-white text-xs font-bold shadow-md shadow-red-500/20">
                                        {product.offer_discount || 'عرض خاص'}
                                    </div>
                                )}
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (isFavorite(product.id)) {
                                            removeFromFavorites(product.id);
                                        } else {
                                            addToFavorites(product);
                                        }
                                    }}
                                    className="absolute top-6 left-6 p-2 rounded-full bg-black/50 text-zinc-400 hover:text-red-500 hover:bg-white/10 transition-colors z-20"
                                >
                                    <Heart fill={isFavorite(product.id) ? "currentColor" : "none"} className={isFavorite(product.id) ? "text-red-500 w-5 h-5" : "w-5 h-5"} />
                                </button>
                                <div className="mb-6 h-56 flex items-center justify-center mt-4">
                                    {product.image_url ? (
                                        <div className="w-full h-full relative flex items-center justify-center">
                                            <img src={product.image_url} alt={product.name} className="max-h-full max-w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    ) : (
                                        <div className="w-24 h-32 bg-zinc-800 rounded-lg border-2 border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all flex flex-col justify-between p-2">
                                            <div className="w-full flex justify-between">
                                                <div className="w-5 h-5 rounded-full bg-white/10 animate-pulse border border-white/20" />
                                                <div className="w-5 h-5 rounded-full bg-white/10 animate-pulse border border-white/20 delay-75" />
                                            </div>
                                            <div className="w-full h-1/2 bg-zinc-700 rounded-md border border-white/5 flex items-center justify-center overflow-hidden">
                                                <div className="w-full h-2 bg-gradient-to-r from-zinc-500 via-white to-zinc-500 opacity-40 animate-pulse" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-zinc-300 transition-colors">{product.name}</h3>
                                <p className="text-sm text-zinc-400 font-medium mb-6">فئة {product.type || ''}</p>
                                <div className="space-y-3 mb-8 flex-1">
                                    {product.features.map((feat, i) => (
                                        <div key={i} className="flex items-center gap-3 text-zinc-300 text-sm font-medium"><ChevronRight className="w-4 h-4 text-zinc-500" /><span>{feat}</span></div>
                                    ))}
                                </div>
                                <div className="mt-auto pt-6 border-t border-white/10 space-y-3">
                                    <div className="flex items-end justify-center mb-2">
                                        <div className="text-xl font-black text-white bg-white/10 px-4 py-1.5 rounded-xl border border-white/20">{formatPrice(product.price_usd)}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(product);
                                            }} 
                                            className="flex-1 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-white/20"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            إضافة للسلة
                                        </button>
                                        <button onClick={() => setSelectedProduct(product)} className="flex-1 py-2.5 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2">التفاصيل</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    </div>
                </div>
            </div>
            <SpecsModal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} product={selectedProduct} titleIcon={<Monitor className="w-6 h-6 text-white" />} />
        </section>
    );
}
