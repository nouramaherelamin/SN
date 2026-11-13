import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Lock, ShieldCheck } from 'lucide-react';
import { marsAudio } from '../../utils/audio';

interface EvidenceDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  evidence: {
    berriesObserved: boolean;
    hematiteMeasured: boolean;
    ancientWaterSupported: boolean;
  };
}

export const EvidenceDrawerModal: React.FC<EvidenceDrawerModalProps> = ({
  isOpen,
  onClose,
  evidence,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A1810]/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            className="relative w-full max-w-2xl parchment-panel p-6 sm:p-8 border-3 border-[#C89658] rounded-3xl shadow-2xl text-[#2A1810]"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Close */}
            <button
              onClick={() => {
                marsAudio.playClick();
                onClose();
              }}
              className="absolute top-4 left-4 p-2 rounded-full bg-[#FFF9F0] border border-[#C89658] text-[#713D43] hover:bg-[#F5E8D0] shadow-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-[#C89658]/30 pb-4">
              <div className="p-3 rounded-2xl bg-[#713D43] border border-[#E7B875] text-[#FFFDF9] shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-[#A95743] font-bold tracking-wider">
                  حقيبة الأدلة الميدانية للمحقق
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#713D43] font-cairo">
                  ملف قضية وعاء التوت (Eagle Crater)
                </h3>
              </div>
            </div>

            {/* Evidence items */}
            <div className="space-y-3 mb-6">
              {/* Evidence 1 */}
              <div
                className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                  evidence.berriesObserved
                    ? 'bg-[#FFF9F0] border-[#C89658] shadow-sm'
                    : 'bg-[#F5E8D0]/50 border-[#C89658]/30 opacity-60'
                }`}
              >
                <div className="mt-0.5">
                  {evidence.berriesObserved ? (
                    <CheckCircle className="w-5 h-5 text-green-700" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-dashed border-[#C89658]" />
                  )}
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-[#713D43]">
                    1. الدليل البصري: حبات التوت الكروية
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#451B20] font-medium mt-0.5">
                    {evidence.berriesObserved
                      ? 'تمت الملاحظة والتكبير: حبيبات كروية مدمجة في صخور فوهة النسر التقطتها كاميرا البانوراما (Pancam).'
                      : 'قيد الاكتشاف في المشهد الأول...'}
                  </p>
                </div>
              </div>

              {/* Evidence 2 */}
              <div
                className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                  evidence.hematiteMeasured
                    ? 'bg-[#FFF9F0] border-[#C89658] shadow-sm'
                    : 'bg-[#F5E8D0]/50 border-[#C89658]/30 opacity-60'
                }`}
              >
                <div className="mt-0.5">
                  {evidence.hematiteMeasured ? (
                    <CheckCircle className="w-5 h-5 text-green-700" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-dashed border-[#C89658]" />
                  )}
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-[#713D43]">
                    2. القياس الطيفي: معدن الهيماتيت
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#451B20] font-medium mt-0.5">
                    {evidence.hematiteMeasured
                      ? 'تم القياس بمطياف موسباور: تركيز استثنائي للهيماتيت في صخرة Berry Bowl مقارنة بتربة Empty المجاورة.'
                      : 'قيد القياس في مشهد فحص الأدوات والمقارنة...'}
                  </p>
                </div>
              </div>

              {/* Evidence 3 */}
              <div
                className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                  evidence.ancientWaterSupported
                    ? 'bg-[#E7B875]/35 border-[#E7B875] shadow-sm'
                    : 'bg-[#F5E8D0]/50 border-[#C89658]/30 opacity-60'
                }`}
              >
                <div className="mt-0.5">
                  {evidence.ancientWaterSupported ? (
                    <CheckCircle className="w-5 h-5 text-green-700" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-dashed border-[#C89658]" />
                  )}
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-[#713D43]">
                    3. الاستنتاج المحكم: تاريخ تفاعل مائي قديم
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#451B20] font-medium mt-0.5">
                    {evidence.ancientWaterSupported
                      ? 'استنتاج مثبت: تشكل هذه الحبيبات والهيماتيت المترسب يؤكد وجود ماء سائل قديم تفاعل مع الصخور في هذا الموقع.'
                      : 'قيد الاستنتاج في مشهد استنتاج المحقق...'}
                  </p>
                </div>
              </div>

              {/* Locked 4 */}
              <div className="p-3.5 rounded-2xl border border-gray-400/40 bg-gray-200/50 opacity-70 flex items-start gap-3">
                <Lock className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-gray-700">
                    4. اكتشاف كائنات حية على المريخ (غير مدعوم)
                  </h4>
                  <p className="text-[11px] text-gray-600 font-medium mt-0.5">
                    تنبيه علمي صارم: الهيماتيت مركب غير عضوي؛ الأدلة تثبت الماء القديم فقط ولا تثبت وجود حياة.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#A95743] to-[#713D43] text-[#FFFDF9] font-bold text-xs sm:text-sm shadow-lg hover:from-[#B66F70] hover:to-[#A95743] transition-all"
            >
              إغلاق ملف الأدلة
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
