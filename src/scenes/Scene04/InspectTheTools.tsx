import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Eye, CheckCircle2, ArrowLeft, Sparkles, Activity } from 'lucide-react';
import { STORY_TEXTS } from '../../data/storyContent';
import { marsAudio } from '../../utils/audio';
import { DustOverlay } from '../../components/Effects/DustOverlay';

interface InspectTheToolsProps {
  onContinue: () => void;
  onToolInspected: (tool: 'pancam' | 'mossbauer') => void;
  inspectedTools: { pancam: boolean; mossbauer: boolean };
}

export const InspectTheTools: React.FC<InspectTheToolsProps> = ({
  onContinue,
  onToolInspected,
  inspectedTools,
}) => {
  const t = STORY_TEXTS.scene04;
  const [selectedTool, setSelectedTool] = useState<'pancam' | 'mossbauer' | null>(null);

  const handleToolClick = (tool: 'pancam' | 'mossbauer') => {
    setSelectedTool(tool);
    marsAudio.playChime();
    onToolInspected(tool);
  };

  const allInspected = inspectedTools.pancam && inspectedTools.mossbauer;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden text-[#2A1810] pt-16 pb-20 px-3 sm:px-6">
      {/* LAYER 01: Full Illustrated Mars Landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/scenes/05_Scene_04_Inspect_the_Tools/Background.png"
          alt="المشهد الرابع: افحص أدوات أوبي العلمية"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/35 via-transparent to-[#2A1810]/25 pointer-events-none" />
        <DustOverlay intensity="low" />
      </div>

      {/* LAYER 02: Characters */}
      {/* Child Astronaut on the left */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-2 xl:left-6 bottom-8 z-20 w-64 xl:w-76 pointer-events-none filter drop-shadow-[0_15px_30px_rgba(40,15,10,0.6)]"
      >
        <img
          src="./assets/scenes/05_Scene_04_Inspect_the_Tools/01_Child_Astronaut_Transparent_APPROX.png"
          alt="رائدة الفضاء تراقب فحص الأدوات"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* LAYER 03 & 04: Content & Interactive Rover Hotspots */}
      <div className="relative z-20 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center gap-4 my-auto" dir="rtl">
        {/* Header Badge */}
        <div className="text-center sm:text-right">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#713D43] text-[#F6EBDD] text-xs font-bold tracking-wider shadow-md mb-1">
            المشهد 04 • المختبر العلمي المتنقل على المريخ
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* CENTER-LEFT: Large Rover with Interactive Tool Hotspots */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="parchment-panel p-4 w-full shadow-2xl border-3 border-[#C89658] relative">
              <div className="flex items-center justify-between mb-2 border-b border-[#C89658]/30 pb-1.5">
                <span className="text-xs font-bold text-[#713D43] flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#A95743]" />
                  اضغط على الأدوات البارزة في مركبة أوبي لفحصها
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#713D43] text-[#FFFDF9] font-mono">
                  تم فحص: {(inspectedTools.pancam ? 1 : 0) + (inspectedTools.mossbauer ? 1 : 0)}/2
                </span>
              </div>

              {/* Rover Graphic with Hotspot Buttons */}
              <div className="relative w-full flex items-center justify-center p-2 rounded-2xl bg-[#2A1810]/5 border border-[#C89658]/40">
                <img
                  src="./assets/scenes/05_Scene_04_Inspect_the_Tools/02_Oppy_Rover_Transparent_APPROX.png"
                  alt="مركبة أوبي المفصلة مع الأدوات"
                  className="w-full max-w-md h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(40,15,10,0.6)]"
                />

                {/* Hotspot 1: Pancam (Top Mast) */}
                <button
                  onClick={() => handleToolClick('pancam')}
                  className={`absolute top-[28%] left-[45%] -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg ${
                    selectedTool === 'pancam' || inspectedTools.pancam
                      ? 'bg-[#E7B875] text-[#2A1810] border-2 border-[#713D43] scale-110 z-20'
                      : 'bg-[#713D43] text-[#FFFDF9] border border-[#E7B875] hotspot-pulse'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>كاميرا Pancam</span>
                  {inspectedTools.pancam && <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />}
                </button>

                {/* Hotspot 2: Mössbauer (Robotic Arm) */}
                <button
                  onClick={() => handleToolClick('mossbauer')}
                  className={`absolute bottom-[28%] right-[22%] -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg ${
                    selectedTool === 'mossbauer' || inspectedTools.mossbauer
                      ? 'bg-[#C85A32] text-[#FFFDF9] border-2 border-[#E7B875] scale-110 z-20'
                      : 'bg-[#713D43] text-[#FFFDF9] border border-[#E7B875] hotspot-pulse'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-[#E7B875]" />
                  <span>مطياف Mössbauer</span>
                  {inspectedTools.mossbauer && <CheckCircle2 className="w-3.5 h-3.5 text-[#E7B875]" />}
                </button>
              </div>

              {/* Selected Tool Details Card */}
              <AnimatePresence mode="wait">
                {selectedTool && (
                  <motion.div
                    key={selectedTool}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 p-3.5 rounded-xl bg-[#F5E8D0] border-2 border-[#C89658] text-right"
                  >
                    {selectedTool === 'pancam' ? (
                      <div className="flex gap-3 items-center">
                        <img
                          src="./assets/scenes/05_Scene_04_Inspect_the_Tools/05_Pancam_Camera_Closeup_Crop.png"
                          alt="كاميرا بانكام"
                          className="w-16 h-16 rounded-xl object-contain bg-[#FFF9F0] border border-[#C89658] p-1 shrink-0"
                        />
                        <div>
                          <span className="text-xs font-black text-[#713D43] block">
                            كاميرا البانوراما (Pancam) • العينان البصيرتان
                          </span>
                          <p className="text-[11px] text-[#451B20] font-semibold mt-0.5 leading-relaxed">
                            كاميرا مجسمة عالية الدقة على سارية بارتفاع 1.5 متر، تلتقط ألوان الصخور وتحدد أشكال الحبيبات الكروية بدقة متناهية.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 items-center">
                        <img
                          src="./assets/scenes/05_Scene_04_Inspect_the_Tools/06_Mossbauer_Arm_Tool_Closeup_Crop.png"
                          alt="مطياف موسباور"
                          className="w-16 h-16 rounded-xl object-contain bg-[#FFF9F0] border border-[#C89658] p-1 shrink-0"
                        />
                        <div>
                          <span className="text-xs font-black text-[#713D43] block">
                            مطياف موسباور (Mössbauer) • المحلل الكيميائي بالذراع
                          </span>
                          <p className="text-[11px] text-[#451B20] font-semibold mt-0.5 leading-relaxed">
                            جهاز مثبت في طرف الذراع الروبوتية يوضع مباشرة على الصخر لتحليل النظائر الحاملة للحديد، وكشف مفاجأة الهيماتيت المريخي!
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Story Text Panel & Proceed CTA */}
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

              {/* Ready prompt */}
              <div className="p-3.5 rounded-xl bg-[#F5E8D0]/90 border-2 border-[#C89658] mb-4 text-center">
                <span className="text-xs sm:text-sm font-extrabold text-[#713D43] block">
                  الصورة تعطينا شكلاً، والقياس يكشف لنا نوع المادة!
                </span>
                <span className="text-[11px] text-[#451B20] font-bold block mt-1">
                  حان الوقت لمقارنة قراءات مطياف موسباور بين موقع الحبيبات وموقع آخر خالٍ!
                </span>
              </div>

              {/* Inspect Evidence Button */}
              <div className="flex items-center justify-end">
                <button
                  onClick={() => {
                    marsAudio.playSuccess();
                    onContinue();
                  }}
                  className="mars-btn-primary px-8 py-3 text-xs sm:text-sm flex items-center gap-2 shadow-xl"
                >
                  <span>قارن الأدلة العلمية الآن</span>
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
