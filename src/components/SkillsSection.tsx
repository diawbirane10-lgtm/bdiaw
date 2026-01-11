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
        <h2 className="heading-section">Compétences Techniques</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
              {category.note && (
                <p className="text-sm text-muted-foreground mt-3 italic">
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
