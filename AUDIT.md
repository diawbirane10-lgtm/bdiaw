# OHMEGA Portfolio — UX/UI & Motion Audit

Date: 2026-09-23
Scope: https://b-diaw.com and `recovered-ohmega/`

## Phase 0 — stack
- Production app: Next.js App Router in `recovered-ohmega/app/`.
- React, Next.js, Geist and Vercel Analytics; styling is plain global CSS split across several files.
- No Tailwind in the production app.
- Existing motion is lightweight: IntersectionObserver + CSS transforms/opacity.
- Current typography is primarily Geist; the site already carries a strong editorial grid and a white/green identity.
- FR/EN, project routes, metadata/OpenGraph, sitemap and robots already exist.
- Production project cards are text-first and visually static despite existing project illustrations.
- Engineering Software currently hotlinks logos from several external hosts.
- Existing mobile CSS is extensive but layered/duplicated, making later overrides fragile.
- No `AGENTS.md` found in the production subtree.

## Highest-impact findings

### 1. Selected Work lacks a visual hierarchy
**Impact: High / Effort: Medium**

The five case studies are dense rows. They contain strong technical content, but there is little visual differentiation between projects. Users have to read before they can orient themselves.

**Fix:** a reusable visual-first thick-card system, with one illustrative mini-system diagram per project, controlled 3D depth, unique accent token per project and a restrained staggered layout.

### 2. Hero is clear but visually static
**Impact: High / Effort: Medium**

The hero communicates identity well but has no memorable engineering-specific visual system.

**Fix:** retain the white/green identity and introduce a lazy raw-WebGL fluid field plus a lightweight CSS-3D Ω object. Avoid Three.js unless necessary; the bundle cost is not justified for one object.

### 3. Motion exists but does not explain structure
**Impact: Medium / Effort: Low**

Existing reveal motion is generic. It does not visually communicate hierarchy, sequence or engineering cause/effect.

**Fix:** use motion for card depth, mini-visual state changes, count-up and timeline progression. Keep transform/opacity as the main animated properties and pause visuals off-screen.

### 4. Software logos are fragile
**Impact: Medium / Effort: Medium**

Several logos are hotlinked from Wikimedia redirects, WordPress uploads, python.org S3 and vendor CDNs. This can create inconsistent loading and layout behaviour.

**Fix:** move all required brand marks into `public/software/`, normalize their bounding boxes and display them monochrome by default with brand color on hover/focus.

### 5. Metadata can use the existing OG art better
**Impact: Low / Effort: Very low**

The site already has a 1200×630 OpenGraph image, but Twitter uses `summary`.

**Fix:** use `summary_large_image`.

### 6. Stats are static
**Impact: Low / Effort: Low**

17+ / 1 / 3 are useful orientation points but appear as static numerals.

**Fix:** count once when the block enters the viewport; reduced-motion receives final values immediately.

## Typography
The current large editorial scale is distinctive and should remain. Do not turn the portfolio into a generic SaaS UI. Preserve generous desktop whitespace and keep technical metadata in mono. Use the redesign to improve hierarchy, not to change the written content.

## Color
Keep the site fundamentally white/ink/green. Project cards may use five saturated project accents, but each accent is confined to the card and its illustrative visual. Body sections should not become a rainbow.

## Accessibility
- Preserve semantic links and headings.
- Minimum interactive target ~44 px on touch.
- Keyboard focus must remain explicit.
- All motion must honor `prefers-reduced-motion`.
- Pointer tilt must not be required to understand content.
- Text on saturated project colors must maintain WCAG AA contrast.

## Performance
- No animation may block LCP.
- Raw WebGL canvas starts after first paint and pauses off-screen.
- DPR capped at 1.5.
- Mobile gets reduced shader complexity and no pointer tilt.
- Mini visuals are inline SVG and animate only while visible.
- Prefer CSS 3D over Three.js for the Ω unless a later visual review shows a clear need.
- Avoid Lenis unless native scrolling proves insufficient; current site does not need another dependency to feel smooth.

## Responsive
Test at 375 / 768 / 1440 px. On mobile, cards stack without forced perspective; the content order remains title → visual → summary → CTA. Desktop may use controlled fan offsets/rotations.

## Deliberately unchanged
- Existing copy, dates, publication details, contact information and project claims.
- Existing routes and bilingual structure.
- Existing production white/green identity.
- Existing project-detail information architecture unless a transition requires a small wrapper.
