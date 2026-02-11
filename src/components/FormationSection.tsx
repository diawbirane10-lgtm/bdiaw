import { GraduationCap } from "lucide-react";

const FormationSection = () => {
  const formations = [
    {
      period: "Sept 2025 — Juin 2026",
      status: "En cours",
      title: "Licence Sciences et Techniques — IEEA",
      institution: "Faculté des Sciences et Techniques (FST), Marrakech",
      details: [
        "Spécialité : Informatique, Électronique, Électrotechnique et Automatique",
        "Compétences clés : Physique appliquée, instrumentation, systèmes industriels, traitement du signal",
      ],
    },
    {
      period: "Oct 2022 — Juil 2025",
      title: "Cycle Préparatoire MIP",
      subtitle: "Maths – Physique – Informatique",
      institution: "Faculté des Sciences et Techniques (FST), Marrakech",
    },
    {
      period: "Juil 2022",
      title: "Baccalauréat Scientifique (Série S2)",
      institution: "Cours Sainte Marie de Hann, Dakar, Sénégal",
    },
  ];

  return (
    <section id="formation" className="section-padding bg-background">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Parcours</span>
          <h2 className="section-title flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-primary" />
            Formation
          </h2>
          <div className="section-divider" />
        </div>

        <div className="space-y-0">
          {formations.map((f, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-date">
                {f.period}
                {f.status && (
                  <span className="ml-3 px-2 py-0.5 text-[10px] bg-primary/10 text-primary rounded-full border border-primary/20">
                    {f.status}
                  </span>
                )}
              </div>
              <h3 className="timeline-title">{f.title}</h3>
              {f.subtitle && (
                <p className="text-sm text-primary/70 font-body mb-1">{f.subtitle}</p>
              )}
              <p className="timeline-subtitle">{f.institution}</p>
              {f.details && (
                <ul className="space-y-1">
                  {f.details.map((d, j) => (
                    <li key={j} className="text-sm text-muted-foreground font-body flex items-start gap-2">
                      <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormationSection;
