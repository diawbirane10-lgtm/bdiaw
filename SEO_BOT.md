# b-diaw.com SEO Bot

Automated, policy-compliant SEO monitoring for the Birane DIAW / OHMEGA portfolio.

## What it does

- Daily technical audit of https://b-diaw.com.
- Checks HTTPS, robots.txt, sitemap.xml, canonical URLs, titles, descriptions, H1, Open Graph, JSON-LD and internal links.
- Tracks keyword coverage across the portfolio and project pages.
- Opens a GitHub issue when a critical SEO regression appears.
- Weekly Lighthouse audit for performance, accessibility, best practices and SEO.
- Optional weekly Google Search Console report to identify:
  - queries already near the Top 10;
  - page 2/3 content opportunities;
  - low-CTR snippets that need better titles/descriptions.
- Optional Search Console sitemap submission.

## Important

This bot does not use fake traffic, link spam, cloaking or automated Google result scraping. Those tactics can hurt ranking. The goal is to improve crawlability, relevance, content quality and Search Console feedback loops.

## Google Search Console integration

The workflows can run without credentials, but the Search Console report requires a Google service account.

Add this GitHub repository secret when ready:

- `GSC_SERVICE_ACCOUNT_JSON`

The service-account email must also be granted access to the `sc-domain:b-diaw.com` property in Google Search Console.

## Current priority fixes

The live site should expose:

- https://b-diaw.com/robots.txt
- https://b-diaw.com/sitemap.xml

The site's canonical/Open Graph metadata should consistently use `https://b-diaw.com` rather than the old Vercel URL.

## Ranking strategy

The bot tracks both personal-brand searches (Birane Diaw) and niche engineering searches around power systems, grid-forming control, VSC-HVDC, smart-grid UFLS, MATLAB/Simulink, industrial automation, CODESYS, digital twins and renewable energy.

No system can guarantee a first-page ranking; the bot is designed to surface the highest-value opportunities and prevent technical regressions.
