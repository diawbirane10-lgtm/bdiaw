const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Logiciels & Outils",
      skills: ["LTSpice", "MATLAB/Simulink", "VS Code", "Antigravity", "LabVIEW"],
    },
    {
      title: "Programmation",
      skills: ["Python", "C", "Assembly"],
      note: "Niveau Intermédiaire",
    },
    {
      title: "Domaines d'Expertise",
      skills: [
        "Électronique Analogique",
        "Électronique Numérique",
        "Électrotechnique",
        "Automatique",
        "Traitement du Signal",
      ],
    },
    {
      title: "Compétences Techniques",
      skills: [
        "Commande Vectorielle (FOC)",
        "Systèmes SCADA",
        "Énergies Renouvelables",
        "Simulation Numérique",
      ],
    },
  ];

  return (
    <section id="competences" className="section-padding section-alt">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-primary font-body font-medium tracking-[0.3em] uppercase text-xs mb-4">
            Expertise
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-medium text-foreground tracking-wide">
            Compétences Techniques
          </h2>
          <div className="elegant-divider mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {skillCategories.map((category) => (
            <div key={category.title} className="group">
              <h3 className="text-lg font-display font-medium text-foreground mb-6 tracking-wide">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
              {category.note && (
                <p className="text-sm text-muted-foreground mt-5 font-body italic">
                  {category.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
