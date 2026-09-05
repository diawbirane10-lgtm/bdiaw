from __future__ import annotations

import json
import math
import re
from collections import defaultdict
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "config" / "site.json").read_text(encoding="utf-8"))
REPORT_DIR = ROOT / "reports"
REPORT_DIR.mkdir(exist_ok=True)

HEADERS = {"User-Agent": "BDiawSEOGrowthAutopilot/1.0 (+https://b-diaw.com)"}
TIMEOUT = 20

PAGE_TEMPLATES = {
    "/": {
        "title": "Birane DIAW — Electrical Engineering Portfolio | Power Systems & Automation",
        "description": (
            "Electrical engineering portfolio of Birane DIAW covering power systems, smart grids, "
            "VSC-HVDC, renewable energy, industrial automation, digital twins and embedded systems."
        ),
        "content_hint": (
            "Reinforce the homepage expertise block with one concise sentence that naturally connects "
            "the winning query to the most relevant project or research item."
        ),
    },
    "/projects/ufls-smartgrid": {
        "title": "UFLS Smart-Grid Relay — ONEE & SENELEC | Birane DIAW",
        "description": (
            "UFLS smart-grid case study for ONEE and SENELEC using staged under-frequency load shedding, "
            "Stateflow logic, restoration rules and frequency-stability validation."
        ),
        "content_hint": (
            "Strengthen the relay-specific explanation: thresholds, confirmation delays, staged shedding, "
            "restoration logic, validation results and the ONEE/SENELEC parameter differences."
        ),
    },
    "/projects/wave-energy-conversion": {
        "title": "Wave Energy PMSG & Field-Oriented Control | Birane DIAW",
        "description": (
            "Wave-energy conversion case study using a PMSG, field-oriented control and grid-side injection, "
            "with emphasis on source variability and the complete mechanical-to-electrical energy chain."
        ),
        "content_hint": (
            "Expand the exact search intent around PMSG, FOC and grid injection while preserving the project's "
            "system-level explanation of wave-source variability."
        ),
    },
    "/projects/railway-traction-25kv": {
        "title": "25 kV Railway Traction & Regenerative Braking | Birane DIAW",
        "description": (
            "25 kV AC railway traction case study connecting supply, catenary, train dynamics, converter control "
            "and regenerative braking in one electrical energy-flow model."
        ),
        "content_hint": (
            "Reinforce 25 kV AC traction, moving-load behaviour, catenary constraints and regenerative-braking "
            "energy flow with concise engineering language."
        ),
    },
    "/projects/digital-twin-liion-battery": {
        "title": "Li-ion Battery Digital Twin — SOC, SOH & BMS | Birane DIAW",
        "description": (
            "Li-ion battery digital twin using a 2RC equivalent-circuit model, SOC estimation, SOH/RUL tracking, "
            "thermal behaviour, pack imbalance, BMS protections and an interactive software layer."
        ),
        "content_hint": (
            "Prioritise the battery-state intent: 2RC modelling, SOC estimation, SOH/RUL, temperature, pack "
            "imbalance and BMS protection logic."
        ),
    },
    "/projects/digital-twin-electric-drive": {
        "title": "Electric Drive Digital Twin — Cascade PI Control | Birane DIAW",
        "description": (
            "Electric-drive digital twin combining state-space modelling, numerical integration, H-bridge "
            "representation, cascade PI control and signal-level response analysis."
        ),
        "content_hint": (
            "Reinforce electric-drive modelling and cascade PI control, especially the links between plant model, "
            "power stage, nested loops and response analysis."
        ),
    },
}


def clean(value: str) -> str:
    return " ".join((value or "").casefold().split())


def tokens(value: str) -> set[str]:
    return {
        t
        for t in re.findall(r"[a-z0-9à-ÿ+.-]+", clean(value))
        if len(t) > 1
    }


def load_json(name: str, default):
    path = REPORT_DIR / name
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return default


