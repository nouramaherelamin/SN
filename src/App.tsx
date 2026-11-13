import React, { useReducer, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingPage } from './scenes/LandingPage/LandingPage';
import { MysteriousImage } from './scenes/Scene01/MysteriousImage';
import { WhoIsOppy } from './scenes/Scene02/WhoIsOppy';
import { BerryBowl } from './scenes/Scene03/BerryBowl';
import { InspectTheTools } from './scenes/Scene04/InspectTheTools';
import { CompareTheEvidence } from './scenes/Scene05/CompareTheEvidence';
import { DetectiveConclusion } from './scenes/Scene06/DetectiveConclusion';
import { TheStorm } from './scenes/Scene07/TheStorm';
import { WhatRemains } from './scenes/Scene08/WhatRemains';
import { NasaSourcesScene } from './scenes/Scene10/NasaSourcesScene';
import { MissionCompleted } from './scenes/Scene10/MissionCompleted';
import { TopNavbar } from './components/Navigation/TopNavbar';
import { BottomNavigation } from './components/Navigation/BottomNavigation';
import { NasaSourcesModal } from './components/Modal/NasaSourcesModal';
import { EvidenceDrawerModal } from './components/Modal/EvidenceDrawerModal';
import { UserInvestigationState } from './types';
import { marsAudio } from './utils/audio';

// ─── State Management ───────────────────────────────────────────────────────

type Action =
  | { type: 'GO_TO_SCENE'; index: number }
  | { type: 'DEV_FORCE_SCENE'; index: number }
  | { type: 'NEXT_SCENE' }
  | { type: 'PREV_SCENE' }
  | { type: 'RESTART' }
  | { type: 'SET_OBSERVE_MODE'; mode: 'observe' | 'interpret' }
  | { type: 'RECORD_BERRY_INSPECT' }
  | { type: 'INSPECT_TOOL'; tool: 'pancam' | 'mossbauer' }
  | { type: 'RECORD_EVIDENCE'; evidence: 'berriesObserved' | 'hematiteMeasured' | 'ancientWaterSupported' }
  | { type: 'SET_CONCLUSION'; id: string }
  | { type: 'TOGGLE_MUTE' };

const TOTAL_SCENES = 11;

function getInitialState(): UserInvestigationState {
  let initScene = 0;
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    const sceneParam = searchParams.get('scene');
    if (sceneParam !== null) {
      initScene = Math.max(0, Math.min(TOTAL_SCENES - 1, parseInt(sceneParam, 10) || 0));
    } else {
      const hashMatch = window.location.hash.match(/scene=(\d+)/);
      if (hashMatch) {
        initScene = Math.max(0, Math.min(TOTAL_SCENES - 1, parseInt(hashMatch[1], 10) || 0));
      }
    }
  }

  return {
    currentSceneIndex: initScene,
    maxUnlockedSceneIndex: initScene,
    observedMode: null,
    inspectedBerryCount: initScene > 3 ? 4 : 0,
    inspectedTools: { pancam: initScene > 4, mossbauer: initScene > 4 },
    sampleComparisonView: 'comparison',
    conclusionSelectedId: initScene > 6 ? 'ancient-water' : null,
    stormDustOpacity: 0,
    stormTransmissionDecoded: false,
    evidenceItems: {
      berriesObserved: initScene > 1,
      hematiteMeasured: initScene > 5,
      ancientWaterSupported: initScene > 6,
    },
    soundMuted: false,
    sourcesActiveTab: 'sources',
  };
}

function reducer(state: UserInvestigationState, action: Action): UserInvestigationState {
  switch (action.type) {
    case 'DEV_FORCE_SCENE': {
      const idx = Math.max(0, Math.min(TOTAL_SCENES - 1, action.index));
      return {
        ...state,
        currentSceneIndex: idx,
        maxUnlockedSceneIndex: Math.max(state.maxUnlockedSceneIndex, idx),
      };
    }
    case 'GO_TO_SCENE': {
      const idx = Math.max(0, Math.min(TOTAL_SCENES - 1, action.index));
      if (idx > state.maxUnlockedSceneIndex) return state;
      return { ...state, currentSceneIndex: idx };
    }
    case 'NEXT_SCENE': {
      const next = Math.min(TOTAL_SCENES - 1, state.currentSceneIndex + 1);
      return {
        ...state,
        currentSceneIndex: next,
        maxUnlockedSceneIndex: Math.max(state.maxUnlockedSceneIndex, next),
      };
    }
    case 'PREV_SCENE': {
      return { ...state, currentSceneIndex: Math.max(0, state.currentSceneIndex - 1) };
    }
    case 'RESTART': {
      try { localStorage.removeItem('still-out-there-progress'); } catch {}
      return getInitialState();
    }
    case 'SET_OBSERVE_MODE':
      return { ...state, observedMode: action.mode };
    case 'RECORD_BERRY_INSPECT':
      return {
        ...state,
        inspectedBerryCount: state.inspectedBerryCount + 1,
        evidenceItems: { ...state.evidenceItems, berriesObserved: true },
      };
    case 'INSPECT_TOOL':
      return {
        ...state,
        inspectedTools: { ...state.inspectedTools, [action.tool]: true },
      };
    case 'RECORD_EVIDENCE':
      return {
        ...state,
        evidenceItems: { ...state.evidenceItems, [action.evidence]: true },
      };
    case 'SET_CONCLUSION':
      return {
        ...state,
        conclusionSelectedId: action.id,
        evidenceItems: {
          ...state.evidenceItems,
          ancientWaterSupported: action.id === 'ancient-water',
        },
      };
    case 'TOGGLE_MUTE':
      return { ...state, soundMuted: !state.soundMuted };
    default:
      return state;
  }
}

