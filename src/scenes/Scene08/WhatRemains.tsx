import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, BookOpen, RotateCcw, ArrowLeft, Sparkles, Heart } from 'lucide-react';
import { STORY_TEXTS } from '../../data/storyContent';
import { marsAudio } from '../../utils/audio';
import { DustOverlay } from '../../components/Effects/DustOverlay';

interface WhatRemainsProps {
  onContinue: () => void;
  onOpenSources: () => void;
  onRestart?: () => void;
  evidenceItems: {
    berriesObserved: boolean;
    hematiteMeasured: boolean;
    ancientWaterSupported: boolean;
  };
}

export const WhatRemains: React.FC<WhatRemainsProps> = ({
  onContinue,
  onOpenSources,
  onRestart,
  evidenceItems,
}) => {
  const t = STORY_TEXTS.scene08;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden text-[#2A1810] pt-16 pb-20 px-3 sm:px-6">
      {/* LAYER 01: Full Illustrated Mars Twilight Landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/scenes/07_Scene_06_Detective_Conclusion/Background.png"
          alt="المشهد الثامن: ما الذي بقي؟"
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'brightness(0.85) sepia(0.25) contrast(1.05)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/50 via-[#451B20]/15 to-[#2A1810]/35 pointer-events-none" />
        <DustOverlay intensity="low" />
      </div>

      {/* LAYER 02: Characters & Rover */}
      {/* Child Astronaut looking back proudly on the left */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-2 xl:left-8 bottom-8 z-20 w-64 xl:w-76 pointer-events-none filter drop-shadow-[0_15px_30px_rgba(40,15,10,0.6)]"
      >
        <img
          src="./assets/scenes/08_Scene_08_What_Remains/01_Child_Astronaut_Transparent_APPROX.png"
          alt="رائدة الفضاء تتأمل إرث أوبي"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Distant Oppy Rover resting peacefully in Perseverance Valley */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-[38%] top-[34%] z-10 w-52 xl:w-60 pointer-events-none opacity-90 filter drop-shadow-[0_10px_20px_rgba(40,15,10,0.5)]"
      >
        <img
          src="./assets/scenes/08_Scene_08_What_Remains/04_Oppy_Rover_Distant_Crop.png"
          alt="مركبة أوبي تستريح في وادي المثابرة"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* LAYER 03 & 04: Content & Complete Evidence Suitcase */}
      <div className="relative z-20 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center gap-4 my-auto" dir="rtl">
        {/* Header Badge */}
        <div className="text-center sm:text-right">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#713D43] text-[#F6EBDD] text-xs font-bold tracking-wider shadow-md mb-1">
            المشهد 08 • ما الذي بقي؟ إرث أوبي العلمي الخالد
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* CENTER-LEFT: The Complete Evidence Suitcase & Cards */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="parchment-panel p-4 w-full shadow-2xl border-3 border-[#C89658] relative">
              <div className="flex items-center justify-between mb-2.5 border-b border-[#C89658]/30 pb-1.5">
                <span className="text-xs font-bold text-[#713D43] flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#A95743]" />
                  حقيبة الأدلة الميدانية المجمعة
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#713D43] text-[#FFFDF9] font-mono">
                  3 من 3 مكتملة
                </span>
              </div>

              {/* Suitcase Graphic with Collected Cards */}
              <div className="relative rounded-2xl overflow-hidden bg-[#2A1810]/5 border-2 border-[#C89658]/50 p-3 flex flex-col items-center justify-center">
                <img
                  src="./assets/scenes/08_Scene_08_What_Remains/05_Evidence_Suitcase_Complete_Crop.png"
                  alt="حقيبة أدلة القضية 07"
                  className="w-full max-w-sm h-auto object-contain filter drop-shadow-md"
                />

                {/* The 3 collectible evidence cards inside suitcase */}
                <div className="mt-3 grid grid-cols-3 gap-2 w-full text-center">
                  <div className="p-1.5 rounded-lg bg-[#FFF9F0] border border-[#C89658] shadow-sm">
                    <span className="text-[9px] text-[#A95743] font-bold block">دليل ١</span>
                    <span className="text-[10px] font-black text-[#713D43] block">حبيبات التوت</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#FFF9F0] border border-[#C89658] shadow-sm">
                    <span className="text-[9px] text-[#C85A32] font-bold block">دليل ٢</span>
                    <span className="text-[10px] font-black text-[#713D43] block">معدن الهيماتيت</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#E7B875]/40 border border-[#C89658] shadow-sm">
                    <span className="text-[9px] text-[#713D43] font-bold block">دليل ٣</span>
                    <span className="text-[10px] font-black text-[#713D43] block">الماء القديم</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Story Conclusion Text & Action Buttons */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              className="parchment-panel p-5 sm:p-7 shadow-2xl border-3 border-[#C89658]"
            >
              <h2 className="text-2xl sm:text-3xl font-black font-cairo text-[#713D43] mb-3">
                {t.title}
              </h2>

              <div className="space-y-2.5 text-[#2A1810] font-semibold text-xs sm:text-sm leading-relaxed mb-4">
                {t.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={idx === 0 ? 'font-bold text-[#713D43] text-sm sm:text-base' : ''}
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Famous Story Quote */}
              <div className="p-3.5 rounded-xl bg-[#E7B875]/35 border-2 border-[#C89658] mb-4 text-center">
                <p className="text-xs sm:text-sm font-black text-[#713D43] italic">
                  {t.quote}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => {
                    marsAudio.playSuccess();
                    onContinue();
                  }}
                  className="mars-btn-primary w-full py-3 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl"
                >
                  <Briefcase className="w-4 h-4 text-[#E7B875]" />
                  <span>مراجعة ملف القضية الشامل (Evidence Review)</span>
                  <ArrowLeft className="w-4 h-4 text-[#E7B875]" />
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      marsAudio.playClick();
                      onOpenSources();
                    }}
                    className="mars-btn-secondary flex-1 py-2.5 text-xs flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#A95743]" />
                    <span>تصفح مصادر ناسا الأصلية</span>
                  </button>

                  {onRestart && (
                    <button
                      onClick={() => {
                        marsAudio.playClick();
                        onRestart();
                      }}
                      className="mars-btn-secondary px-3.5 py-2.5 text-xs flex items-center justify-center gap-1"
                      title="إعادة الرحلة من البداية"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
