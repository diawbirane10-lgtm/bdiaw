const base="https://raw.githubusercontent.com/diawbirane10-lgtm/bdiaw/main/public/documents/";
export const reports=Object.freeze({
  "ufls-en":{file:"ufls_smartgrid_project_report_EN.pdf",title:"UFLS · English",page:"/projects/ufls-smartgrid"},
  "ufls-fr":{file:"rapport_projet_ufls_smartgrid_FR.pdf",title:"UFLS · Français",page:"/projects/ufls-smartgrid"},
  wave:{file:"projet-houlomotrice.pdf",title:"Énergie houlomotrice",page:"/projects/wave-energy-conversion"},
  "rail-en":{file:"railway_traction_project_report_EN.pdf",title:"Traction ferroviaire · English",page:"/projects/railway-traction-25kv"},
  "rail-fr":{file:"rapport_projet_traction_FR.pdf",title:"Traction ferroviaire · Français",page:"/projects/railway-traction-25kv"},
  battery:{file:"Rapport_Digital_Twin_LiIon.pdf",title:"Jumeau numérique · Batterie",page:"/projects/digital-twin-liion-battery"},
  drive:{file:"Digital_Twin_complet-report.pdf",title:"Jumeau numérique · Entraînement",page:"/projects/digital-twin-electric-drive"},
});
export function reportUrl(report){return base+report.file;}
const links=new Map(Object.entries(reports).map(([id,report])=>[reportUrl(report),`/api/reports/${id}`]));
export function reportDownloadHref(href){return links.get(href)||href;}
