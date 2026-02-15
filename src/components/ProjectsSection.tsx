import { Download, ExternalLink, Clock, CheckCircle, Sparkles } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Simulation & Contrôle d'Attitude d'un Nano-Satellite (1U)",
      subtitle: "Mini-Projet CubeSat — ADCS",
      status: "À venir",
      statusType: "upcoming" as const,
      contexte: "Dans le cadre d'un mini-projet académique autour de la technologie CubeSat, simulation du système de contrôle d'attitude (ADCS) d'un nano-satellite 1U.",
      objectif: "Stabiliser le satellite après déploiement (detumbling), assurer un pointage nadir, et visualiser la dynamique 6DOF en 3D.",
      contribution: "Modélisation complète du système ADCS, implémentation des lois de commande PID, et visualisation 3D de la dynamique orbitale.",
      outils: ["MATLAB/Simulink", "Aerospace Blockset", "Control System Toolbox", "PID Tuner"],
      pdfLink: "/documents/FicheTech_Projet1.pdf",
      pdfLabel: "Fiche technique",
    },
    {
      title: "Conception PCB : Système de Gestion de Puissance (EPS)",
      subtitle: "Mini-Projet CubeSat — EPS",
      status: "À venir",
      statusType: "upcoming" as const,
      contexte: "Second volet du projet CubeSat, centré sur l'alimentation électrique embarquée au format PC/104.",
      objectif: "Concevoir le module EPS avec conversion Buck (3.3V/5.0V), protections électriques, et générer le dossier de fabrication Gerber.",
      contribution: "Schéma électrique complet sous Eeschema, routage PCB sous Pcbnew, vérification DRC/ERC, et export Gerber X2.",
      outils: ["KiCad 9.0", "Eeschema", "Pcbnew", "Norme IPC-2221", "Gerber X2"],
      pdfLink: "/documents/FicheTech_Projet2.pdf",
      pdfLabel: "Fiche technique",
    },
    {
      title: "Chaîne de Conditionnement Analogique",
      subtitle: "Capteur Piézoélectrique",
      status: "En cours",
      statusType: "progress" as const,
      progress: "15%",
      contexte: "Projet de modélisation d'une chaîne de conditionnement pour capteur piézoélectrique, dans un contexte de surveillance vibratoire industrielle.",
      objectif: "Concevoir et simuler une chaîne complète : amplification de charge, filtrage, et mise en forme du signal vibratoire.",
      contribution: "Modélisation du capteur et des étages d'amplification, simulation fonctionnelle et analyse des performances.",
      outils: ["MATLAB/Simulink", "LTspice"],
    },
    {
      title: "Énergie Houlomotrice",
      subtitle: "Conversion et Injection Réseau par Commande Vectorielle",
      status: "Terminé",
      statusType: "completed" as const,
      contexte: "Projet de fin de semestre sur les énergies marines renouvelables, encadré par Pr. Moulay Rachid DOUIRI.",
      objectif: "Étudier et simuler un système de récupération de l'énergie des vagues avec génératrice PMSG et injection réseau via commande FOC.",
      contribution: "Modélisation de la chaîne complète (vagues → mécanique → PMSG → convertisseurs → réseau), implémentation de la commande vectorielle, et analyse des performances.",
      outils: ["MATLAB/Simulink", "Simscape Electrical", "Control System Toolbox"],
      resultats: "Injection réseau stable avec THD < 5%, suivi de couple performant, et validation des courbes de puissance.",
      pdfLink: "/documents/projet-houlomotrice.pdf",
      pdfLabel: "Télécharger le rapport",
    },
    {
      title: "TPs Électronique Analogique",
      subtitle: "Simulations LTSpice — Pr. Ahmad Chitnalah",
      status: "Terminé",
      statusType: "completed" as const,
      contexte: "Série de 5 travaux pratiques en électronique analogique, combinant simulation et manipulation en laboratoire.",
      objectif: "Maîtriser le comportement des composants fondamentaux (RLC, diodes, transistors) par la simulation puis la validation expérimentale.",
      contribution: "Réalisation des simulations LTSpice, mesures en laboratoire, rédaction des comptes rendus avec analyse comparative simulation/expérimental.",
      outils: ["LTSpice", "Oscilloscope", "Générateur de signaux", "Multimètre"],
      pdfLinks: [
        { label: "TP1 — Circuit RLC", href: "/documents/CR_EA_TP1.pdf" },
        { label: "TP2 — Diodes", href: "/documents/CR_EA_TP2.pdf" },
        { label: "TP3 — Diode Zener", href: "/documents/CR_EA_TP3.pdf" },
        { label: "TP4 — Transistor BJT", href: "/documents/CR_EA_TP4.pdf" },
        { label: "TP5 — JFET", href: "/documents/CR_EA_TP5.pdf" },
      ],
    },
    {
      title: "TPs Traitement du Signal",
      subtitle: "Analyse spectrale & filtrage — Pr. Fouad Sefyani",
      status: "Terminé",
      statusType: "completed" as const,
      contexte: "Série de 4 travaux pratiques sur les fondamentaux du traitement numérique du signal.",
      objectif: "Comprendre et appliquer les outils d'analyse fréquentielle, la transformée de Fourier et les techniques de filtrage numérique.",
      contribution: "Implémentation MATLAB des algorithmes FFT, conception de filtres numériques, analyse spectrale de signaux réels, et rédaction des rapports.",
      outils: ["MATLAB", "FFT", "Filtrage numérique", "Analyse spectrale"],
      pdfLinks: [
        { label: "TP1 — Introduction", href: "/documents/CR_TS_TP1.docx" },
        { label: "TP2 — Analyse fréquentielle", href: "/documents/CR_TS_TP2.pdf" },
        { label: "TP3 — Filtrage", href: "/documents/CR_TS_TP3.pdf" },
        { label: "TP4 — Applications", href: "/documents/CR_TS_TP4.pdf" },
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
                  {project.progress && <span className="ml-1 font-semibold">— {project.progress}</span>}
                </span>
              </div>

              <h3 className="text-lg font-display text-foreground mb-2">
                {project.title}
              </h3>

              {project.subtitle && (
                <p className="text-sm font-body text-primary/70 mb-4">{project.subtitle}</p>
              )}

              <div className="space-y-3 text-sm font-body text-muted-foreground leading-relaxed flex-grow">
                <div>
                  <span className="font-semibold text-foreground/80">Contexte :</span>{" "}
                  {project.contexte}
                </div>
                <div>
                  <span className="font-semibold text-foreground/80">Objectif :</span>{" "}
                  {project.objectif}
                </div>
                <div>
                  <span className="font-semibold text-foreground/80">Contribution :</span>{" "}
                  {project.contribution}
                </div>
                {project.resultats && (
                  <div>
                    <span className="font-semibold text-foreground/80">Résultats :</span>{" "}
                    {project.resultats}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">Outils :</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.outils.map((outil) => (
                    <span key={outil} className="skill-tag text-xs">{outil}</span>
                  ))}
                </div>
              </div>

              {project.pdfLink && (
                <div className="mt-4 pt-4 border-t border-border">
                  <a
                    href={project.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-accent transition-colors duration-300"
                  >
                    <Download size={15} />
                    {project.pdfLabel || "Télécharger le rapport"}
                    <ExternalLink size={13} className="opacity-50" />
                  </a>
                </div>
              )}

              {project.pdfLinks && (
                <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
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

        <p className="mt-8 text-sm text-muted-foreground/70 font-body italic text-center">
          Note : Les comptes rendus des TPs d'Électrotechnique, d'Automatique et d'Informatique Industrielle ont été rédigés sur feuille et ne sont pas disponibles au format numérique.
        </p>
      </div>
    </section>
  );
};

export default ProjectsSection;
