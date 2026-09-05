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

HEADERS = {"User-Agent": "BDiawSEOGrowthBot/2.0 (+https://b-diaw.com)"}
TIMEOUT = 20

PAGE_TEMPLATES = {
    "/": {
        "title": "Birane DIAW — Electrical Engineering Portfolio | Power Systems & Automation",
        "description": "Electrical engineering portfolio of Birane DIAW covering power systems, smart grids, VSC-HVDC, renewable energy, industrial automation, digital twins and embedded systems.",
    },
    "/projects/ufls-smartgrid": {
        "title": "UFLS Smart-Grid Relay — ONEE & SENELEC | Birane DIAW",
        "description": "UFLS smart-grid case study for ONEE and SENELEC using staged under-frequency load shedding, Stateflow logic, restoration rules and frequency-stability validation.",
    },
    "/projects/wave-energy-conversion": {
        "title": "Wave Energy PMSG & Field-Oriented Control | Birane DIAW",
        "description": "Wave-energy conversion case study using a PMSG, field-oriented control and grid-side injection, with emphasis on source variability and the mechanical-to-electrical energy chain.",
    },
    "/projects/railway-traction-25kv": {
        "title": "25 kV Railway Traction & Regenerative Braking | Birane DIAW",
        "description": "25 kV AC railway traction case study connecting supply, catenary, train dynamics, converter control and regenerative braking in one electrical energy-flow model.",
    },
    "/projects/digital-twin-liion-battery": {
        "title": "Li-ion Battery Digital Twin — SOC, SOH & BMS | Birane DIAW",
        "description": "Li-ion battery digital twin using a 2RC equivalent-circuit model, SOC estimation, SOH/RUL tracking, thermal behaviour, pack imbalance and BMS protections.",
    },
    "/projects/digital-twin-electric-drive": {
        "title": "Electric Drive Digital Twin — Cascade PI Control | Birane DIAW",
        "description": "Electric-drive digital twin combining state-space modelling, H-bridge representation, cascade PI control and signal-level response analysis.",
    },
}


def clean(value: str) -> str:
    return " ".join((value or "").casefold().split())


def fetch_page(path: str) -> dict:
    base = CONFIG["base_url"].rstrip("/") + "/"
    url = base if path == "/" else urljoin(base, path.lstrip("/"))
    r = requests.get(url, timeout=TIMEOUT, headers=HEADERS)
    r.raise_for_status()
    soup = BeautifulSoup(r.text, "lxml")
    title = soup.title.get_text(" ", strip=True) if soup.title else ""
    tag = soup.find("meta", attrs={"name": "description"})
    description = tag.get("content", "").strip() if tag else ""
    h1 = " ".join(x.get_text(" ", strip=True) for x in soup.find_all("h1"))
    body = soup.get_text(" ", strip=True)
    return {
        "url": url,
        "title": title,
        "description": description,
        "h1": h1,
        "body": body,
    }


def classify_keyword(keyword: str, page: dict) -> dict:
    k = clean(keyword)
    places = {
        "title": k in clean(page["title"]),
        "description": k in clean(page["description"]),
        "h1": k in clean(page["h1"]),
        "body": k in clean(page["body"]),
    }
    score = (
        4 * int(places["title"])
        + 3 * int(places["description"])
        + 2 * int(places["h1"])
        + 1 * int(places["body"])
    )
    if score >= 7:
        status = "strong"
    elif score >= 3:
        status = "covered"
    elif score >= 1:
        status = "weak"
    else:
        status = "missing"
    return {"keyword": keyword, "status": status, "score": score, **places}


def recommendation(path: str, checks: list[dict]) -> dict:
    missing = [x["keyword"] for x in checks if x["status"] == "missing"]
    weak = [x["keyword"] for x in checks if x["status"] == "weak"]
    template = PAGE_TEMPLATES[path]

    if missing:
        action = "reinforce"
        priority = "high"
        reason = "Target concepts are absent from the rendered page."
    elif weak:
        action = "refine"
        priority = "medium"
        reason = "Target concepts appear only weakly in the rendered page."
    else:
        action = "monitor"
        priority = "low"
        reason = "Core target concepts are already covered naturally."

    return {
        "path": path,
        "action": action,
        "priority": priority,
        "reason": reason,
        "missing": missing,
        "weak": weak,
        "suggested_title": template["title"],
        "suggested_description": template["description"],
        "automatic_change": False,
    }


def main() -> int:
    pages = []
    recommendations = []

    for path, keywords in CONFIG["page_keyword_targets"].items():
        try:
            page = fetch_page(path)
            checks = [classify_keyword(k, page) for k in keywords]
            pages.append({
                "path": path,
                "url": page["url"],
                "title": page["title"],
                "description": page["description"],
                "checks": checks,
            })
            recommendations.append(recommendation(path, checks))
        except Exception as exc:
            pages.append({"path": path, "error": str(exc)})

    payload = {
        "mode": "AUTONOMOUS_AUDIT",
        "site": CONFIG["base_url"],
        "data_source": "live-site-and-configured-targets",
        "search_console_required": False,
        "hugging_face_required": False,
        "pages": pages,
        "recommendations": recommendations,
    }
    (REPORT_DIR / "growth-autopilot.json").write_text(
        json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    lines = [
        "# b-diaw.com SEO Growth Bot",
        "",
        "Mode: autonomous audit. No Google Cloud or Hugging Face dependency.",
        "",
        "The bot checks the live website against the intended search themes, reports gaps, and leaves visual/content edits for controlled application.",
        "",
        "## Page queue",
    ]

    for item in recommendations:
        lines += [
            f"### {item['path']}",
            f"- Priority: **{item['priority']}**",
            f"- Action: **{item['action']}**",
            f"- Reason: {item['reason']}",
            f"- Missing: {', '.join(item['missing']) if item['missing'] else 'none'}",
            f"- Weak: {', '.join(item['weak']) if item['weak'] else 'none'}",
            f"- SEO title reference: {item['suggested_title']}",
            f"- Meta description reference: {item['suggested_description']}",
            "",
        ]

    lines += [
        "## Guardrails",
        "- No keyword stuffing.",
        "- No automatic visual redesign.",
        "- No fabricated project claims.",
        "- Public pages only; /admin and /api are excluded.",
        "",
    ]

    (REPORT_DIR / "growth-autopilot.md").write_text(
        "\n".join(lines) + "\n", encoding="utf-8"
    )
    print("\n".join(lines))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
