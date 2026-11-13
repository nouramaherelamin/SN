import React from 'react';
import { ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { marsAudio } from '../../utils/audio';

interface BottomNavigationProps {
  currentSceneIndex: number;
  totalScenes: number;
  onPrev: () => void;
  onNext: () => void;
  onRestart: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  hintText?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentSceneIndex,
  totalScenes,
  onPrev,
  onNext,
  onRestart,
  nextDisabled = false,
  nextLabel = 'المشهد التالي',
  hintText,
}) => {
  const isFirst = currentSceneIndex === 0;
  const isLast = currentSceneIndex === totalScenes - 1;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-[#2A1810]/70 via-[#2A1810]/30 to-transparent pt-6 pb-4 px-4 sm:px-8 pointer-events-none">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-auto" dir="rtl">
        {/* Right side: Prev button */}
        <div className="flex items-center gap-2 order-2 sm:order-1">
          {!isFirst ? (
            <button
              onClick={() => {
                marsAudio.playTransition();
                onPrev();
              }}
              className="mars-btn-secondary flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm shadow-md"
            >
              <ArrowRight className="w-4 h-4 text-[#A95743]" />
              <span>المشهد السابق</span>
            </button>
          ) : (
            <div className="w-24 hidden sm:block" />
          )}

          {isLast && (
            <button
              onClick={() => {
                marsAudio.playClick();
                onRestart();
              }}
              className="mars-btn-secondary flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm shadow-md"
            >
              <RotateCcw className="w-4 h-4 text-[#A95743]" />
              <span>إعادة الرحلة</span>
            </button>
          )}
        </div>

        {/* Center: Hint or prompt for the child */}
        {hintText && (
          <div className="order-1 sm:order-2 px-4 py-1.5 rounded-full parchment-card-sm border border-[#C89658] text-xs text-[#713D43] text-center font-bold shadow-sm backdrop-blur-sm">
            {hintText}
          </div>
        )}

        {/* Left side: Next button */}
        <div className="order-3">
          {!isLast && (
            <button
              disabled={nextDisabled}
              onClick={() => {
                marsAudio.playTransition();
                onNext();
              }}
              className={`mars-btn-primary flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm shadow-lg ${
                nextDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>{nextLabel}</span>
              <ArrowLeft className="w-4 h-4 text-[#E7B875]" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
