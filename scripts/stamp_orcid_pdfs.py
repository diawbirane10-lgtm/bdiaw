from __future__ import annotations

from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor

ORCID_ID = "0009-0003-4015-7854"
ORCID_URL = f"https://orcid.org/{ORCID_ID}"
SIGNATURE = f"Birane DIAW · ORCID {ORCID_ID} · b-diaw.com"

TARGETS = [
    Path("public/documents/ufls_smartgrid_project_report_EN.pdf"),
    Path("public/documents/rapport_projet_ufls_smartgrid_FR.pdf"),
    Path("public/documents/projet-houlomotrice.pdf"),
    Path("public/documents/railway_traction_project_report_EN.pdf"),
    Path("public/documents/rapport_projet_traction_FR.pdf"),
    Path("public/documents/Rapport_Digital_Twin_LiIon.pdf"),
    Path("public/documents/Digital_Twin_complet-report.pdf"),
]

GREEN = HexColor("#A6CE39")
DARK = HexColor("#34424A")


def overlay_for_page(width: float, height: float, first_page: bool) -> PdfReader:
    packet = BytesIO()
    c = canvas.Canvas(packet, pagesize=(width, height))

    y = 14
    c.setFillColor(GREEN)
    c.circle(20, y + 2.5, 5.2, fill=1, stroke=0)
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Helvetica-Bold", 5.8)
    c.drawCentredString(20, y + 0.7, "iD")
    c.setFillColor(DARK)
    c.setFont("Helvetica", 7.2)
    c.drawString(29, y, SIGNATURE)
    c.setStrokeColor(GREEN)
    c.setLineWidth(0.45)
    c.line(14, y + 11, width - 14, y + 11)

    if first_page:
        top_y = height - 24
        label = f"ORCID {ORCID_ID}"
        text_width = c.stringWidth(label, "Helvetica-Bold", 8.2)
        x = max(16, width - text_width - 37)
        c.setFillColor(GREEN)
        c.circle(x, top_y + 2.6, 5.6, fill=1, stroke=0)
        c.setFillColorRGB(1, 1, 1)
        c.setFont("Helvetica-Bold", 6.1)
        c.drawCentredString(x, top_y + 0.8, "iD")
        c.setFillColor(DARK)
        c.setFont("Helvetica-Bold", 8.2)
        c.drawString(x + 9, top_y, label)
        c.linkURL(ORCID_URL, (x - 6, top_y - 3, width - 14, top_y + 10), relative=0)

    c.linkURL(ORCID_URL, (14, y - 3, min(width - 14, 270), y + 10), relative=0)
    c.save()
    packet.seek(0)
    return PdfReader(packet)


def stamp(path: Path) -> None:
    if not path.exists():
        print(f"SKIP missing: {path}")
        return

    reader = PdfReader(str(path))
    writer = PdfWriter()

    for i, page in enumerate(reader.pages):
        width = float(page.mediabox.width)
        height = float(page.mediabox.height)
        overlay = overlay_for_page(width, height, i == 0).pages[0]
        page.merge_page(overlay, over=True)
        writer.add_page(page)

    old_meta = reader.metadata or {}
    writer.add_metadata({
        "/Title": old_meta.get("/Title", path.stem),
        "/Author": "Birane DIAW",
        "/Subject": f"Engineering project report · ORCID {ORCID_ID}",
        "/Keywords": f"Birane DIAW, ORCID {ORCID_ID}, electrical engineering, b-diaw.com",
        "/Creator": old_meta.get("/Creator", "") or "Birane DIAW portfolio",
    })

    tmp = path.with_suffix(".orcid.tmp.pdf")
    with tmp.open("wb") as f:
        writer.write(f)
    tmp.replace(path)
    print(f"STAMPED: {path} ({len(reader.pages)} pages)")


if __name__ == "__main__":
    for pdf in TARGETS:
        stamp(pdf)
