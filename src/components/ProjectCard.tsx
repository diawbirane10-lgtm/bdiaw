import { Download, ExternalLink, Clock, CheckCircle, Sparkles, Calendar, Github, Rocket, Images } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export interface GalleryItem {
  src: string;
  altKey?: string;
  captionKey?: string;
}

export interface SubGallery {
  titleKey: string;
  items: GalleryItem[];
}

export interface ProjectData {
  titleKey: string;
  subtitleKey?: string;
  statusType: "completed" | "progress" | "upcoming";
  statusLabelKey?: string;
  date?: string;
  contexteKey: string;
  objectifKey: string;
  contributionKey: string;
  resultatsKey?: string;
  outils: string[];
  pdfLink?: string;
  pdfLabelKey?: string;
  pdfLinks?: { labelKey: string; href: string }[];
  liveLink?: string;
  liveLabelKey?: string;
  githubLink?: string;
  githubLabelKey?: string;
  gallery?: GalleryItem[];
  galleryLabelKey?: string;
  subGalleries?: SubGallery[];
  featured?: boolean;
  comingSoon?: boolean;
}

const ProjectCard = ({ project }: { project: ProjectData }) => {
  const { t } = useLanguage();

  const getStatusIcon = (statusType: string) => {
    switch (statusType) {
      case "completed": return <CheckCircle className="w-3 h-3" />;
      case "progress": return <Clock className="w-3 h-3" />;
      default: return <Sparkles className="w-3 h-3" />;
    }
  };

  const getStatusLabel = (statusType: string, overrideKey?: string) => {
    if (overrideKey) return t(overrideKey);
    switch (statusType) {
      case "completed": return t("proj.status.completed");
      case "progress": return t("proj.status.progress");
      default: return t("proj.status.upcoming");
    }
  };

  return (
    <article className={cn(
      "card-project hover-lift flex flex-col group relative overflow-hidden",
      project.featured && "ring-1 ring-primary/20 shadow-xl shadow-primary/5"
    )}>
      <div className={cn(
        "w-full rounded-full mb-5",
        project.featured
          ? "h-1.5 bg-gradient-to-r from-emerald-500 via-primary to-transparent"
          : "h-1 bg-gradient-to-r from-primary/60 to-transparent"
      )} />

      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <span className={`badge-status ${
          project.statusType === "completed" ? "badge-status-completed"
            : project.statusType === "progress" ? "badge-status-progress"
            : "badge-status-upcoming"
        }`}>
          {getStatusIcon(project.statusType)}
          {getStatusLabel(project.statusType, project.statusLabelKey)}
        </span>
        {project.date && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {project.date}
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

      {project.comingSoon && (
        <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <p className="text-xs font-body font-semibold text-amber-600 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {t("proj.comingSoon")}
          </p>
        </div>
      )}

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

      {(project.gallery && project.gallery.length > 0) || (project.subGalleries && project.subGalleries.length > 0) || project.liveLink || project.githubLink ? (
        <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap gap-3 items-center">
          {((project.gallery && project.gallery.length > 0) || (project.subGalleries && project.subGalleries.length > 0)) && (() => {
            const totalCount = project.subGalleries
              ? project.subGalleries.reduce((acc, sg) => acc + sg.items.length, 0)
              : (project.gallery?.length ?? 0);
            return (
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-body font-bold text-primary hover:underline uppercase tracking-wider"
                  >
                    <Images size={13} />
                    {t(project.galleryLabelKey ?? "proj.viewGallery")}
                    <span className="text-muted-foreground/70 normal-case font-normal">
                      ({totalCount})
                    </span>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-body uppercase tracking-wide text-sm">
                      {t(project.titleKey)} — {t(project.galleryLabelKey ?? "proj.viewGallery")}
                    </DialogTitle>
                  </DialogHeader>
                  {project.subGalleries ? (
                    <div className="space-y-8 mt-4">
                      {project.subGalleries.map((sg, si) => (
                        <div key={si}>
                          <h3 className="text-xs font-body font-bold uppercase tracking-widest text-primary mb-3 pb-1.5 border-b border-primary/30">
                            {t(sg.titleKey)}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {sg.items.map((item, i) => (
                              <figure key={i} className="rounded-lg border border-border/60 bg-secondary/30 overflow-hidden flex flex-col">
                                <a href={item.src} target="_blank" rel="noopener noreferrer" className="block bg-white">
                                  <img src={item.src} alt={item.altKey ? t(item.altKey) : item.captionKey ? t(item.captionKey) : `Figure ${i + 1}`} loading="lazy" className="w-full h-auto object-contain max-h-[60vh]" />
                                </a>
                                {item.captionKey && (
                                  <figcaption className="px-3 py-2 text-xs font-body text-muted-foreground border-t border-border/40">
                                    {t(item.captionKey)}
                                  </figcaption>
                                )}
                              </figure>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {project.gallery?.map((item, i) => (
                        <figure key={i} className="rounded-lg border border-border/60 bg-secondary/30 overflow-hidden flex flex-col">
                          <a href={item.src} target="_blank" rel="noopener noreferrer" className="block bg-white">
                            <img src={item.src} alt={item.altKey ? t(item.altKey) : item.captionKey ? t(item.captionKey) : `Figure ${i + 1}`} loading="lazy" className="w-full h-auto object-contain max-h-[60vh]" />
                          </a>
                          {item.captionKey && (
                            <figcaption className="px-3 py-2 text-xs font-body text-muted-foreground border-t border-border/40">
                              {t(item.captionKey)}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            );
          })()}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-body font-bold text-primary hover:underline uppercase tracking-wider"
            >
              <Rocket size={13} />
              {project.liveLabelKey ? t(project.liveLabelKey) : t("proj.live")}
              <ExternalLink size={11} className="opacity-40" />
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-body font-bold text-foreground hover:text-primary hover:underline uppercase tracking-wider"
            >
              <Github size={13} />
              {project.githubLabelKey ? t(project.githubLabelKey) : "GitHub"}
              <ExternalLink size={11} className="opacity-40" />
            </a>
          )}
        </div>
      ) : null}
    </article>
  );
};

export default ProjectCard;
