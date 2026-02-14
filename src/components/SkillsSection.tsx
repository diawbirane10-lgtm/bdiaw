const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Automatique & Systèmes Industriels",
      skills: ["Analyse fonctionnelle", "GRAFCET", "Logique séquentielle", "Automatisation"],
    },
    {
      title: "Instrumentation & Mesures",
      skills: ["Capteurs", "Chaîne de mesure", "Acquisition de données", "Interprétation de résultats"],
    },
    {
      title: "Électronique",
      skills: ["Analogique", "Numérique", "Lecture de schémas", "Simulation de circuits"],
    },
    {
      title: "Électrotechnique",
      skills: ["Câblage", "Mesures", "Sécurité électrique", "Commande vectorielle (FOC)"],
    },
    {
      title: "Modélisation & Simulation",
      skills: ["MATLAB/Simulink", "LTspice", "Tinkercad", "Grafcet Studio", "OpenSCAD"],
    },
    {
      title: "Programmation & Logiciels",
      skills: ["Python (POO)", "C", "VS Code", "Microsoft Office", "NotebookLM"],
    },
  ];

  const languages = [
    { lang: "Français", level: "Courant / Technique" },
    { lang: "Anglais", level: "Bon niveau" },
    { lang: "Wolof", level: "Maternel" },
  ];

  return (
    <section id="competences" className="section-padding section-alt">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Expertise</span>
          <h2 className="section-title">Compétences Techniques</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-sm font-body font-semibold text-primary mb-4 tracking-wide uppercase">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="mt-14 pt-10 border-t border-border">
          <h3 className="text-sm font-body font-semibold text-primary mb-6 tracking-wide uppercase">
            Langues
          </h3>
          <div className="flex flex-wrap gap-6">
            {languages.map((l) => (
              <div key={l.lang} className="flex items-center gap-2">
                <span className="font-body font-medium text-foreground text-sm">{l.lang}</span>
                <span className="text-xs text-muted-foreground font-body">— {l.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