def collect_rows() -> tuple[list[dict], str]:
    gsc = load_json("search-console.json", {})
    buckets = [
        ("ctr", gsc.get("ctr_opportunities", [])),
        ("quick_win", gsc.get("quick_wins", [])),
        ("content", gsc.get("content_opportunities", [])),
        ("top_query", gsc.get("top_queries", [])),
    ]

    dedup: dict[str, dict] = {}
    for source, rows in buckets:
        for row in rows:
            query = (row.get("query") or "").strip()
            if not query:
                continue
            key = query.casefold()
            candidate = dict(row)
            candidate["source"] = source
            if key not in dedup:
                dedup[key] = candidate
            else:
                # Keep the highest-actionability source when a query appears in several buckets.
                rank = {"ctr": 4, "quick_win": 3, "content": 2, "top_query": 1}
                if rank[source] > rank.get(dedup[key].get("source", "top_query"), 1):
                    candidate["clicks"] = max(candidate.get("clicks", 0), dedup[key].get("clicks", 0))
                    candidate["impressions"] = max(candidate.get("impressions", 0), dedup[key].get("impressions", 0))
                    dedup[key] = candidate

    if dedup:
        return list(dedup.values()), "search-console"

    rows = [
        {
            "query": query,
            "clicks": 0,
            "impressions": 0,
            "ctr": 0,
            "position": 999,
            "source": "configured_seed",
        }
        for query in CONFIG["target_queries"]
    ]
    return rows, "configured-targets"


def build_cluster_lookup() -> dict[str, list[str]]:
    semantic = load_json("semantic-keywords.json", {})
    lookup: dict[str, list[str]] = {}
    for cluster in semantic.get("clusters", []):
        related = [q for q in cluster.get("queries", []) if q]
        for q in related:
            lookup[q.casefold()] = related
    return lookup


def page_score(query: str, path: str, keywords: list[str]) -> float:
    q = clean(query)
    q_tokens = tokens(q)
    target_text = " ".join([path.replace("/", " ")] + keywords)
    target_tokens = tokens(target_text)

    overlap = len(q_tokens & target_tokens)
    score = overlap * 2.0

    for kw in keywords:
        k = clean(kw)
        if not k:
            continue
        if k in q:
            score += 6.0
        elif q in k:
            score += 2.0

    # Homepage catches brand/profile intent, but only after explicit project relevance is considered.
    if path == "/" and any(term in q for term in ("birane diaw", "ohmega", "portfolio", "electrical engineering", "génie électrique")):
        score += 7.0

    return score


def assign_page(query: str) -> tuple[str, float]:
    ranked = []
    for path, keywords in CONFIG["page_keyword_targets"].items():
        ranked.append((page_score(query, path, keywords), path))
    ranked.sort(reverse=True)
    score, path = ranked[0]
    if score <= 0:
        return "/", 0.0
    return path, score


def priority(row: dict) -> float:
    impressions = float(row.get("impressions", 0) or 0)
    position = float(row.get("position", 999) or 999)
    ctr = float(row.get("ctr", 0) or 0)
    source = row.get("source", "top_query")

    score = math.log1p(impressions) * 10
    if source == "ctr":
        score += 35
    elif source == "quick_win":
        score += 30
    elif source == "content":
        score += 20
    elif source == "configured_seed":
        score += 5

    if 4 <= position <= 10:
        score += 28
    elif 10 < position <= 15:
        score += 22
    elif 15 < position <= 30:
        score += 14

    if impressions >= 20 and position <= 10 and ctr < 0.03:
        score += 20

    return round(score, 2)


def action_for(row: dict) -> str:
    source = row.get("source")
    position = float(row.get("position", 999) or 999)
    impressions = float(row.get("impressions", 0) or 0)
    ctr = float(row.get("ctr", 0) or 0)

    if source == "ctr" or (position <= 10 and impressions >= 20 and ctr < 0.03):
        return "snippet_refresh"
    if source == "quick_win" or 4 <= position <= 15:
        return "on_page_reinforcement"
    if source == "content" or 15 < position <= 30:
        return "content_expansion"
    return "seed_monitoring"


def fetch_metadata(path: str) -> dict:
    base = CONFIG["base_url"].rstrip("/") + "/"
    url = base if path == "/" else urljoin(base, path.lstrip("/"))
    try:
        r = requests.get(url, timeout=TIMEOUT, headers=HEADERS)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "lxml")
        title = soup.title.get_text(" ", strip=True) if soup.title else ""
        desc_tag = soup.find("meta", attrs={"name": "description"})
        description = desc_tag.get("content", "").strip() if desc_tag else ""
        h1 = " | ".join(x.get_text(" ", strip=True) for x in soup.find_all("h1"))
        return {
            "url": url,
            "title": title,
            "description": description,
            "h1": h1,
            "status": r.status_code,
        }
    except Exception as exc:
        return {"url": url, "error": str(exc)}


