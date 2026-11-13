import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, BookOpen, ShieldCheck } from 'lucide-react';
import { NASA_SOURCES } from '../../data/sources';
import { marsAudio } from '../../utils/audio';

interface NasaSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const cardCrops = [
  './assets/scenes/10_NASA_Sources/08_Source_Card_Opportunity_Mission_Crop.png',
  './assets/scenes/10_NASA_Sources/09_Source_Card_Berry_Bowl_Image_Crop.png',
  './assets/scenes/10_NASA_Sources/10_Source_Card_Berry_Bowl_Empty_Comparison_Crop.png',
  './assets/scenes/10_NASA_Sources/11_Source_Card_Opportunity_Tools_Crop.png',
  './assets/scenes/10_NASA_Sources/12_Source_Card_Oppy_Last_Message_Crop.png',
];

export const NasaSourcesModal: React.FC<NasaSourcesModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2A1810]/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto parchment-panel p-5 sm:p-8 border-3 border-[#C89658] rounded-3xl shadow-2xl text-[#2A1810]"
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
            <div className="flex items-center gap-3 mb-5 border-b border-[#C89658]/30 pb-3">
              <div className="p-3 rounded-2xl bg-[#713D43] border border-[#E7B875] text-[#FFFDF9] shadow-md">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-[#A95743] font-bold tracking-wider">
                  التوثيق العلمي الرسمي
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#713D43] font-cairo">
                  مصادر وكالة ناسا المعتمدة (NASA Sources)
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#451B20] font-semibold mb-5 leading-relaxed">
              جميع الحقائق العلمية، صور الصخور، وقراءات مطياف موسباور في هذه التجربة مستندة إلى بيانات وكالة ناسا ومختبر الدفع النفاث (JPL):
            </p>

            {/* Sources List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-5">
              {NASA_SOURCES.map((source, idx) => (
                <div
                  key={source.id}
                  className="p-3.5 rounded-2xl bg-[#FFF9F0] border-2 border-[#C89658] shadow-sm flex flex-col justify-between hover:border-[#A95743] transition-colors"
                >
                  <div className="flex gap-3 items-start">
                    <img
                      src={cardCrops[idx] || cardCrops[0]}
                      alt={source.titleAr}
                      className="w-16 h-16 rounded-xl object-cover bg-[#F5E8D0] border border-[#C89658]/50 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-[#A95743] font-mono block">
                        {source.badge}
                      </span>
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#713D43] mb-1 leading-snug">
                        {source.titleAr}
                      </h4>
                      <p className="text-[11px] text-[#451B20] font-medium leading-relaxed line-clamp-2">
                        {source.descriptionAr}
                      </p>
                    </div>
                  </div>

                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => marsAudio.playClick()}
                    className="mt-3 py-1.5 px-3 rounded-xl bg-[#F5E8D0] hover:bg-[#EBD8B8] border border-[#C89658] text-[#713D43] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>فتح رابط المصدر الأصلي من ناسا</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

            {/* Scientific Disclaimer */}
            <div className="p-3 rounded-2xl bg-[#E7B875]/25 border border-[#C89658] flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-[#A95743] shrink-0" />
              <p className="text-[11px] sm:text-xs text-[#451B20] font-bold">
                إخلاء مسؤولية علمي: المعلومات العلمية موثقة رسمياً من ناسا؛ صوت أوبي في القصة تمثيل سردي ملهم للأطفال.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#A95743] to-[#713D43] text-[#FFFDF9] font-bold text-xs sm:text-sm shadow-lg hover:from-[#B66F70] hover:to-[#A95743] transition-all"
            >
              إغلاق نافذة المصادر
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
