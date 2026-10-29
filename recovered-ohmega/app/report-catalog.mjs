const base = "https://raw.githubusercontent.com/diawbirane10-lgtm/bdiaw/main/public/documents/";

// Shared with link rendering; only these existing public reports can be served.
export const reports = Object.freeze({
  "ufls-en": { file: "ufls_smartgrid_project_report_EN.pdf", title: "UFLS smart grid — EN" },
  "ufls-fr": { file: "rapport_projet_ufls_smartgrid_FR.pdf", title: "UFLS smart grid — FR" },
  "wave": { file: "projet-houlomotrice.pdf", title: "Wave-energy conversion" },
  "rail-en": { file: "railway_traction_project_report_EN.pdf", title: "Railway traction — EN" },
  "rail-fr": { file: "rapport_projet_traction_FR.pdf", title: "Railway traction — FR" },
  "battery": { file: "Rapport_Digital_Twin_LiIon.pdf", title: "Li-ion battery digital twin" },
  "drive": { file: "Digital_Twin_complet-report.pdf", title: "Electric-drive digital twin" },
});

export function reportUrl(report) { return base + report.file; }

const downloadLinks = new Map(Object.entries(reports).map(([id, report]) => [reportUrl(report), `/api/reports/${id}`]));
export function reportDownloadHref(href) { return downloadLinks.get(href) || href; }
