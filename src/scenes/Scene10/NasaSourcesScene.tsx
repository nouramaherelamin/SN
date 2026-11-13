import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  BookOpen,
  Briefcase,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Layers,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { NASA_SOURCES } from '../../data/sources';
import { STORY_TEXTS } from '../../data/storyContent';
import { marsAudio } from '../../utils/audio';
import { DustOverlay } from '../../components/Effects/DustOverlay';

interface NasaSourcesSceneProps {
  onContinue: () => void;
  onPrev: () => void;
  initialTab?: 'sources' | 'evidence';
  evidenceItems?: {
    berriesObserved: boolean;
    hematiteMeasured: boolean;
    ancientWaterSupported: boolean;
  };
}

const cardCrops = [
  './assets/scenes/10_NASA_Sources/08_Source_Card_Opportunity_Mission_Crop.png',
  './assets/scenes/10_NASA_Sources/09_Source_Card_Berry_Bowl_Image_Crop.png',
  './assets/scenes/10_NASA_Sources/10_Source_Card_Berry_Bowl_Empty_Comparison_Crop.png',
  './assets/scenes/10_NASA_Sources/11_Source_Card_Opportunity_Tools_Crop.png',
  './assets/scenes/10_NASA_Sources/12_Source_Card_Oppy_Last_Message_Crop.png',
];

