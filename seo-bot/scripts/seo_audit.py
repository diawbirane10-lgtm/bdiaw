from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse
from xml.etree import ElementTree as ET

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "config" / "site.json").read_text(encoding="utf-8"))
REPORT_DIR = ROOT / "reports"
REPORT_DIR.mkdir(exist_ok=True)

SESSION = requests.Session()
SESSION.headers.update({"User-Agent": "BDiawSEOAudit/1.0 (+https://b-diaw.com)"})
TIMEOUT = 20


def fetch(url: str) -> requests.Response:
    return SESSION.get(url, timeout=TIMEOUT, allow_redirects=True)


def parse_sitemap(url: str) -> list[str]:
    response = fetch(url)
    response.raise_for_status()
    root = ET.fromstring(response.content)
    namespace = ""
    if root.tag.startswith("{"):
        namespace = root.tag.split("}")[0] + "}"
    return [
        loc.text.strip()
        for loc in root.findall(f".//{namespace}loc")
        if loc.text
    ]


def text_of(node) -> str:
    return " ".join(node.get_text(" ", strip=True).split()) if node else ""


def audit_page(url: str):
    critical, warnings, links = [], [], set()
    data = {"url": url}

    try:
        response = fetch(url)
    except Exception as exc:
        return data, [f"Request failed: {exc}"], warnings, links

    data["status"] = response.status_code
    data["final_url"] = response.url
    data["response_time_ms"] = round(response.elapsed.total_seconds() * 1000)

    if response.status_code != 200:
        critical.append(f"HTTP status is {response.status_code}, expected 200")
        return data, critical, warnings, links

    if urlparse(response.url).scheme != "https":
        critical.append("Final URL is not HTTPS")

    soup = BeautifulSoup(response.text, "lxml")
    html = soup.find("html")
    title = text_of(soup.find("title"))
    desc_tag = soup.find("meta", attrs={"name": lambda v: v and v.lower() == "description"})
    description = desc_tag.get("content", "").strip() if desc_tag else ""
    canonical_tag = soup.find("link", rel=lambda v: v and "canonical" in v)
    canonical = canonical_tag.get("href", "").strip() if canonical_tag else ""
    robots_tag = soup.find("meta", attrs={"name": lambda v: v and v.lower() == "robots"})
    robots_meta = robots_tag.get("content", "").strip().lower() if robots_tag else ""
    h1s = soup.find_all("h1")
    lang = (html.get("lang") or "").strip() if html else ""
    og_url_tag = soup.find("meta", attrs={"property": "og:url"})
    og_url = og_url_tag.get("content", "").strip() if og_url_tag else ""
    og_image_tag = soup.find("meta", attrs={"property": "og:image"})
    og_image = og_image_tag.get("content", "").strip() if og_image_tag else ""

    schemas = []
    for script in soup.find_all("script", attrs={"type": "application/ld+json"}):
        try:
            schemas.append(json.loads(script.string or script.get_text()))
        except Exception:
            warnings.append("Invalid JSON-LD block")

    data.update({
        "title": title,
        "title_length": len(title),
        "meta_description": description,
        "meta_description_length": len(description),
        "canonical": canonical,
        "robots_meta": robots_meta,
        "h1_count": len(h1s),
        "h1": text_of(h1s[0]) if h1s else "",
        "lang": lang,
        "og_url": og_url,
        "og_image": og_image,
        "json_ld_count": len(schemas),
    })

    if not title:
        critical.append("Missing <title>")
    elif len(title) < 25 or len(title) > 70:
        warnings.append(f"Title length is {len(title)} chars")

    if not description:
        warnings.append("Missing meta description")
    elif len(description) < 90 or len(description) > 180:
        warnings.append(f"Meta description length is {len(description)} chars")

    if not canonical:
        critical.append("Missing canonical URL")
    else:
        p = urlparse(canonical)
        if p.hostname != CONFIG["canonical_host"]:
            critical.append(f"Canonical host is {p.hostname!r}, expected {CONFIG['canonical_host']!r}")
        if p.scheme != "https":
            critical.append("Canonical is not HTTPS")

    if "noindex" in robots_meta:
        critical.append("robots meta contains noindex")

    if len(h1s) != 1:
        warnings.append(f"Expected exactly one H1, found {len(h1s)}")

    if not lang:
        warnings.append("Missing html lang attribute")

    if not og_url:
        warnings.append("Missing og:url")
    elif urlparse(og_url).hostname != CONFIG["canonical_host"]:
        warnings.append("og:url does not use b-diaw.com")

    if not og_image:
        warnings.append("Missing og:image")
    elif urlparse(og_image).hostname != CONFIG["canonical_host"]:
        warnings.append("og:image still points to another host")

    if not schemas:
        warnings.append("No JSON-LD structured data found")

    base_host = CONFIG["canonical_host"]
    for anchor in soup.find_all("a", href=True):
        href = anchor.get("href", "").strip()
        if not href or href.startswith(("mailto:", "tel:", "javascript:", "#")):
            continue
        absolute = urljoin(response.url, href)
        parsed = urlparse(absolute)
        if parsed.scheme in {"http", "https"} and parsed.hostname == base_host:
            links.add(parsed._replace(fragment="").geturl())

    return data, critical, warnings, links


