import { Download, ExternalLink, Clock, CheckCircle, Sparkles, Calendar, Folder } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ProjectsSection = () => {
  const { t } = useLanguage();

  const projects = [
    {
      titleKey: "proj.fra.title",
      subtitleKey: "proj.fra.subtitle",
      statusType: "progress" as const,
      contexteKey: "proj.fra.contexte",
      objectifKey: "proj.fra.objectif",
      contributionKey: "proj.fra.contribution",
      outils: ["LTspice", "MATLAB", "Simulink DSP", "Co-simulation", "Détection Synchrone", "FIR/Kaiser"],
    },
    {
      titleKey: "proj.new.title",
      subtitleKey: "proj.new.subtitle",
      statusType: "completed" as const,
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
      statusType: "completed" as const,
      contexteKey: "proj.4.contexte",
      objectifKey: "proj.4.objectif",
      contributionKey: "proj.4.contribution",
      outils: ["MATLAB/Simulink", "Simscape Electrical", "Control System Toolbox"],
      resultatsKey: "proj.4.resultats",
      pdfLink: "/documents/projet-houlomotrice.pdf",
      pdfLabelKey: "proj.4.pdfLabel",
    },
    {
      titleKey: "proj.5.title",
      subtitleKey: "proj.5.subtitle",
      statusType: "completed" as const,
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
      statusType: "completed" as const,
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
      statusType: "completed" as const,
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
    {
      titleKey: "proj.8.title",
      subtitleKey: "proj.8.subtitle",
      statusType: "completed" as const,
      contexteKey: "proj.8.contexte",
      objectifKey: "proj.8.objectif",
      contributionKey: "proj.8.contribution",
      outils: ["MATLAB", "Simscape Multibody", "Simulink", "Robotics", "UAV", "Dynamic Modeling"],
      pdfLink: "/documents/MAV_aerial_manipulator.pdf",
      pdfLabelKey: "proj.8.pdfLabel",
    },
  ];

  const getStatusIcon = (statusType: string) => {
    switch (statusType) {
      case "completed": return <CheckCircle className="w-3 h-3" />;
      case "progress": return <Clock className="w-3 h-3" />;
      default: return <Sparkles className="w-3 h-3" />;
    }
  };

  const getStatusLabel = (statusType: string) => {
    switch (statusType) {
      case "completed": return t("proj.status.completed");
      case "progress": return t("proj.status.progress");
      default: return t("proj.status.upcoming");
    }
  };

  return (
    <section id="projets" className="section-padding relative">
      {/* Subtle background variation */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-transparent pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div className="section-header">
          <span className="section-label">{t("proj.label")}</span>
          <h2 className="section-title">{t("proj.title")}</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <article key={index} className="card-project hover-lift flex flex-col group">
              {/* Header accent bar */}
              <div className="w-full h-1 bg-gradient-to-r from-primary/60 to-transparent rounded-full mb-5" />

              <div className="mb-4 flex items-center gap-2 flex-wrap">
                <span className={`badge-status ${
                  project.statusType === "completed" ? "badge-status-completed"
                    : project.statusType === "progress" ? "badge-status-progress"
                    : "badge-status-upcoming"
                }`}>
                  {getStatusIcon(project.statusType)}
                  {getStatusLabel(project.statusType)}
                </span>
                {'date' in project && (project as any).date && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {(project as any).date}
                  </span>
                )}
              </div>

              <h3 className="text-base font-body font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-200 uppercase tracking-wide">
                {t(project.titleKey)}
              </h3>

              {project.subtitleKey && (
                <p className="text-xs font-body text-muted-foreground mb-4">{t(project.subtitleKey)}</p>
              )}

              <div className="space-y-2 text-sm font-body text-muted-foreground leading-relaxed flex-grow">
                <div>
                  <span className="font-bold text-foreground/80">{t("proj.context")} :</span>{" "}
                  {t(project.contexteKey)}
                </div>
                <div>
                  <span className="font-bold text-foreground/80">{t("proj.objective")} :</span>{" "}
                  {t(project.objectifKey)}
                </div>
                <div>
                  <span className="font-bold text-foreground/80">{t("proj.contribution")} :</span>{" "}
                  {t(project.contributionKey)}
                </div>
                {project.resultatsKey && (
                  <div>
                    <span className="font-bold text-foreground/80">{t("proj.results")} :</span>{" "}
                    {t(project.resultatsKey)}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex flex-wrap gap-1.5">
                  {project.outils.map((outil) => (
                    <span key={outil} className="skill-tag text-[11px]">{outil}</span>
                  ))}
                </div>
              </div>

              {project.pdfLink && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <a
                    href={project.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-body font-bold text-primary hover:underline uppercase tracking-wider"
                  >
                    <Download size={13} />
                    {project.pdfLabelKey ? t(project.pdfLabelKey) : t("proj.download")}
                    <ExternalLink size={11} className="opacity-40" />
                  </a>
                </div>
              )}

              {project.pdfLinks && (
                <div className="mt-3 pt-3 border-t border-border/50 flex flex-col gap-1.5">
                  {project.pdfLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-body font-bold text-primary hover:underline"
                    >
                      <Download size={12} />
                      {t(link.labelKey)}
                      <ExternalLink size={10} className="opacity-40" />
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted-foreground font-body italic text-center">
          {t("proj.note")}
        </p>
      </div>
    </section>
  );
};

export default ProjectsSection;
