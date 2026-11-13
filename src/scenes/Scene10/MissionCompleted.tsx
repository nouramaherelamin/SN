import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, Share2, RotateCcw, Home, BookOpen, Briefcase, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { STORY_TEXTS } from '../../data/storyContent';
import { marsAudio } from '../../utils/audio';
import { DustOverlay } from '../../components/Effects/DustOverlay';

interface MissionCompletedProps {
  onRestart: () => void;
  onOpenSources: () => void;
  onOpenEvidence: () => void;
  onReturnHome: () => void;
}

export const MissionCompleted: React.FC<MissionCompletedProps> = ({
  onRestart,
  onOpenSources,
  onOpenEvidence,
  onReturnHome,
}) => {
  const t = STORY_TEXTS.missionCompleted;
  const [copied, setCopied] = useState(false);

  // Trigger celebration confetti
  React.useEffect(() => {
    marsAudio.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E7B875', '#C85A32', '#713D43', '#F6EBDD', '#B66F70'],
      });
    } catch {}
  }, []);

  const handleShare = async () => {
    marsAudio.playSuccess();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {}

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'STILL OUT THERE — مستمرة في مكانها: أوبي',
          text: 'لقد أتممت بنجاح التحقيق في القضية 07 وحللت لغز حبات التوت على المريخ مع مركبة أوبي!',
          url: window.location.href,
        });
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden text-[#2A1810] pt-16 pb-20 px-3 sm:px-6">
      {/* LAYER 01: Full Illustrated Celebratory Mars Landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/scenes/01_Landing_Page/Background.png"
          alt="المهمة اكتملت بنجاح"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/40 via-[#E7B875]/10 to-[#2A1810]/25 pointer-events-none" />
        <DustOverlay intensity="low" />
      </div>

      {/* LAYER 02: Characters */}
      {/* Child Astronaut in joyous celebration pose */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 1, -1, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-2 xl:left-8 bottom-6 z-20 w-64 xl:w-76 pointer-events-none filter drop-shadow-[0_20px_40px_rgba(40,15,10,0.65)]"
      >
        <img
          src="./assets/scenes/11_Mission_Completed/01_Child_Astronaut_Celebration_Transparent_APPROX.png"
          alt="رائدة الفضاء تحتفل بالنجاح"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Celebratory Oppy Rover */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-[28%] bottom-10 z-10 w-56 xl:w-64 pointer-events-none filter drop-shadow-[0_15px_30px_rgba(40,15,10,0.6)]"
      >
        <img
          src="./assets/scenes/01_Landing_Page/02_Oppy_Rover_Transparent_APPROX.png"
          alt="مركبة أوبي تحتفل"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Thank You Oppy Polaroid on the right */}
      <motion.div
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden xl:block absolute right-6 top-32 z-10 w-52 pointer-events-none filter drop-shadow-2xl"
      >
        <img
          src="./assets/scenes/11_Mission_Completed/11_Thank_You_Oppy_Polaroid_Crop.png"
          alt="صورة بولارويد تذكارية لأوبي"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* LAYER 03 & 04: Content & Completion Dashboard */}
      <div className="relative z-20 max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center gap-4 my-auto" dir="rtl">
        {/* Completion Title Parchment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="parchment-panel p-5 sm:p-6 text-center shadow-2xl border-3 border-[#C89658]"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#713D43] text-[#F6EBDD] text-xs font-bold mb-2 shadow-md">
            <Award className="w-4 h-4 text-[#E7B875]" />
            <span>شهادة المحقق المريخي الصغير • القضية 07</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-cinzel text-[#713D43] tracking-wide mb-1">
            MISSION COMPLETED
          </h1>
          <h2 className="text-lg sm:text-xl font-bold font-cairo text-[#A95743] mb-2">
            اكتملت المهمة بنجاح يا بطل الفضاء!
          </h2>
          <p className="text-xs sm:text-sm text-[#451B20] font-semibold max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* 3 Lessons Learned Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {t.lessons.map((lesson, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="parchment-panel p-3.5 flex flex-col justify-between shadow-lg border-2 border-[#C89658]"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#713D43] text-[#E7B875] flex items-center justify-center font-bold text-xs mb-2">
                  0{idx + 1}
                </div>
                <h3 className="text-xs sm:text-sm font-extrabold text-[#713D43] mb-1">
                  {lesson.title}
                </h3>
                <p className="text-[11px] text-[#451B20] font-semibold leading-relaxed">
                  {lesson.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons: Share, Restart, Return Home */}
        <div className="parchment-card-sm p-4 border-2 border-[#C89658] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
          <button
            onClick={handleShare}
            className="mars-btn-primary w-full sm:w-auto px-7 py-3 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl"
          >
            <Share2 className="w-4 h-4 text-[#E7B875]" />
            <span>{copied ? 'تم نسخ الرابط للمشاركة!' : 'شارك إنجاز التحقيق'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                marsAudio.playClick();
                onRestart();
              }}
              className="mars-btn-secondary flex-1 sm:flex-none px-5 py-2.5 text-xs flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#A95743]" />
              <span>إعادة المغامرة</span>
            </button>

            <button
              onClick={() => {
                marsAudio.playClick();
                onReturnHome();
              }}
              className="mars-btn-secondary flex-1 sm:flex-none px-5 py-2.5 text-xs flex items-center justify-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5 text-[#713D43]" />
              <span>الصفحة الرئيسية</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
