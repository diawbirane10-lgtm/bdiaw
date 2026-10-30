# Admin visit history

The admin now prioritizes a chronological session list over country aggregates. A row shows the most recent page-view time in the selected timezone, the network country and city when available, pages viewed, referrer host, device class and browser family. Expand a session to see timestamped page navigation. Searching and country filtering apply to the entries already loaded; loading the next page merges older events into their session rather than duplicating sessions.

## Collection and persistence

- `VisitTracker` sends a small first-party POST on public route changes. A random identifier stored in sessionStorage groups navigation within a tab; it rotates after 30 minutes of inactivity. Storage failures fall back to in-memory grouping. This identifies navigation sessions, not people or reliably distinct visitors across tabs/devices.
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
