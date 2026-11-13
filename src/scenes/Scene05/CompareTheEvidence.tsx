import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, CheckCircle2, ArrowLeft, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { STORY_TEXTS } from '../../data/storyContent';
import { marsAudio } from '../../utils/audio';
import { DustOverlay } from '../../components/Effects/DustOverlay';

interface CompareTheEvidenceProps {
  onContinue: () => void;
  onEvidenceRecorded: () => void;
}

export const CompareTheEvidence: React.FC<CompareTheEvidenceProps> = ({
  onContinue,
  onEvidenceRecorded,
}) => {
  const t = STORY_TEXTS.scene05;
  const [selectedSample, setSelectedSample] = useState<'berry-bowl' | 'empty' | 'comparison'>('comparison');

  const handleSelectSample = (sample: 'berry-bowl' | 'empty' | 'comparison') => {
    setSelectedSample(sample);
    marsAudio.playClick();
    onEvidenceRecorded();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden text-[#2A1810] pt-16 pb-20 px-3 sm:px-6">
      {/* LAYER 01: Full Illustrated Mars Landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/scenes/06_Scene_05_Compare_the_Evidence/Background.png"
          alt="المشهد الخامس: مقارنة تكشف الفرق"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/35 via-transparent to-[#2A1810]/25 pointer-events-none" />
        <DustOverlay intensity="low" />
      </div>

      {/* LAYER 02: Characters */}
      {/* Child Astronaut comparing on the left */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-2 xl:left-6 bottom-8 z-20 w-64 xl:w-76 pointer-events-none filter drop-shadow-[0_15px_30px_rgba(40,15,10,0.6)]"
      >
        <img
          src="./assets/scenes/06_Scene_05_Compare_the_Evidence/01_Child_Astronaut_Transparent_APPROX.png"
          alt="رائدة الفضاء تدقق في مقارنة الأدلة"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Rover in the background */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-1/4 top-24 z-10 w-44 xl:w-52 pointer-events-none opacity-85 filter drop-shadow-[0_10px_20px_rgba(40,15,10,0.5)]"
      >
        <img
          src="./assets/scenes/06_Scene_05_Compare_the_Evidence/02_Oppy_Rover_Transparent_APPROX.png"
          alt="مركبة أوبي في الأفق"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* LAYER 03 & 04: Content & Interactive Two-Sample Comparison */}
      <div className="relative z-20 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center gap-4 my-auto" dir="rtl">
        {/* Header Badge */}
        <div className="text-center sm:text-right">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#713D43] text-[#F6EBDD] text-xs font-bold tracking-wider shadow-md mb-1">
            المشهد 05 • المقارنة العلمية المخبرية الدقيقة
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* CENTER-LEFT: Comparison Panels & Spectral Graph */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="parchment-panel p-4 w-full shadow-2xl border-3 border-[#C89658] relative">
              <div className="flex items-center justify-between mb-2.5 border-b border-[#C89658]/30 pb-2">
                <span className="text-xs font-bold text-[#713D43] flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-[#A95743]" />
                  مقارنة عينة الحبيبات مقابل التربة المجاورة الخالية
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleSelectSample('berry-bowl')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      selectedSample === 'berry-bowl'
                        ? 'bg-[#C85A32] text-[#FFFDF9]'
                        : 'bg-[#F5E8D0] text-[#713D43]'
                    }`}
                  >
                    Berry Bowl
                  </button>
                  <button
                    onClick={() => handleSelectSample('empty')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      selectedSample === 'empty'
                        ? 'bg-[#713D43] text-[#FFFDF9]'
                        : 'bg-[#F5E8D0] text-[#713D43]'
                    }`}
                  >
                    Empty
                  </button>
                  <button
                    onClick={() => handleSelectSample('comparison')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      selectedSample === 'comparison'
                        ? 'bg-[#E7B875] text-[#2A1810]'
                        : 'bg-[#F5E8D0] text-[#713D43]'
                    }`}
                  >
                    مقارنة معاً
                  </button>
                </div>
              </div>

              {/* Side by side image samples */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                {/* Sample 1: Berry Bowl */}
                <div
                  onClick={() => handleSelectSample('berry-bowl')}
                  className={`p-2 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedSample === 'berry-bowl' || selectedSample === 'comparison'
                      ? 'border-[#C85A32] bg-[#F5E8D0]/80 shadow-md scale-[1.01]'
                      : 'border-[#C89658]/40 bg-[#FFF9F0]/60 opacity-70'
                  }`}
                >
                  <div className="h-28 rounded-lg overflow-hidden mb-1.5 border border-[#C89658]/40">
                    <img
                      src="./assets/scenes/06_Scene_05_Compare_the_Evidence/04_Berry_Bowl_Sample_Crop.png"
                      alt="عينة وعاء التوت"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-extrabold text-[#713D43] block">
                    عينة وعاء التوت (Berry Bowl)
                  </span>
                  <span className="text-[10px] text-[#C85A32] font-black block">
                    قراءة الهيماتيت: مرتفعة جداً (قمة طيفية واضحة)
                  </span>
                </div>

                {/* Sample 2: Empty */}
                <div
                  onClick={() => handleSelectSample('empty')}
                  className={`p-2 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedSample === 'empty' || selectedSample === 'comparison'
                      ? 'border-[#713D43] bg-[#F5E8D0]/80 shadow-md scale-[1.01]'
                      : 'border-[#C89658]/40 bg-[#FFF9F0]/60 opacity-70'
                  }`}
                >
                  <div className="h-28 rounded-lg overflow-hidden mb-1.5 border border-[#C89658]/40">
                    <img
                      src="./assets/scenes/06_Scene_05_Compare_the_Evidence/05_Empty_Sample_Crop.png"
                      alt="عينة التربة الفارغة المجاورة"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-extrabold text-[#713D43] block">
                    العينة المجاورة الخالية (Empty)
                  </span>
                  <span className="text-[10px] text-[#451B20] font-bold block">
                    قراءة الهيماتيت: منخفضة / شبه منعدمة
                  </span>
                </div>
              </div>

              {/* Spectral Comparison Graph */}
              <div className="p-2.5 rounded-xl bg-[#2A1810]/5 border border-[#C89658]/50">
                <span className="text-[11px] font-bold text-[#713D43] block mb-1">
                  الرسم البياني الطيفي لمطياف موسباور (Mössbauer Absorption Spectra)
                </span>
                <div className="rounded-lg overflow-hidden border border-[#C89658]/40 bg-[#FFF9F0]">
                  <img
                    src="./assets/scenes/06_Scene_05_Compare_the_Evidence/07_Hematite_Comparison_Graph_Crop.png"
                    alt="الرسم البياني الطيفي للهيماتيت"
                    className="w-full h-auto object-contain max-h-[140px]"
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#451B20] font-bold">
                  <span className="text-[#C85A32]">● إشارة الهيماتيت مرتبطة مباشرة بالحبيبات المستديرة</span>
                  <span className="text-[#713D43]">● التربة المحيطة خالية من الهيماتيت المترسب</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Story Parchment Panel */}
          <div className="lg:col-span-5">
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

              {/* Takeaway Card */}
              <div className="p-3 rounded-xl bg-[#E7B875]/30 border-2 border-[#C89658] mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#A95743]" />
                  <span className="text-xs font-black text-[#713D43]">ماذا يثبت هذا الفارق؟</span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#451B20] font-bold leading-relaxed">
                  {t.takeaway}
                </p>
              </div>

              {/* Continue Button */}
              <div className="flex items-center justify-end">
                <button
                  onClick={() => {
                    marsAudio.playSuccess();
                    onContinue();
                  }}
                  className="mars-btn-primary px-8 py-3 text-xs sm:text-sm flex items-center gap-2 shadow-xl"
                >
                  <span>استنتاج المحقق: ما الذي يثبته الدليل؟</span>
                  <ArrowLeft className="w-4 h-4 text-[#E7B875]" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
