"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCurrency } from "./CurrencyContext";
import { useCart } from "@/lib/CartContext";
import { ChevronLeft, ChevronRight, Tag, ShoppingCart, Percent, Zap } from "lucide-react";
import type { Product } from "@/lib/types";
import SpecsModal from "./SpecsModal";

export default function OffersSectionClient({ products }: { products: Product[] }) {
    const { formatPrice } = useCurrency();
    const { addToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    if (products.length === 0) return null;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section id="offers" className="py-20 relative z-10 bg-[#000000] overflow-hidden border-t border-brand-dark/20">
            {/* Mind-Blowing Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none flex items-center justify-center opacity-[0.03]">
                <span className="text-[20vw] font-black tracking-tighter text-white whitespace-nowrap">OFFERS</span>
            </div>
            <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-red-600/20 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 text-sm font-bold mb-4 border border-red-500/30 backdrop-blur-md">
                            <Zap className="w-4 h-4 text-red-500" /> عروض حصرية ومؤقتة
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
                            أسعار <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">لا تقبل المنافسة</span>
                        </h2>
                        <p className="text-zinc-400 font-medium text-lg lg:text-xl">اغتنم الفرصة الآن، خصومات ضخمة على أفضل التجميعات والقطع التقنية لفترة محدودة جداً.</p>
                    </div>
                </div>

                <div className="relative group/carousel">
                    {/* Navigation Arrows */}
                    <button onClick={() => scroll('right')} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 hover:bg-white/10 transition-all duration-300 shadow-2xl hover:scale-110">
                        <ChevronRight className="w-7 h-7" />
                    </button>
                    <button onClick={() => scroll('left')} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 hover:bg-white/10 transition-all duration-300 shadow-2xl hover:scale-110">
                        <ChevronLeft className="w-7 h-7" />
                    </button>

                    <div ref={scrollContainerRef} className="flex overflow-x-auto gap-8 pb-10 pt-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {products.map((product, index) => {
                            // Calculate Discount
                            const currentPrice = product.price_usd;
                            const originalPrice = product.original_price_usd;
                            let discountPercent = 0;
                            if (originalPrice && originalPrice > currentPrice) {
                                discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
                            }

                            return (
                                <motion.div key={product.id} onClick={() => setSelectedProduct(product)} initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                                    className="w-[85vw] sm:w-[320px] md:w-[380px] max-w-[420px] snap-start shrink-0 relative rounded-[2rem] bg-[#0a0a0a] border border-white/5 overflow-hidden group cursor-pointer hover:shadow-[0_0_50px_rgba(220,38,38,0.15)] hover:border-red-500/30 transition-all duration-500 flex flex-col h-full"
                                >
                                    {/* Glassmorphic Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                                    {/* Image Container */}
                                    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#111111] to-[#0a0a0a] flex items-center justify-center p-8 overflow-hidden z-10 border-b border-white/5 group-hover:border-red-500/20 transition-colors">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
                                        
                                        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                                            {discountPercent > 0 && (
                                                <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-black shadow-lg shadow-red-500/30 flex items-center gap-1">
                                                    خصم {discountPercent} <Percent className="w-3 h-3" />
                                                </div>
                                            )}
                                            {product.offer_discount && (
                                                <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md text-white text-xs font-bold shadow-sm border border-white/20">
                                                    {product.offer_discount}
                                                </div>
                                            )}
                                        </div>

                                        {product.image_url ? (
                                            <img src={product.image_url} alt={product.name} className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-700 ease-out" />
                                        ) : (
                                            <Tag className="w-24 h-24 text-zinc-800" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col z-10 relative">
                                        <div className="mb-4">
                                            <p className="text-xs text-red-400 font-bold mb-1 tracking-wider uppercase">{product.brand}</p>
                                            <h3 className="text-xl font-black text-white leading-tight mb-2 group-hover:text-red-100 transition-colors">{product.name}</h3>
                                        </div>

                                        <div className="flex-1"></div>

                                        {/* Price & Action */}
                                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                {originalPrice && originalPrice > currentPrice && (
                                                    <span className="text-sm font-medium text-zinc-500 line-through decoration-red-500/50 decoration-2">
                                                        {formatPrice(originalPrice)}
                                                    </span>
                                                )}
                                                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300">
                                                    {formatPrice(product.price_usd)}
                                                </span>
                                            </div>
                                            
                                            <div className="flex gap-2">
                                                <button onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }} className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-colors">
                                                    التفاصيل
                                                </button>
                                                <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="p-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95">
                                                    <ShoppingCart className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {selectedProduct && <SpecsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} isOpen={!!selectedProduct} />}
        </section>
    );
}
