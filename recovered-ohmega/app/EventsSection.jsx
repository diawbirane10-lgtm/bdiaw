"use client";

const ministryLogo="/mep-logo-full.webp";
const iaeaLogo="/brand-iaea.svg";

const ministrySite="https://energie-mines.gouv.sn/";
const workshopNote="https://energie-mines.gouv.sn/atelier-sur-la-preparation-du-programme-electronucleaire-nepio/";
const iaeaSite="https://www.iaea.org/";
const milestones="https://nucleus.iaea.org/sites/nids/capacity/milestones/SitePages/Home.aspx";

const copy={
  en:{
    nav:"Events",
    title:"Conferences & Events",
    subtitle:"Selected participation",
    role:"Participant",
    date:"7–11 Sep 2026",
    name:"High-Level Workshop on Establishing the Strategic Committee and the National Body Responsible for Preparing the Nuclear Power Programme (NEPIO)",
    orgs:"Ministry of Energy, Petroleum and Mines, Senegal · International Atomic Energy Agency (IAEA)",
    place:"Dakar, Senegal",
    body:"Five days of work on the institutional and technical preparation of Senegal’s nuclear power programme under the IAEA Milestones Approach, including experience sharing, institutional coordination, planning, capacity development and infrastructure preparation.",
    official:"Official workshop note",
    guide:"IAEA Milestones Approach",
    ministry:"Ministry of Energy, Petroleum and Mines",
    iaea:"International Atomic Energy Agency"
  },
  fr:{
    nav:"Événements",
    title:"Conférences & événements",
    subtitle:"Participations sélectionnées",
    role:"Participant",
    date:"7–11 sept. 2026",
    name:"Atelier de haut niveau consacré à la mise en place du Comité stratégique et de l’organe national chargé de la préparation du programme électronucléaire (NEPIO)",
    orgs:"Ministère de l’Énergie, du Pétrole et des Mines, Sénégal · Agence internationale de l’énergie atomique (AIEA)",
    place:"Dakar, Sénégal",
    body:"Cinq jours de travaux consacrés à la préparation institutionnelle et technique du programme électronucléaire sénégalais selon l’approche par jalons de l’AIEA : retours d’expérience, coordination institutionnelle, planification, développement des compétences et préparation des infrastructures.",
    official:"Note officielle de l’atelier",
    guide:"Approche par jalons de l’AIEA",
    ministry:"Ministère de l’Énergie, du Pétrole et des Mines",
    iaea:"Agence internationale de l’énergie atomique"
  }
};

export default function EventsSection({lang="en"}){
  const t=copy[lang]||copy.en;
  return <aside id="engagement" className="engagement motionSection" aria-labelledby="engagement-title">
    <div className="engagementLabel">
      <span>{lang==="fr"?"ENGAGEMENT INSTITUTIONNEL":"INSTITUTIONAL ENGAGEMENT"}</span>
      <span>{t.date}</span>
    </div>
    <div className="engagementLogos" aria-label={lang==="fr"?"Organisations":"Organizations"}>
      <a className="engagementLogo ministry" href={ministrySite} target="_blank" rel="noreferrer" title={t.ministry}>
        <img src={ministryLogo} alt={t.ministry}/>
      </a>
      <span className="engagementJoin" aria-hidden="true">×</span>
      <a className="engagementLogo iaea" href={iaeaSite} target="_blank" rel="noreferrer" title={t.iaea}>
        <img src={iaeaLogo} alt={t.iaea}/>
      </a>
    </div>
    <div className="engagementCopy motionItem">
      <p className="engagementKicker">{t.role} · {t.place}</p>
      <h2 id="engagement-title">{lang==="fr"?"Atelier AIEA / NEPIO — Programme électronucléaire du Sénégal":"IAEA / NEPIO Workshop — Senegal Nuclear Power Programme"}</h2>
      <p>{t.body}</p>
      <nav className="engagementLinks">
        <a href={workshopNote} target="_blank" rel="noreferrer">{t.official} ↗</a>
        <a href={milestones} target="_blank" rel="noreferrer">{t.guide} ↗</a>
      </nav>
    </div>
  </aside>;
}
