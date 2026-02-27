import { LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <LockKeyhole className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black">سياسة الخصوصية</h1>
                        <p className="text-slate-500 font-medium mt-1">آخر تحديث: {new Date().toLocaleDateString("ar-IQ")}</p>
                    </div>
                </div>

                <div className="prose prose-slate prose-lg prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed max-w-none">
                    <h2>1. جمع المعلومات</h2>
                    <p>
                        نحن في TechCompare IQ نحترم خصوصيتك. الموقع لا يطلب منك إنشاء حساب للمستخدم العادي ولا نقوم بجمع معلومات شخصية حساسة مثل الأسماء أو أرقام الهواتف لتصفح الموقع.
                    </p>

                    <h2>2. ملفات تعريف الارتباط (Cookies)</h2>
                    <p>
                        قد نستخدم ملفات تعريف الارتباط وتقنيات تتبع مشابهة (مثل Google Analytics) لتحسين تجربة المستخدم ومعرفة الصفحات الأكثر زيارة.
                        كما يتم استخدامها لحفظ تفضيلاتك (مثل اختيار عرض السعر بالدولار أو الدينار العراقي).
                    </p>

                    <h2>3. مشاركة البيانات</h2>
                    <p>
                        نحن لا نبيع، أو نؤجر، أو نشارك أي بيانات تعريفية لمستخدمينا مع جهات خارجية لأغراض تسويقية.
                        قد يتم مشاركة البيانات الإحصائية المجمعة (غير المعرفة) مع شركائنا لفهم سلوك الزوار بشكل عام.
                    </p>

                    <h2>4. الروابط الخارجية</h2>
                    <p>
                        قد يحتوي موقعنا على روابط لمواقع أو متاجر خارجية. نحن لسنا مسؤولين عن ممارسات الخصوصية بتلك المواقع،
                        وننصحك بقراءة سياسة الخصوصية الخاصة بها بمجرد انتقالك إليها.
                    </p>

                    <h2>5. الاتصال بنا</h2>
                    <p>
                        إذا كانت لديك أي أسئلة أو استفسارات بخصوص سياسة الخصوصية هذه، يمكنك التواصل معنا عبر حساباتنا الرسمية الظاهرة في أسفل الصفحة الرئيسية.
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
