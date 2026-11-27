# Engineering universe

The home-page action opens `/univers`, an optional illustrated journey through all six featured projects: SmartSense, UFLS, railway traction, wave-energy conversion, the battery twin and the electric-drive twin. The existing project case studies remain the source for technical assumptions and validation results.

The native React/CSS implementation is inspired by Scroll World. It uses original SmartSense CAD assets and conceptual SVG illustrations, without paid generated video. Desktop scrolling reveals the enclosure and moves each scene; chapter controls provide direct navigation and keyboard focus. Mobile and short viewports use normal document scrolling so content remains reachable. Reduced-motion preferences disable transforms and sticky scenes.

Review workflow: frontend implementation, independent UX review, independent code/accessibility review, coordinator browser checks and production build. Touch targets and mobile typography were corrected during review. Browser checks cover desktop, 390px phone and 820px tablet composition; captions on tall mobile scenes prompted the normal-scroll fallback.

Validation: `npm run build` includes existing privacy and login rate-limit tests. The sitemap and canonical include `/univers`. No new analytics or remote runtime dependencies are introduced. Security maintenance pins Next.js 16.4.6 and overrides the existing Blob dependency's transitive Zod to its patched 4.6.6 release.

## Interactive 3D

Three.js viewers replace the static illustrations with procedural concept models. The scenes expose enclosure inspection, staged feeder switching and traction/regenerative flow controls. These illustrate operating principles; they are not engineering solvers or replicas of the CAD assembly. Real project CAD remains in its case study.

Coverage is checked against the featured project catalogue during every build. Each home-page project and case study links directly to its chapter. Compact screens use a labelled project selector covering all chapters.
