# Still Out There --- Oppy

## Interactive Storytelling Website \| UI/UX & Frontend Implementation Guide

> **Project:** Still Out There --- ملف Oppy\
> **Case:** القضية 07: سرّ الحبيبات على المريخ\
> **Experience type:** Interactive storytelling / scrollytelling website
> for children\
> **Primary goal:** Turn the Oppy and Berry Bowl story into an engaging,
> child-friendly investigation in which the website itself is the
> interactive book.

------------------------------------------------------------------------

## 1. Project Overview

**Still Out There** is an educational storytelling experience inspired
by NASA's Mars Exploration Rover Opportunity, affectionately known as
**Oppy**.

The child follows a story-based investigation on Mars, observes the
Berry Bowl image, explores the rover's tools, compares scientific
evidence, and learns what the evidence can---and cannot---tell us about
ancient water on Mars.

The website is the experience. It should feel like an illustrated
adventure rather than a conventional article or a collection of static
pages.

### Core experience principles

-   Preserve the approved child astronaut and Oppy illustrations,
    including their original facial features, proportions, details, and
    colors.
-   Keep the approved visual direction: warm Mars terrain, dusty pink
    and mauve skies, burnt orange, warm beige, and deep brown/plum
    accents.
-   Use the approved story and scientific sequence. Do not rewrite, add,
    remove, or change story facts without approval from the
    content/research team.
-   Use the supplied illustrations as the main visual storytelling
    assets.
-   Make interactions simple and clear for children.
-   Prefer scroll-based scene transitions and a small number of
    meaningful clicks.
-   Do not require login, a database, or a backend for the first
    prototype.
-   Keep text, buttons, cards, and interactive hotspots as real frontend
    elements---not flattened into background images.

------------------------------------------------------------------------

## 2. Story and Page Structure

The experience is organized into **11 screens**:

  -----------------------------------------------------------------------
  Screen                  Name                    Main purpose
  ----------------------- ----------------------- -----------------------
  01                      Landing / Mars Landing  Welcome the child into
                                                  the Mars adventure

  02                      Follow the Tracks /     Follow rover tracks and
                          Meet Oppy               discover Opportunity

  03                      Berry Bowl              Inspect the unusual
                                                  rounded formations

  04                      Examine the Tools       Explore Pancam and the
                                                  Mössbauer instrument

  05                      Compare the Evidence    Compare Berry Bowl with
                                                  the nearby Empty
                                                  location

  06                      Detective's Conclusion  Understand the
                                                  strongest conclusion
                                                  supported by the
                                                  evidence

  07                      The Dust Storm          Learn how the 2018 dust
                                                  storm affected Oppy

  08                      What Remains?           Close the story and
                                                  reflect on Oppy's
                                                  legacy

  09                      Evidence Review         Review the key evidence
                                                  collected during the
                                                  investigation

  10                      NASA Sources            Open the original NASA
                                                  references

  11                      Mission Completed       Celebrate completion
                                                  and offer
                                                  replay/navigation
                                                  actions
  -----------------------------------------------------------------------

**Important:** Screens 01--08 follow the approved story scenes. Screens
09--11 are supporting end-of-experience screens: evidence review,
sources, and completion.

------------------------------------------------------------------------

## 3. Visual Asset Layering System

Every scene should be prepared as three separate layers. This makes the
artwork reusable, keeps interactions accessible, and makes frontend
implementation easier.

### Layer A --- Background

Examples: - Mars landscape and horizon - Rocks, ground, sky, distant
mountains - Dust-storm atmosphere - Lighting and environmental texture

Guidelines: - Backgrounds should not contain important text or
buttons. - Leave clear negative space for story copy and controls. -
Export large backgrounds as WebP for the website, and retain a
high-quality PNG source when needed. - Suggested desktop source size:
2560 × 1440 px. Adapt/crop responsively for mobile.

### Layer B --- Characters & Objects

Examples: - Child astronaut - Oppy rover - Berry Bowl rock and
individual berry-like spherules - Rover tools and instrument hotspots -
Evidence folders, source-card illustrations, keepsake objects

Guidelines: - Export characters and foreground objects separately as
transparent PNG or SVG where appropriate. - Preserve the original
character design and palette. Do not redraw or stylize the approved
characters differently. - Keep each interactive object separately
identifiable so it can receive its own click/tap target. - Avoid baking
interaction labels into the artwork.

### Layer C --- Interaction Layer

Examples: - Headings and story text - Buttons and navigation -
Hotspots - Choice cards and feedback - Tooltips, popovers, evidence
panels - Progress indicator and scene navigation

