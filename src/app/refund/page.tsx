import React from "react";

export const metadata = {
    title: "سياسة الاسترجاع والاستبدال | Al-Rwan Center",
    description: "شروط وسياسة الاسترجاع والاستبدال في منصة  مركز الروان.",
};

import BackButton from "@/components/BackButton";

export default function RefundPage() {
    return (
        <div className="pt-24 pb-24 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <BackButton />
                </div>
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-6">
                        سياسة الاسترجاع والاستبدال
                    </h1>
                    
                    <div className="text-slate-600 space-y-6 text-lg leading-relaxed">
                        <p className="font-bold text-slate-800 text-xl">
                            نحن نسعى لضمان رضاك التام عن مشترياتك. إذا واجهت أي مشكلة في القطع أو التجميعات، يرجى قراءة الشروط التالية:
                        </p>
                        
                        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. شروط الاسترجاع العامة</h3>
                        <p>
                            يُسمح باسترجاع المنتجات أو استبدالها خلال (أيام محددة مثلاً: 3 إلى 7 أيام) من تاريخ الاستلام، بشرط أن يكون المنتج في حالته الأصلية، غير مستخدم، وبكامل ملحقاته وداخل غلافه الأصلي دون أي تلف.
                        </p>

                        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. المنتجات المعيبة (الضمان)</h3>
                        <p>
                            في حال استلام منتج يحتوي على عيب مصنعي، يُرجى التواصل معنا فوراً. سيتم فحص القطعة من قبل فنيينا، وفي حال ثبوت العيب المصنعي سيتم استبدالها بقطعة جديدة فوراً بناءً على سياسة الضمان المرفقة مع المنتج.
                        </p>

                        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. التجميعات الخاصة (Custom Builds)</h3>
                        <p>
                            نظراً لطبيعة تجميعات الـ PC التي يتم تركيبها خصيصاً بناءً على طلب الزبون، فإن الاسترجاع الكامل للتجميعة غير ممكن ما لم يكن هناك خلل جوهري في التركيب أو القطع. ومع ذلك، يتمتع الجهاز بضمان شامل على القطع حسب فترة الضمان المحددة لكل قطعة.
                        </p>

                        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. كيفية طلب الاسترجاع أو الاستبدال</h3>
                        <p>
                            لتقديم طلب، يرجى التواصل مع فريق الدعم الفني عبر الواتساب المرفق في أسفل الموقع. ستحتاج إلى تزويدنا برقم الطلب وفيديو أو صورة توضح المشكلة (في حال وجود عيب).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
