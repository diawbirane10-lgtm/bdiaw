import { Download, ExternalLink, Clock, CheckCircle, Sparkles } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Système Domotique",
      description: "Conception d'un système intelligent pour l'habitat intégrant capteurs, actionneurs et contrôle automatisé.",
      status: "En cours",
      statusType: "progress" as const,
    },
    {
      title: "Supervision SCADA PV Intelligent",
      subtitle: "Jumeau Numérique & Double Tracking",
      description: "Développement d'un système de supervision pour panneaux photovoltaïques avec suivi solaire dual-axis.",
      status: "À venir",
      statusType: "upcoming" as const,
    },
    {
      title: "Chaîne de Conditionnement Analogique",
      subtitle: "Capteur Piézoélectrique",
      description: "Modélisation d'une chaîne de conditionnement pour capteur piézoélectrique destiné à la surveillance vibratoire.",
      details: "MATLAB Simulink, LTspice",
      progress: "15%",
      status: "En cours",
      statusType: "progress" as const,
    },
    {
      title: "Énergie Houlomotrice",
      subtitle: "Conversion et Injection Réseau par Commande Vectorielle",
      description: "Étude et conception d'un système de récupération de l'énergie des vagues avec génératrice PMSG et commande FOC.",
      details: "MATLAB/Simulink • Encadré par Pr. Moulay Rachid DOUIRI",
      status: "Terminé",
      statusType: "completed" as const,
      pdfLink: "/documents/projet-houlomotrice.pdf",
    },
  ];

  const getStatusIcon = (statusType: string) => {
    switch (statusType) {
      case "completed":
        return <CheckCircle className="w-3 h-3" />;
      case "progress":
        return <Clock className="w-3 h-3" />;
      default:
        return <Sparkles className="w-3 h-3" />;
    }
  };

  return (
    <section id="projets" className="section-padding bg-background">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-primary font-body font-medium tracking-[0.3em] uppercase text-xs mb-4">
            Portfolio
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-medium text-foreground tracking-wide">
            Réalisations
          </h2>
          <div className="elegant-divider mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <article key={index} className="card-project hover-lift flex flex-col">
              {/* Status badge */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`badge-status flex items-center gap-2 ${
                    project.statusType === "completed"
                      ? "badge-status-completed"
                      : project.statusType === "progress"
                      ? "badge-status-progress"
                      : "badge-status-upcoming"
                  }`}
                >
                  {getStatusIcon(project.statusType)}
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-display font-medium text-foreground mb-3 tracking-wide">
                {project.title}
              </h3>

              {/* Subtitle */}
              {project.subtitle && (
                <p className="text-sm font-body text-primary mb-4">
                  {project.subtitle}
                </p>
              )}

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed font-body flex-grow">
                {project.description}
              </p>

              {/* Details */}
              {project.details && (
                <div className="text-xs text-muted-foreground border-t border-border pt-4 font-body">
                  {project.details}
                  {project.progress && (
                    <span className="ml-2 text-primary font-medium">
                      — Avancement : {project.progress}
                    </span>
                  )}
                </div>
              )}

              {/* PDF Download Link */}
              {project.pdfLink && (
                <div className="mt-6 pt-4 border-t border-border">
                  <a
                    href={project.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-sm font-body font-medium text-primary hover:text-gold-light transition-colors duration-300 group"
                  >
                    <Download size={16} />
                    Télécharger le rapport
                    <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
