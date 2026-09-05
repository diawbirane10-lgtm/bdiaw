from __future__ import annotations

import json
from collections import defaultdict
from pathlib import Path

import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.cluster import AgglomerativeClustering

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "config" / "site.json").read_text(encoding="utf-8"))
REPORT_DIR = ROOT / "reports"
REPORT_DIR.mkdir(exist_ok=True)

MODEL_NAME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"


def load_queries() -> list[dict]:
    gsc = REPORT_DIR / "search-console.json"
    rows: list[dict] = []
    if gsc.exists():
        data = json.loads(gsc.read_text(encoding="utf-8"))
        for row in data.get("top_queries", []):
            q = (row.get("query") or "").strip()
            if q:
                rows.append(row)
    if not rows:
        rows = [
            {
                "query": q,
                "clicks": 0,
                "impressions": 0,
                "ctr": 0,
                "position": 999,
            }
            for q in CONFIG["target_queries"]
        ]
    dedup = {}
    for row in rows:
        key = row["query"].casefold()
        dedup.setdefault(key, row)
    return list(dedup.values())


def main() -> int:
    rows = load_queries()
    queries = [row["query"] for row in rows]
    if len(queries) < 2:
        print("Not enough keyword data to cluster.")
        return 0

    model = SentenceTransformer(MODEL_NAME)
    embeddings = model.encode(
        queries,
        normalize_embeddings=True,
        show_progress_bar=False,
    )
    embeddings = np.asarray(embeddings)

    # Cosine-distance threshold: small enough to separate intent, large enough
    # to group multilingual/near-synonym engineering queries.
    clustering = AgglomerativeClustering(
        n_clusters=None,
        distance_threshold=0.42,
        metric="cosine",
        linkage="average",
    )
    labels = clustering.fit_predict(embeddings)

    clusters: dict[int, list[dict]] = defaultdict(list)
    for label, row in zip(labels, rows):
        clusters[int(label)].append(row)

    output = []
    for label, items in clusters.items():
        items = sorted(
            items,
            key=lambda r: (
                -(r.get("impressions", 0) or 0),
                r.get("position", 999) or 999,
            ),
        )
        impressions = sum(float(i.get("impressions", 0) or 0) for i in items)
        clicks = sum(float(i.get("clicks", 0) or 0) for i in items)
        weighted_position_den = sum(
            float(i.get("impressions", 0) or 0) for i in items
        )
        if weighted_position_den:
            avg_position = sum(
                float(i.get("position", 999) or 999)
                * float(i.get("impressions", 0) or 0)
                for i in items
            ) / weighted_position_den
        else:
            valid = [float(i.get("position", 999) or 999) for i in items]
            avg_position = sum(valid) / len(valid)

        output.append(
            {
                "cluster_id": label,
                "representative_query": items[0]["query"],
                "queries": [i["query"] for i in items],
                "impressions": impressions,
                "clicks": clicks,
                "avg_position": avg_position,
            }
        )

    output.sort(key=lambda c: (-c["impressions"], c["avg_position"]))

    payload = {
        "model": MODEL_NAME,
        "source": "search-console" if (REPORT_DIR / "search-console.json").exists() else "configured-targets",
        "clusters": output,
    }
    (REPORT_DIR / "semantic-keywords.json").write_text(
        json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    lines = [
        "# b-diaw.com semantic keyword map",
        "",
        f"Embedding model: {MODEL_NAME}",
        f"Data source: {payload['source']}",
        "",
    ]
    for i, cluster in enumerate(output, start=1):
        lines += [
            f"## Cluster {i} — {cluster['representative_query']}",
            f"- Impressions: {cluster['impressions']:.0f}",
            f"- Clicks: {cluster['clicks']:.0f}",
            f"- Average position: {cluster['avg_position']:.1f}",
            "- Queries:",
        ]
        lines.extend(f"  - {q}" for q in cluster["queries"])
        lines.append("")

    (REPORT_DIR / "semantic-keywords.md").write_text(
        "\n".join(lines) + "\n", encoding="utf-8"
    )
    print("\n".join(lines))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
