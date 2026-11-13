import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BookOpen, RotateCcw, ArrowLeft, ArrowRight, Eye, Activity, Award } from 'lucide-react';
import { STORY_TEXTS } from '../../data/storyContent';
import { marsAudio } from '../../utils/audio';
import { DustOverlay } from '../../components/Effects/DustOverlay';

interface EvidenceReviewProps {
  evidenceItems: {
    berriesObserved: boolean;
    hematiteMeasured: boolean;
    ancientWaterSupported: boolean;
  };
  onOpenSources: () => void;
  onContinue: () => void;
  onRestart: () => void;
}

export const EvidenceReview: React.FC<EvidenceReviewProps> = ({
  evidenceItems,
  onOpenSources,
  onContinue,
  onRestart,
}) => {
  const t = STORY_TEXTS.evidenceReview;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden text-[#2A1810] pt-16 pb-20 px-3 sm:px-6">
      {/* LAYER 01: Full Illustrated Mars Landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/scenes/09_Evidence_Review/00_Original_Scene_Reference.png"
          alt="مراجعة ملف الأدلة الجنائية"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/35 via-transparent to-[#2A1810]/25 pointer-events-none" />
        <DustOverlay intensity="low" />
      </div>

      {/* LAYER 02: Characters */}
      {/* Child Astronaut on the left reviewing dossier */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-2 xl:left-6 bottom-8 z-20 w-64 xl:w-76 pointer-events-none filter drop-shadow-[0_15px_30px_rgba(40,15,10,0.6)]"
      >
        <img
          src="./assets/scenes/09_Evidence_Review/01_Child_Astronaut_Transparent_APPROX.png"
          alt="رائدة الفضاء تدقق في ملف الأدلة"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Distant Oppy Rover */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-[38%] top-[34%] z-10 w-52 xl:w-60 pointer-events-none opacity-85 filter drop-shadow-[0_10px_20px_rgba(40,15,10,0.5)]"
      >
        <img
          src="./assets/scenes/09_Evidence_Review/04_Oppy_Rover_Distant_Crop.png"
          alt="أوبي في الأفق"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* LAYER 03 & 04: Content & The Three Evidence Dossier Cards */}
      <div className="relative z-20 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center gap-4 my-auto" dir="rtl">
        {/* Header Parchment */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="parchment-panel p-4 sm:p-5 text-center shadow-xl border-2 border-[#C89658]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#713D43] text-[#F6EBDD] text-xs font-bold mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E7B875]" />
            <span>ملف القضية 07 • خلاصة التحقيق العلمي الجنائي</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-cairo text-[#713D43]">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#451B20] font-bold mt-1">
            {t.subtitle}
          </p>
        </motion.div>

        {/* 3 Evidence Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Evidence 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="parchment-panel p-4 flex flex-col justify-between shadow-xl border-2 border-[#C89658]"
          >
            <div>
              <div className="w-full h-32 rounded-xl overflow-hidden mb-3 border border-[#C89658]/40 bg-[#FFF9F0]">
                <img
                  src="./assets/scenes/09_Evidence_Review/06_Evidence_Card_Berries_Crop.png"
                  alt="بطاقة حبات التوت"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="text-[11px] font-bold text-[#A95743] mb-1 font-mono">
                {t.items[0].type}
              </div>
              <h3 className="text-sm font-extrabold text-[#713D43] mb-2">
                {t.items[0].title}
              </h3>
              <p className="text-xs text-[#451B20] font-semibold leading-relaxed">
                {t.items[0].summary}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#C89658]/30 flex items-center gap-1.5 text-xs font-bold text-green-800">
              <span className="w-2 h-2 rounded-full bg-green-600" />
              <span>تم توثيقه بكاميرا Pancam</span>
            </div>
          </motion.div>

          {/* Evidence 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="parchment-panel p-4 flex flex-col justify-between shadow-xl border-2 border-[#C89658]"
          >
            <div>
              <div className="w-full h-32 rounded-xl overflow-hidden mb-3 border border-[#C89658]/40 bg-[#FFF9F0]">
                <img
                  src="./assets/scenes/09_Evidence_Review/07_Evidence_Card_Hematite_Crop.png"
                  alt="بطاقة قياس الهيماتيت"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="text-[11px] font-bold text-[#C85A32] mb-1 font-mono">
                {t.items[1].type}
              </div>
              <h3 className="text-sm font-extrabold text-[#713D43] mb-2">
                {t.items[1].title}
              </h3>
              <p className="text-xs text-[#451B20] font-semibold leading-relaxed">
                {t.items[1].summary}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#C89658]/30 flex items-center gap-1.5 text-xs font-bold text-green-800">
              <span className="w-2 h-2 rounded-full bg-green-600" />
              <span>تم قياسه بمطياف Mössbauer</span>
            </div>
          </motion.div>

          {/* Evidence 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="parchment-panel p-4 flex flex-col justify-between shadow-xl border-2 border-[#E7B875] bg-[#E7B875]/20"
          >
            <div>
              <div className="w-full h-32 rounded-xl overflow-hidden mb-3 border border-[#C89658]/40 bg-[#FFF9F0]">
                <img
                  src="./assets/scenes/09_Evidence_Review/08_Evidence_Card_Ancient_Water_Crop.png"
                  alt="بطاقة استنتاج الماء القديم"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="text-[11px] font-bold text-[#713D43] mb-1 font-mono">
                {t.items[2].type}
              </div>
              <h3 className="text-sm font-extrabold text-[#713D43] mb-2">
                {t.items[2].title}
              </h3>
              <p className="text-xs text-[#451B20] font-semibold leading-relaxed">
                {t.items[2].summary}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#C89658]/30 flex items-center gap-1.5 text-xs font-bold text-green-800">
              <span className="w-2 h-2 rounded-full bg-green-600" />
              <span>الاستنتاج العلمي المعتمد</span>
            </div>
          </motion.div>
        </div>

        {/* Forensic Disclaimer */}
        <div className="parchment-card-sm p-3 text-center border border-[#C89658] bg-[#FFF9F0]">
          <p className="text-xs sm:text-sm font-extrabold text-[#713D43]">
            {t.disclaimer}
          </p>
        </div>

        {/* Action Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                marsAudio.playClick();
                onOpenSources();
              }}
              className="mars-btn-secondary px-5 py-2.5 text-xs flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#A95743]" />
              <span>مصادر ناسا المعتمدة</span>
            </button>

            <button
              onClick={() => {
                marsAudio.playClick();
                onRestart();
              }}
              className="mars-btn-secondary px-3.5 py-2.5 text-xs flex items-center gap-1"
              title="إعادة من البداية"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              marsAudio.playSuccess();
              onContinue();
            }}
            className="mars-btn-primary px-8 py-3 text-xs sm:text-sm flex items-center gap-2 shadow-xl"
          >
            <span>الانتقال إلى مصادر ناسا المعتمدة</span>
            <ArrowLeft className="w-4 h-4 text-[#E7B875]" />
          </button>
        </div>
      </div>
    </div>
  );
};
