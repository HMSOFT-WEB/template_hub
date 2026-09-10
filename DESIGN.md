# HMSOFT hub — project-first revision

The hub's job is to help a Korean-speaking visitor inspect HMSOFT's working websites and keep a shortlist. The work itself should occupy the first screen.

## Critique of the previous version

The fixed sidebar was unnecessary for a thirteen-item collection. A 112px headline, colored final word, decorative numbering, uppercase labels, technology strings, and two closing manifesto sections overwhelmed the actual work. Most of the strongest projects appeared at the bottom. Reading a skill did not make those choices appropriate.

## Design plan

- Structure: a portfolio feed with a featured two-project spread, followed by a compact, filterable gallery. Persistent top navigation; no application sidebar. About four desktop screens, with no artificial viewport-height sections.
- Color: white `#ffffff` for the canvas, black `#151515` for content, grey `#737373` for secondary text, pale grey `#f3f3f3` for controls, cobalt `#2458e8` only for focus and selected controls. Project imagery supplies the palette.
- Type: Albert Sans (catalogue rank 171) for the wordmark, project names and Latin text; IBM Plex Sans KR for Korean. One 38px page heading, 24px project titles, 14–16px functional text. No selectively accented words or decorative uppercase labels.
- Widths: 1600px outer maximum; 48px desktop / 20px mobile gutters; a 7:5 featured split; three-column archive; 440px explanatory measure; 1080px detail dialog.
- Alignment: left-aligned text and project captions. The secondary featured project sits below a small, useful collection introduction, providing a different scale without cropping either website screenshot.
- Interaction: filters, search, persistent shortlist, native accessible detail dialog, and real external site links. Image content stays legible without hover. Motion only answers user actions.

```
hmsoft hub                       템플릿   저장한 사이트   GitHub

웹사이트 컬렉션                    직접 제작한 웹사이트 13개.

[                         ]      최근 추가한 사이트
[       ONYU screen       ]      [                 ]
[                         ]      [  SEREIN screen  ]
ONYU            모델하우스        SEREIN        호텔

전체 템플릿                                   검색
전체   공간·숙박   쇼핑·라이프스타일   기업·서비스 ...
[         ]       [         ]       [         ]
name / type       name / type       name / type

hmsoft hub         실제 사이트에서 인터랙션을 확인하세요.   GitHub
```

## Review before implementation

The first proposal reused a large marketing headline and a browser-window mockup. Both were removed: there is no product promise to sell and the screenshots already communicate websites. The asymmetry serves two current projects and their real image proportions. Compared with the previous design, the work now precedes catalogue controls, navigation runs across the top, and the archive uses three compact columns without prose sections. The collection should be judged using desktop and mobile screenshots, not completion of a component checklist.

Visual calibration: Build in Amsterdam's work index (https://www.buildinamsterdam.com/cases). The reference is a prompt to prioritize work imagery, not a layout to reproduce.

## Motion and identity revision requested by the client

Keep the official HM SOFT PNG without changing its colors, paths, lettering or proportions. CSS only removes transparent outer padding from the header display. The same original file is the favicon.

The opening now uses a full-width, two-scene motion reel rather than two still previews. Each eight-second scene combines a project photograph, independently revealed project lettering, and an actual site screenshot that enters as a second plane. A lateral mask passes from one project to the next; a small amount of scroll parallax separates the two planes. The visual explains that the work combines imagery, type, and interactive screens.

Motion implementation: the existing MIT-licensed Motion library. Pause, direct scene selection, offscreen and hidden-tab suspension, keyboard controls and reduced-motion stills are required. Continuous progress uses a motion value, not per-frame React state. The archive remains stable while browsing.
