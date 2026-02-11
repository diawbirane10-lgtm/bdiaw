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
      case "completed": return <CheckCircle className="w-3.5 h-3.5" />;
      case "progress": return <Clock className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="projets" className="section-padding bg-background">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Réalisations</span>
          <h2 className="section-title">Projets</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <article key={index} className="card-project hover-lift flex flex-col">
              <div className="mb-5">
                <span className={`badge-status ${
                  project.statusType === "completed" ? "badge-status-completed"
                    : project.statusType === "progress" ? "badge-status-progress"
                    : "badge-status-upcoming"
                }`}>
                  {getStatusIcon(project.statusType)}
                  {project.status}
                </span>
              </div>

              <h3 className="text-lg font-display text-foreground mb-2">
                {project.title}
              </h3>

              {project.subtitle && (
                <p className="text-sm font-body text-primary/70 mb-3">{project.subtitle}</p>
              )}

              <p className="text-sm text-muted-foreground mb-5 leading-relaxed font-body flex-grow">
                {project.description}
              </p>

              {project.details && (
                <div className="text-xs text-muted-foreground border-t border-border pt-4 font-body">
                  {project.details}
                  {project.progress && (
                    <span className="ml-2 text-primary font-semibold">— {project.progress}</span>
                  )}
                </div>
              )}

              {project.pdfLink && (
                <div className="mt-5 pt-4 border-t border-border">
                  <a
                    href={project.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-accent transition-colors duration-300"
                  >
                    <Download size={15} />
                    Télécharger le rapport
                    <ExternalLink size={13} className="opacity-50" />
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
