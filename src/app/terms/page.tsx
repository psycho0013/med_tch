import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                    <div className="w-14 h-14 rounded-2xl bg-brand-light/10 text-brand-dark flex items-center justify-center">
                        <ShieldAlert className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black">شروط الاستخدام</h1>
                        <p className="text-slate-500 font-medium mt-1">آخر تحديث: {new Date().toLocaleDateString("ar-IQ")}</p>
                    </div>
                </div>

                <div className="prose prose-slate prose-lg prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed max-w-none">
                    <h2>1. مقدمة</h2>
                    <p>
                        مرحباً بك في منصة TechCompare IQ. باستخدامك لموقعنا، فإنك توافق على الالتزام بشروط الاستخدام الموضحة أدناه.
                        الرجاء قراءتها بعناية قبل البدء في استخدام خدماتنا.
                    </p>

                    <h2>2. طبيعة الخدمة</h2>
                    <p>
                        يوفر الموقع معلومات تقنية ومقارنات أسعار حول الأجهزة الذكية المختلفة (هواتف، لابتوبات، شاشات، الخ).
                        نحن لسنا متجراً إلكترونياً ولا نبيع الأجهزة مباشرة، بل نوفر بيانات لغرض الإرشاد والمساعدة في اتخاذ قرار الشراء.
                    </p>

                    <h2>3. دقة المعلومات</h2>
                    <p>
                        نسعى جاهدين لتوفير أسعار دقيقة ومحدثة ومواصفات تقنية صحيحة، ولكن لا نضمن خلوها التام من الأخطاء المطبعية أو التقنية.
                        أسعار السوق تتغير باستمرار، والأسعار المكتوبة (خصوصاً بالدينار العراقي) هي أسعار تقريبية مبنية على سعر صرف تقديري.
                    </p>

                    <h2>4. إخلاء المسؤولية</h2>
                    <p>
                        الموقع غير مسؤول عن أي ضرر مباشر أو غير مباشر ينتج عن الاعتماد على المعلومات المتوفرة فيه.
                        عملية الشراء تتم خارج مسؤوليتنا وبناءً على اختيار المستخدم الخاص.
                    </p>

                    <h2>5. التعديل على الشروط</h2>
                    <p>
                        نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق. يُعتبر الاستمرار في استخدام الموقع بعد التعديلات موافقة منك عليها.
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                    <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors">
                        العودة للصفحة الرئيسية
                    </Link>
                </div>
            </div>
        </div>
    );
}
