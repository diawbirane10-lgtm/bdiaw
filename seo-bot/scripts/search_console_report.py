from __future__ import annotations

import json
import os
from datetime import date, timedelta
from pathlib import Path

from google.oauth2 import service_account
from googleapiclient.discovery import build

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "config" / "site.json").read_text(encoding="utf-8"))
REPORT_DIR = ROOT / "reports"
REPORT_DIR.mkdir(exist_ok=True)


def query(service, start_date, end_date, dimensions, row_limit=25000):
    body = {
        "startDate": start_date,
        "endDate": end_date,
        "dimensions": dimensions,
        "rowLimit": row_limit,
    }
    return service.searchanalytics().query(
        siteUrl=CONFIG["search_console_property"], body=body
    ).execute().get("rows", [])


def normalize(row):
    key = (row.get("keys") or [""])[0]
    return {
        "query": key,
        "clicks": row.get("clicks", 0),
        "impressions": row.get("impressions", 0),
        "ctr": row.get("ctr", 0),
        "position": row.get("position", 999),
    }


def main() -> int:
    raw = os.getenv("GSC_SERVICE_ACCOUNT_JSON", "").strip()
    if not raw:
        print("GSC_SERVICE_ACCOUNT_JSON is not configured; skipping.")
        return 0

    credentials = service_account.Credentials.from_service_account_info(
        json.loads(raw),
        scopes=["https://www.googleapis.com/auth/webmasters.readonly"],
    )
    service = build("searchconsole", "v1", credentials=credentials, cache_discovery=False)

    end = date.today() - timedelta(days=3)
    start = end - timedelta(days=27)
    rows = [normalize(r) for r in query(service, start.isoformat(), end.isoformat(), ["query"])]

    quick = sorted(
        [r for r in rows if 4 <= r["position"] <= 15 and r["impressions"] >= 5],
        key=lambda r: (r["position"], -r["impressions"]),
    )
    content = sorted(
        [r for r in rows if 15 < r["position"] <= 30 and r["impressions"] >= 5],
        key=lambda r: (-r["impressions"], r["position"]),
    )
    ctr = sorted(
        [r for r in rows if r["position"] <= 10 and r["impressions"] >= 20 and r["ctr"] < 0.03],
        key=lambda r: (-r["impressions"], r["position"]),
    )

    tracked = {q.casefold() for q in CONFIG["target_queries"]}
    tracked_rows = [r for r in rows if r["query"].casefold() in tracked]

    payload = {
        "period": {"start": start.isoformat(), "end": end.isoformat()},
        "quick_wins": quick[:40],
        "content_opportunities": content[:40],
        "ctr_opportunities": ctr[:40],
        "tracked_queries": tracked_rows,
        "top_queries": sorted(rows, key=lambda r: r["impressions"], reverse=True)[:60],
    }
    (REPORT_DIR / "search-console.json").write_text(
        json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    lines = [
        "# b-diaw.com Search Console opportunities",
        "",
        f"Period: {start.isoformat()} to {end.isoformat()}",
        "",
        "## Quick wins — positions 4–15",
    ]
    lines += [
        f"- {r['query']}: pos {r['position']:.1f}, {r['impressions']:.0f} impressions, CTR {r['ctr']:.1%}"
        for r in quick[:20]
    ] or ["- None yet."]
    lines += ["", "## Content opportunities — positions 15–30"]
    lines += [
        f"- {r['query']}: pos {r['position']:.1f}, {r['impressions']:.0f} impressions"
        for r in content[:20]
    ] or ["- None yet."]
    lines += ["", "## CTR opportunities — top 10 but weak snippet"]
    lines += [
        f"- {r['query']}: pos {r['position']:.1f}, {r['impressions']:.0f} impressions, CTR {r['ctr']:.1%}"
        for r in ctr[:20]
    ] or ["- None yet."]
    lines += ["", "## Tracked exact queries"]
    lines += [
        f"- {r['query']}: pos {r['position']:.1f}, {r['impressions']:.0f} impressions, {r['clicks']:.0f} clicks"
        for r in tracked_rows
    ] or ["- No exact tracked query data yet."]

    (REPORT_DIR / "search-console.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