Guidelines: - Build these as React/HTML elements with CSS. - Keep text
selectable and responsive. - Make controls keyboard accessible and large
enough for touch. - Provide clear feedback after every child
interaction. - Do not place essential controls inside a single flattened
image.

### Suggested asset folders

``` text
public/
└── assets/
    ├── backgrounds/
    ├── characters/
    ├── objects/
    ├── icons/
    ├── textures/
    └── audio/              # optional; only if approved
```

Suggested file naming:

``` text
scene-01-mars-background.webp
scene-01-child-astronaut.png
scene-02-rover-tracks-overlay.png
scene-03-berry-bowl-rock.png
scene-03-berry-spherules.png
scene-04-oppy-rover.png
scene-04-pancam-hotspot.svg
scene-04-mossbauer-hotspot.svg
scene-07-dust-storm-overlay.webp
scene-11-mission-complete-child.png
```

------------------------------------------------------------------------

## 4. Recommended Technology Stack

The first prototype can be built as a frontend-only application.

  ------------------------------------------------------------------------
  Area                    Tool                    Role
  ----------------------- ----------------------- ------------------------
  Frontend framework      React                   Build reusable
                                                  components and
                                                  scene-based UI

  Development/build tool  Vite                    Fast local development
                                                  and production builds

  Styling                 Tailwind CSS            Responsive layouts,
                                                  spacing, colors, and
                                                  component styling

  Scroll storytelling     GSAP + ScrollTrigger    Pin scenes, reveal
                                                  artwork, and link visual
                                                  changes to scroll
                                                  progress

  UI micro-interactions   Motion for React        Animate cards, modals,
                                                  buttons, and small UI
                                                  transitions

  Optional character      Rive                    Advanced interactive
  animation                                       character/illustration
                                                  animation, only if
                                                  needed

  UI/UX design            Figma                   Layouts, prototypes,
                                                  component specs, and
                                                  handoff

  Image editing           Photoshop               Prepare and separate
                                                  raster artwork

  Vector assets           Illustrator             Create/edit icons and
                                                  scalable vector elements

  Version control         Git + GitHub            Track code changes and
                                                  collaborate

  Hosting                 Vercel                  Deploy the frontend
                                                  prototype

  Testing                 Chrome DevTools +       Responsive, performance,
                          Lighthouse              and accessibility checks
  ------------------------------------------------------------------------

### Why this stack?

-   **React + Vite:** simple, fast, and suitable for a component-based
    storytelling site.
-   **Tailwind CSS:** helps implement the approved visual system
    consistently.
-   **GSAP ScrollTrigger:** best suited to scroll-linked scene reveals,
    pinned sections, and timeline-like transitions.
-   **Motion for React:** useful for smaller interactions such as
    opening evidence cards and showing feedback.
-   **Rive:** optional. Do not add it unless the team needs state-based
    character animation.

### Keep the first version simple

Do not use all animation tools for the same interaction. Use: - GSAP for
scroll-driven storytelling. - Motion for small interface interactions. -
Rive only for a specific advanced illustration/character need.

------------------------------------------------------------------------

## 5. Interaction and Storytelling Model

The site should combine scrolling with a few deliberate click/tap
interactions.

### Recommended interaction patterns

  -----------------------------------------------------------------------
  Interaction             Expected behavior       Suggested
                                                  implementation
  ----------------------- ----------------------- -----------------------
  Scroll to next scene    Move through the story  Normal page scroll;
                          in order                GSAP enhancements where
                                                  useful

  Follow the tracks       Tracks guide the child  Scroll-linked reveal or
                          toward the next scene   a clear Continue button

  Tap Oppy                Reveal a short          React state + Motion
                          information card        

  Tap a Berry Bowl        Enlarge/highlight the   React state +
  spherule                selected feature        CSS/Motion

  Choose an answer        Show a hint and then    React state; accessible
                          the explanation         buttons

  Tap a rover tool        Open a short tool       React state +
  hotspot                 explanation             positioned hotspot

  Compare evidence        Reveal the two          React state or
                          locations and a simple  controlled tabs
                          comparison              

  Choose the conclusion   Show supportive         React state
                          feedback and the        
                          scientifically accurate 
                          conclusion              

  Dust-storm reveal       Darken the scene and    GSAP timeline or CSS
                          reveal the dust         transition
                          explanation             

  Open NASA source        Open the original       Normal anchor with
                          source link             external-link behavior

  Replay story            Return to the first     React state / route
                          scene and reset         navigation
                          progress                
  -----------------------------------------------------------------------

### Interaction rules for children

-   One main action per scene is preferable.
-   Use short instructions and clear labels.
-   Give feedback for correct and incorrect answers without shaming the
    child.
