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
      subtitle: "Jumeau Numérique & Double Tracking (Méca/Élec)",
      description: "Développement d'un système de supervision pour panneaux photovoltaïques avec suivi solaire dual-axis.",
      status: "À venir",
      statusType: "upcoming" as const,
    },
    {
      title: "Chaîne de Conditionnement Analogique (Piezo)",
      description: "Modélisation d'une chaîne de conditionnement pour capteur piézoélectrique destiné à la surveillance vibratoire.",
      details: "Technologies : MATLAB Simulink, LTspice",
      progress: "15%",
      status: "En cours",
      statusType: "progress" as const,
    },
    {
      title: "Énergie Houlomotrice",
      subtitle: "Conversion et Injection Réseau par Commande Vectorielle",
      description: "Étude et conception d'un système de récupération de l'énergie des vagues avec génératrice PMSG et commande FOC.",
      details: "Projet encadré | MATLAB/Simulink",
      status: "Terminé",
      statusType: "progress" as const,
    },
  ];

  return (
    <section id="projets" className="section-padding bg-background">
      <div className="section-container">
        <h2 className="heading-section">Réalisations</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <article key={index} className="card-project">
              {/* Status Badge */}
              <div className="mb-4">
                <span
                  className={`badge-status ${
                    project.statusType === "progress"
                      ? "badge-status-progress"
                      : "badge-status-upcoming"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {project.title}
              </h3>

              {/* Subtitle */}
              {project.subtitle && (
                <p className="text-sm font-medium text-primary mb-2">
                  {project.subtitle}
                </p>
              )}

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Details */}
              {project.details && (
                <p className="text-xs text-muted-foreground border-t border-border pt-3 mt-auto">
                  {project.details}
                  {project.progress && (
                    <span className="ml-2 text-primary font-medium">
                      • Avancement : {project.progress}
                    </span>
                  )}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