// ─── Scene Animation Variants ───────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, scale: 0.99 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.01 },
};

const pageTransition = {
  duration: 0.35,
  ease: 'easeInOut' as const,
};

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  const goNext = useCallback(() => {
    marsAudio.playTransition();
    dispatch({ type: 'NEXT_SCENE' });
  }, []);

  const goPrev = useCallback(() => {
    marsAudio.playTransition();
    dispatch({ type: 'PREV_SCENE' });
  }, []);

  const goTo = useCallback((i: number) => {
    marsAudio.playTransition();
    dispatch({ type: 'GO_TO_SCENE', index: i });
  }, []);

  const restart = useCallback(() => {
    marsAudio.playClick();
    dispatch({ type: 'RESTART' });
  }, []);

  if (typeof window !== 'undefined') {
    (window as any).__setTestScene = (idx: number) => {
      dispatch({ type: 'DEV_FORCE_SCENE', index: idx });
    };
    (window as any).__getTestState = () => state;
  }

  const evidenceCount = Object.values(state.evidenceItems).filter(Boolean).length;
  const isLanding = state.currentSceneIndex === 0;

  const renderScene = () => {
    switch (state.currentSceneIndex) {
      case 0: // Screen 01 — Landing Page
        return (
          <LandingPage
            onStart={goNext}
            onOpenSources={() => setSourcesOpen(true)}
          />
        );
      case 1: // Screen 02 — Scene 01: The Mysterious Image
        return (
          <MysteriousImage
            onContinue={goNext}
            onRecordEvidence={() => dispatch({ type: 'RECORD_BERRY_INSPECT' })}
            evidenceRecorded={state.evidenceItems.berriesObserved}
          />
        );
      case 2: // Screen 03 — Scene 02: Who Is Oppy?
        return <WhoIsOppy onContinue={goNext} />;
      case 3: // Screen 04 — Scene 03: Berry Bowl
        return (
          <BerryBowl
            onContinue={goNext}
            onBerryInspected={() => dispatch({ type: 'RECORD_BERRY_INSPECT' })}
            berriesInspectedCount={state.inspectedBerryCount}
          />
        );
      case 4: // Screen 05 — Scene 04: Inspect the Tools
        return (
          <InspectTheTools
            onContinue={goNext}
            onToolInspected={(tool) => dispatch({ type: 'INSPECT_TOOL', tool })}
            inspectedTools={state.inspectedTools}
          />
        );
      case 5: // Screen 06 — Scene 05: Compare the Evidence
        return (
          <CompareTheEvidence
            onContinue={goNext}
            onEvidenceRecorded={() => dispatch({ type: 'RECORD_EVIDENCE', evidence: 'hematiteMeasured' })}
          />
        );
      case 6: // Screen 07 — Scene 06: Detective Conclusion
        return (
          <DetectiveConclusion
            onContinue={goNext}
            onCorrectConclusion={() => {
              dispatch({ type: 'SET_CONCLUSION', id: 'ancient-water' });
              dispatch({ type: 'RECORD_EVIDENCE', evidence: 'ancientWaterSupported' });
            }}
          />
        );
      case 7: // Screen 08 — Scene 07: The Storm
        return <TheStorm onContinue={goNext} />;
      case 8: // Screen 09 — What Remains?
        return (
          <WhatRemains
            onContinue={goNext}
            onOpenSources={() => setSourcesOpen(true)}
            onRestart={restart}
            evidenceItems={state.evidenceItems}
          />
        );
      case 9: // Screen 10 — NASA Sources / Evidence Review
        return (
          <NasaSourcesScene
            onContinue={goNext}
            onPrev={goPrev}
            evidenceItems={state.evidenceItems}
          />
        );
      case 10: // Screen 11 — Mission Completed
        return (
          <MissionCompleted
            onRestart={restart}
            onOpenSources={() => setSourcesOpen(true)}
            onOpenEvidence={() => setEvidenceOpen(true)}
            onReturnHome={() => goTo(0)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-[#2A1810] overflow-x-hidden font-cairo" dir="rtl">
      {/* Top Navigation */}
      {!isLanding && (
        <TopNavbar
          currentSceneIndex={state.currentSceneIndex}
          maxUnlockedIndex={state.maxUnlockedSceneIndex}
          onSelectScene={goTo}
          onOpenSources={() => setSourcesOpen(true)}
          onOpenEvidence={() => setEvidenceOpen(true)}
          evidenceCount={evidenceCount}
        />
      )}

      {/* Scene Renderer with Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentSceneIndex}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="min-h-screen"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation (hide on Landing and Mission Completed) */}
      {state.currentSceneIndex > 0 && state.currentSceneIndex < 10 && (
        <BottomNavigation
          currentSceneIndex={state.currentSceneIndex}
          totalScenes={TOTAL_SCENES}
          onPrev={goPrev}
          onNext={goNext}
          onRestart={restart}
          nextLabel={
            state.currentSceneIndex === 9
              ? 'الختام والشهادة'
              : state.currentSceneIndex === 8
              ? 'مصادر ناسا ومراجعة الأدلة'
              : state.currentSceneIndex === 7
              ? 'ما الذي بقي؟'
              : 'المشهد التالي'
          }
        />
      )}

      {/* Global Modals */}
      <NasaSourcesModal isOpen={sourcesOpen} onClose={() => setSourcesOpen(false)} />
      <EvidenceDrawerModal
        isOpen={evidenceOpen}
        onClose={() => setEvidenceOpen(false)}
        evidence={state.evidenceItems}
      />
    </div>
  );
}
