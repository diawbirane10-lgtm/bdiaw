# Portfolio performance diagnosis — 29 October 2026

Source inspected: main commit `d898b9f172c9b1cb2f151db8bf5d70ccaa349dfa`. The live portfolio is `recovered-ohmega/` (Next.js), not the legacy root Vite `src/` application.

## Measured evidence

Issue #10's body contains older scores. Its latest linked run, **25 October**, has different results in the downloadable `lighthouse-9` artifact:

| Page | Performance | LCP | Total blocking time | Layout shift (CLS) | SEO |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 82 | 4.3 s | 150 ms | 0 | 100 |
| UFLS | 72 | 11.6 s | 40 ms | 0.097 | 100 |
| Wave | 73 | 12.5 s | 50 ms | 0.086 | 100 |
| Railway | 72 | 12.6 s | 40 ms | 0.097 | 100 |
| Battery | 91 | 3.3 s | 60 ms | 0.078 | 100 |
| Electric drive | 72 | 11.7 s | 60 ms | 0.104 | 100 |

These are Lighthouse mobile lab measurements from that run, not current field Core Web Vitals or a fresh benchmark of the 27 October source. Estimated savings are diagnostic estimates, not guarantees or additive score gains.

The four slower case-study pages identify `main.site > figure.projectVisual > div.projectVisualFrame > img` as their LCP image. Those images are external PNGs of 1,656,863–1,928,810 bytes, with no dimensions, responsive sources or high fetch priority. Lighthouse estimates **1,572–1,837 KiB** of avoidable image transfer per page. The drive audit specifically attributes its layout shift to the image lacking explicit size. The active `app/[[...slug]]/page.jsx` still uses those sources and a raw `<img>` in `ProjectDetail`.

The battery page already uses a local 163,252-byte WebP and scores 91. This comparison supports an image-delivery diagnosis; it is not a controlled experiment. Its image can still benefit from responsive sizing.

Home has a text LCP (`p.lead`), not a project image. Its audit flags about 429 KiB of oversized logos (Factory I/O, journal header, VS Code, MATLAB and others), plus third-party Wikimedia cookie issues contributing to best-practices 77. Logos in the active home components load eagerly. Replacing the hero or changing typography is not justified by this evidence.

Secondary costs: project pages report about 26–27 KiB unused CSS, around 54 KiB unused JavaScript, and estimated 260 ms render-blocking savings. Root layout imports six stylesheets, and the client catch-all page contains home, project and bilingual content. These are smaller priorities than the multi-megabyte PNGs. Existing fonts use local WOFF2 and `font-display: swap`; an intro splash is not mounted by the active layout.

## Existing SEO automation is a separate concern

- `seo-monitor.yml`: daily technical/keyword checks (cron 05:17 UTC), report artifacts, regression issue recovery. A successful run is present on 29 October.
- `seo-growth.yml`: Monday 06:43 UTC audits, recommendations, IndexNow, report artifacts and issue updates. `seo-indexnow.yml` separately submits sitemap URLs.
- `seo-lighthouse.yml`: Sunday 06:21 UTC, one unpinned Lighthouse run per URL against production; results stored for 60 days. App-code pushes do **not** trigger this workflow. There is no deployment-readiness wait.
- `lighthouse_summary.py`: thresholds exist for SEO 95, accessibility 90 and best-practices 90, **none for performance**. It prints performance but cannot alert for performance alone. The latest home best-practices 77 is sufficient to keep the alert active.
- The alert's original body is not refreshed when a new failing run occurs; only a run-link comment is added. There is no Lighthouse recovery-close step. An open issue is not evidence of current performance by itself.
- Lighthouse SEO 100 covers that checklist, not search rankings, Google indexing, search impressions or inbound leads. IndexNow submission does not prove Google indexing.

## Smallest proposed code-only fixes (no visual redesign)

1. In active `ProjectDetail`, replace just the five main images with `next/image`, exact intrinsic dimensions, responsive `sizes`, and `loading="eager" fetchPriority="high"` for the visible project LCP. Allowlist only the exact four existing CloudFront URLs in `next.config.js`; retain the same source artwork, CSS classes, crop and layout. The local battery WebP is 16:9; the four PNGs are 4:3. Do not substitute the older bundled WebPs without proving that the artwork matches. This avoids introducing a different visual.
2. In active homepage logo rendering, add `loading="lazy" decoding="async"` below the fold and dimensions matching the existing boxes. Self-host exact licensed copies or serve responsive logo assets as a later small pass; retain attribution where required. Do not lazy-load the case-study LCP.
3. Before further optimization, run three comparable mobile audits per page against the actual deployment and compare medians, transferred image bytes, LCP and CLS. Verify desktop and narrow-screen screenshots keep typography, spacing and artwork unchanged.
4. If needed after those measurements, split route-specific JS and carefully remove proven-unused CSS. Do not delete override styles based solely on one Lighthouse page; some are needed on other routes, in French or on narrow screens.

Monitoring follow-up (separate from page fixes): pin Lighthouse, include a performance threshold, expose current metrics in the issue body, and test the actual completed deployment. This prevents stale or misleading alerts but does not itself make pages faster.

No performance patch or redesigned UI is included in the download-alert implementation. No post-fix score is claimed.

## Evidence links

- https://github.com/diawbirane10-lgtm/bdiaw/issues/10
- https://github.com/diawbirane10-lgtm/bdiaw/issues/2
- https://github.com/diawbirane10-lgtm/bdiaw/actions/runs/40190254103 (artifact `lighthouse-9`, ID 12597925718)
- https://github.com/diawbirane10-lgtm/bdiaw/actions/runs/40865950367
- https://github.com/diawbirane10-lgtm/bdiaw/blob/d898b9f172c9b1cb2f151db8bf5d70ccaa349dfa/recovered-ohmega/app/%5B%5B...slug%5D%5D/page.jsx
- https://github.com/diawbirane10-lgtm/bdiaw/blob/d898b9f172c9b1cb2f151db8bf5d70ccaa349dfa/seo-bot/scripts/lighthouse_summary.py