def recommendation_text(action: str, query: str, template: dict) -> str:
    if action == "snippet_refresh":
        return (
            f"Snippet opportunity for “{query}”. Test the suggested title/meta first; "
            "do not alter page layout. Keep the search phrase natural, not repeated."
        )
    if action == "on_page_reinforcement":
        return (
            f"Near-page-one opportunity for “{query}”. Add or strengthen one concise passage matching "
            f"that intent. {template['content_hint']}"
        )
    if action == "content_expansion":
        return (
            f"Content-depth opportunity for “{query}”. Add a compact, genuinely useful subsection only if "
            f"the project evidence supports it. {template['content_hint']}"
        )
    return (
        f"Seed query “{query}” has no Search Console signal yet. Monitor it; no live content change is justified."
    )


def main() -> int:
    rows, data_source = collect_rows()
    clusters = build_cluster_lookup()

    opportunities = []
    metadata_cache: dict[str, dict] = {}

    for row in rows:
        query = row["query"]
        path, relevance = assign_page(query)
        template = PAGE_TEMPLATES[path]
        if path not in metadata_cache:
            metadata_cache[path] = fetch_metadata(path)

        action = action_for(row)
        related = [
            q for q in clusters.get(query.casefold(), [])
            if q.casefold() != query.casefold()
        ][:6]

        opportunities.append(
            {
                "query": query,
                "page": path,
                "page_url": metadata_cache[path].get("url"),
                "mapping_relevance": relevance,
                "priority_score": priority(row),
                "source": row.get("source"),
                "position": row.get("position"),
                "impressions": row.get("impressions"),
                "clicks": row.get("clicks"),
                "ctr": row.get("ctr"),
                "action": action,
                "current": metadata_cache[path],
                "suggested_title": template["title"],
                "suggested_description": template["description"],
                "content_brief": recommendation_text(action, query, template),
                "related_queries": related,
            }
        )

    opportunities.sort(key=lambda x: (-x["priority_score"], -x["mapping_relevance"]))
    top = opportunities[:20]

    by_page: dict[str, list[dict]] = defaultdict(list)
    for item in top:
        by_page[item["page"]].append(item)

    payload = {
        "mode": "REPORT_ONLY",
        "safety": {
            "live_site_edits": False,
            "automatic_metadata_edits": False,
            "automatic_content_edits": False,
            "automatic_design_edits": False,
            "requires_human_approval_before_application": True,
        },
        "data_source": data_source,
        "site": CONFIG["base_url"],
        "top_opportunities": top,
        "pages": by_page,
    }
    (REPORT_DIR / "growth-autopilot.json").write_text(
        json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    lines = [
        "# b-diaw.com SEO Growth Autopilot",
        "",
        "**Mode: REPORT-ONLY — this bot does not modify the live website.**",
        "",
        f"Data source: {data_source}",
        f"Opportunities ranked: {len(opportunities)}",
        "",
        "## Guardrails",
        "- No automatic website deployment.",
        "- No automatic title/meta replacement.",
        "- No automatic page-copy or design edits.",
        "- Recommendations must be reviewed before application.",
        "- Search intent must match real project/research evidence; no keyword stuffing.",
        "",
        "## Top opportunities",
    ]

    for i, item in enumerate(top, start=1):
        ctr = float(item.get("ctr", 0) or 0)
        position = float(item.get("position", 999) or 999)
        impressions = float(item.get("impressions", 0) or 0)
        lines += [
            f"### {i}. {item['query']}",
            f"- Page: `{item['page']}`",
            f"- Priority score: {item['priority_score']:.1f}",
            f"- Signal: {item['source']} · pos {position:.1f} · {impressions:.0f} impressions · CTR {ctr:.1%}",
            f"- Action: **{item['action']}**",
            f"- Suggested title: {item['suggested_title']}",
            f"- Suggested meta: {item['suggested_description']}",
            f"- Brief: {item['content_brief']}",
        ]
        if item["related_queries"]:
            lines.append("- Related intent: " + " · ".join(item["related_queries"]))
        lines.append("")

    lines += ["## Page-by-page queue", ""]
    for path in PAGE_TEMPLATES:
        items = by_page.get(path, [])
        lines.append(f"### {path}")
        if not items:
            lines.append("- No priority action this run.")
        else:
            for item in items[:5]:
                lines.append(
                    f"- {item['query']} → {item['action']} (score {item['priority_score']:.1f})"
                )
        lines.append("")

    (REPORT_DIR / "growth-autopilot.md").write_text(
        "\n".join(lines) + "\n", encoding="utf-8"
    )
    print("\n".join(lines))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
