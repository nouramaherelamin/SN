import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Sun, BatteryLow, Radio, ArrowLeft, RefreshCw, Sparkles, Heart } from 'lucide-react';
import { STORY_TEXTS } from '../../data/storyContent';
import { marsAudio } from '../../utils/audio';
import { DustOverlay } from '../../components/Effects/DustOverlay';

interface TheStormProps {
  onContinue: () => void;
}

export const TheStorm: React.FC<TheStormProps> = ({ onContinue }) => {
  const t = STORY_TEXTS.scene07;
  // Dust intensity slider (0 to 100%)
  const [dustLevel, setDustLevel] = useState<number>(75);
  const [showTimeline, setShowTimeline] = useState(false);

  const handleDustChange = (val: number) => {
    setDustLevel(val);
    if (val > 80) {
      marsAudio.playStorm();
    } else {
      marsAudio.playClick();
    }
  };

  // Calculated solar generation based on dust level
  const solarWh = Math.max(22, Math.round(600 * (1 - dustLevel / 105)));
  const atmosphericTau = (dustLevel / 9).toFixed(1);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden text-[#2A1810] pt-16 pb-20 px-3 sm:px-6 transition-colors duration-700">
      {/* LAYER 01: Full Illustrated Mars Landscape with dynamic storm darkening */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/scenes/07_Scene_06_Detective_Conclusion/Background.png"
          alt="سماء المريخ أثناء العاصفة"
          className="w-full h-full object-cover object-center transition-all duration-700"
          style={{
            filter: `brightness(${Math.max(0.25, 1 - dustLevel / 120)}) contrast(${1 + dustLevel / 200}) sepia(${dustLevel / 150})`,
          }}
        />
        {/* Dynamic Storm Dust Color Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            backgroundColor: `rgba(169, 87, 67, ${dustLevel / 140})`,
            mixBlendMode: 'multiply',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/40 via-transparent to-[#2A1810]/25 pointer-events-none" />
        <DustOverlay intensity={dustLevel > 70 ? 'storm' : 'medium'} />
      </div>

      {/* LAYER 02: Characters */}
      {/* Child Astronaut watching with reverence */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-2 xl:left-6 bottom-8 z-20 w-60 xl:w-72 pointer-events-none filter drop-shadow-[0_15px_30px_rgba(40,15,10,0.6)]"
      >
        <img
          src="./assets/scenes/01_Landing_Page/01_Child_Astronaut_Transparent_APPROX.png"
          alt="رائدة الفضاء تراقب العاصفة"
          className="w-full h-auto object-contain opacity-90"
        />
      </motion.div>

      {/* LAYER 03 & 04: Content & Interactive Storm Simulation */}
      <div className="relative z-20 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center gap-4 my-auto" dir="rtl">
        {/* Header Badge */}
        <div className="text-center sm:text-right">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#713D43] text-[#F6EBDD] text-xs font-bold tracking-wider shadow-md mb-1">
            المشهد 07 • وادي المثابرة (Perseverance Valley) — يونيو 2018
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* CENTER-LEFT: Rover in the Storm Simulation */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="parchment-panel p-4 w-full shadow-2xl border-3 border-[#C89658] relative">
              <div className="flex items-center justify-between mb-2.5 border-b border-[#C89658]/30 pb-2">
                <span className="text-xs font-bold text-[#713D43] flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-[#A95743]" />
                  محاكاة شدة العاصفة الترابية على المريخ
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#713D43] text-[#FFFDF9] font-mono">
                  عتامة الغبار (Tau): {atmosphericTau}
                </span>
              </div>

              {/* Rover visual covered in dust */}
              <div className="relative rounded-2xl overflow-hidden bg-[#2A1810]/40 border-2 border-[#C89658]/60 p-4 flex flex-col items-center justify-center min-h-[220px]">
                <motion.img
                  src="./assets/scenes/01_Landing_Page/02_Oppy_Rover_Transparent_APPROX.png"
                  alt="أوبي تواجه العاصفة"
                  className="w-full max-w-xs h-auto object-contain transition-all duration-700"
                  style={{
                    filter: `brightness(${Math.max(0.3, 1 - dustLevel / 120)}) sepia(${dustLevel / 120})`,
                    opacity: Math.max(0.4, 1 - dustLevel / 160),
                  }}
                  animate={{
                    x: dustLevel > 80 ? [0, -2, 2, -1, 1, 0] : 0,
                  }}
                  transition={{ repeat: Infinity, duration: 0.2 }}
                />

                {/* Final historic quote banner */}
                <div className="mt-3 px-3 py-1.5 rounded-xl bg-[#FFF9F0]/95 border border-[#C89658] text-center max-w-xs shadow-lg">
                  <span className="text-[10px] text-[#A95743] font-bold block">
                    الرسالة الأخيرة الموثقة من أوبي (10 يونيو 2018)
                  </span>
                  <span className="text-xs font-extrabold text-[#713D43] block mt-0.5">
                    "My battery is low and it’s getting dark"
                  </span>
                  <span className="text-[11px] text-[#451B20] font-semibold block">
                    «بطاريتي منخفضة، والدنيا بدأت تظلم…»
                  </span>
                </div>
              </div>

              {/* Interactive Storm Slider */}
              <div className="mt-3.5 p-3 rounded-xl bg-[#F5E8D0] border border-[#C89658]">
                <div className="flex items-center justify-between text-xs font-bold text-[#713D43] mb-1.5">
                  <span className="flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-[#C85A32]" />
                    حرك المؤشر للتحكم في شدة العاصفة
                  </span>
                  <span className="font-mono text-[#A95743]">{dustLevel}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={dustLevel}
                  onChange={(e) => handleDustChange(Number(e.target.value))}
                  className="w-full cursor-pointer h-2 bg-[#E7B875] rounded-lg"
                />

                {/* Power meter gauges */}
                <div className="mt-2.5 grid grid-cols-2 gap-2 text-center text-[11px] font-bold">
                  <div className="p-1.5 rounded-lg bg-[#FFF9F0] border border-[#C89658]/40">
                    <span className="text-[10px] text-[#A95743] block">طاقة الألواح الشمسية</span>
                    <span className="text-xs font-black text-[#713D43] font-mono">
                      {solarWh} واط/ساعة
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#FFF9F0] border border-[#C89658]/40">
                    <span className="text-[10px] text-[#A95743] block">حالة الاتصال بالأرض</span>
                    <span
                      className={`text-xs font-black font-mono ${
                        dustLevel > 70 ? 'text-[#C85A32]' : 'text-green-700'
                      }`}
                    >
                      {dustLevel > 70 ? 'انقطاع الإشارة' : 'إشارة راديو متصلة'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Story Parchment & JPL Tribute */}
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

              {/* JPL Recovery Attempts Tribute */}
              <div className="p-3.5 rounded-xl bg-[#F5E8D0]/90 border-2 border-[#C89658] mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Radio className="w-4 h-4 text-[#A95743]" />
                  <span className="text-xs font-extrabold text-[#713D43]">
                    وفاء فريق ناسا في JPL (أكثر من 1,000 محاولة نداء!)
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#451B20] font-bold leading-relaxed">
                  على مدار 8 أشهر متتالية، أرسل مهندسو وكالة ناسا أكثر من 830 أمر استنهاض وراديو عبر هوائيات شبكة الفضاء السحيق، أملاً في أن تهب رياح تنظف ألواحها… حتى حان وقت الوداع في 13 فبراير 2019.
                </p>
              </div>

              {/* Proceed to Scene 08: What Remains */}
              <div className="flex items-center justify-end">
                <button
                  onClick={() => {
                    marsAudio.playSuccess();
                    onContinue();
                  }}
                  className="mars-btn-primary px-8 py-3 text-xs sm:text-sm flex items-center gap-2 shadow-xl"
                >
                  <Heart className="w-4 h-4 text-[#E7B875]" />
                  <span>ما الذي بقي من أوبي؟ ختام القصة</span>
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