export const NasaSourcesScene: React.FC<NasaSourcesSceneProps> = ({
  onContinue,
  onPrev,
  initialTab = 'sources',
  evidenceItems = { berriesObserved: true, hematiteMeasured: true, ancientWaterSupported: true },
}) => {
  const [activeTab, setActiveTab] = useState<'sources' | 'evidence'>(initialTab);
  const tReview = STORY_TEXTS.evidenceReview;

  const handleTabChange = (tab: 'sources' | 'evidence') => {
    setActiveTab(tab);
    marsAudio.playClick();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden text-[#2A1810] pt-16 pb-20 px-3 sm:px-6">
      {/* LAYER 01: Full Clean Illustrated Mars Landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/scenes/03_Scene_02_Who_is_Oppy/Background.png"
          alt="خلفية مصادر ناسا والأدلة"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/45 via-transparent to-[#2A1810]/30 pointer-events-none" />
        <DustOverlay intensity="low" />
      </div>

      {/* LAYER 02: Characters */}
      {/* Child Astronaut sitting with research notebook on the left */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-2 bottom-8 z-20 w-64 xl:w-76 pointer-events-none filter drop-shadow-[0_15px_30px_rgba(40,15,10,0.6)]"
      >
        <img
          src="./assets/scenes/10_NASA_Sources/01_Child_Astronaut_Transparent_APPROX.png"
          alt="رائدة الفضاء تدقق في المصادر والأدلة"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Oppy Rover on the right horizon */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute right-4 top-24 z-10 w-52 xl:w-60 pointer-events-none opacity-90 filter drop-shadow-[0_10px_20px_rgba(40,15,10,0.5)]"
      >
        <img
          src="./assets/scenes/10_NASA_Sources/02_Oppy_Rover_Right_Transparent_APPROX.png"
          alt="مركبة أوبي على الأفق"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* LAYER 03 & 04: Content & Interactive Tabs */}
      <div className="relative z-20 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center gap-3.5 my-auto" dir="rtl">
        {/* Header Title Parchment with Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="parchment-panel p-4 sm:p-5 text-center shadow-2xl border-2 border-[#C89658]"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#713D43] text-[#F6EBDD] text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#E7B875]" />
            <span>المشهد 10 • التوثيق الرسمي ومراجعة الأدلة العلمية</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-cairo text-[#713D43]">
            {activeTab === 'sources' ? 'مصادر ناسا العلمية المعتمدة' : 'مراجعة ملف الأدلة الجنائية للمريخ'}
          </h2>

          <p className="text-xs sm:text-sm text-[#451B20] font-bold mt-1">
            {activeTab === 'sources'
              ? 'جميع الأدلة، الصور، والقياسات الفيزيائية في هذه القصة مستندة إلى بيانات وكالة ناسا ومختبر JPL'
              : 'كل ما توصل إليه التحقيق العلمي خطوة بخطوة بالاستناد إلى كاميرا Pancam ومطياف Mössbauer'}
          </p>

          {/* Interactive Dual-Tab Switcher */}
          <div className="mt-3.5 inline-flex p-1 rounded-2xl bg-[#F5E8D0] border-2 border-[#C89658]">
            <button
              onClick={() => handleTabChange('sources')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'sources'
                  ? 'bg-[#713D43] text-[#FFFDF9] shadow-md scale-102'
                  : 'text-[#713D43] hover:bg-[#EBD8B8]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#E7B875]" />
              <span>مصادر ناسا الرسمية (NASA Sources)</span>
            </button>

            <button
              onClick={() => handleTabChange('evidence')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'evidence'
                  ? 'bg-[#713D43] text-[#FFFDF9] shadow-md scale-102'
                  : 'text-[#713D43] hover:bg-[#EBD8B8]'
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#E7B875]" />
              <span>ملف مراجعة الأدلة (Evidence Dossier)</span>
            </button>
          </div>
        </motion.div>

        {/* TAB 1: NASA Sources */}
        <AnimatePresence mode="wait">
          {activeTab === 'sources' && (
            <motion.div
              key="sources-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {/* 5 Source Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {NASA_SOURCES.map((source, idx) => (
                  <motion.div
                    key={source.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className="parchment-panel p-3 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200 border-2 border-[#C89658] group shadow-lg"
                  >
                    <div>
                      {/* Visual crop header */}
                      <div className="w-full h-24 rounded-xl overflow-hidden mb-2 border border-[#C89658]/40 bg-[#3D1E1A]/10 flex items-center justify-center">
                        <img
                          src={cardCrops[idx] || cardCrops[0]}
                          alt={source.titleAr}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="text-[10px] font-bold text-[#A95743] mb-1 font-mono">
                        {source.badge}
                      </div>
                      <h3 className="text-xs font-extrabold text-[#713D43] mb-1 leading-snug line-clamp-2">
                        {source.titleAr}
                      </h3>
                      <p className="text-[10px] text-[#451B20] font-medium leading-relaxed line-clamp-3">
                        {source.descriptionAr}
                      </p>
                    </div>

                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => marsAudio.playClick()}
                      className="mt-2.5 w-full py-1.5 px-2 rounded-xl bg-gradient-to-r from-[#A95743] to-[#713D43] hover:from-[#B66F70] hover:to-[#A95743] text-[#FFFDF9] text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                    >
                      <span>زيارة المصدر المعتمد</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Scientific Disclaimer Banner */}
              <div className="parchment-card-sm p-2.5 text-center border border-[#C89658]/60 bg-[#FFF9F0]/95 shadow-sm">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#713D43]">
                  <ShieldCheck className="w-4 h-4 text-[#A95743] shrink-0" />
                  <span>
                    إخلاء مسؤولية علمي: المعلومات العلمية وصور الصخور موثقة رسميًا؛ صوت أوبي في القصة تمثيل سردي ملهم لتبسيط العلوم للأطفال.
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Evidence Review Dossier */}
          {activeTab === 'evidence' && (
            <motion.div
              key="evidence-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {/* 3 Evidence Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* Evidence 1 */}
                <div className="parchment-panel p-3.5 flex flex-col justify-between shadow-xl border-2 border-[#C89658]">
                  <div>
                    <div className="w-full h-28 rounded-xl overflow-hidden mb-2.5 border border-[#C89658]/40 bg-[#FFF9F0]">
                      <img
                        src="./assets/scenes/09_Evidence_Review/06_Evidence_Card_Berries_Crop.png"
                        alt="بطاقة حبات التوت"
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="text-[10px] font-bold text-[#A95743] mb-1 font-mono">
                      {tReview.items[0].type}
                    </div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#713D43] mb-1">
                      {tReview.items[0].title}
                    </h3>
                    <p className="text-[11px] text-[#451B20] font-semibold leading-relaxed">
                      {tReview.items[0].summary}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#C89658]/30 flex items-center gap-1.5 text-[11px] font-bold text-green-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
                    <span>تم توثيقه بكاميرا Pancam</span>
                  </div>
                </div>

                {/* Evidence 2 */}
                <div className="parchment-panel p-3.5 flex flex-col justify-between shadow-xl border-2 border-[#C89658]">
                  <div>
                    <div className="w-full h-28 rounded-xl overflow-hidden mb-2.5 border border-[#C89658]/40 bg-[#FFF9F0]">
                      <img
                        src="./assets/scenes/09_Evidence_Review/07_Evidence_Card_Hematite_Crop.png"
                        alt="بطاقة قياس الهيماتيت"
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="text-[10px] font-bold text-[#C85A32] mb-1 font-mono">
                      {tReview.items[1].type}
                    </div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#713D43] mb-1">
                      {tReview.items[1].title}
                    </h3>
                    <p className="text-[11px] text-[#451B20] font-semibold leading-relaxed">
                      {tReview.items[1].summary}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#C89658]/30 flex items-center gap-1.5 text-[11px] font-bold text-green-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
                    <span>تم قياسه بمطياف Mössbauer</span>
                  </div>
                </div>

                {/* Evidence 3 */}
                <div className="parchment-panel p-3.5 flex flex-col justify-between shadow-xl border-2 border-[#E7B875] bg-[#E7B875]/20">
                  <div>
                    <div className="w-full h-28 rounded-xl overflow-hidden mb-2.5 border border-[#C89658]/40 bg-[#FFF9F0]">
                      <img
                        src="./assets/scenes/09_Evidence_Review/08_Evidence_Card_Ancient_Water_Crop.png"
                        alt="بطاقة استنتاج الماء القديم"
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="text-[10px] font-bold text-[#713D43] mb-1 font-mono">
                      {tReview.items[2].type}
                    </div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#713D43] mb-1">
                      {tReview.items[2].title}
                    </h3>
                    <p className="text-[11px] text-[#451B20] font-semibold leading-relaxed">
                      {tReview.items[2].summary}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#C89658]/30 flex items-center gap-1.5 text-[11px] font-bold text-green-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
                    <span>الاستنتاج العلمي المعتمد</span>
                  </div>
                </div>
              </div>

              {/* Forensic Disclaimer */}
              <div className="parchment-card-sm p-2.5 text-center border border-[#C89658] bg-[#FFF9F0]">
                <p className="text-xs font-extrabold text-[#713D43]">
                  {tReview.disclaimer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Navigation */}
        <div className="flex items-center justify-between gap-4 pt-1">
          <button
            onClick={() => {
              marsAudio.playClick();
              onPrev();
            }}
            className="mars-btn-secondary px-5 py-2.5 text-xs sm:text-sm flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            <span>المشهد السابق (ما الذي بقي؟)</span>
          </button>

          <button
            onClick={() => {
              marsAudio.playSuccess();
              onContinue();
            }}
            className="mars-btn-primary px-8 py-3 text-xs sm:text-sm flex items-center gap-2 shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-[#E7B875]" />
            <span>الانتقال إلى ختام المهمة والشهادة</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
