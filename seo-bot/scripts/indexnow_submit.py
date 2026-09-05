from __future__ import annotations

import json
from pathlib import Path
from xml.etree import ElementTree as ET

import requests

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "config" / "site.json").read_text(encoding="utf-8"))

KEY = "c0df5762b5641713ef9f7fa3f114ba39"
KEY_LOCATION = f"https://b-diaw.com/{KEY}.txt"
ENDPOINT = "https://api.indexnow.org/indexnow"
TIMEOUT = 20


def sitemap_urls() -> list[str]:
    response = requests.get(
        CONFIG["sitemap_url"],
        timeout=TIMEOUT,
        headers={"User-Agent": "BDiawIndexNow/1.0 (+https://b-diaw.com)"},
    )
    response.raise_for_status()
    root = ET.fromstring(response.content)
    ns = ""
    if root.tag.startswith("{"):
        ns = root.tag.split("}")[0] + "}"
    return [
        node.text.strip()
        for node in root.findall(f".//{ns}loc")
        if node.text
    ]


def main() -> int:
    # Do nothing until the production deployment contains the ownership key.
    verify = requests.get(KEY_LOCATION, timeout=TIMEOUT)
    if verify.status_code != 200 or verify.text.strip() != KEY:
        print("IndexNow key is not live on b-diaw.com yet; skipping safely.")
        return 0

    try:
        urls = sitemap_urls()
    except Exception as exc:
        print(f"Could not read live sitemap; skipping IndexNow: {exc}")
        return 0

    if not urls:
        print("No sitemap URLs to submit.")
        return 0

    payload = {
        "host": "b-diaw.com",
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }
    response = requests.post(ENDPOINT, json=payload, timeout=TIMEOUT)
    if response.status_code in {200, 202}:
        print(f"IndexNow accepted {len(urls)} URLs.")
        return 0

    print(f"IndexNow returned HTTP {response.status_code}: {response.text[:500]}")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
