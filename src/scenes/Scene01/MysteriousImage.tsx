import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Lightbulb, CheckCircle2, AlertCircle, ArrowLeft, Search, ZoomIn } from 'lucide-react';
import { STORY_TEXTS } from '../../data/storyContent';
import { marsAudio } from '../../utils/audio';
import { DustOverlay } from '../../components/Effects/DustOverlay';

interface MysteriousImageProps {
  onContinue: () => void;
  onRecordEvidence: () => void;
  evidenceRecorded: boolean;
}

export const MysteriousImage: React.FC<MysteriousImageProps> = ({
  onContinue,
  onRecordEvidence,
  evidenceRecorded,
}) => {
  const t = STORY_TEXTS.scene01;
  const [selectedChoice, setSelectedChoice] = useState<'observe' | 'interpret' | null>(null);
  const [isMagnified, setIsMagnified] = useState(false);

  const handleChoice = (id: 'observe' | 'interpret') => {
    setSelectedChoice(id);
    if (id === 'observe') {
      marsAudio.playSuccess();
      onRecordEvidence();
    } else {
      marsAudio.playClick();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden text-[#2A1810] pt-16 pb-20 px-4 sm:px-8">
      {/* LAYER 01: Full Illustrated Mars Landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/scenes/02_Scene_01_Mysterious_Image/Background.png"
          alt="المشهد الأول: الصورة الغامضة في فوهة النسر"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/35 via-transparent to-[#2A1810]/25 pointer-events-none" />
        <DustOverlay intensity="low" />
      </div>

      {/* LAYER 02: Characters */}
      {/* Child Astronaut on the left pointing towards the rock */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-2 xl:left-8 bottom-6 z-20 w-64 xl:w-76 pointer-events-none filter drop-shadow-[0_15px_30px_rgba(40,15,10,0.6)]"
      >
        <img
          src="./assets/scenes/02_Scene_01_Mysterious_Image/01_Child_Astronaut_Transparent_APPROX.png"
          alt="رائدة الفضاء تشير للصخرة"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Oppy Rover on the top-right ridge */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute right-6 top-20 z-10 w-52 xl:w-60 pointer-events-none opacity-95 filter drop-shadow-[0_10px_20px_rgba(40,15,10,0.5)]"
      >
        <img
          src="./assets/scenes/02_Scene_01_Mysterious_Image/02_Oppy_Rover_Transparent_APPROX.png"
          alt="مركبة أوبي على حافة الفوهة"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* LAYER 03 & 04: Story & Central Investigation Area */}
      <div className="relative z-20 max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center gap-4 my-auto" dir="rtl">
        {/* Header Ribbon / Clue Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="parchment-panel p-4 sm:p-5 text-center shadow-xl border-2 border-[#C89658]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#713D43] text-[#F6EBDD] text-xs font-bold mb-1.5">
            <Search className="w-3.5 h-3.5 text-[#E7B875]" />
            <span>المشهد 01 • فوهة النسر (Eagle Crater)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-cairo text-[#713D43]">
            {t.title}
          </h2>
          <div className="text-xs sm:text-sm text-[#451B20] font-semibold mt-1 leading-relaxed max-w-3xl mx-auto">
            {t.paragraphs.slice(0, 3).join(' ')}
          </div>
        </motion.div>

        {/* Central Investigation Canvas: Rock + Magnification Loupe */}
        <div className="parchment-panel p-4 sm:p-5 border-2 border-[#C89658] shadow-2xl relative">
          <div className="flex items-center justify-between mb-3 border-b border-[#C89658]/40 pb-2">
            <span className="text-xs sm:text-sm font-bold text-[#713D43] flex items-center gap-1.5">
              <Search className="w-4 h-4 text-[#A95743]" />
              صخرة وعاء التوت (Berry Bowl) الملتقطة بواسطة كاميرا Pancam
            </span>
            <button
              onClick={() => {
                marsAudio.playClick();
                setIsMagnified(!isMagnified);
              }}
              className="mars-btn-secondary text-xs px-3.5 py-1.5 flex items-center gap-1.5 shadow-sm"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>{isMagnified ? 'إغلاق العدسة المكبرة' : 'فحص التفاصيل بالمكبر'}</span>
            </button>
          </div>

          <div className="relative rounded-2xl overflow-hidden border-2 border-[#C89658]/50 shadow-inner max-h-[300px] flex items-center justify-center bg-[#2A1810]/5">
            <img
              src="./assets/scenes/02_Scene_01_Mysterious_Image/04_Berry_Bowl_Rock_Crop.png"
              alt="صخرة وعاء التوت"
              className="w-full h-auto object-cover max-h-[290px]"
            />

            {/* Magnified Detail Overlay when toggled */}
            <AnimatePresence>
              {isMagnified && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-[#2A1810]/40 backdrop-blur-sm flex items-center justify-center p-4 z-30"
                >
                  <div className="parchment-panel p-4 text-center max-w-sm border-3 border-[#C89658] shadow-2xl">
                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-[#C89658] shadow-xl mb-3">
                      <img
                        src="./assets/scenes/02_Scene_01_Mysterious_Image/05_Berry_Bowl_Magnified_Detail_Crop.png"
                        alt="تفاصيل الحبيبات المستديرة بالمجهر"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-bold text-[#713D43] block">
                      تكبير عدسة Pancam المجهرية
                    </span>
                    <span className="text-[11px] text-[#451B20] font-medium block mt-1">
                      حبيبات كروية صغيرة قطرها 1 إلى 4 ملم مدمجة في الصخرة
                    </span>
                    <button
                      onClick={() => setIsMagnified(false)}
                      className="mt-3 px-4 py-1.5 rounded-xl bg-[#713D43] text-[#FFFDF9] text-xs font-bold"
                    >
                      إغلاق العدسة
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Question & Choices */}
          <div className="mt-4 pt-3 border-t border-[#C89658]/40">
            <p className="font-extrabold text-[#713D43] text-sm sm:text-base text-center mb-3">
              {t.questionPrompt}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {/* Option 1: Observe */}
              <button
                onClick={() => handleChoice('observe')}
                className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all border-2 shadow-md ${
                  selectedChoice === 'observe'
                    ? 'bg-gradient-to-r from-[#A95743] to-[#713D43] text-[#FFFDF9] border-[#E7B875] shadow-lg scale-[1.02]'
                    : 'bg-[#FFF9F0] text-[#713D43] border-[#C89658] hover:bg-[#F5E8D0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#C85A32]" />
                  <span>١. ألاحظ الحجم والشكل والتجمع (Observe)</span>
                </div>
                {selectedChoice === 'observe' && (
                  <CheckCircle2 className="w-5 h-5 text-[#E7B875]" />
                )}
              </button>

              {/* Option 2: Interpret */}
              <button
                onClick={() => handleChoice('interpret')}
                className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all border-2 shadow-md ${
                  selectedChoice === 'interpret'
                    ? 'bg-[#713D43] text-[#FFFDF9] border-[#E7B875] shadow-lg'
                    : 'bg-[#FFF9F0] text-[#713D43] border-[#C89658] hover:bg-[#F5E8D0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#A95743]" />
                  <span>٢. أفسّر وأخمن فوراً (Interpret)</span>
                </div>
                {selectedChoice === 'interpret' && (
                  <AlertCircle className="w-5 h-5 text-[#E7B875]" />
                )}
              </button>
            </div>

            {/* Scientific Feedback & Continue */}
            <AnimatePresence>
              {selectedChoice && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-3.5 p-3.5 rounded-xl text-xs sm:text-sm font-bold text-center border ${
                    selectedChoice === 'observe'
                      ? 'bg-[#E7B875]/25 text-[#451B20] border-[#C89658]'
                      : 'bg-[#713D43]/20 text-[#713D43] border-[#713D43]/40'
                  }`}
                >
                  <p>
                    {t.choices.find((c) => c.id === selectedChoice)?.feedback}
                  </p>
                  <button
                    onClick={() => {
                      marsAudio.playSuccess();
                      onContinue();
                    }}
                    className="mt-3 inline-flex items-center gap-2 mars-btn-primary px-6 py-2 text-xs font-bold shadow-md"
                  >
                    <span>{selectedChoice === 'observe' ? 'تابع التحقيق: مين هي Oppy؟' : 'المشهد التالي'}</span>
                    <ArrowLeft className="w-3.5 h-3.5 text-[#E7B875]" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
