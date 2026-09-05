from __future__ import annotations

import json
import os
from pathlib import Path

from google.oauth2 import service_account
from googleapiclient.discovery import build

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "config" / "site.json").read_text(encoding="utf-8"))


def main() -> int:
    raw = os.getenv("GSC_SERVICE_ACCOUNT_JSON", "").strip()
    if not raw:
        print("GSC_SERVICE_ACCOUNT_JSON is not configured; skipping.")
        return 0

    credentials = service_account.Credentials.from_service_account_info(
        json.loads(raw),
        scopes=["https://www.googleapis.com/auth/webmasters"],
    )
    service = build("searchconsole", "v1", credentials=credentials, cache_discovery=False)
    service.sitemaps().submit(
        siteUrl=CONFIG["search_console_property"],
        feedpath=CONFIG["sitemap_url"],
    ).execute()
    print(f"Submitted sitemap: {CONFIG['sitemap_url']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
