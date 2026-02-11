import { Briefcase } from "lucide-react";

const ExperienceSection = () => {
  const experiences = [
    {
      period: "Juil — Août 2024",
      title: "Stagiaire — Ingénierie Électrique",
      company: "SAE SARL, Dakar",
      project: "Centrale hydroélectrique de Manantali (Mali)",
      tasks: [
        "Mise en situation terrain et découverte du cycle de mise en service (HT) : participation aux tests et relevés de mesures",
        "Appui aux études basse tension : dimensionnement (câbles, protections) sur le logiciel Camelia",
        "Documentation : contribution à la rédaction de comptes rendus et synthèse des données",
      ],
    },
    {
      period: "Juil — Août 2023",
      title: "Stagiaire — Assistant Technique",
      company: "SAE SARL, Dakar",
      project: "Sites HT (Mauritanie, Sénégal, Mali)",
      tasks: [
        "Découverte du milieu professionnel (sites HT) : accompagnement des équipes lors des inspections",
        "Sensibilisation aux règles HSE et aux procédures de maintenance préventive",
        "Lecture guidée de schémas électriques industriels et familiarisation avec la terminologie",
      ],
    },
  ];

  return (
    <section id="experience" className="section-padding section-alt">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Parcours professionnel</span>
          <h2 className="section-title flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-primary" />
            Expérience
          </h2>
          <div className="section-divider" />
        </div>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-date">{exp.period}</div>
              <h3 className="timeline-title">{exp.title}</h3>
              <p className="timeline-subtitle">
                {exp.company}
                <span className="text-primary/60 ml-2">— {exp.project}</span>
              </p>
              <ul className="space-y-2">
                {exp.tasks.map((task, j) => (
                  <li key={j} className="text-sm text-muted-foreground font-body flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
