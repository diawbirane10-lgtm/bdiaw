import { Download, ExternalLink, Clock, CheckCircle, Sparkles, Rocket } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
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
    {
      title: "TPs Électronique Analogique",
      subtitle: "Simulations LTSpice — Pr. Ahmad Chitnalah",
      description: "Série de 5 travaux pratiques couvrant les circuits RLC, diodes, Zener, transistor bipolaire (2N2222) et JFET (2N3819). Simulations réalisées sur LTSpice avant application en laboratoire.",
      details: "LTSpice • Circuit RLC • Diodes • Zener • Transistor BJT • JFET",
      status: "Terminé",
      statusType: "completed" as const,
      pdfLinks: [
        { label: "TP1 — Circuit RLC", href: "/documents/CR_EA_TP1.pdf" },
        { label: "TP2 — Diodes", href: "/documents/CR_EA_TP2.pdf" },
        { label: "TP3 — Diode Zener", href: "/documents/CR_EA_TP3.pdf" },
        { label: "TP4 — Transistor BJT", href: "/documents/CR_EA_TP4.pdf" },
        { label: "TP5 — JFET", href: "/documents/CR_EA_TP5.pdf" },
      ],
    },
  ];

  const miniProjets = [
    {
      title: "Simulation & Contrôle d'Attitude d'un Nano-Satellite (1U)",
      description: "Simulation de l'ADCS d'un CubeSat 1U : stabilisation post-déploiement (detumbling), pointage nadir, et visualisation 3D de la dynamique 6DOF.",
      details: "MATLAB/Simulink • Aerospace Blockset • Control System Toolbox • PID",
      pdfLink: "/documents/FicheTech_Projet1.pdf",
    },
    {
      title: "Conception PCB : Système de Gestion de Puissance (EPS)",
      description: "Conception du module EPS d'un CubeSat 1U : conversion Buck (3.3V/5.0V), protection électrique, format PC/104, et dossier de fabrication Gerber.",
      details: "KiCad 9.0 • Eeschema • Pcbnew • Norme IPC-2221 • Gerber X2",
      pdfLink: "/documents/FicheTech_Projet2.pdf",
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

              {project.pdfLinks && (
                <div className="mt-5 pt-4 border-t border-border flex flex-col gap-2">
                  {project.pdfLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-accent transition-colors duration-300"
                    >
                      <Download size={14} />
                      {link.label}
                      <ExternalLink size={12} className="opacity-50" />
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Mini-Projets CubeSat */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <Rocket className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-display text-foreground">Mini-Projets CubeSat</h3>
            <span className="badge-status badge-status-upcoming">
              <Sparkles className="w-3.5 h-3.5" />
              À venir
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {miniProjets.map((projet, index) => (
              <article key={index} className="card-project hover-lift flex flex-col border-l-2 border-primary/30">
                <h3 className="text-base font-display text-foreground mb-2">
                  {projet.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-5 leading-relaxed font-body flex-grow">
                  {projet.description}
                </p>

                <div className="text-xs text-muted-foreground border-t border-border pt-4 font-body">
                  {projet.details}
                </div>

                <div className="mt-5 pt-4 border-t border-border">
                  <a
                    href={projet.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-accent transition-colors duration-300"
                  >
                    <Download size={15} />
                    Fiche technique
                    <ExternalLink size={13} className="opacity-50" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
