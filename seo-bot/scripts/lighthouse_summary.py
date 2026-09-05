from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORT_DIR = ROOT / "reports" / "lighthouse"
REPORT_DIR.mkdir(parents=True, exist_ok=True)

THRESHOLDS = {"seo": 0.95, "accessibility": 0.90, "best-practices": 0.90}


def main() -> int:
    files = sorted(REPORT_DIR.glob("*.json"))
    if not files:
        return 1

    failed = False
    lines = ["# b-diaw.com Lighthouse summary", ""]
    for path in files:
        data = json.loads(path.read_text(encoding="utf-8"))
        url = data.get("finalDisplayedUrl") or data.get("requestedUrl") or path.stem
        categories = data.get("categories", {})
        lines.append(f"## {url}")
        for name in ["performance", "accessibility", "best-practices", "seo"]:
            score = categories.get(name, {}).get("score")
            if score is None:
                lines.append(f"- {name}: unavailable")
                continue
            lines.append(f"- {name}: {score * 100:.0f}")
            if name in THRESHOLDS and score < THRESHOLDS[name]:
                failed = True
        lines.append("")

    output = "\n".join(lines)
    (REPORT_DIR / "summary.md").write_text(output + "\n", encoding="utf-8")
    print(output)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
