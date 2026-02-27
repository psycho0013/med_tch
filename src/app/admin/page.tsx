"use client";

import { useState } from "react";
import {
    LayoutDashboard, Smartphone, Apple, Laptop, Monitor, Tv, Mouse,
    Zap, Settings, Type, Package
} from "lucide-react";
import ProductsManager from "./components/ProductsManager";
import HeroEditor from "./components/HeroEditor";
import SettingsEditor from "./components/SettingsEditor";
import OffersAdmin from "./components/OffersAdmin";
import type { ProductCategory } from "@/lib/types";

type AdminView = ProductCategory | "hero" | "settings" | "dashboard" | "offers";

const sidebarItems: { key: AdminView; label: string; icon: React.ReactNode }[] = [
    { key: "dashboard", label: "لوحة التحكم", icon: <LayoutDashboard className="w-5 h-5" /> },
    { key: "android", label: "هواتف أندرويد", icon: <Smartphone className="w-5 h-5" /> },
    { key: "ios", label: "هواتف آيفون", icon: <Apple className="w-5 h-5" /> },
    { key: "laptops", label: "لابتوبات", icon: <Laptop className="w-5 h-5" /> },
    { key: "pcs", label: "تجميعات PC", icon: <Monitor className="w-5 h-5" /> },
    { key: "monitors", label: "شاشات", icon: <Tv className="w-5 h-5" /> },
    { key: "accessories", label: "إكسسوارات", icon: <Mouse className="w-5 h-5" /> },
    { key: "offers", label: "العروض", icon: <Zap className="w-5 h-5" /> },
    { key: "hero", label: "قسم الهيرو", icon: <Type className="w-5 h-5" /> },
    { key: "settings", label: "إعدادات الموقع", icon: <Settings className="w-5 h-5" /> },
];

export default function AdminPage() {
    const [activeView, setActiveView] = useState<AdminView>("dashboard");

    return (
        <div className="min-h-screen bg-slate-50 flex" dir="rtl">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-l border-slate-200 shadow-sm flex flex-col fixed h-full z-40">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
                        <Package className="w-6 h-6 text-brand-dark" />
                        لوحة التحكم
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">TechCompare IQ CMS</p>
                </div>

                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => setActiveView(item.key)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeView === item.key
                                ? "bg-brand-dark text-white shadow-md"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <a href="/" className="block w-full text-center py-2 px-4 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-colors">
                        العودة للموقع ←
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 mr-64 p-8">
                {activeView === "dashboard" && <DashboardHome onNavigate={setActiveView} />}
                {activeView === "hero" && <HeroEditor />}
                {activeView === "settings" && <SettingsEditor />}
                {activeView === "offers" && <OffersAdmin />}
                {["android", "ios", "laptops", "pcs", "monitors", "accessories"].includes(activeView) && (
                    <ProductsManager category={activeView as ProductCategory} />
                )}
            </main>
        </div>
    );
}

// ================ Dashboard Home ================
function DashboardHome({ onNavigate }: { onNavigate: (v: AdminView) => void }) {
    const categories: { key: ProductCategory; label: string; icon: React.ReactNode; color: string }[] = [
        { key: "android", label: "هواتف أندرويد", icon: <Smartphone className="w-8 h-8" />, color: "from-emerald-500 to-emerald-600" },
        { key: "ios", label: "هواتف آيفون", icon: <Apple className="w-8 h-8" />, color: "from-slate-700 to-slate-800" },
        { key: "laptops", label: "لابتوبات", icon: <Laptop className="w-8 h-8" />, color: "from-blue-500 to-blue-600" },
        { key: "pcs", label: "تجميعات PC", icon: <Monitor className="w-8 h-8" />, color: "from-purple-500 to-purple-600" },
        { key: "monitors", label: "شاشات", icon: <Tv className="w-8 h-8" />, color: "from-indigo-500 to-indigo-600" },
        { key: "accessories", label: "إكسسوارات", icon: <Mouse className="w-8 h-8" />, color: "from-slate-500 to-slate-600" },
    ];

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900">مرحباً بك في لوحة التحكم 👋</h2>
                <p className="text-slate-500 font-medium mt-2">أدِر كل محتويات موقع TechCompare IQ من مكان واحد.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <button
                        key={cat.key}
                        onClick={() => onNavigate(cat.key)}
                        className="group p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-xl hover:border-transparent transition-all text-right"
                    >
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            {cat.icon}
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">{cat.label}</h3>
                        <p className="text-sm text-slate-500 mt-1">إدارة المنتجات</p>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <button onClick={() => onNavigate("hero")} className="p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-all text-right flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white flex items-center justify-center">
                        <Type className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">تعديل الهيرو</h3>
                        <p className="text-sm text-slate-500">العنوان الرئيسي والوصف</p>
                    </div>
                </button>
                <button onClick={() => onNavigate("settings")} className="p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-all text-right flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center">
                        <Settings className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">إعدادات الموقع</h3>
                        <p className="text-sm text-slate-500">الاسم والوصف العام</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
