"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCurrency } from "./CurrencyContext";
import { Cpu, Monitor, ChevronLeft, Star, HardDrive, Laptop } from "lucide-react";
import SpecsModal from "./SpecsModal";
import type { Product } from "@/lib/types";
import Link from "next/link";

export default function LaptopsSectionClient({ products }: { products: Product[] }) {
    const { formatPrice } = useCurrency();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    if (products.length === 0) return null;

    return (
        <section id="laptops" className="py-16 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-3 border border-blue-200 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> لابتوبات
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2">اقوى <span className="text-blue-600">اللابتوبات</span> لجميع الاستخدامات</h2>
                        <p className="text-slate-500 font-medium text-lg">أجهزة للقيمنق، المونتاج، العمل والدراسة من أبل وباقي الشركات.</p>
                    </div>
                    <Link href="/category/laptops" className="relative overflow-hidden flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl border border-blue-200 transition-all shadow-sm group">
                        <span className="absolute inset-0 w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
                        <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                            تصفح اللابتوبات <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 inline-block transition-transform duration-300" />
                        </span>
                    </Link>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -5, scale: 1.02 }}
                            className="glass-panel rounded-3xl p-5 relative group overflow-hidden border border-slate-200 bg-white hover:shadow-xl hover:border-blue-300 transition-all flex flex-col h-full">
                            <div className="absolute top-4 right-4 z-10 px-2 py-1 rounded-md bg-white/80 text-blue-700 text-xs font-bold shadow-sm backdrop-blur-md border border-slate-100">{product.tag}</div>
                            <div className={`w-full aspect-[4/3] rounded-2xl ${product.bg_color} mb-5 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                                <div className="w-4/5 h-3/5 bg-slate-900 rounded-lg shadow-md border-4 border-slate-300 flex flex-col items-center justify-center relative">
                                    <div className="text-white/20 text-2xl font-black">{product.brand}</div>
                                    <div className="absolute -bottom-2 w-[120%] h-3 bg-slate-400 rounded-b-xl shadow-lg"></div>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <div><h3 className="text-lg font-bold text-slate-800 line-clamp-1">{product.name}</h3><p className="text-xs text-slate-500 font-medium">{product.brand}</p></div>
                                    <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-1.5 py-0.5 rounded text-xs font-bold border border-yellow-100"><Star className="w-3 h-3 fill-current" /> {product.rating}</div>
                                </div>
                                <div className="space-y-2 my-4 flex-1">
                                    {[Cpu, Monitor, HardDrive].map((Icon, i) => product.features[i] && (
                                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                                            <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" /> <span className="line-clamp-1">{product.features[i]}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-3 border-t border-slate-100 mt-auto space-y-3">
                                    <div className="flex items-end justify-center">
                                        <div className="text-xl font-black text-brand-dark bg-brand-light/10 px-4 py-1.5 rounded-xl border border-brand-light/20">{formatPrice(product.price_usd)}</div>
                                    </div>
                                    <button onClick={() => setSelectedProduct(product)} className="w-full py-2 rounded-xl bg-slate-50 text-blue-700 border border-blue-100 font-bold text-xs hover:bg-blue-50 hover:border-blue-200 transition-colors flex items-center justify-center">تفاصيل المواصفات</button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <SpecsModal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} product={selectedProduct} titleIcon={<Laptop className="w-6 h-6 text-blue-600" />} />
        </section>
    );
}
