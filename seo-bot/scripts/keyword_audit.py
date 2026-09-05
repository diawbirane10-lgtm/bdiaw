from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "config" / "site.json").read_text(encoding="utf-8"))
REPORT_DIR = ROOT / "reports"
REPORT_DIR.mkdir(exist_ok=True)

HEADERS = {"User-Agent": "BDiawKeywordAudit/1.0 (+https://b-diaw.com)"}


def clean(value: str) -> str:
    return " ".join(value.lower().split())


def page_text(url: str):
    r = requests.get(url, timeout=20, headers=HEADERS)
    r.raise_for_status()
    soup = BeautifulSoup(r.text, "lxml")
    title = soup.title.get_text(" ", strip=True) if soup.title else ""
    desc = ""
    tag = soup.find("meta", attrs={"name": "description"})
    if tag:
        desc = tag.get("content", "")
    h1 = " ".join(x.get_text(" ", strip=True) for x in soup.find_all("h1"))
    body = soup.get_text(" ", strip=True)
    return clean(title), clean(desc), clean(h1), clean(body)


def main():
    rows = []
    base = CONFIG["base_url"].rstrip("/") + "/"

    for path, keywords in CONFIG["page_keyword_targets"].items():
        url = base if path == "/" else urljoin(base, path.lstrip("/"))
        try:
            title, desc, h1, body = page_text(url)
        except Exception as exc:
            rows.append({"url": url, "error": str(exc), "keywords": keywords})
            continue

        matches = []
        for kw in keywords:
            k = clean(kw)
            matches.append({
                "keyword": kw,
                "title": k in title,
                "description": k in desc,
                "h1": k in h1,
                "body": k in body,
            })
        rows.append({"url": url, "matches": matches})

    report = {"site": CONFIG["base_url"], "pages": rows}
    (REPORT_DIR / "keyword-audit.json").write_text(
        json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    lines = ["# b-diaw.com keyword coverage", ""]
    for page in rows:
        lines.append(f"## {page['url']}")
        if page.get("error"):
            lines.append(f"- Error: {page['error']}")
            continue
        for m in page["matches"]:
            places = [k for k in ("title", "description", "h1", "body") if m[k]]
            lines.append(f"- {m['keyword']}: {', '.join(places) if places else 'missing'}")
        lines.append("")

    (REPORT_DIR / "keyword-audit.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))


if __name__ == "__main__":
    main()
