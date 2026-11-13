import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  BookOpen,
  Briefcase,
  ChevronDown,
  Sparkles,
  Search,
  Maximize,
  Minimize,
  Wind,
} from 'lucide-react';
import { SCENES_META } from '../../data/storyContent';
import { marsAudio } from '../../utils/audio';

interface TopNavbarProps {
  currentSceneIndex: number;
  maxUnlockedIndex: number;
  onSelectScene: (index: number) => void;
  onOpenSources: () => void;
  onOpenEvidence: () => void;
  evidenceCount: number;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentSceneIndex,
  maxUnlockedIndex,
  onSelectScene,
  onOpenSources,
  onOpenEvidence,
  evidenceCount,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showSceneMenu, setShowSceneMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAmbientOn, setIsAmbientOn] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    marsAudio.isMuted = nextMuted;
    if (!nextMuted) {
      marsAudio.playClick();
    }
  };

  const toggleAmbient = () => {
    marsAudio.playClick();
    const nextAmbient = !isAmbientOn;
    setIsAmbientOn(nextAmbient);
    marsAudio.toggleAmbient(nextAmbient);
  };

  const toggleFullscreen = () => {
    marsAudio.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const currentMeta = SCENES_META[currentSceneIndex] || SCENES_META[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FFF9F0]/92 backdrop-blur-md border-b-2 border-[#C89658]/60 px-3 sm:px-6 py-2 transition-all shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2" dir="rtl">
        {/* Left: Case Badge & Scene Selector */}
        <div className="flex items-center gap-2 sm:gap-3 relative">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#713D43] text-[#FFFDF9] text-xs font-bold border border-[#E7B875] shadow-sm">
            <Search className="w-3.5 h-3.5 text-[#E7B875]" />
            <span className="font-cinzel tracking-wider text-[11px] sm:text-xs">
              CASE 07
            </span>
          </div>

          {/* Scene Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                marsAudio.playClick();
                setShowSceneMenu(!showSceneMenu);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5E8D0] hover:bg-[#EBD8B8] border border-[#C89658] text-xs sm:text-sm text-[#713D43] font-bold transition-colors shadow-sm"
              aria-label="اختيار المشهد"
            >
              <span className="text-[#C85A32] font-mono font-black">
                {String(currentSceneIndex + 1).padStart(2, '0')}/11
              </span>
              <span className="hidden sm:inline font-cairo truncate max-w-[150px] md:max-w-[220px]">
                {currentMeta.titleAr}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform text-[#A95743] ${
                  showSceneMenu ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showSceneMenu && (
              <div
                className="absolute right-0 mt-2 w-72 sm:w-84 max-h-96 overflow-y-auto parchment-panel p-2.5 shadow-2xl z-50 border-2 border-[#C89658]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-[11px] font-bold text-[#A95743] px-3 py-1.5 border-b border-[#C89658]/30">
                  فصول المغامرة (المشاهد المتاحة)
                </div>
                <div className="py-1">
                  {SCENES_META.map((meta) => {
                    const isUnlocked = meta.index <= maxUnlockedIndex;
                    const isCurrent = meta.index === currentSceneIndex;
                    return (
                      <button
                        key={meta.index}
                        disabled={!isUnlocked}
                        onClick={() => {
                          marsAudio.playClick();
                          onSelectScene(meta.index);
                          setShowSceneMenu(false);
                        }}
                        className={`w-full text-right px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors my-0.5 ${
                          isCurrent
                            ? 'bg-[#713D43] text-[#FFFDF9] font-bold shadow-sm'
                            : isUnlocked
                            ? 'text-[#2A1810] hover:bg-[#F5E8D0]'
                            : 'text-gray-400 cursor-not-allowed opacity-50'
                        }`}
                      >
                        <span className="truncate">
                          {meta.numberLabel}. {meta.titleAr}
                        </span>
                        {isCurrent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E7B875]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick Tools (Evidence Bag, Sources, Ambient Wind, Mute, Fullscreen) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Evidence Bag Button */}
          <button
            onClick={() => {
              marsAudio.playClick();
              onOpenEvidence();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#F5E8D0] hover:bg-[#EBD8B8] border border-[#C89658] text-xs font-bold text-[#713D43] transition-colors shadow-sm"
          >
            <Briefcase className="w-3.5 h-3.5 text-[#A95743]" />
            <span className="hidden sm:inline">ملف الأدلة</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#713D43] text-[#FFFDF9] text-[10px] font-mono">
              {evidenceCount}/3
            </span>
          </button>

          {/* NASA Sources Button */}
          <button
            onClick={() => {
              marsAudio.playClick();
              onOpenSources();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#F5E8D0] hover:bg-[#EBD8B8] border border-[#C89658] text-xs font-bold text-[#713D43] transition-colors shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C85A32]" />
            <span className="hidden md:inline">مصادر ناسا</span>
          </button>

          {/* Ambient Mars Wind Audio Toggle */}
          <button
            onClick={toggleAmbient}
            className={`p-1.5 rounded-xl border border-[#C89658] transition-colors shadow-sm ${
              isAmbientOn
                ? 'bg-[#E7B875] text-[#2A1810]'
                : 'bg-[#F5E8D0] hover:bg-[#EBD8B8] text-[#713D43]'
            }`}
            title={isAmbientOn ? 'إيقاف رياح المريخ المحيطية' : 'تشغيل صوت رياح المريخ'}
          >
            <Wind className="w-4 h-4" />
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-xl bg-[#F5E8D0] hover:bg-[#EBD8B8] border border-[#C89658] text-[#713D43] transition-colors shadow-sm"
            title={isMuted ? 'تشغيل المؤثرات الصوتية' : 'كتم الصوت'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-[#A95743]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#C85A32]" />
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-xl bg-[#F5E8D0] hover:bg-[#EBD8B8] border border-[#C89658] text-[#713D43] transition-colors shadow-sm"
            title={isFullscreen ? 'الخروج من وضع ملء الشاشة' : 'وضع ملء الشاشة'}
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4 text-[#A95743]" />
            ) : (
              <Maximize className="w-4 h-4 text-[#713D43]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