-   Do not make the child feel responsible for saving Oppy during the
    dust storm.
-   Keep the story linear; avoid complicated branches.
-   Provide a visible way to continue if the child does not understand
    an interaction.

------------------------------------------------------------------------

## 6. Scene-by-Scene Implementation Notes

### Scene 01 --- The Mysterious Image / Mars Landing

**Purpose:** Introduce the child to Mars and the investigation.

**Visuals:** - Mars environment and distant horizon. - Child astronaut
in the approved design. - Oppy visible in the distance where
appropriate. - A clear visual focus leading the child into the story.

**Interaction:** - "بص حواليك" / "Look around" reveals the Mars
setting. - Continue action moves into the tracks scene. - Clearly
indicate that the journey framing is fictional while the scientific
information is real.

### Scene 02 --- Who Is Oppy?

**Purpose:** Introduce Opportunity and the planned-versus-actual mission
duration.

**Visuals:** - Oppy rover. - Simple timeline illustration.

**Interaction:** - Tap Oppy to reveal a short information card. -
Compare the planned 90 Martian days with the mission's nearly 15 Earth
years.

**Accuracy note:** Oppy's voice/personality in the story is fictional.
Do not present invented dialogue as a real recording or quotation.

### Scene 03 --- Berry Bowl

**Purpose:** Let the child observe the unusual rounded formations.

**Visuals:** - Berry Bowl rock. - Separate, clearly visible spherules
for interaction.

**Interaction:** - Tap a spherule to enlarge/highlight it. - Offer the
approved choices. - Reveal that the formations are not fruit; they are
mineral spherules. The image alone does not establish their composition.

### Scene 04 --- Examine the Tools

**Purpose:** Explain how Oppy moved from visual observation to
scientific measurement.

**Visuals:** - Simplified Oppy rover illustration. - Pancam hotspot. -
Mössbauer instrument hotspot.

**Interaction:** - Tap Pancam to learn that it captured images. - Tap
Mössbauer to learn that it helped identify iron-bearing minerals. -
Reveal an "Examine the evidence" action after both tool cards have been
explored.

### Scene 05 --- A Comparison Reveals a Difference

**Purpose:** Compare Berry Bowl with a nearby location called Empty.

**Visuals:** - Berry Bowl image. - Empty location image. - Simple,
child-friendly comparison graphic.

**Interaction:** - Let the child switch between or compare the two
locations. - Distinguish what was seen in the image from what was
measured by the instrument. - Highlight the stronger hematite signal
associated with the Berry Bowl sample without overwhelming the child
with technical charts.

### Scene 06 --- The Detective's Conclusion

**Purpose:** Help the child understand what the evidence supports.

**Visuals:** - Three evidence cards: 1. Rounded spherules were observed.
2. Hematite was measured. 3. The evidence supports past water in this
region. - A separate "life discovered" card remains unavailable/not
supported.

**Interaction:** - Ask: "What is the strongest conclusion supported by
the evidence?" - Show an explanation after the child chooses. - Make
clear that this evidence does not prove life existed on Mars.

### Scene 07 --- The Dust Storm

**Purpose:** Explain how the mission ended.

**Visuals:** - Mars scene transitioning to a dusty, darker atmosphere. -
Solar panels and dust overlay where appropriate. - Last-image reference
can be shown as a separate visual.

**Interaction:** - Tap the dust layer to reveal that a huge dust storm
reduced sunlight reaching Oppy's solar panels. - Reveal the final
communication and the team's repeated attempts to reconnect. - Keep the
tone gentle and factual; do not imply the child could have saved Oppy.

### Scene 08 --- What Remains?

**Purpose:** Close the story and reinforce Oppy's scientific legacy.

**Visuals:** - Oppy on Mars. - Rover tracks leading toward the
horizon. - Open evidence file.

**Interaction:** - Reveal the final story text. - Provide "Review the
case file" and "Open sources" actions.

### Page 09 --- Evidence Review

**Purpose:** Summarize the evidence collected.

**Visuals:** - Three evidence cards. - Berry Bowl and measurement
references. - A clear visual separation between observation,
measurement, and conclusion.

**Interaction:** - Cards may expand to show short explanations. - Link
back to the relevant story scene if useful. - Keep the conclusion
scientifically limited to evidence of past water in the region.

### Page 10 --- NASA Sources

**Purpose:** Give children, parents, and educators access to the
scientific references.

