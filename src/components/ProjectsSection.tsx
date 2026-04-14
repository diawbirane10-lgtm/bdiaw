import { useLanguage } from "@/i18n/LanguageContext";
import ProjectCard, { ProjectData } from "./ProjectCard";
import { StaggerContainer, StaggerItem } from "./ScrollReveal";

const ProjectsSection = () => {
  const { t } = useLanguage();

  const projects: ProjectData[] = [
    {
      titleKey: "proj.fra.title",
      subtitleKey: "proj.fra.subtitle",
      statusType: "progress",
      contexteKey: "proj.fra.contexte",
      objectifKey: "proj.fra.objectif",
      contributionKey: "proj.fra.contribution",
      outils: ["LTspice", "MATLAB", "Simulink DSP", "Co-simulation", "Détection Synchrone", "FIR/Kaiser"],
    },
    {
      titleKey: "proj.new.title",
      subtitleKey: "proj.new.subtitle",
      statusType: "completed",
      contexteKey: "proj.new.contexte",
      objectifKey: "proj.new.objectif",
      contributionKey: "proj.new.contribution",
      outils: ["MATLAB", "Simulink", "Signal Processing", "Machine Learning", "SVM", "Maintenance Prédictive", "Ferroviaire"],
      pdfLinks: [
        { labelKey: "proj.new.rapport", href: "/documents/rapport_prelim_defauts.pdf" },
        { labelKey: "proj.new.fiche", href: "/documents/fiche_tech_defauts.pdf" },
      ],
    },
    {
      titleKey: "proj.4.title",
      subtitleKey: "proj.4.subtitle",
      statusType: "completed",
      contexteKey: "proj.4.contexte",
      objectifKey: "proj.4.objectif",
      contributionKey: "proj.4.contribution",
      outils: ["MATLAB/Simulink", "Simscape Electrical", "Control System Toolbox"],
      resultatsKey: "proj.4.resultats",
      pdfLink: "/documents/projet-houlomotrice.pdf",
      pdfLabelKey: "proj.4.pdfLabel",
    },
    {
      titleKey: "proj.8.title",
      subtitleKey: "proj.8.subtitle",
      statusType: "completed",
      contexteKey: "proj.8.contexte",
      objectifKey: "proj.8.objectif",
      contributionKey: "proj.8.contribution",
      outils: ["MATLAB", "Simscape Multibody", "Simulink", "Robotics", "UAV", "Dynamic Modeling"],
      pdfLink: "/documents/MAV_aerial_manipulator.pdf",
      pdfLabelKey: "proj.8.pdfLabel",
    },
  ];

  return (
    <section id="projets" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="section-header">
          <span className="section-label">{t("proj.label")}</span>
          <h2 className="section-title">{t("proj.title")}</h2>
          <div className="section-divider" />
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <StaggerItem key={index}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ProjectsSection;
