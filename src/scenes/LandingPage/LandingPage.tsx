import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Search, ArrowLeft, Play, Mountain, Eye, Droplets } from 'lucide-react';
import { STORY_TEXTS } from '../../data/storyContent';
import { marsAudio } from '../../utils/audio';
import { DustOverlay } from '../../components/Effects/DustOverlay';

interface LandingPageProps {
  onStart: () => void;
  onOpenSources: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onOpenSources }) => {
  const t = STORY_TEXTS.landing;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden text-[#2A1810]">
      {/* LAYER 01: Full-Screen Clean Illustrated Mars Environment */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/scenes/01_Landing_Page/Background.png"
          alt="سطح كوكب المريخ المصور الأصلي"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/40 via-transparent to-[#2A1810]/20 pointer-events-none" />
        <DustOverlay intensity="medium" />
      </div>

      {/* Top Brand & Navigation Ribbon */}
      <header className="relative z-30 w-full px-4 sm:px-8 pt-4 pb-2" dir="rtl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-[#713D43] text-[#F6EBDD] border border-[#E7B875] text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#E7B875] animate-ping" />
              <span>القضية 07 • وكالة ناسا</span>
            </div>
            <span className="text-sm font-black font-cinzel text-[#F6EBDD] drop-shadow-md hidden sm:inline">
              STILL OUT THERE — OPPY
            </span>
          </div>

          <button
            onClick={() => {
              marsAudio.playClick();
              onOpenSources();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-[#FFF9F0]/90 hover:bg-[#FFF9F0] text-[#713D43] border border-[#C89658] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#A95743]" />
            <span>مصادر ناسا الرسمية</span>
          </button>
        </div>
      </header>

      {/* LAYER 02 & 03: Central Cinematic Composition (Matches Original Mockup Layout) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 my-auto" dir="ltr">
        {/* LEFT & CENTER: Child Astronaut on rocky ledge & Oppy Rover on Mars plateau */}
        <div className="relative w-full lg:w-3/5 flex items-end justify-start min-h-[360px] sm:min-h-[440px] lg:min-h-[500px]">
          {/* Subtle Martian sunlight glow behind characters */}
          <div className="absolute left-16 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-br from-[#E7B875]/30 via-[#A95743]/15 to-transparent blur-3xl pointer-events-none" />

          {/* Child Astronaut (Foreground hero, kneeling on the left rocky ledge) */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-20 w-60 sm:w-76 lg:w-88 xl:w-96 filter drop-shadow-[0_20px_40px_rgba(40,10,10,0.7)]"
          >
            <img
              src="./assets/scenes/01_Landing_Page/01_Child_Astronaut_Transparent_APPROX.png"
              alt="رائدة الفضاء الصغيرة المستكشفة"
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Opportunity Rover (Positioned on the plateau right next to the child, exactly like the original mockup) */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 w-52 sm:w-64 lg:w-72 xl:w-80 -ml-8 sm:-ml-12 mb-4 sm:mb-6 filter drop-shadow-[0_15px_30px_rgba(50,15,10,0.65)]"
          >
            <img
              src="./assets/scenes/01_Landing_Page/02_Oppy_Rover_Transparent_APPROX.png"
              alt="مركبة أوبي على المريخ"
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>

        {/* RIGHT: Illustrated Parchment Title Panel & Glowing Start Button */}
        <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-end text-center lg:text-right" dir="rtl">
          {/* Main Title Parchment Panel */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="parchment-panel p-5 sm:p-7 max-w-lg shadow-2xl border-3 border-[#C89658] relative"
          >
            {/* Magnifying Glass badge on the corner */}
            <div className="hidden sm:block absolute -top-5 -left-5 w-20 pointer-events-none filter drop-shadow-xl">
              <img
                src="./assets/scenes/01_Landing_Page/07_Magnifying_Glass_Crop.png"
                alt="عدسة التحقيق"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Case Badge Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#713D43] text-[#F6EBDD] text-xs font-bold mb-2.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#E7B875]" />
              <span>{t.caseTag}</span>
            </div>

            {/* Big Cinematic Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-[#713D43] tracking-wide mb-1 leading-tight">
              Still Out There
            </h1>
            <div className="text-base sm:text-lg font-black font-cairo text-[#713D43] mb-2 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-8 h-0.5 bg-[#C89658]" />
              <span>ملف Oppy</span>
              <span className="w-8 h-0.5 bg-[#C89658]" />
            </div>

            <div className="px-3 py-1 rounded-lg bg-[#713D43]/10 text-xs sm:text-sm font-black text-[#A95743] mb-3 inline-block">
              القضية 07: سرّ الحبيبات على المريخ
            </div>

            {/* Story Lead in warm dark ink */}
            <p className="text-xs sm:text-sm text-[#2A1810] font-semibold leading-relaxed border-t border-[#C89658]/40 pt-3">
              انضم إلى مغامرة تحقيق على المريخ، واكتشف كيف ساعدت العربة Oppy (Opportunity) العلماء على فهم ماضي الماء على الكوكب الأحمر.
            </p>
          </motion.div>

          {/* Action Start Button (Styled pill with glowing animation) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 w-full max-w-lg flex justify-center lg:justify-end"
          >
            <button
              onClick={() => {
                marsAudio.playSuccess();
                onStart();
              }}
              className="relative px-10 py-3.5 rounded-full bg-gradient-to-r from-[#A95743] via-[#C85A32] to-[#713D43] text-[#FFFDF9] text-base sm:text-lg font-black font-cairo border-2 border-[#E7B875] shadow-[0_0_25px_rgba(231,184,117,0.5)] hover:shadow-[0_0_35px_rgba(231,184,117,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
            >
              <span>ابدأ التحقيق</span>
              <div className="w-8 h-8 rounded-full bg-[#FFF9F0]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-current text-[#E7B875]" />
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* LAYER 04: Bottom Feature Bar (Matches the 3 icons from the mockup) */}
      <footer className="relative z-30 w-full px-4 sm:px-8 pb-4 pt-1" dir="rtl">
        <div className="max-w-4xl mx-auto parchment-card-sm p-3 sm:p-3.5 shadow-xl border-2 border-[#C89658]/70 bg-[#FFF9F0]/95 backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="flex items-center justify-center gap-2 p-1.5 rounded-xl bg-[#F5E8D0]/60">
              <Mountain className="w-4 h-4 text-[#A95743]" />
              <div className="text-right">
                <span className="text-xs font-black text-[#713D43] block">تحقيق حقيقي</span>
                <span className="text-[11px] text-[#451B20] font-medium">مستند إلى بيانات NASA</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 p-1.5 rounded-xl bg-[#F5E8D0]/60">
              <Eye className="w-4 h-4 text-[#C85A32]" />
              <div className="text-right">
                <span className="text-xs font-black text-[#713D43] block">مهمة استكشافية</span>
                <span className="text-[11px] text-[#451B20] font-medium">امتدت قرابة 15 سنة</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 p-1.5 rounded-xl bg-[#F5E8D0]/60">
              <Droplets className="w-4 h-4 text-[#713D43]" />
              <div className="text-right">
                <span className="text-xs font-black text-[#713D43] block">أدلة على الماء</span>
                <span className="text-[11px] text-[#451B20] font-medium">في ماضي المريخ</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
