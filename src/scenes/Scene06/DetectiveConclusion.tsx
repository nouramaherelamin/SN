import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, ArrowLeft, Award, Sparkles } from 'lucide-react';
import { STORY_TEXTS } from '../../data/storyContent';
import { marsAudio } from '../../utils/audio';
import { DustOverlay } from '../../components/Effects/DustOverlay';

interface DetectiveConclusionProps {
  onContinue: () => void;
  onCorrectConclusion: () => void;
}

export const DetectiveConclusion: React.FC<DetectiveConclusionProps> = ({
  onContinue,
  onCorrectConclusion,
}) => {
  const t = STORY_TEXTS.scene06;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (id: string) => {
    setSelectedOption(id);
    setSubmitted(false);
    marsAudio.playClick();
  };

  const handleConfirm = () => {
    setSubmitted(true);
    if (selectedOption === 'ancient-water') {
      marsAudio.playSuccess();
      onCorrectConclusion();
    } else {
      marsAudio.playClick();
    }
  };

  const isCorrect = selectedOption === 'ancient-water';

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden text-[#2A1810] pt-16 pb-20 px-3 sm:px-6">
      {/* LAYER 01: Full Illustrated Mars Landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/scenes/07_Scene_06_Detective_Conclusion/Background.png"
          alt="المشهد السادس: استنتاج المحقق"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/35 via-transparent to-[#2A1810]/25 pointer-events-none" />
        <DustOverlay intensity="low" />
      </div>

      {/* LAYER 02: Characters */}
      {/* Child Astronaut thinking on the left */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute left-2 xl:left-6 bottom-8 z-20 w-60 xl:w-72 pointer-events-none filter drop-shadow-[0_15px_30px_rgba(40,15,10,0.6)]"
      >
        <img
          src="./assets/scenes/07_Scene_06_Detective_Conclusion/01_Child_Astronaut_Transparent_APPROX.png"
          alt="رائدة الفضاء تستنتج"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* LAYER 03 & 04: Content & Four Evidence Cards Grid */}
      <div className="relative z-20 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center gap-4 my-auto" dir="rtl">
        {/* Header Badge */}
        <div className="text-center sm:text-right">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#713D43] text-[#F6EBDD] text-xs font-bold tracking-wider shadow-md mb-1">
            المشهد 06 • استنتاج المحقق العلمي الصغير
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* CENTER-LEFT: The 4 Evidence Cards Grid */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="parchment-panel p-4 w-full shadow-2xl border-3 border-[#C89658] relative">
              <div className="flex items-center justify-between mb-2.5 border-b border-[#C89658]/30 pb-1.5">
                <span className="text-xs font-bold text-[#713D43] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A95743]" />
                  شبكة الأدلة العلمية الأربعة
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#713D43] text-[#FFFDF9] font-mono">
                  3 أدلة مثبتة • 1 غير مثبت
                </span>
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Card 1: Observation */}
                <div className="p-2.5 rounded-xl bg-[#FFF9F0] border-2 border-[#C89658] shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#A95743] block">الدليل 1 • ملاحظة</span>
                    <span className="text-xs font-extrabold text-[#713D43] block mt-0.5">
                      ١. شوهدت حبيبات كروية
                    </span>
                    <p className="text-[10px] text-[#451B20] font-medium mt-1 leading-snug">
                      كاميرا Pancam وثقت شكل الحبيبات الكروية الصغيرة وقطرها 1-4 ملم.
                    </p>
                  </div>
                  <div className="mt-2 text-left">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[9px] font-bold">
                      ✓ مثبت بالصورة
                    </span>
                  </div>
                </div>

                {/* Card 2: Measurement */}
                <div className="p-2.5 rounded-xl bg-[#FFF9F0] border-2 border-[#C89658] shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#C85A32] block">الدليل 2 • قياس</span>
                    <span className="text-xs font-extrabold text-[#713D43] block mt-0.5">
                      ٢. قيس معدن الهيماتيت
                    </span>
                    <p className="text-[10px] text-[#451B20] font-medium mt-1 leading-snug">
                      مطياف Mössbauer أثبت تركيزاً غير عادي للهيماتيت في الحبيبات.
                    </p>
                  </div>
                  <div className="mt-2 text-left">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[9px] font-bold">
                      ✓ مثبت بالقياس
                    </span>
                  </div>
                </div>

                {/* Card 3: Supported Conclusion */}
                <div className="p-2.5 rounded-xl bg-[#E7B875]/30 border-2 border-[#E7B875] shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#713D43] block">الدليل 3 • استنتاج</span>
                    <span className="text-xs font-extrabold text-[#713D43] block mt-0.5">
                      ٣. يدعم وجود ماء قديم
                    </span>
                    <p className="text-[10px] text-[#451B20] font-medium mt-1 leading-snug">
                      تكوّن الهيماتيت بهذه الصيغة يتطلب تفاعل ماء سائل قديماً في هذه الصخور.
                    </p>
                  </div>
                  <div className="mt-2 text-left">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[9px] font-bold">
                      ✓ استنتاج قوي
                    </span>
                  </div>
                </div>

                {/* Card 4: Locked / Life NOT Proven */}
                <div className="p-2.5 rounded-xl bg-gray-200/60 border-2 border-gray-400/50 shadow-sm opacity-80 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gray-600 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>غير مدعوم بالأدلة</span>
                    </span>
                    <span className="text-xs font-extrabold text-gray-700 block mt-0.5">
                      ٤. لم يثبت وجود حياة
                    </span>
                    <p className="text-[10px] text-gray-600 font-medium mt-1 leading-snug">
                      الهيماتيت معدن غير عضوي، ولا يثبت إطلاقاً وجود كائنات حية.
                    </p>
                  </div>
                  <div className="mt-2 text-left">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[9px] font-bold">
                      ✕ لا تدعمه الأدلة
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Story Parchment & Interactive Quiz */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              className="parchment-panel p-5 sm:p-7 shadow-2xl border-3 border-[#C89658]"
            >
              <h2 className="text-2xl sm:text-3xl font-black font-cairo text-[#713D43] mb-2">
                {t.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#2A1810] font-semibold leading-relaxed mb-3">
                {t.paragraphs[0]} {t.paragraphs[1]} {t.paragraphs[2]}
              </p>

              {/* Interactive Quiz Question */}
              <div className="p-3.5 rounded-xl bg-[#F5E8D0]/90 border-2 border-[#C89658] mb-3">
                <span className="text-xs sm:text-sm font-extrabold text-[#713D43] block mb-2.5 text-center">
                  {t.question}
                </span>

                <div className="space-y-2">
                  {t.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      className={`w-full p-2.5 rounded-xl text-xs font-bold text-right flex items-center justify-between border-2 transition-all ${
                        selectedOption === opt.id
                          ? 'bg-[#713D43] text-[#FFFDF9] border-[#E7B875] shadow-md scale-[1.01]'
                          : 'bg-[#FFF9F0] text-[#713D43] border-[#C89658] hover:bg-[#F5E8D0]'
                      }`}
                    >
                      <span className="leading-snug">{opt.text}</span>
                      {selectedOption === opt.id && (
                        <span className="text-[#E7B875] font-black shrink-0 mr-2">●</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Confirm / Check Button */}
                <div className="mt-3 flex justify-center">
                  <button
                    disabled={!selectedOption}
                    onClick={handleConfirm}
                    className={`px-6 py-2 rounded-xl text-xs font-bold shadow-md transition-all ${
                      selectedOption
                        ? 'bg-gradient-to-r from-[#A95743] to-[#713D43] text-[#FFFDF9] border border-[#E7B875] hover:scale-105 active:scale-95'
                        : 'bg-gray-400/40 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    تأكيد إجابة المحقق
                  </button>
                </div>

                {/* Feedback on submit */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-2.5 p-2.5 rounded-xl text-xs font-bold text-center border ${
                      isCorrect
                        ? 'bg-green-100 text-green-900 border-green-300'
                        : 'bg-red-100 text-red-900 border-red-300'
                    }`}
                  >
                    {t.options.find((o) => o.id === selectedOption)?.feedback}
                  </motion.div>
                )}
              </div>

              {/* Proceed to The Storm */}
              <div className="flex items-center justify-end">
                <button
                  onClick={() => {
                    marsAudio.playSuccess();
                    onContinue();
                  }}
                  className="mars-btn-primary px-8 py-3 text-xs sm:text-sm flex items-center gap-2 shadow-xl"
                >
                  <span>ما الذي حدث بعد ذلك؟ العاصفة الكبرى</span>
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
