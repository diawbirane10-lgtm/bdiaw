# Admin visit history

The admin now prioritizes a chronological session list over country aggregates. A row shows the most recent page-view time in the selected timezone, the network country and city when available, pages viewed, referrer host, device class and browser family. Expand a session to see timestamped page navigation. Text search applies to entries already loaded. The country menu always lists all 249 ISO countries/territories, plus any additional hosting-platform region codes observed and an unavailable-location option. Country filtering is applied server-side across history pagination, scanning up to five storage pages per request until a matching page is found; a continuation cursor permits further searching. Loading the next page merges older events into their session rather than duplicating sessions.

## Collection and persistence

- `VisitTracker` sends a small first-party POST on public route changes. A random identifier stored in sessionStorage groups navigation within a tab; it rotates after 30 minutes of inactivity. Storage failures fall back to in-memory grouping. After a recorded page view the server sets an HttpOnly, Secure, SameSite=Lax first-party `ohmega_visit` cookie (30-minute lifetime) with that random identifier, so PDF requests can be linked to the session without putting identifiers in download URLs. This identifies navigation sessions, not people or reliably distinct visitors across tabs/devices.
- `/api/visits` checks same-origin requests, bounded JSON and a fixed public page allowlist. Timestamp, approximate geography and device class are assigned on the server. Geographic values come from Vercel request headers, not values supplied in the request body. No exact address, GPS permission, raw IP address, raw user-agent or referrer search/query is stored.
- Only Production records traffic. Authenticated admin visits and recognized bots do not enter the journal. Preview and local UI tests do not create real traffic records.
- Each page event is an immutable JSON object under `visit-history/v1/` in the existing **private** Blob store. Concurrent navigation cannot overwrite other events. Reverse timestamps in pathnames provide newest-first listing; Blob cursor pagination loads 50 page events per request with bounded read concurrency.
- OIDC uses the already connected `BLOB_STORE_ID`; no database or new paid service is provisioned. `@vercel/blob` is pinned at 2.8.2 and the lockfile is committed.
- `/api/admin/visits` requires the existing signed owner session and returns `private, no-store` responses. The fallback publicly known signing string has been removed; absent server secrets now fail closed. The existing password and valid token-signed sessions remain unchanged.

## What the numbers mean

- “Visites dans la liste” counts sessions in loaded history, not all Vercel unique visitors. Its number can increase as older entries are loaded.
- The period starts at local midnight for the chosen timezone. The “Aujourd’hui” filter uses that same timezone for history and the global Vercel summary. Calendar-day arithmetic handles daylight-saving changes using runtime IANA data.
- Vercel aggregate visitors/page views remain in the summary. They can differ from the first-party journal because of activation date, blockers, session definitions and filtering. “Tout l’historique” applies to the journal; the Vercel summary remains explicitly limited to 30 days.
- Unknown locations remain unavailable. A network location can identify an ISP or VPN endpoint; country centroids are not presented as real visitor cities.
- The old aggregate API cannot reconstruct historical individual visits, cities or exact visit times. New records start after this release is deployed. A storage/API failure is shown as an error, not as a fabricated empty history.

## Checks and operation

`node --test scripts/*.test.mjs`, `npm run build`, and `python3 scripts/smoke.py` are the core checks. Tests cover trusted geography/time sources, data minimization, allowed routes, calendar boundaries, session grouping, immutable private storage, pagination and fail-closed authentication.

Browser QA uses local test fixtures for cities, not fabricated production analytics. Verify search, filters, timezone, page expansion, pagination and login/logout at desktop, tablet and narrow mobile widths. The public portfolio remains outside the scoped admin styles.

After deployment, open a public page without an admin session and check `/api/visits` returns 204, then sign into `/admin` and refresh. The anonymous `/api/admin/visits` response must remain 401. Recording failures are logged as a generic message without the visit payload. Blob provider limits can prevent collection; no paid upgrade or overage setting is enabled by this change.

Rollback: revert the release commit. Existing private history objects remain intact in their dedicated prefix. This release does not merge the separate draft report-download email PR or enable email sending.

## PDF request history and counters

The seven report links now point to an allowlisted streaming `/api/reports/<id>` endpoint. A successful upstream response produces a `download` event containing report ID, filename, server timestamp and available network geography. The visitor cookie associates it with a navigation session when available. Otherwise the request has its own session identifier. Anonymous download requests remain possible; no name or email is inferred.

HEAD, prefetch, unknown IDs, failed upstream requests, preview and authenticated owner downloads are not counted. Probable automation is labelled on download events instead of silently pretending it is a human. Automated file requests may contribute to counters. Failed history writes do not block the file response; warnings are generic. An accepted PDF request is not proof of a completed save or read, and byte-range/repeated requests are not guaranteed to represent distinct human downloads.

The private `/api/admin/downloads` endpoint computes per-report period totals from event metadata across storage pagination, independently of how many rows the browser has loaded. A bounded scan of 10,000 events prevents unbounded work; if it reaches the cap, the API marks the result incomplete and the UI presents minimum counts. Downloads made directly from pre-existing GitHub URLs or other mirrors bypass the site and cannot be counted here.

The historical list and expandable session journey include report requests alongside page views. The UI also shows per-report counters, probable automation, device/browser and source information. These are activity signals, not a user-identification or security-certification system. Email notifications remain inactive until a sender is configured separately.
