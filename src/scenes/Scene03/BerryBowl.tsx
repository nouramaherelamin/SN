import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, CheckCircle2, AlertCircle, ArrowLeft, ZoomIn } from 'lucide-react';
import { STORY_TEXTS } from '../../data/storyContent';
import { marsAudio } from '../../utils/audio';
import { DustOverlay } from '../../components/Effects/DustOverlay';

interface BerryBowlProps {
  onContinue: () => void;
  onBerryInspected: () => void;
  berriesInspectedCount: number;
}

export const BerryBowl: React.FC<BerryBowlProps> = ({
  onContinue,
  onBerryInspected,
  berriesInspectedCount,
}) => {
  const t = STORY_TEXTS.scene03;
  const [selectedBerry, setSelectedBerry] = useState<number | null>(null);
  const [answeredQuestion, setAnsweredQuestion] = useState<'yes' | 'no' | null>(null);

  // 4 interactive berry spherules on the Berry Bowl rock
  const berryHotspots = [
    { id: 1, x: '35%', y: '40%', label: 'حبة توت علوية', size: '3.2 ملم' },
    { id: 2, x: '58%', y: '52%', label: 'حبة توت مركزية', size: '4.0 ملم' },
    { id: 3, x: '42%', y: '68%', label: 'حبة توت مدمجة بالصخر', size: '2.8 ملم' },
    { id: 4, x: '72%', y: '36%', label: 'حبة توت بارزة', size: '3.5 ملم' },
  ];

  const handleBerryClick = (id: number) => {
    setSelectedBerry(id);
    marsAudio.playChime();
    onBerryInspected();
  };

  const handleAnswer = (ans: 'yes' | 'no') => {
    setAnsweredQuestion(ans);
    if (ans === 'no') {
      marsAudio.playSuccess();
    } else {
      marsAudio.playClick();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden text-[#2A1810] pt-16 pb-20 px-3 sm:px-6">
      {/* LAYER 01: Full Illustrated Mars Landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/scenes/04_Scene_03_Berry_Bowl/Background.png"
          alt="المشهد الثالث: وعاء التوت"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/35 via-transparent to-[#2A1810]/25 pointer-events-none" />
        <DustOverlay intensity="low" />
      </div>

      {/* LAYER 02: Characters */}
      {/* Child Astronaut examining on the left */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-2 xl:left-6 top-24 z-20 w-64 xl:w-76 pointer-events-none filter drop-shadow-[0_15px_30px_rgba(40,15,10,0.6)]"
      >
        <img
          src="./assets/scenes/04_Scene_03_Berry_Bowl/01_Child_Astronaut_Transparent_APPROX.png"
          alt="رائدة الفضاء تتفحص الصخرة"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Rover in the midground distance */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-1/3 top-36 z-10 w-52 xl:w-60 pointer-events-none opacity-90 filter drop-shadow-[0_10px_20px_rgba(40,15,10,0.5)]"
      >
        <img
          src="./assets/scenes/04_Scene_03_Berry_Bowl/02_Oppy_Rover_Transparent_APPROX.png"
          alt="مركبة أوبي في الأفق"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* LAYER 03 & 04: Content & Interactive Investigation */}
      <div className="relative z-20 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center gap-4 my-auto" dir="rtl">
        {/* Header Badge */}
        <div className="text-center sm:text-right">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#713D43] text-[#F6EBDD] text-xs font-bold tracking-wider shadow-md mb-1">
            المشهد 03 • الاكتشاف الأغرب في فوهة Eagle Crater
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* CENTER-LEFT: Berry Bowl Rock + Interactive Spherules */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="parchment-panel p-4 w-full shadow-2xl border-3 border-[#C89658] relative">
              <div className="flex items-center justify-between mb-2 border-b border-[#C89658]/30 pb-1.5">
                <span className="text-xs font-bold text-[#713D43] flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-[#A95743]" />
                  انقر على الحبيبات المستديرة لفحصها
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#713D43] text-[#FFFDF9] font-mono">
                  تم فحص: {Math.max(berriesInspectedCount, selectedBerry ? 1 : 0)}/4
                </span>
              </div>

              {/* The Rock with Clickable Hotspots */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#C89658]/60 bg-[#2A1810]/5 shadow-inner">
                <img
                  src="./assets/scenes/04_Scene_03_Berry_Bowl/04_Berry_Bowl_Rock_Crop.png"
                  alt="صخرة وعاء التوت"
                  className="w-full h-auto object-cover max-h-[300px]"
                />

                {/* Hotspots */}
                {berryHotspots.map((berry) => (
                  <button
                    key={berry.id}
                    onClick={() => handleBerryClick(berry.id)}
                    style={{ left: berry.x, top: berry.y }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                      selectedBerry === berry.id
                        ? 'bg-[#E7B875] text-[#2A1810] scale-125 z-20 border-2 border-[#713D43]'
                        : 'bg-[#C85A32]/80 text-[#FFFDF9] hover:scale-110 hotspot-pulse'
                    }`}
                    title={berry.label}
                  >
                    <span className="text-xs font-black">●</span>
                  </button>
                ))}

                {/* Magnified circle overlay in bottom corner */}
                <div className="absolute bottom-2 left-2 w-24 h-24 rounded-full overflow-hidden border-3 border-[#E7B875] shadow-xl bg-[#2A1810]/20 pointer-events-none">
                  <img
                    src="./assets/scenes/04_Scene_03_Berry_Bowl/05_Berry_Bowl_Magnified_Detail_Crop.png"
                    alt="تكبير تفصيلي"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Berry details popup on selection */}
              <AnimatePresence>
                {selectedBerry && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2.5 p-2.5 rounded-xl bg-[#F5E8D0] border border-[#C89658] text-xs font-bold text-[#451B20] text-center"
                  >
                    <span>
                      {berryHotspots.find((b) => b.id === selectedBerry)?.label} • الحجم المقاس:{' '}
                      {berryHotspots.find((b) => b.id === selectedBerry)?.size} • شكل كروي منتظم!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Story Parchment & Question */}
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

              {/* Question Highlight */}
              <div className="p-3.5 rounded-xl bg-[#F5E8D0]/90 border-2 border-[#C89658] mb-4">
                <p className="font-extrabold text-[#713D43] text-xs sm:text-sm text-center mb-2.5">
                  {t.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAnswer('yes')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                      answeredQuestion === 'yes'
                        ? 'bg-[#713D43] text-[#FFFDF9] border-[#E7B875]'
                        : 'bg-[#FFF9F0] text-[#713D43] border-[#C89658] hover:bg-[#F5E8D0]'
                    }`}
                  >
                    {t.answerYes}
                  </button>

                  <button
                    onClick={() => handleAnswer('no')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                      answeredQuestion === 'no'
                        ? 'bg-gradient-to-r from-[#A95743] to-[#713D43] text-[#FFFDF9] border-[#E7B875] shadow-md scale-[1.02]'
                        : 'bg-[#FFF9F0] text-[#713D43] border-[#C89658] hover:bg-[#F5E8D0]'
                    }`}
                  >
                    {t.answerNo}
                  </button>
                </div>

                {answeredQuestion && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2.5 text-[11px] sm:text-xs font-bold text-[#451B20] text-center"
                  >
                    {answeredQuestion === 'no' ? (
                      <span className="text-[#A95743] flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E7B875]" />
                        {t.revealText}
                      </span>
                    ) : (
                      <span className="text-[#713D43]">
                        انتبه! الصورة تلتقط الضوء المنعكس فقط، ولا تكفي لمعرفة نوع العناصر والمعادن.
                      </span>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Need Measurement Button */}
              <div className="flex items-center justify-end">
                <button
                  onClick={() => {
                    marsAudio.playSuccess();
                    onContinue();
                  }}
                  className="mars-btn-primary px-8 py-3 text-xs sm:text-sm flex items-center gap-2 shadow-xl"
                >
                  <span>نحتاج إلى قياس دقيق! فحص الأدوات</span>
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
