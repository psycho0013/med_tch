"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, Package, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        if (!password) {
            setError("يرجى إدخال كلمة المرور");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Refresh the page to apply middleware changes and go to admin
                window.location.href = "/admin";
            } else {
                setError(data.error || "كلمة المرور غير صحيحة");
            }
        } catch (err) {
            setError("حدث خطأ في الاتصال بالخادم");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4 font-sans" dir="rtl">
            <div className="w-full max-w-md bg-[#0a0a0a] rounded-3xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">
                {/* Decorative blur */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-light/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="relative z-10">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-16 h-16 bg-[#050505] rounded-2xl flex items-center justify-center border border-white/10 mb-4 shadow-lg">
                            <ShieldCheck className="w-8 h-8 text-brand-light" />
                        </div>
                        <h1 className="text-2xl font-black text-white flex items-center gap-2">
                            <Package className="w-5 h-5 text-zinc-500" />
                            مركز الروان
                        </h1>
                        <p className="text-sm text-zinc-500 font-bold mt-1">تسجيل الدخول للوحة التحكم</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-zinc-400 mb-2">كلمة المرور</label>
                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="أدخل كلمة المرور الخاصة بالمدير..."
                                    className="w-full pl-4 pr-12 py-3.5 rounded-xl border border-white/10 bg-[#000000] text-white focus:outline-none focus:ring-2 focus:ring-brand-light/30 focus:border-brand-light/50 font-medium"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !password}
                            className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-base hover:bg-zinc-200 transition-all shadow-lg shadow-white/10 flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "دخول"}
                        </button>
                        
                        <div className="text-center mt-6">
                            <a href="/" className="text-sm text-zinc-500 hover:text-white transition-colors font-bold">
                                ← العودة للموقع
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
