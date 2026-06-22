import { useLanguage } from "@/i18n/LanguageContext";
import { Github, ExternalLink, BookOpen, FlaskConical } from "lucide-react";

const papers = [
  {
    titleKey: "proj.hvdc.title",
    abstractKey: "research.hvdc.abstract",
    journal: "Journal of Undergraduate Research International (JURI)",
    publisher: "KFUPM",
    ref: "JURI-00314-2026-01",
    statusKey: "research.status.review",
    githubLink: "https://github.com/diawbirane10-lgtm/hvdc-gfm-bess-simulation",
    outils: [
      "MATLAB/Simulink",
      "Simscape Electrical",
      "AVM",
      "VSC-HVDC",
      "Grid-Forming Control",
      "Virtual Synchronous Machine",
      "BESS",
      "Python",
      "NumPy",
      "Matplotlib",
    ],
  },
];

const ResearchSection = () => {
  const { t } = useLanguage();

  return (
    <section id="recherche" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="section-header">
          <span className="section-label flex items-center gap-2">
            <FlaskConical className="w-3.5 h-3.5" />
            {t("research.label")}
          </span>
          <h2 className="section-title">{t("research.title")}</h2>
          <div className="section-divider" />
        </div>

        <div className="flex flex-col gap-6">
          {papers.map((paper, i) => (
            <article
              key={i}
              className="card-project hover-lift relative overflow-hidden group"
            >
              <div className="h-1.5 w-full rounded-full mb-6 bg-gradient-to-r from-primary via-emerald-500 to-transparent" />

              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-body font-black text-foreground uppercase tracking-wide group-hover:text-primary transition-colors duration-200 mb-2">
                    {t(paper.titleKey)}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-body text-muted-foreground">
                    <BookOpen className="w-3.5 h-3.5 shrink-0 text-primary" />
                    <span className="font-semibold text-foreground/70">{paper.journal}</span>
                    <span className="opacity-40">·</span>
                    <span>{paper.publisher}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-bold bg-amber-500/15 text-amber-600 border border-amber-500/30 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    {t(paper.statusKey)}
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground/60 tracking-wider">
                    {paper.ref}
                  </span>
                </div>
              </div>

              <p className="text-sm font-body text-muted-foreground leading-relaxed mb-5">
                {t(paper.abstractKey)}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {paper.outils.map((tag) => (
                  <span key={tag} className="skill-tag text-[11px]">{tag}</span>
                ))}
              </div>

              <div className="pt-4 border-t border-border/50 flex flex-wrap gap-4">
                <a
                  href={paper.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-body font-bold text-foreground hover:text-primary transition-colors uppercase tracking-wider"
                >
                  <Github size={13} />
                  {t("research.code")}
                  <ExternalLink size={11} className="opacity-40" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
