import { useLanguage } from "@/i18n/LanguageContext";

const SkillsSection = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: t("skills.cat1"),
      skills: ["Analyse fonctionnelle", "GRAFCET", "Logique séquentielle", "Automatisation"],
    },
    {
      title: t("skills.cat2"),
      skills: ["Capteurs", "Chaîne de mesure", "Acquisition de données", "Interprétation de résultats"],
    },
    {
      title: t("skills.cat3"),
      skills: ["Analogique", "Numérique", "Lecture de schémas", "Simulation de circuits"],
    },
    {
      title: t("skills.cat4"),
      skills: ["Câblage", "Mesures", "Sécurité électrique", "Commande vectorielle (FOC)"],
    },
    {
      title: t("skills.cat5"),
      skills: ["MATLAB/Simulink", "LTspice", "Tinkercad", "Grafcet Studio", "OpenSCAD"],
    },
    {
      title: t("skills.cat6"),
      skills: ["Python (POO)", "C", "VS Code", "Microsoft Office", "NotebookLM"],
    },
    {
      title: t("skills.cat7"),
      skills: [
        "Google Gemini — rédaction technique & reformulation",
        "Synthèse de résultats",
        "Prototypage rapide",
        "Génération de snippets de code",
      ],
    },
  ];

  const languages = [
    { lang: t("skills.lang.fr"), level: t("skills.lang.fr.level") },
    { lang: t("skills.lang.en"), level: t("skills.lang.en.level") },
    { lang: t("skills.lang.wo"), level: t("skills.lang.wo.level") },
  ];

  return (
    <section id="competences" className="section-padding section-alt">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">{t("skills.label")}</span>
          <h2 className="section-title">{t("skills.title")}</h2>
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

        <div className="mt-14 pt-10 border-t border-border">
          <h3 className="text-sm font-body font-semibold text-primary mb-6 tracking-wide uppercase">
            {t("skills.languages")}
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
