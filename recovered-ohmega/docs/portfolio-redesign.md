# Portfolio redesign — 27 October 2026

The existing b-diaw.com portfolio now has dedicated Home, Projects, Research, Experience, About and Contact pages, five existing project case studies and the research abstract. Existing technical copy and document URLs were retained.

## Visual specification

Reference: https://www.psg.fr/ as inspected on 27 October 2026. The user explicitly requested its typography, colours, navigation and multipage ergonomics.

- Actual PSG font files, verified from its loaded CSS: Virage Regular and Semibold; Virage Narrow Semibold, Bold Italic and Ultrabold Italic; Virage Wide Regular and Semibold. These are served locally under public/fonts/virage.
- Navy #0e1b36, red #e30613, true white, with muted text #4f6f87 and secondary surface #f2f5f8.
- Full-width image introduction, narrow italic uppercase headings, wide uppercase navigation, square media frames, navy section bands and red navigation accents.
- The engineering portrait, subject matter and original project illustrations deliberately replace football content. The hero is a conceptual generated electrical-substation image, not a claimed field photograph.

## Visual comparison ledger

| Check | Reference and observation | Implementation / repair |
| --- | --- | --- |
| Type | PSG uses Virage Narrow italic for headings, Virage Wide for navigation | Exact local fonts confirmed in rendered computed styles |
| Palette | Navy, red, white and cool secondary surfaces | Shared tokens across every page, menu and footer |
| Hero | Broad media, large lower-left title, bottom navy fade | Substation image with Birane DIAW and the existing student description |
| Geometry | Straight editorial image panels and horizontal content rails | Three engineering fields, asymmetric selected-project layout, consistent gutters |
| Mobile | Compact header and large accessible full-screen navigation | Menu and close action checked at 390 px; title at 360 px reduced to one line |
| Assets | Portfolio media should visibly render | Five corrupt legacy WebP files repaired, all project images decoded with Sharp |
| Copy | User identity and existing technical claims override invented mockup copy | Student status retained; no added engineering result or qualification |

The generated concept was inspected using view_image at /workspace/scratch/d661a9928033/generated_images/exec-3bfed118-0029-4984-8f4b-8988d4d6357e.png. The rendered page was captured through the built-in browser and inspected using view_image at /workspace/scratch/portfolio-psg-preview-top.jpg. These internal comparison files are not application dependencies. Native browser viewport was 1363 × 936; mobile and tablet layouts were checked in same-origin frames. No Playwright browser fallback was used.

Intentional differences from the generated concept: the exact real PSG typography takes priority over the mockup approximation; existing truthful project titles and student copy replace its generic engineering copy; additional portfolio sections preserve existing information. Brand colours, typography, media hierarchy, square geometry and navigation were directly compared against the reference. No unresolved clipping, image loading or navigation mismatch remained after the repairs.

## Verification

- Production Next.js build passed.
- GitHub Actions Portfolio build check #130 passed, including rendered-route, canonical URL, missing-route and WOFF2 checks in scripts/smoke.py.
- Browser paths tested: home → projects → filter → battery case study; menu open/close and Escape; EN/FR; search for battery; contact → copy email confirmation.
- Mobile: 360, 390 and 430 px across home, projects, profile, experience, research, contact and battery detail; measured document scroll width equals client width.
- Tablet: 768, 820 and 1024 px; no document overflow.
- Browser console inspection showed extension-origin diagnostics, no observed application error.
- Temporary responsive QA fixture removed before release.

The local browser could not reach the isolated development server, so functional and visual browser verification used the Vercel preview. CI supplied the HTTP smoke checks.

## Generated hero

Built-in image generation; compressed to WebP using Sharp. Brief: panoramic editorial photograph of a realistic high-voltage electrical substation at blue hour, lattice gantries and transformers toward the right, dark open lower left for code-native white text, navy sky and warm horizon, no people, logos, labels or text. Image remains conceptual.
