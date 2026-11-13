export type SceneKey =
  | 'landing'
  | 'mysterious-image'
  | 'who-is-oppy'
  | 'berry-bowl'
  | 'inspect-tools'
  | 'compare-evidence'
  | 'detective-conclusion'
  | 'the-storm'
  | 'what-remains'
  | 'nasa-sources'
  | 'mission-completed';

export interface SceneMeta {
  index: number;
  key: SceneKey;
  folder: string;
  numberLabel: string;
  titleAr: string;
  titleEn: string;
  caseBadge: string;
}

export interface NasSource {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  url: string;
  badge: string;
  iconName: string;
}

export interface UserInvestigationState {
  currentSceneIndex: number;
  maxUnlockedSceneIndex: number;
  observedMode: 'observe' | 'interpret' | null;
  inspectedBerryCount: number;
  inspectedTools: {
    pancam: boolean;
    mossbauer: boolean;
  };
  sampleComparisonView: 'berry-bowl' | 'empty' | 'comparison';
  conclusionSelectedId: string | null;
  stormDustOpacity: number;
  stormTransmissionDecoded: boolean;
  evidenceItems: {
    berriesObserved: boolean;
    hematiteMeasured: boolean;
    ancientWaterSupported: boolean;
  };
  soundMuted: boolean;
  sourcesActiveTab?: 'sources' | 'evidence';
}
