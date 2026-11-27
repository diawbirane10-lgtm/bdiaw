# Engineering universe

The home-page action opens `/univers`, an optional illustrated journey through SmartSense, UFLS and railway traction. The existing project case studies remain the source for technical assumptions and validation results.

The native React/CSS implementation is inspired by Scroll World. It uses original SmartSense CAD assets and conceptual SVG illustrations, without paid generated video. Desktop scrolling reveals the enclosure and moves each scene; chapter controls provide direct navigation and keyboard focus. Mobile and short viewports use normal document scrolling so content remains reachable. Reduced-motion preferences disable transforms and sticky scenes.

Review workflow: frontend implementation, independent UX review, independent code/accessibility review, coordinator browser checks and production build. Touch targets and mobile typography were corrected during review. Browser checks cover desktop, 390px phone and 820px tablet composition; captions on tall mobile scenes prompted the normal-scroll fallback.

Validation: `npm run build` includes existing privacy and login rate-limit tests. The sitemap and canonical include `/univers`. No new analytics or remote runtime dependencies are introduced. Security maintenance pins Next.js 16.4.6 and overrides the existing Blob dependency's transitive Zod to its patched 4.6.6 release.
