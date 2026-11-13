# Still Out There — The Oppy Investigation
## ملف القضية 07: لغز حبات التوت المريخية (The Mystery of the Martian Blueberries)

[![React](https://img.shields.io/badge/React-19.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.3-38B2AC.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.1-FF0055.svg)](https://www.framer.com/motion/)

An immersive, cinematic, interactive educational storytelling website for children inspired by NASA's Mars Exploration Rover **Opportunity** ("Oppy") and the groundbreaking discovery of hematite-rich spherules ("Martian Blueberries") in the "Berry Bowl" rock outcrop at Meridiani Planum.

---

## Table of Contents
1. [Overview & Narrative Experience](#overview--narrative-experience)
2. [Tech Stack & Architecture](#tech-stack--architecture)
3. [The Three-Layer Scene Architecture](#the-three-layer-scene-architecture)
4. [Complete 11-Screen Narrative Flow](#complete-11-screen-narrative-flow)
5. [Interactive Features & Educational Mechanics](#interactive-features--educational-mechanics)
6. [Synthesized Audio Engine (Web Audio API)](#synthesized-audio-engine-web-audio-api)
7. [Visual Assets & Preservation Guarantee](#visual-assets--preservation-guarantee)
8. [NASA Sources & Scientific References](#nasa-sources--scientific-references)
9. [Getting Started & Build Instructions](#getting-started--build-instructions)
10. [Verification & Visual Evidence](#verification--visual-evidence)

---

## Overview & Narrative Experience

**Still Out There — The Oppy Investigation** bridges rich storybook illustration with interactive detective gameplay. Accompanied by a young child astronaut and the Opportunity rover, young detectives explore high-resolution Mars landscapes, examine scientific instruments, compare microscopic rock samples, and formulate scientific hypotheses.

### Core Experience Principles
- **Child-First UX:** Intuitive, friendly interactions, high-contrast typography in Arabic (`Cairo`, `Amiri`) and English (`Cinzel`), playful animations, and supportive feedback.
- **Scientific Accuracy:** Rooted in peer-reviewed findings from NASA Jet Propulsion Laboratory (JPL) and the Mars Exploration Rover mission (2004–2018).
- **Distinction between Water and Life:** Emphasizes that hematite spherules provide strong evidence for ancient liquid water, not direct proof of past biological life.
- **Emotional Resonance:** Honors Oppy's unprecedented 14.5-year mission (planned for only 90 Martian sols) and its poignant farewell during the planetary dust storm of June 2018.

---

## Tech Stack & Architecture

- **Framework:** React 19 (`react`, `react-dom`)
- **Language:** TypeScript 7 (strict type safety)
- **Bundler & Dev Server:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) with custom themes, glowing amber/cyan effects, and parchment styling
- **Motion & Micro-interactions:** Framer Motion v14 (`framer-motion`)
- **Icons:** Lucide React (`lucide-react`) + authentic custom mission icons
- **Special FX:** Canvas Confetti (`canvas-confetti`)
- **Sound Design:** Procedural Web Audio API synthesizer (zero external audio file dependencies, 100% reliable offline)

---

## The Three-Layer Scene Architecture

Every scene strictly conforms to the **Three-Layer Architecture** to guarantee visual depth, parallax capability, responsive scaling, and clean separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 3: Interactive UI & HUD                              │
│  (Arabic/English titles, buttons, evidence cards, popups)   │
├─────────────────────────────────────────────────────────────┤
│  Layer 2: Transparent Characters & Scientific Cutouts       │
│  (Child astronaut, Oppy rover, Berry Bowl, instruments)     │
├─────────────────────────────────────────────────────────────┤
│  Layer 1: Clean High-Resolution Background Art              │
│  (Martian sky, distant crater ridges, rocky soil, dust)     │
└─────────────────────────────────────────────────────────────┘
```

1. **Layer 1 — Clean Background Art:** High-resolution 1672×941 Martian vistas without embedded characters or UI text, preserving authentic lighting and dust atmosphere.
2. **Layer 2 — Characters & Objects:** Authentic cutouts from `Character_Reference.png` (curly-haired child in a bubble-helmet purple spacesuit) and Opportunity's rover chassis, positioned with CSS coordinates, floating idle animations, and subtle parallax.
3. **Layer 3 — Interaction Layer:** Interactive detective UI, bilingual titles, glowing action buttons, magnification lenses, tool inspection callouts, and animated feedback modals.

---

## Complete 11-Screen Narrative Flow

| Screen # | Narrative Title | File / Component | Primary Narrative & Pedagogical Purpose |
|:---:|:---|:---|:---|
| **01** | **Landing Page**<br>ملف القضية 07 | `src/scenes/LandingPage/LandingPage.tsx` | Atmospheric welcome to Mars. Introduces the cold case, the child astronaut, Oppy rover, "Start Investigation" primary CTA, and quick access to NASA Sources. |
| **02** | **The Mysterious Image**<br>الصورة الغامضة | `src/scenes/Scene01/MysteriousImage.tsx` | The child spots strange spherical beads embedded in Martian rock. Features interactive magnification lens and scientific discovery prompts. |
| **03** | **Who Is Oppy?**<br>من هو أوبي؟ | `src/scenes/Scene02/WhoIsOppy.tsx` | Introduces the Opportunity rover: launched in 2003, landed 2004, designed for 90 Martian days (Sols) but persevered for 15 Earth years (5,111 Sols and 45.16 km). |
| **04** | **Berry Bowl**<br>وعاء التوت | `src/scenes/Scene03/BerryBowl.tsx` | Deep forensic dive into the "Berry Bowl" outcrop in Eagle Crater. Interactive zoom reveals spherical hematite concretions formed in liquid water. |
| **05** | **Inspect the Tools**<br>أدوات أوبي العلمية | `src/scenes/Scene04/InspectTheTools.tsx` | Interactive robotic arm inspector. Clickable hotspots explain Pancam (high-res stereo cameras), Mössbauer Spectrometer (mineral iron composition), Microscopic Imager, and the Rock Abrasion Tool (RAT). |
| **06** | **Compare the Evidence**<br>مقارنة الأدلة | `src/scenes/Scene05/CompareTheEvidence.tsx` | Side-by-side scientific comparison between the "Berry Bowl" outcrop and an empty basaltic rock, showing spectral differences in hematite content. |
| **07** | **Detective Conclusion**<br>استنتاج المحقق الصغير | `src/scenes/Scene06/DetectiveConclusion.tsx` | Interactive quiz challenging the young detective to deduce what the hematite berries prove. Provides instant scientific feedback explaining why water $\neq$ proof of life. |
| **08** | **The Storm**<br>العاصفة الترابية 2018 | `src/scenes/Scene07/TheStorm.tsx` | Dramatic atmospheric scene depicting the global dust storm of June 2018. Includes custom canvas storm particles, solar power depletion meter, and the historical last transmission attempt. |
| **09** | **What Remains?**<br>ماذا بقي؟ | `src/scenes/Scene08/WhatRemains.tsx` | Emotional transition reflecting on Oppy's legacy. Interactive open evidence suitcase revealing the 3 physical clues collected during the mission. |
| **10** | **NASA Sources & Evidence Dossier**<br>المصادر الرسمية وملف الأدلة | `src/scenes/Scene10/NasaSourcesScene.tsx` | Comprehensive dual-tabbed hub: official verified NASA/JPL source links (with live external links) and a complete scientific evidence dossier. |
| **11** | **Mission Completed**<br>اكتملت المهمة | `src/scenes/Scene10/MissionCompleted.tsx` | Joyful celebration with colorful confetti, summary badge of achievements (Life needs water, Ancient water on Mars, Hematite discovery), "Thank you Oppy" tribute, and replay options. |

---

## Interactive Features & Educational Mechanics

- **Interactive Magnification:** Real-time zoom lens on the Berry Bowl outcrop allowing children to see the micro-texture of the hematite spheres up close.
- **Robotic Hotspot Tool Inspector:** Clickable pulsing markers on Oppy's Pancam mast and robotic arm (IDD) revealing educational tool cards.
- **Side-by-Side Rock Comparator:** Toggle between Berry-rich rock and control rock with spectral hematite meter readings.
- **Detective Hypothesis Quiz:** Multi-choice interactive questionnaire with explanatory feedback preventing passive guessing.
- **Particle Storm Simulator:** Dynamic HTML5 Canvas rendering of Martian dust swirling across the screen with adjustable storm density and howling wind audio.
- **Interactive Evidence Suitcase:** Clickable suitcase tabs opening physical cards for the Berry sample, Mössbauer spectrum, and water habitability diagram.
- **Confetti Celebration:** Physics-based particle celebration on mission completion.
- **Dual-Mode Navigation:** Top progress HUD (direct scene jump dropdown, fullscreen toggle, sound controls, mute toggle) and bottom forward/backward navigation dock.

---

## Synthesized Audio Engine (Web Audio API)

To guarantee 100% offline reliability without missing asset errors or browser autoplay blockages, audio is generated procedurally via the browser's native **Web Audio API** (`src/utils/audio.ts`):

- **Ambient Mars Wind (`toggleAmbient`):** Pink-noise procedural generator combined with dual resonant bandpass filters (120Hz & 380Hz) and slow LFO modulation, evoking the desolate wind of the Martian plains.
- **UI Click (`playClick`):** Warm mechanical click modeled after scientific rover instrument relays.
- **Discovery Chime (`playChime`):** Sparkling pentatonic frequency sweep ($523.25\text{ Hz} \to 783.99\text{ Hz}$) when uncovering new clues.
- **Success Fanfare (`playSuccess`):** Ascending major triad ($C_5 \to E_5 \to G_5 \to C_6$) with harmonic overtone decay on quiz completion.
- **Transition Swoosh (`playTransition`):** Low-frequency whoosh with dynamic low-pass sweep for scene transitions.
- **Dust Storm Howl (`playStorm`):** Dynamic multi-oscillator turbulent wind with randomized gain gusts.
- **Safe Audio Policy:** Audio initializes on the first user interaction, strictly conforming to modern browser autoplay policies. The top navigation bar includes an ambient sound toggle and a universal mute button.

---

## Visual Assets & Preservation Guarantee

1. **Character Source of Truth:** The child astronaut matches `Character_Reference.png` in all scenes (curly dark hair, purple spacesuit, orange collar ring, bubble visor).
2. **Rover Fidelity:** Opportunity is represented with its authentic 6-wheel rocker-bogie suspension, solar panel wings, and panoramic camera mast.
3. **Clean High-Resolution Artwork:** All scenes render authentic 1672×941 Martian backgrounds extracted from `Background.png`. No flattened mockup screenshots are used as backgrounds.

---

## NASA Sources & Scientific References

All sources linked in Screen 10 are active, verified NASA/JPL links:

1. **NASA Mars Exploration Rover Mission Overview:**  
   [https://mars.nasa.gov/mer/](https://mars.nasa.gov/mer/)
2. **Opportunity Rover Mission Page (NASA Solar System Exploration):**  
   [https://science.nasa.gov/mission/mer-opportunity/](https://science.nasa.gov/mission/mer-opportunity/)
3. **NASA Mars "Berry Bowl" Spherule Findings:**  
   [https://photojournal.jpl.nasa.gov/catalog/PIA05581](https://photojournal.jpl.nasa.gov/catalog/PIA05581)
4. **Mössbauer Spectrometer (MIMOS II) on Mars Exploration Rovers:**  
   [https://mars.nasa.gov/mer/mission/spacecraft/instruments/mossbauer/](https://mars.nasa.gov/mer/mission/spacecraft/instruments/mossbauer/)
5. **NASA JPL Press Release: Opportunity Concludes Mission After 15 Years:**  
   [https://www.jpl.nasa.gov/news/nasas-record-setting-opportunity-rover-mission-comes-to-an-end](https://www.jpl.nasa.gov/news/nasas-record-setting-opportunity-rover-mission-comes-to-an-end)

---

## Getting Started & Build Instructions

### Prerequisites
- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **npm:** v9.0.0 or higher

### Installation
```bash
# Clone or navigate to the project directory
cd d:/Downloads/nasa

# Install dependencies
npm install
```

### Local Development
```bash
# Start the Vite development server with Hot Module Replacement (HMR)
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Production Build
```bash
# Type-check TypeScript files and compile optimized production bundle
npm run build
```
The optimized static build will be generated in `dist/`.

### Preview Production Build
```bash
# Run local preview server on the production dist/ folder
npm run preview
```

---

## Verification & Visual Evidence

High-resolution $1600 \times 900$ verification screenshots for all 11 scenes are cataloged in `verification_screenshots/`:

| File Name | Scene Description |
|:---|:---|
| `01_Landing_Page.png` | Landing Page with child on rocky outcrop, Oppy on sand, title parchment |
| `02_Scene_01_Mysterious_Image.png` | Scene 01: Mysterious image observation with magnifier |
| `03_Scene_02_Who_is_Oppy.png` | Scene 02: Opportunity rover introduction and 90 sols vs 15 years stat cards |
| `04_Scene_03_Berry_Bowl.png` | Scene 03: Berry Bowl forensic zoom and water hypothesis |
| `05_Scene_04_Inspect_the_Tools.png` | Scene 04: Oppy's robotic arm tools inspector with interactive hotspots |
| `06_Scene_05_Compare_the_Evidence.png` | Scene 05: Side-by-side comparison of Berry Bowl rock vs Empty rock |
| `07_Scene_06_Detective_Conclusion.png` | Scene 06: Detective conclusion quiz with scientific feedback cards |
| `08_Scene_07_The_Storm.png` | Scene 07: 2018 Martian dust storm simulation, fading solar battery meter |
| `09_Scene_08_What_Remains.png` | Scene 08: What Remains open evidence suitcase with 3 core findings |
| `10_Scene_09_NASA_Sources_and_Evidence.png` | Scene 10: Dual-tabbed NASA Sources directory & Evidence Review Dossier |
| `11_Scene_10_Mission_Completed.png` | Scene 11: Mission Completed celebration with badges, trophy, and replay |

---

*Still Out There — Dedicated to the memory of Opportunity (Oppy), the robotic explorer that taught Earth about the wet history of Mars.*

