import { Download, ExternalLink, Clock, CheckCircle, Sparkles, Calendar } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ProjectsSection = () => {
  const { t } = useLanguage();

  const projects = [
    {
      titleKey: "proj.new.title",
      subtitleKey: "proj.new.subtitle",
      statusType: "progress" as const,
      date: "Mars 2026",
      contexteKey: "proj.new.contexte",
      objectifKey: "proj.new.objectif",
      contributionKey: "proj.new.contribution",
      outils: ["MATLAB", "Simulink", "Signal Processing", "Machine Learning", "SVM", "Maintenance Prédictive", "Ferroviaire"],
    },
    {
      titleKey: "proj.1.title",
      subtitleKey: "proj.1.subtitle",
      statusType: "upcoming" as const,
      contexteKey: "proj.1.contexte",
      objectifKey: "proj.1.objectif",
      contributionKey: "proj.1.contribution",
      outils: ["MATLAB/Simulink", "Aerospace Blockset", "Control System Toolbox", "PID Tuner"],
      pdfLink: "/documents/FicheTech_Projet1.pdf",
      pdfLabelKey: "proj.1.pdfLabel",
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
  ];

  const getStatusIcon = (statusType: string) => {
    switch (statusType) {
      case "completed": return <CheckCircle className="w-3.5 h-3.5" />;
      case "progress": return <Clock className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
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
    <section id="projets" className="section-padding bg-background">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">{t("proj.label")}</span>
          <h2 className="section-title">{t("proj.title")}</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <article key={index} className="card-project hover-lift flex flex-col group">
              <div className="mb-5 flex items-center gap-3 flex-wrap">
                <span className={`badge-status ${
                  project.statusType === "completed" ? "badge-status-completed"
                    : project.statusType === "progress" ? "badge-status-progress"
                    : "badge-status-upcoming"
                }`}>
                  {getStatusIcon(project.statusType)}
                  {getStatusLabel(project.statusType)}
                </span>
                {project.date && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {project.date}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {t(project.titleKey)}
              </h3>

              {project.subtitleKey && (
                <p className="text-sm font-body text-primary/60 mb-4">{t(project.subtitleKey)}</p>
              )}

              <div className="space-y-3 text-sm font-body text-muted-foreground leading-relaxed flex-grow">
                <div>
                  <span className="font-semibold text-foreground/70">{t("proj.context")} :</span>{" "}
                  {t(project.contexteKey)}
                </div>
                <div>
                  <span className="font-semibold text-foreground/70">{t("proj.objective")} :</span>{" "}
                  {t(project.objectifKey)}
                </div>
                <div>
                  <span className="font-semibold text-foreground/70">{t("proj.contribution")} :</span>{" "}
                  {t(project.contributionKey)}
                </div>
                {project.resultatsKey && (
                  <div>
                    <span className="font-semibold text-foreground/70">{t("proj.results")} :</span>{" "}
                    {t(project.resultatsKey)}
                  </div>
                )}
              </div>

              <div className="mt-5 pt-5 border-t border-border/40">
                <span className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest">{t("proj.tools")} :</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.outils.map((outil) => (
                    <span key={outil} className="skill-tag text-xs">{outil}</span>
                  ))}
                </div>
              </div>

              {project.pdfLink && (
                <div className="mt-4 pt-4 border-t border-border/40">
                  <a
                    href={project.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-accent transition-colors duration-300"
                  >
                    <Download size={15} />
                    {project.pdfLabelKey ? t(project.pdfLabelKey) : t("proj.download")}
                    <ExternalLink size={13} className="opacity-40" />
                  </a>
                </div>
              )}

              {project.pdfLinks && (
                <div className="mt-4 pt-4 border-t border-border/40 flex flex-col gap-2">
                  {project.pdfLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-accent transition-colors duration-300"
                    >
                      <Download size={14} />
                      {t(link.labelKey)}
                      <ExternalLink size={12} className="opacity-40" />
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground/50 font-body italic text-center">
          {t("proj.note")}
        </p>
      </div>
    </section>
  );
};

export default ProjectsSection;
