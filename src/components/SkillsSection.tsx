import { Code, Cpu, Settings, Wrench } from "lucide-react";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Logiciels & Outils",
      icon: Wrench,
      skills: ["LTSpice", "MATLAB/Simulink", "VS Code", "Antigravity", "LabVIEW"],
    },
    {
      title: "Programmation",
      icon: Code,
      skills: ["Python", "C", "Assembly"],
      note: "Niveau Intermédiaire",
    },
    {
      title: "Domaines d'Expertise",
      icon: Cpu,
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
      icon: Settings,
      skills: [
        "Commande Vectorielle (FOC)",
        "Systèmes SCADA",
        "Énergies Renouvelables",
        "Simulation Numérique",
      ],
    },
  ];

  return (
    <section id="competences" className="section-padding section-alt relative">
      {/* Subtle web pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--spidey-red)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      <div className="section-container relative z-10">
        <h2 className="heading-section text-center">
          <span className="text-primary">&lt;</span>
          Compétences Techniques
          <span className="text-primary">/&gt;</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.title} className="group">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-primary/10 border border-primary/30 rounded-sm group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
                {category.note && (
                  <p className="text-sm text-muted-foreground mt-4 italic font-body">
                    ⚡ {category.note}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
