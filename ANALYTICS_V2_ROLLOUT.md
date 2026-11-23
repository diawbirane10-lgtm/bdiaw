# Analytics V2: security-first rollout (not deployed)

Scope: analytics and /admin only. Public layout and styling unchanged. No historical data deleted.
Production database access was denied; do not merge until the following gates pass.

1. Confirm project nacqjcnpzpapbkazjkcs in Supabase and inspect effective RLS/grants, function JWT settings, Auth users and actual historical schema. Export a protected backup; do not share raw IPs.
2. Create or identify the owner's Supabase Auth user, set server-controlled app_metadata portfolio_admin=true via the admin API/dashboard SQL (never user_metadata), rotate the old exposed password, enable MFA if available, and sign in again to refresh the JWT. Verify non-owner login cannot read visits or delete testimonials. Disable unused public signups if the app does not need them.
3. Coordinate the SQL migration and frontend release in a maintenance window: applying migration first intentionally closes anonymous read access, so the old admin UI may temporarily fail until new frontend ships. The legacy tracker uses service_role and can still write during transition. Do not disable old track-visit until new tracking is verified; then retire it or reject all writes.
4. Deploy track-visit-v2 to this exact project. Check whether gateway accepts the current public client key; keep public collector narrowly scoped. Test CORS from the production domain, reject other origins, verify 400/429 handling, test browser actual gateway IP against a known consented test network. The rate limit per session is not a full anti-abuse control: add gateway/IP-level rate limiting before broad rollout. CORS is not authentication. No full IP is stored by v2; IP still goes to ipapi.co for approximate enrichment and may be processed by the provider. Establish retention, legal basis/consent as applicable, privacy notice and user-facing opt-out before activation. The consent banner now defaults to no analytics, offers equal accept/decline buttons, remembers the choice for up to 180 days, supports withdrawal and respects GPC/DNT. Before public activation, verify the complete site for other non-essential trackers and third-party requests, publish the full privacy notice (retention, controller/contact, rights, processors and transfers), and test first visit, acceptance, refusal, withdrawal, expiry, cross-tab changes and absence of collector calls before consent. The v2 consent field is a client assertion, not a cryptographic proof. Retire the old collector as part of the same rollout so it cannot bypass consent.
5. Run node scripts/test-analytics.mjs, npm ci, npm run build, TypeScript and browser tests. Test route visits, reload, 30-minute inactivity, source tags, missing referrals, project/document clicks, 15 visible seconds, admin exclusions, pagination and small screens.
6. Historical audit: aggregate only, no IP output. See queries below. Hosting/automation signals are not proof of bot activity; do not discard historic rows. New sessions are per-tab estimates, engagement is a signal, not human verification. Do not infer physical address or individual identities. Unknown sources cannot be recovered. Search Console and Vercel geo integration are follow-up once account access is restored.
7. Keep admin and tracker errors observable. Run DB advisors, verify anon/authenticated/owner roles, ensure legacy endpoint is retired, document rollback and retention. Do not restore public read permissions as rollback.

## Historical diagnostic SQL (run on authorized database)
```sql
select coalesce(city,'Unknown') city, region, country, coalesce(isp,'Unknown') network,
 count(*) events, count(distinct ip) distinct_ip_estimate,
 min(created_at) first_seen, max(created_at) last_seen,
 count(*) filter (where referrer is null or referrer='') missing_referrer
from public.page_visits
group by 1,2,3,4 order by events desc limit 50;

select date_trunc('hour',created_at) as hour_utc, city, isp, count(*) events,
 count(distinct ip) distinct_ip_estimate
from public.page_visits
where country_code='US' or country='United States'
group by 1,2,3 order by events desc limit 50;
```
