import { Download, ExternalLink, Rocket, Clock, CheckCircle } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Système Domotique",
      description: "Conception d'un système intelligent pour l'habitat intégrant capteurs, actionneurs et contrôle automatisé.",
      status: "En cours",
      statusType: "progress" as const,
      icon: "🏠",
    },
    {
      title: "Supervision SCADA PV Intelligent",
      subtitle: "Jumeau Numérique & Double Tracking (Méca/Élec)",
      description: "Développement d'un système de supervision pour panneaux photovoltaïques avec suivi solaire dual-axis.",
      status: "À venir",
      statusType: "upcoming" as const,
      icon: "☀️",
    },
    {
      title: "Chaîne de Conditionnement Analogique (Piezo)",
      description: "Modélisation d'une chaîne de conditionnement pour capteur piézoélectrique destiné à la surveillance vibratoire.",
      details: "Technologies : MATLAB Simulink, LTspice",
      progress: "15%",
      status: "En cours",
      statusType: "progress" as const,
      icon: "📊",
    },
    {
      title: "Énergie Houlomotrice",
      subtitle: "Conversion et Injection Réseau par Commande Vectorielle",
      description: "Étude et conception d'un système de récupération de l'énergie des vagues avec génératrice PMSG et commande FOC. Projet pluridisciplinaire combinant mécanique des fluides, électrotechnique et automatique.",
      details: "Technologies : MATLAB/Simulink | Encadré par Pr. Moulay Rachid DOUIRI",
      status: "Terminé",
      statusType: "completed" as const,
      pdfLink: "/documents/projet-houlomotrice.pdf",
      icon: "🌊",
    },
  ];

  const getStatusIcon = (statusType: string) => {
    switch (statusType) {
      case "completed":
        return <CheckCircle className="w-3 h-3" />;
      case "progress":
        return <Clock className="w-3 h-3" />;
      default:
        return <Rocket className="w-3 h-3" />;
    }
  };

  return (
    <section id="projets" className="section-padding bg-background relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--spidey-red)) 0%, transparent 50%)',
        }}
      />
      
      <div className="section-container relative z-10">
        <h2 className="heading-section text-center">
          <span className="text-secondary">{`{`}</span>
          {" "}Réalisations{" "}
          <span className="text-secondary">{`}`}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <article key={index} className="card-project flex flex-col">
              {/* Header with emoji and status */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{project.icon}</span>
                <span
                  className={`badge-status flex items-center gap-1 ${
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
              <h3 className="text-lg font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              {/* Subtitle */}
              {project.subtitle && (
                <p className="text-sm font-semibold text-secondary mb-3">
                  {project.subtitle}
                </p>
              )}

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-grow font-body">
                {project.description}
              </p>

              {/* Details */}
              {project.details && (
                <div className="text-xs text-muted-foreground border-t border-border pt-3 font-body">
                  <span className="text-primary">▸</span> {project.details}
                  {project.progress && (
                    <span className="ml-2 text-secondary font-semibold">
                      • Avancement : {project.progress}
                    </span>
                  )}
                </div>
              )}

              {/* PDF Download Link */}
              {project.pdfLink && (
                <div className="mt-4 pt-3 border-t border-border">
                  <a
                    href={project.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-display font-semibold text-primary hover:text-spidey-glow transition-colors duration-200 group"
                  >
                    <Download size={16} className="group-hover:animate-bounce" />
                    Télécharger le rapport (PDF)
                    <ExternalLink size={14} />
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
