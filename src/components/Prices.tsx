"use client";

import { motion } from "framer-motion";
import { Cpu, Battery, Camera, ChevronLeft, Star } from "lucide-react";

export default function Prices() {
    const products = [
        {
            id: 1,
            name: "iPhone 15 Pro Max",
            brand: "Apple",
            priceUSD: 1199,
            priceIQD: 1850000,
            imagePlaceholder: "bg-slate-800",
            features: ["A17 Pro チip", "Titanium Design", "5x Optical Zoom"],
            rating: 4.9,
            tag: "الأكثر مبيعاً",
        },
        {
            id: 2,
            name: "Galaxy S24 Ultra",
            brand: "Samsung",
            priceUSD: 1299,
            priceIQD: 2000000,
            imagePlaceholder: "bg-brand-dark",
            features: ["Snapdragon 8 Gen 3", "AI Features", "S-Pen Included"],
            rating: 4.8,
            tag: "اختيار الخبراء",
        },
        {
            id: 3,
            name: "MacBook Pro M3",
            brand: "Apple",
            priceUSD: 1599,
            priceIQD: 2470000,
            imagePlaceholder: "bg-slate-600",
            features: ["M3 Pro Chip", "18h Battery", "Liquid Retina XDR"],
            rating: 4.9,
            tag: "للمحترفين",
        },
    ];

    return (
        <section id="phones" className="py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
                            أسعار السوق <span className="text-gradient">المباشرة</span>
                        </h2>
                        <p className="text-slate-500 font-medium text-lg">
                            أحدث الأسعار في السوق العراقي، محدثة يومياً.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 text-brand-dark font-bold hover:gap-3 transition-all">
                        عرض كل الأجهزة <ChevronLeft className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="glass-panel rounded-3xl p-6 relative group overflow-hidden border border-white/60 bg-white/40 cursor-pointer"
                        >
                            {/* Badge */}
                            <div className="absolute top-6 right-6 z-10 px-3 py-1 rounded-full bg-brand-light/20 text-brand-dark text-xs font-bold shadow-sm backdrop-blur-md border border-brand-light/30">
                                {product.tag}
                            </div>

                            {/* Image Placeholder */}
                            <div className={`w-full aspect-square rounded-2xl ${product.imagePlaceholder} bg-opacity-10 mb-6 flex items-center justify-center relative overflow-hidden group-hover:shadow-lg transition-all`}>
                                <div className="w-3/4 h-3/4 bg-gradient-to-tr from-black/5 to-transparent rounded-xl flex items-center justify-center border border-white/20 shadow-inner">
                                    <span className="text-slate-400 font-bold opacity-50">{product.brand} Mockup</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800">{product.name}</h3>
                                        <p className="text-sm text-slate-500 font-medium">{product.brand}</p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md text-xs font-bold">
                                        <Star className="w-3 h-3 fill-current" /> {product.rating}
                                    </div>
                                </div>

                                <div className="flex gap-4 border-y border-slate-200/50 py-4 my-4">
                                    <div className="flex flex-col items-center gap-1 flex-1">
                                        <Cpu className="w-5 h-5 text-slate-400" />
                                        <span className="text-[10px] sm:text-xs text-center text-slate-500 font-medium">{product.features[0]}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 flex-1 border-x border-slate-200/50 px-2">
                                        <Battery className="w-5 h-5 text-slate-400" />
                                        <span className="text-[10px] sm:text-xs text-center text-slate-500 font-medium">{product.features[1]}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 flex-1">
                                        <Camera className="w-5 h-5 text-slate-400" />
                                        <span className="text-[10px] sm:text-xs text-center text-slate-500 font-medium">{product.features[2]}</span>
                                    </div>
                                </div>

                                <div className="flex items-end justify-between pt-2">
                                    <div>
                                        <div className="text-xs text-slate-400 font-medium mb-1">السعر التقريبي</div>
                                        <div className="text-2xl font-black text-brand-dark">
                                            ${product.priceUSD}
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-slate-600">
                                            {product.priceIQD.toLocaleString('ar-IQ')} <span className="text-xs">د.ع</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hover gradient effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-light/0 via-transparent to-brand-light/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