**Sources to include:** 1. Opportunity mission, duration, dust storm,
and final communication:\
https://www.jpl.nasa.gov/missions/mars-exploration-rover-opportunity-mer/
2. Berry Bowl image and spherules:\
https://science.nasa.gov/resource/discovery-served-up-in-a-bowl/ 3.
Mössbauer comparison for Berry Bowl and Empty:\
https://science.nasa.gov/photojournal/a-bowl-of-hematite-rich-berries/
4. Opportunity science instruments:\
https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/science-instruments/
5. Opportunity's last image:\
https://science.nasa.gov/resource/opportunitys-last-message/

**Interaction:** - Each source appears in its own card. - "Open source"
opens the original NASA page. - Include the note: Oppy's story voice is
fictional; scientific information is based on the listed sources.

### Page 11 --- Mission Completed

**Purpose:** Celebrate completion and offer a clear end to the
experience.

**Visuals:** - Approved child astronaut and Oppy together. - Mars sunset
background. - "Mission Completed" / "انتهت المهمة" visual. - "What did
we learn?" summary.

**Interaction:** - "Share the experience" where supported by the
browser/device. - "Replay the story" resets the experience and returns
to Scene 01. - "Back to home" returns to the landing page.

**Accuracy note:** The final summary must not claim that Oppy discovered
life. It should state that the evidence helped scientists understand
signs of ancient water.

------------------------------------------------------------------------

## 7. Suggested React Project Structure

``` text
still-out-there/
├── public/
│   └── assets/
│       ├── backgrounds/
│       ├── characters/
│       ├── objects/
│       ├── icons/
│       ├── textures/
│       └── audio/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── hotspots/
│   │   └── progress/
│   ├── scenes/
│   │   ├── Scene01Landing/
│   │   ├── Scene02MeetOppy/
│   │   ├── Scene03BerryBowl/
│   │   ├── Scene04Tools/
│   │   ├── Scene05Comparison/
│   │   ├── Scene06Conclusion/
│   │   ├── Scene07DustStorm/
│   │   ├── Scene08Legacy/
│   │   ├── Page09EvidenceReview/
│   │   ├── Page10Sources/
│   │   └── Page11MissionCompleted/
│   ├── animations/
│   ├── interactions/
│   ├── hooks/
│   ├── data/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── index.html
└── README.md
```

Each scene should be a reusable, independent React component. Shared
elements such as progress indicators, buttons, evidence cards, and
navigation should live in `components/`.

------------------------------------------------------------------------

## 8. Initial Setup

### Prerequisites

-   Node.js (current LTS version recommended)
-   npm
-   Visual Studio Code
-   Git
-   A GitHub account for repository hosting

### Create the React + Vite project

``` bash
npm create vite@latest still-out-there -- --template react
cd still-out-there
npm install
```

### Install styling and animation dependencies

``` bash
npm install tailwindcss @tailwindcss/vite
npm install gsap motion
```

### Optional Rive dependency

Install only if advanced interactive character animation is approved:

``` bash
npm install @rive-app/react-canvas
```

### Run the development server

``` bash
npm run dev
```

Follow the local URL printed by Vite in the terminal.

**Setup note:** Tailwind CSS configuration can change between major
versions. Follow the official Tailwind + Vite installation guide for the
installed version rather than copying configuration from an older
tutorial.

------------------------------------------------------------------------

## 9. Responsive Design Requirements

The experience must work on: - Desktop and laptop. - Tablets. - Mobile
phones.

### Desktop

-   Use wide illustrated scenes.
-   Keep text readable and visually separate from important artwork.
-   Use scroll-linked transitions where they improve the story.

### Mobile

-   Recompose the artwork rather than simply shrinking the desktop
    layout.
-   Keep buttons and hotspots large enough to tap.
-   Avoid interactions that require hover.
-   Reduce or disable heavy scroll animations if they affect
    performance.
-   Ensure story text remains readable without covering the child or
    Oppy.

### Accessibility

-   Use semantic buttons and links.
-   Provide keyboard focus states.
-   Use descriptive alternative text for meaningful images.
-   Do not rely on color alone to communicate correct/incorrect
    feedback.
-   Respect reduced-motion preferences.
-   Keep contrast sufficient for all story text and controls.

------------------------------------------------------------------------

## 10. Performance Guidelines

-   Use WebP for large photographic/painted backgrounds when visual
    quality is retained.
-   Use transparent PNG for raster characters and foreground objects.
-   Use SVG for simple icons and scalable UI artwork.
-   Lazy-load images that are below the first scene.
-   Avoid loading every large illustration at initial page load.
-   Animate `transform` and `opacity` where possible.
-   Avoid unnecessary continuous animations.
-   Test on a mid-range mobile device, not only a high-performance
    laptop.
-   Provide a reduced-motion experience.

