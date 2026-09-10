# Design sources and application

Reviewed 2026-09-11. Source code and guidelines are referenced independently; no third-party brand identity is reused.

| Source | License / use | Applied to this hub |
| --- | --- | --- |
| [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Apache-2.0; installed in the parent workspace | Project-led composition, original logo, restrained Korean copy, screenshot critique |
| [Vercel Web Design Guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) | Review instructions; installed in the parent workspace | Keyboard navigation, focus visibility, image dimensions, reduced motion, URL filters |
| [Vercel React Best Practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) | MIT; installed in the parent workspace | Validated storage schema, static content separation, motion values for animation progress |
| [WorkOS Radix Primitives](https://github.com/radix-ui/primitives) | MIT; `@radix-ui/react-dialog` dependency | Dialog semantics, focus trap, Escape handling, focus restoration, background isolation |
| [Motion](https://github.com/motiondivision/motion) | MIT; existing `framer-motion` dependency | Scene masks, project-letter choreography, screen entrance, scroll parallax, live playback progress |
| [Adobe React Spectrum](https://github.com/adobe/react-spectrum) | Apache-2.0; evaluated | Accessibility and interaction reference; no second component framework added |
| [IBM Carbon](https://github.com/carbon-design-system/carbon) | Apache-2.0; evaluated | Density and hierarchy reference; no Carbon theme or brand assets copied |
| [Microsoft Fluent UI](https://github.com/microsoft/fluentui) | Repository/component licenses; evaluated | Semantic component and state reference; not bundled |
| [HMSOFT Pro Design](https://github.com/hongmuk/hmsoft-aiprodesigner) | Evaluated | Compared anti-pattern guidance with the newer Anthropic rules; project-specific direction documented in DESIGN.md |

Installed skills live in `../.agents/skills/`. They are available to the agent on the next turn and were read directly for this implementation. Libraries from all sources are not combined: Radix handles dialogs and Motion handles the reel.

The logo is the original HM SOFT asset, also served by the company website. Website screenshots and reel imagery come from HMSOFT's own template projects. Albert Sans and IBM Plex Sans KR are self-hosted through Fontsource; font license files remain with their packages.

## Motion storyboard

Each project gets eight seconds. Its photo remains behind a separate website frame; the project name enters letter by letter. A lateral mask connects the next scene. Scroll adds limited separation between the two planes. Pause stops continuous progress and image drift. A hidden tab or offscreen reel suspends playback. Reduced-motion mode uses static scenes and direct project selection.

This is browser-rendered motion graphics composed from project stills and screenshots. It is not recorded architectural footage.
