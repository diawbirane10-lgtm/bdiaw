import { useLanguage } from "@/i18n/LanguageContext";
import ProjectCard, { ProjectData } from "./ProjectCard";
import { StaggerContainer, StaggerItem } from "./ScrollReveal";

const LabSection = () => {
  const { t } = useLanguage();

  const labs: ProjectData[] = [
    {
      titleKey: "proj.5.title",
      subtitleKey: "proj.5.subtitle",
      statusType: "completed",
      contexteKey: "proj.5.contexte",
      objectifKey: "proj.5.objectif",
      contributionKey: "proj.5.contribution",
      outils: ["LTSpice", "Oscilloscope", "Générateur de signaux", "Multimètre"],
      pdfLinks: [
        { labelKey: "proj.5.tp1", href: "/documents/CR_EA_TP1.pdf" },
        { labelKey: "proj.5.tp2", href: "/documents/CR_EA_TP2.pdf" },
        { labelKey: "proj.5.tp3", href: "/documents/CR_EA_TP3.pdf" },
        { labelKey: "proj.5.tp4", href: "/documents/CR_EA_TP4.pdf" },
        { labelKey: "proj.5.tp5", href: "/documents/CR_EA_TP5.pdf" },
      ],
    },
    {
      titleKey: "proj.6.title",
      subtitleKey: "proj.6.subtitle",
      statusType: "completed",
      contexteKey: "proj.6.contexte",
      objectifKey: "proj.6.objectif",
      contributionKey: "proj.6.contribution",
      outils: ["MATLAB", "FFT", "Filtrage numérique", "Analyse spectrale"],
      pdfLinks: [
        { labelKey: "proj.6.tp1", href: "/documents/CR_TS_TP1.docx" },
        { labelKey: "proj.6.tp2", href: "/documents/CR_TS_TP2.pdf" },
        { labelKey: "proj.6.tp3", href: "/documents/CR_TS_TP3.pdf" },
        { labelKey: "proj.6.tp4", href: "/documents/CR_TS_TP4.pdf" },
      ],
    },
    {
      titleKey: "proj.7.title",
      subtitleKey: "proj.7.subtitle",
      statusType: "completed",
      contexteKey: "proj.7.contexte",
      objectifKey: "proj.7.objectif",
      contributionKey: "proj.7.contribution",
      outils: ["LTSpice", "Simulation", "Amplificateurs", "Filtres actifs", "Oscillateurs"],
      pdfLinks: [
        { labelKey: "proj.7.tp1", href: "/docs/TP1_SIMU_2.pdf" },
        { labelKey: "proj.7.tp2", href: "/docs/CR_TP02_PartieB_Simulation.pdf" },
        { labelKey: "proj.7.tp3", href: "/docs/CR_TP03_PartieB_Simu.pdf" },
        { labelKey: "proj.7.tp4", href: "/docs/CR_TP04_FE_Simulation.pdf" },
      ],
    },
  ];

  return (
    <section id="lab" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary/20 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="section-header">
          <span className="section-label">{t("lab.label")}</span>
          <h2 className="section-title">{t("lab.title")}</h2>
          <p className="text-sm text-muted-foreground font-body max-w-xl mx-auto mt-2">{t("lab.subtitle")}</p>
          <div className="section-divider" />
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab, index) => (
            <StaggerItem key={index}>
              <ProjectCard project={lab} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <p className="mt-10 text-xs text-muted-foreground font-body italic text-center">
          {t("proj.note")}
        </p>
      </div>
    </section>
  );
};

export default LabSection;