------------------------------------------------------------------------

## 11. Development Workflow

Recommended order:

1.  **Asset audit:** collect all approved artwork and confirm which
    images exist for each scene.
2.  **Layer preparation:** export backgrounds, characters, objects, and
    interaction references separately.
3.  **Design system:** define colors, typography, buttons, cards,
    spacing, and responsive rules in Figma and CSS.
4.  **Project setup:** create the React + Vite project and install
    dependencies.
5.  **Shared components:** build navigation, progress indicator,
    buttons, evidence cards, and modal/hotspot components.
6.  **First scene prototype:** implement Scene 01 and validate the
    visual style and interaction model.
7.  **Scroll system:** add GSAP ScrollTrigger only where needed.
8.  **Scene implementation:** build Scenes 02--08 in the approved story
    order.
9.  **Supporting pages:** build Evidence Review, NASA Sources, and
    Mission Completed.
10. **Responsive QA:** test desktop, tablet, and mobile.
11. **Content and science review:** verify every statement against the
    approved scenario and NASA sources.
12. **Deployment:** push to GitHub and deploy through Vercel.

### Suggested team handoff

  -----------------------------------------------------------------------
  Role                                Responsibility
  ----------------------------------- -----------------------------------
  UI/UX Designer                      Figma layouts, responsive behavior,
                                      component states, interaction
                                      specifications

  Graphic Designer                    Separate backgrounds, characters,
                                      objects, icons, and source
                                      illustrations

  Frontend Developer                  React components, styling, scroll
                                      behavior, interactions, responsive
                                      implementation

  Content/Research                    Story consistency, reading text,
                                      scientific accuracy, source
                                      verification

  QA/Team                             Test every scene, link, button,
                                      interaction, and screen size
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 12. Testing Checklist

### Visual

-   [ ] Child astronaut retains the approved facial features and outfit.
-   [ ] Oppy retains the approved rover design.
-   [ ] Approved color palette is consistent across all scenes.
-   [ ] Text does not cover important characters or evidence.
-   [ ] Desktop and mobile compositions are both intentional.

### Interaction

-   [ ] Every button has a working action.
-   [ ] Every hotspot opens the correct information.
-   [ ] Answer choices show helpful feedback.
-   [ ] The child can continue through the full story.
-   [ ] Evidence Review links work.
-   [ ] All NASA source links open correctly.
-   [ ] Replay returns to the beginning and resets progress.
-   [ ] No hover-only interaction is required.

### Science and content

-   [ ] Oppy's fictional story voice is not presented as a real
    recording or quotation.
-   [ ] The evidence supports past water in the investigated region.
-   [ ] The Berry Bowl evidence is not presented as proof of life.
-   [ ] The story does not claim that water covered the entire planet.
-   [ ] The dust storm explanation is consistent with the approved
    source material.

### Performance and accessibility

-   [ ] Images are optimized.
-   [ ] Lower scenes load efficiently.
-   [ ] Mobile scrolling remains smooth.
-   [ ] Reduced-motion preferences are respected.
-   [ ] Keyboard focus is visible.
-   [ ] Text and controls are readable.

------------------------------------------------------------------------

## 13. Deployment

### GitHub

``` bash
git init
git add .
git commit -m "Initial Still Out There prototype"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the actual repository URL.

### Vercel

1.  Sign in to Vercel.
2.  Import the GitHub repository.
3.  Confirm the Vite project settings.
4.  Build command: `npm run build`
5.  Output directory: `dist`
6.  Deploy.
7.  Test the deployed website on desktop and mobile.

------------------------------------------------------------------------

## 14. Official Documentation

-   React: https://react.dev/
-   Vite: https://vite.dev/
-   Tailwind CSS: https://tailwindcss.com/docs
-   GSAP: https://gsap.com/docs/v3/
-   GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
-   Motion for React: https://motion.dev/docs/react
-   Rive: https://rive.app/docs/
-   Figma: https://help.figma.com/
-   GitHub: https://docs.github.com/
-   Vercel: https://vercel.com/docs
-   Lighthouse: https://developer.chrome.com/docs/lighthouse/overview/

------------------------------------------------------------------------

## 15. Final Implementation Decision

For the first working prototype, use:

**React + Vite + Tailwind CSS + GSAP ScrollTrigger + Motion for React +
GitHub + Vercel.**

Keep Rive optional. Do not add a backend, database, authentication, or
complex game engine unless a later requirement clearly needs one.

The most important deliverable is a smooth, child-friendly,
scientifically accurate storytelling experience that preserves the
approved artwork and lets the child discover the story through scrolling
and simple interactions.
