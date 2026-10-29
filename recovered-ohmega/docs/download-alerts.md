# Report download email alerts

Status: implementation prepared; email delivery is NOT active until a sender is configured and this code is deployed.

The seven report links on the five active project pages use `/api/reports/<id>`. The server fetches the allowlisted PDF and streams it as an attachment. Next.js `after()` sends the alert outside the response path. An unavailable email provider cannot prevent the PDF from being downloaded. Unknown IDs, unsuccessful upstream requests, HEAD and explicit prefetch requests do not send alerts.

## Activate without a paid subscription

1. Create or connect a **free** Resend account; keep paid overages disabled. Its published free limit on 29 October 2026 is 100 emails/day and 3,000/month: https://resend.com/pricing.
2. Verify an email-sending domain in Resend and create a sending API key. Configure the prescribed DNS records. Use the provider's test sender only if the chosen recipient is permitted by the account's test restrictions.
3. In the existing Vercel `ohmegadx` project, set these **server-only Production variables**:
   - `RESEND_API_KEY`: sending key, stored as Secret.
   - `DOWNLOAD_ALERT_FROM`: the verified sender, e.g. `Portfolio <alerts@b-diaw.com>` after verifying that domain.
   - `DOWNLOAD_ALERT_TO`: optional; defaults to `diawbirane10@gmail.com`.
4. Deploy the branch, then request one report through its project-page link. Confirm both the PDF and the email arrive. Provider acceptance alone is not proof of inbox delivery. Check junk mail and Resend delivery logs.
5. Enable notifications for the receiving mail app on the phone for email push notifications. This implementation sends email; it does not create native web push subscriptions.

No API key belongs in browser code, commits, screenshots, or chat. The currently inspected Production environment has no email-sending key or sender configured. No real alert email has been sent or validated.

## Meaning and limits

- An alert means an accepted report request; it cannot prove that a visitor completed a save or read the file. Next.js `after()` may run even if a client disconnects.
- Requests for the same report/client in the same UTC minute share a provider idempotency key and identical payload to suppress duplicate email. IP-derived HMACs are not included in email or application logs.
- No visitor identity is claimed. Email contains the report name, filename and minute only.
- Quota limits or provider failure can suppress alerts; this is best-effort delivery with no durable retry queue. Known report URLs remain public on GitHub; requests made directly there bypass this endpoint and cannot trigger site alerts.
- There is no distributed abuse limiter in this minimal implementation. Public callers can request files and consume the free email quota. Provider quotas and one-minute deduplication limit impact; add a durable limiter if traffic warrants it.
- Disabling/removing the email variables stops email while preserving downloads. Reverting the link helper restores the previous direct GitHub file links.

## Validation

`node --test scripts/*.test.mjs` checks allowlist isolation, no alerts on failed requests/HEAD/prefetch, uninterrupted PDF delivery during email failure, missing credentials, idempotency and link mapping. Build and rendered-route smoke checks cover the real Next.js route and existing canonical/font/navigation checks.
