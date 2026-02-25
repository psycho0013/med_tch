"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tv, ChevronLeft, Star, MonitorPlay, Zap, RefreshCw } from "lucide-react";
import SpecsModal from "./SpecsModal";
import type { Product } from "@/lib/types";

export default function MonitorsSectionClient({ products }: { products: Product[] }) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    if (products.length === 0) return null;

    return (
        <section id="monitors" className="py-20 relative z-10 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold mb-4 border border-indigo-100"><Tv className="w-4 h-4" /> شاشات وتلفزيونات</div>
                        <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">أفضل <span className="text-indigo-600">الشاشات</span> للقيمنق والمشاهدة</h2>
                        <p className="text-slate-600 font-medium text-lg">مهما كان استخدامك (التنافس، التختيم، المونتاج أو المشاهدة)، جمعنا لك أفضل شاشات السوق.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-slate-50 text-indigo-700 font-bold px-6 py-3 rounded-xl border border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200 transition-all shadow-sm">عرض كل الشاشات <ChevronLeft className="w-5 h-5" /></button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -5 }}
                            className="glass-panel rounded-3xl p-5 relative group overflow-hidden border border-slate-200 hover:shadow-2xl hover:border-indigo-300 transition-all bg-white flex flex-col h-full cursor-pointer">
                            <div className="absolute top-4 left-4 z-10 px-2 py-1.5 rounded-md bg-white/90 backdrop-blur-sm text-indigo-700 text-xs font-bold shadow-sm border border-slate-100">{product.tag}</div>
                            <div className={`w-full aspect-[4/3] rounded-2xl ${product.bg_color} mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                                <div className="absolute bottom-4 w-28 h-2 bg-slate-400 rounded-full shadow-lg"></div>
                                <div className="absolute bottom-6 w-4 h-12 bg-slate-500 rounded-t-lg"></div>
                                <div className="w-4/5 aspect-video max-w-[85%] bg-black rounded-lg shadow-2xl border-4 border-slate-300 flex items-center justify-center z-10 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                                    <div className="text-white/30 font-black text-xl tracking-wider">{product.brand}</div>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-3">
                                    <div><h3 className="text-lg font-black text-slate-900 leading-tight mb-1">{product.name}</h3><p className="text-sm text-slate-500 font-medium">{product.type}</p></div>
                                    <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-2 py-1 rounded-md text-xs font-bold border border-yellow-100 shadow-sm shrink-0"><Star className="w-3 h-3 fill-current" /> {product.rating}</div>
                                </div>
                                <div className="space-y-2 mb-5">
                                    {[MonitorPlay, RefreshCw, Zap].map((Icon, i) => product.features[i] && (
                                        <div key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">
                                            <Icon className="w-4 h-4 text-indigo-400 shrink-0" /> <span className="line-clamp-1">{product.features[i]}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-slate-100 mt-auto space-y-4">
                                    <div className="flex items-end justify-between">
                                        <div className="text-2xl font-black text-indigo-600">${product.price_usd}</div>
                                        <div className="text-sm font-bold text-slate-500">{product.price_iqd.toLocaleString('ar-IQ')} <span className="text-[10px]">د.ع</span></div>
                                    </div>
                                    <button onClick={() => setSelectedProduct(product)} className="w-full py-2.5 rounded-xl border-2 border-indigo-100 text-indigo-700 font-bold text-sm hover:bg-indigo-50 hover:border-indigo-200 transition-colors flex items-center justify-center gap-2">التفاصيل التقنية</button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <SpecsModal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} product={selectedProduct} titleIcon={<Tv className="w-6 h-6 text-indigo-600" />} />
        </section>
    );
}