def check_internal_links(urls: set[str]) -> list[str]:
    broken = []
    for url in sorted(urls):
        try:
            response = fetch(url)
            if response.status_code >= 400:
                broken.append(f"{url} -> HTTP {response.status_code}")
        except Exception as exc:
            broken.append(f"{url} -> {exc}")
    return broken


def main() -> int:
    timestamp = datetime.now(timezone.utc).isoformat()
    critical, warnings, pages = [], [], []

    try:
        robots = fetch(CONFIG["robots_url"])
        robots.raise_for_status()
        if "Sitemap:" not in robots.text:
            warnings.append("robots.txt does not declare sitemap.xml")
        if any(line.strip().lower() == "disallow: /" for line in robots.text.splitlines()):
            critical.append("robots.txt blocks the entire site")
    except Exception as exc:
        critical.append(f"robots.txt check failed: {exc}")

    try:
        sitemap_urls = parse_sitemap(CONFIG["sitemap_url"])
        if not sitemap_urls:
            critical.append("sitemap.xml contains no URLs")
    except Exception as exc:
        critical.append(f"sitemap.xml check failed: {exc}")
        sitemap_urls = []

    urls = []
    for url in CONFIG["core_pages"] + sitemap_urls:
        if url not in urls:
            urls.append(url)

    all_internal_links = set()
    for url in urls:
        data, c, w, links = audit_page(url)
        pages.append(data)
        all_internal_links.update(links)
        critical.extend(f"{url}: {item}" for item in c)
        warnings.extend(f"{url}: {item}" for item in w)

    critical.extend(
        f"Broken internal link: {item}"
        for item in check_internal_links(all_internal_links)
    )

    report = {
        "generated_at": timestamp,
        "site": CONFIG["base_url"],
        "pages": pages,
        "critical": critical,
        "warnings": warnings,
        "summary": {
            "pages_checked": len(pages),
            "critical_count": len(critical),
            "warning_count": len(warnings),
        },
    }

    (REPORT_DIR / "seo-audit.json").write_text(
        json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    lines = [
        "# b-diaw.com technical SEO audit",
        "",
        f"Generated: {timestamp}",
        f"Pages checked: {len(pages)}",
        f"Critical issues: {len(critical)}",
        f"Warnings: {len(warnings)}",
        "",
        "## Critical issues",
        *([f"- {x}" for x in critical] or ["- None"]),
        "",
        "## Warnings",
        *([f"- {x}" for x in warnings] or ["- None"]),
    ]
    (REPORT_DIR / "seo-audit.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))
    return 1 if critical else 0


if __name__ == "__main__":
    sys.exit(main())
