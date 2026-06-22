import { useLanguage } from "@/i18n/LanguageContext";
import { Cpu, Gauge, CircuitBoard, Zap, Monitor, Code, Sparkles } from "lucide-react";
import { StaggerContainer, StaggerItem } from "./ScrollReveal";

const SkillsSection = () => {
  const { t } = useLanguage();

  const skillCategories = [
    { title: t("skills.cat1"), icon: <Cpu size={18} />, skills: [t("skills.s1.1"), t("skills.s1.2"), t("skills.s1.3"), t("skills.s1.4"), t("skills.s1.5"), t("skills.s1.6"), t("skills.s1.7"), t("skills.s1.8"), t("skills.s1.9"), t("skills.s1.10")] },
    { title: t("skills.cat2"), icon: <Gauge size={18} />, skills: [t("skills.s2.1"), t("skills.s2.2"), t("skills.s2.3"), t("skills.s2.4")] },
    { title: t("skills.cat3"), icon: <CircuitBoard size={18} />, skills: [t("skills.s3.1"), t("skills.s3.2"), t("skills.s3.3"), t("skills.s3.4"), t("skills.s3.5")] },
    { title: t("skills.cat4"), icon: <Zap size={18} />, skills: [t("skills.s4.1"), t("skills.s4.2"), t("skills.s4.3"), t("skills.s4.4")] },
    { title: t("skills.cat5"), icon: <Monitor size={18} />, skills: [t("skills.s5.1"), t("skills.s5.2"), t("skills.s5.3"), t("skills.s5.4"), t("skills.s5.5"), t("skills.s5.6"), t("skills.s5.7")] },
    { title: t("skills.cat6"), icon: <Code size={18} />, skills: [t("skills.s6.1"), t("skills.s6.2"), t("skills.s6.3"), t("skills.s6.4"), t("skills.s6.5"), t("skills.s6.6"), t("skills.s6.7"), t("skills.s6.8"), t("skills.s6.9")] },
    { title: t("skills.cat7"), icon: <Sparkles size={18} />, skills: [t("skills.s7.1"), t("skills.s7.2"), t("skills.s7.3")] },
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

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category) => (
            <StaggerItem key={category.title}>
              <div className="card-elegant group hover-lift h-full">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="text-primary">{category.icon}</div>
                  <h3 className="text-xs font-body font-bold text-foreground tracking-[0.1em] uppercase">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-14 pt-8 border-t border-border/50">
          <h3 className="text-xs font-body font-bold text-foreground mb-5 tracking-[0.15em] uppercase">
            {t("skills.languages")}
          </h3>
          <div className="flex flex-wrap gap-6">
            {languages.map((l) => (
              <div key={l.lang} className="flex items-center gap-2">
                <span className="font-body font-semibold text-foreground text-sm">{l.lang}</span>
                <span className="text-xs text-primary font-body font-bold px-2.5 py-0.5 rounded bg-primary/10 border border-primary/20">
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
