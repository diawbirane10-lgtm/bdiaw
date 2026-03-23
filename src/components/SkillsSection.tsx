import { useLanguage } from "@/i18n/LanguageContext";
import { Cpu, Gauge, CircuitBoard, Zap, Monitor, Code, Sparkles } from "lucide-react";

const SkillsSection = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: t("skills.cat1"),
      icon: <Cpu size={18} />,
      skills: ["Analyse fonctionnelle", "GRAFCET", "Ladder", "Logique séquentielle", "Automatisation"],
    },
    {
      title: t("skills.cat2"),
      icon: <Gauge size={18} />,
      skills: ["Capteurs", "Chaîne de mesure", "Acquisition de données", "Interprétation de résultats"],
    },
    {
      title: t("skills.cat3"),
      icon: <CircuitBoard size={18} />,
      skills: ["Analogique", "Numérique", "Lecture de schémas", "Simulation de circuits"],
    },
    {
      title: t("skills.cat4"),
      icon: <Zap size={18} />,
      skills: ["Câblage", "Mesures", "Sécurité électrique", "Commande vectorielle (FOC)"],
    },
    {
      title: t("skills.cat5"),
      icon: <Monitor size={18} />,
      skills: ["MATLAB/Simulink", "LTspice", "Tinkercad", "SIMATIC Manager (Siemens)", "OpenSCAD"],
    },
    {
      title: t("skills.cat6"),
      icon: <Code size={18} />,
      skills: ["Python (POO)", "C", "VS Code", "Microsoft Office", "NotebookLM"],
    },
    {
      title: t("skills.cat7"),
      icon: <Sparkles size={18} />,
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
    <section id="competences" className="section-padding">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">{t("skills.label")}</span>
          <h2 className="section-title">{t("skills.title")}</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category) => (
            <div key={category.title} className="card-elegant group">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="text-primary">{category.icon}</div>
                <h3 className="text-xs font-body font-semibold text-foreground tracking-wide uppercase">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-xs font-body font-semibold text-foreground mb-4 tracking-wide uppercase">
            {t("skills.languages")}
          </h3>
          <div className="flex flex-wrap gap-6">
            {languages.map((l) => (
              <div key={l.lang} className="flex items-center gap-2">
                <span className="font-body font-medium text-foreground text-sm">{l.lang}</span>
                <span className="text-xs text-muted-foreground font-body px-2 py-0.5 rounded-full bg-secondary border border-border">
                  {l.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
