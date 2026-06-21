"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, User, Loader2 } from "lucide-react";
import { loginAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const result = await loginAction(formData);

        if (result.success) {
            router.push("/admin");
            onClose(); // Optional, close modal when navigating
            setIsLoading(false);
        } else {
            setError(result.error || "حدث خطأ غير متوقع");
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
                    />
                    <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
                            dir="rtl"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-slate-100">
                                <h2 className="text-xl font-black flex items-center gap-2 text-slate-800">
                                    <Lock className="w-5 h-5 text-brand-dark" />
                                    دخول المسؤول
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 text-center"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        اسم المستخدم
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            name="username"
                                            required
                                            disabled={isLoading}
                                            className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:border-brand-dark focus:ring-2 focus:ring-brand-light/20 transition-all outline-none font-medium"
                                            placeholder="أدخل اسم المستخدم"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        كلمة المرور
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            disabled={isLoading}
                                            className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:border-brand-dark focus:ring-2 focus:ring-brand-light/20 transition-all outline-none font-medium"
                                            placeholder="أدخل كلمة المرور"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 mt-2 bg-gradient-to-r from-brand-dark to-brand-light hover:opacity-90 text-white rounded-xl font-bold shadow-lg shadow-brand-dark/20 transition-all disabled:opacity-70"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            جاري الدخول...
                                        </>
                                    ) : (
                                        "دخول إلى لوحة التحكم"
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
