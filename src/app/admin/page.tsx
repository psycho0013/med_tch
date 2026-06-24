"use client";

import { useState } from "react";
import {
    LayoutDashboard, Monitor, Type, Package, Cpu, Tv, Headphones, LogOut
} from "lucide-react";
import ProductsManager from "./components/ProductsManager";
import HeroEditor from "./components/HeroEditor";
import SettingsEditor from "./components/SettingsEditor";
import type { ProductCategory } from "@/lib/types";

type AdminView = ProductCategory | "hero" | "settings" | "dashboard";

const sidebarItems: { key: AdminView; label: string; icon: React.ReactNode }[] = [
    { key: "dashboard", label: "لوحة التحكم", icon: <LayoutDashboard className="w-5 h-5" /> },
    { key: "pcs", label: "تجميعات PC", icon: <Monitor className="w-5 h-5" /> },
    { key: "parts", label: "قطع بي سي (Parts)", icon: <Cpu className="w-5 h-5" /> },
    { key: "monitors", label: "الشاشات", icon: <Tv className="w-5 h-5" /> },
    { key: "accessories", label: "إكسسوارات ومستلزمات", icon: <Headphones className="w-5 h-5" /> },
    { key: "hero", label: "البانر التسويقي", icon: <Type className="w-5 h-5" /> },
    { key: "settings", label: "إعدادات الموقع", icon: <LayoutDashboard className="w-5 h-5" /> },
];

export default function AdminPage() {
    const [activeView, setActiveView] = useState<AdminView>("dashboard");

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/admin/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#000000] flex font-sans" dir="rtl">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0a0a0a] border-l border-white/10 shadow-sm flex flex-col fixed h-full z-40">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-black text-white flex items-center gap-2">
                        <Package className="w-6 h-6 text-brand-light" />
                        لوحة الإدارة
                    </h1>
                    <p className="text-xs text-zinc-500 mt-1">Al-Rwan Center CMS</p>
                </div>

                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => setActiveView(item.key)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeView === item.key
                                ? "bg-white/10 text-brand-light border border-white/20 shadow-sm"
                                : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10 space-y-3">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold hover:bg-red-500/20 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        تسجيل الخروج
                    </button>
                    <a href="/" className="block w-full text-center py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-zinc-400 text-sm font-bold hover:bg-white/10 hover:text-white transition-colors">
                        العودة للموقع ←
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 mr-64 p-8">
                {activeView === "dashboard" && <DashboardHome onNavigate={setActiveView} />}
                {activeView === "hero" && <HeroEditor />}
                {activeView === "settings" && <SettingsEditor />}
                {["pcs", "parts", "monitors", "accessories"].includes(activeView) && (
                    <ProductsManager category={activeView as ProductCategory} />
                )}
            </main>
        </div>
    );
}

// ================ Dashboard Home ================
function DashboardHome({ onNavigate }: { onNavigate: (v: AdminView) => void }) {
    const categories: { key: ProductCategory; label: string; icon: React.ReactNode; color: string }[] = [
        { key: "pcs", label: "تجميعات PC", icon: <Monitor className="w-8 h-8" />, color: "from-purple-500 to-purple-700" },
        { key: "parts", label: "قطع PC المنفصلة", icon: <Cpu className="w-8 h-8" />, color: "from-blue-500 to-blue-700" },
        { key: "monitors", label: "الشاشات", icon: <Tv className="w-8 h-8" />, color: "from-indigo-500 to-indigo-700" },
        { key: "accessories", label: "إكسسوارات ومستلزمات", icon: <Headphones className="w-8 h-8" />, color: "from-slate-500 to-slate-700" },
    ];

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-black text-white">مرحباً بك في لوحة التحكم 👋</h2>
                <p className="text-zinc-400 font-medium mt-2">إدارة جميع المنتجات (تجميعات، قطع، شاشات، وإكسسوارات) والبانر الإعلاني.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {categories.map((cat) => (
                    <button
                        key={cat.key}
                        onClick={() => onNavigate(cat.key)}
                        className="group p-6 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-brand-light/30 transition-all text-right flex flex-col justify-between"
                    >
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                            {cat.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white">{cat.label}</h3>
                            <p className="text-xs text-zinc-500 mt-1 font-medium">إدارة المنتجات والأقسام</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                    onClick={() => onNavigate("hero")} 
                    className="group p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-cyan-300/30 transition-all text-right flex items-center gap-6"
                >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shrink-0 border border-white/10">
                        <Type className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white">البانر التسويقي (الهيرو)</h3>
                        <p className="text-sm text-zinc-400 mt-2 font-medium leading-relaxed">
                            عدل الواجهة الإعلانية، غير النصوص وارفع صورة بدقة كاملة للبانر.
                        </p>
                    </div>
                </button>
            </div>
        </div>
    );
}
