import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Compass, Clock, Award, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { STORY_TEXTS } from '../../data/storyContent';
import { marsAudio } from '../../utils/audio';
import { DustOverlay } from '../../components/Effects/DustOverlay';

interface WhoIsOppyProps {
  onContinue: () => void;
}

export const WhoIsOppy: React.FC<WhoIsOppyProps> = ({ onContinue }) => {
  const t = STORY_TEXTS.scene02;
  const [hasTappedRover, setHasTappedRover] = useState(false);
  const [activeTimelineTab, setActiveTimelineTab] = useState<'planned' | 'actual'>('actual');

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden text-[#2A1810] pt-16 pb-20 px-3 sm:px-6">
      {/* LAYER 01: Full Illustrated Mars Landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/scenes/03_Scene_02_Who_is_Oppy/Background.png"
          alt="المشهد الثاني: مين هي أوبي؟"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/35 via-transparent to-[#2A1810]/25 pointer-events-none" />
        <DustOverlay intensity="low" />
      </div>

      {/* LAYER 02: Characters */}
      {/* Child Astronaut pointing from the left */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-2 xl:left-6 bottom-8 z-20 w-64 xl:w-76 pointer-events-none filter drop-shadow-[0_15px_30px_rgba(40,15,10,0.6)]"
      >
        <img
          src="./assets/scenes/03_Scene_02_Who_is_Oppy/01_Child_Astronaut_Transparent_APPROX.png"
          alt="رائدة الفضاء تشير إلى أوبي"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* LAYER 03 & 04: Content & Interactive Rover */}
      <div className="relative z-20 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center gap-4 my-auto" dir="rtl">
        {/* Header Badge */}
        <div className="text-center sm:text-right">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#713D43] text-[#F6EBDD] text-xs font-bold tracking-wider shadow-md mb-1">
            المشهد 02 • بطلة التحقيق المريخي
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* CENTER-LEFT: Oppy Rover Visual & Interactive Card */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            {/* Oppy Rover Graphic with Interactive Tap */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                marsAudio.playChime();
                setHasTappedRover(true);
              }}
              className="cursor-pointer relative group flex flex-col items-center"
            >
              <div className="w-64 sm:w-80 lg:w-92 filter drop-shadow-[0_18px_35px_rgba(40,15,10,0.7)]">
                <img
                  src="./assets/scenes/03_Scene_02_Who_is_Oppy/02_Oppy_Rover_Transparent_APPROX.png"
                  alt="مركبة أوبي أوبورتيونيتي"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Tap Prompt Badge */}
              <div className="mt-2 px-3 py-1 rounded-full bg-[#E7B875] text-[#2A1810] text-[11px] font-extrabold shadow-md flex items-center gap-1 group-hover:scale-105 transition-transform">
                <Sparkles className="w-3.5 h-3.5 text-[#713D43]" />
                <span>انقر على أوبي لفحص مواصفاتها!</span>
              </div>
            </motion.div>

            {/* Mission Card (Specs below rover) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 parchment-card-sm p-3 w-full max-w-sm border-2 border-[#C89658] text-right shadow-lg"
            >
              <div className="flex items-center justify-between border-b border-[#C89658]/30 pb-1.5 mb-1.5">
                <span className="text-xs font-bold text-[#713D43] flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#A95743]" />
                  بطاقة تعريف مستكشف المريخ
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#713D43] text-[#FFFDF9]">
                  MER-B
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-[#451B20] font-bold">
                <div className="p-1 rounded bg-[#F5E8D0]">
                  <span className="text-[10px] text-[#A95743] block">الوزن</span>
                  185 كجم
                </div>
                <div className="p-1 rounded bg-[#F5E8D0]">
                  <span className="text-[10px] text-[#A95743] block">السرعة</span>
                  5 سم/ثانية
                </div>
                <div className="p-1 rounded bg-[#F5E8D0]">
                  <span className="text-[10px] text-[#A95743] block">المسافة</span>
                  45.16 كم
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Large Story Parchment Panel & Mission Timeline */}
          <div className="lg:col-span-7">
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

              {/* Mission Timeline Comparison Graphic */}
              <div className="mt-4 pt-3 border-t-2 border-[#C89658]/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-bold text-[#713D43] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#A95743]" />
                    مقارنة المخطط الأصلي مقابل الإنجاز الأسطوري
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setActiveTimelineTab('planned')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${activeTimelineTab === 'planned'
                          ? 'bg-[#713D43] text-[#FFFDF9]'
                          : 'bg-[#F5E8D0] text-[#713D43]'
                        }`}
                    >
                      المخطط: 90 يوماً
                    </button>
                    <button
                      onClick={() => setActiveTimelineTab('actual')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${activeTimelineTab === 'actual'
                          ? 'bg-[#C85A32] text-[#FFFDF9]'
                          : 'bg-[#F5E8D0] text-[#713D43]'
                        }`}
                    >
                      الواقع: 15 سنة!
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5E8D0]/80 border border-[#C89658]/50">
                  {activeTimelineTab === 'planned' ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#A95743] font-bold block">عمر المهمة المخطط</span>
                        <span className="text-sm font-black text-[#713D43]">90 يوماً مريخياً (سول)</span>
                        <span className="text-[11px] text-[#451B20] block">مسافة سير متوقعة: 600 متر فقط</span>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-[#E7B875]/40 flex items-center justify-center font-bold text-[#713D43] text-sm border border-[#C89658]">
                        90 SOL
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#C85A32] font-bold block">ما حققته أوبي في الواقع</span>
                        <span className="text-sm sm:text-base font-black text-[#713D43]">
                          قرابة 15 سنة أرضية (5,352 يوماً مريخياً)!
                        </span>
                        <span className="text-[11px] text-[#451B20] font-bold block">
                          قطعت 45.16 كم وتجاوزت التوقعات بـ 55 ضعفاً!
                        </span>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-[#C85A32] text-[#FFFDF9] flex items-center justify-center font-bold text-xs border-2 border-[#E7B875] shadow-md animate-pulse">
                        15 YEARS
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-2 flex items-center justify-end">
                <button
                  onClick={() => {
                    marsAudio.playSuccess();
                    onContinue();
                  }}
                  className="mars-btn-primary px-8 py-3 text-xs sm:text-sm flex items-center gap-2 shadow-xl"
                >
                  <span>{t.cta}</span>
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
