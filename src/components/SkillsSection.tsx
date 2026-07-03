import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Cpu, Gauge, CircuitBoard, Zap, Monitor, Code, Sparkles, ChevronDown } from "lucide-react";
import { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

const SkillsSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const skillCategories = [
    {
      title: t("skills.cat1"),
      icon: <Cpu size={18} />,
      summary: t("skills.sum.1"),
      highlights: ["GRAFCET", "IEC 61131-3", "SoftPLC"],
      skills: [t("skills.s1.1"), t("skills.s1.2"), t("skills.s1.3"), t("skills.s1.4"), t("skills.s1.5"), t("skills.s1.6"), t("skills.s1.7"), t("skills.s1.8"), t("skills.s1.9"), t("skills.s1.10")],
    },
    {
      title: t("skills.cat2"),
      icon: <Gauge size={18} />,
      summary: t("skills.sum.2"),
      highlights: [t("skills.s2.1"), t("skills.s2.3"), t("skills.s2.4")],
      skills: [t("skills.s2.1"), t("skills.s2.2"), t("skills.s2.3"), t("skills.s2.4")],
    },
    {
      title: t("skills.cat3"),
      icon: <CircuitBoard size={18} />,
      summary: t("skills.sum.3"),
      highlights: ["KiCad", t("skills.s3.1"), t("skills.s3.2")],
      skills: [t("skills.s3.1"), t("skills.s3.2"), t("skills.s3.3"), t("skills.s3.4"), t("skills.s3.5")],
    },
    {
      title: t("skills.cat4"),
      icon: <Zap size={18} />,
      summary: t("skills.sum.4"),
      highlights: [t("skills.s4.4"), t("skills.s4.1"), t("skills.s4.3")],
      skills: [t("skills.s4.1"), t("skills.s4.2"), t("skills.s4.3"), t("skills.s4.4")],
    },
    {
      title: t("skills.cat5"),
      icon: <Monitor size={18} />,
      summary: t("skills.sum.5"),
      highlights: ["MATLAB/Simulink", "CODESYS", "TIA Portal"],
      skills: [t("skills.s5.1"), t("skills.s5.2"), t("skills.s5.3"), t("skills.s5.4"), t("skills.s5.5"), t("skills.s5.6"), t("skills.s5.7"), t("skills.s5.8"), t("skills.s5.9")],
    },
    {
      title: t("skills.cat6"),
      icon: <Code size={18} />,
      summary: t("skills.sum.6"),
      highlights: ["Python", "SCL", "Git/GitHub"],
      skills: [t("skills.s6.1"), t("skills.s6.2"), t("skills.s6.3"), t("skills.s6.4"), t("skills.s6.5"), t("skills.s6.6"), t("skills.s6.7"), t("skills.s6.8"), t("skills.s6.9"), t("skills.s6.10"), t("skills.s6.11"), t("skills.s6.12")],
    },
    {
      title: t("skills.cat7"),
      icon: <Sparkles size={18} />,
      summary: t("skills.sum.7"),
      highlights: [t("skills.s7.2"), t("skills.s7.1"), "NotebookLM"],
      skills: [t("skills.s7.1"), t("skills.s7.2"), t("skills.s7.3")],
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

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {skillCategories.map((category, index) => {
            const isOpen = openIndex === index;
            return (
              <StaggerItem key={category.title}>
                <div className="card-elegant hover-lift h-full transition-all">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="text-primary">{category.icon}</div>
                        <h3 className="text-xs font-body font-bold text-foreground tracking-[0.1em] uppercase">
                          {category.title}
                        </h3>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {category.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {category.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[11px] font-body font-semibold text-primary bg-primary/10 border border-primary/20 rounded px-2 py-0.5"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-border/50">
                          <div className="flex flex-wrap gap-1.5">
                            {category.skills.map((skill) => (
                              <span key={skill} className="skill-tag">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="mt-3 text-[11px] font-body font-semibold text-primary/70 hover:text-primary tracking-wide uppercase transition-colors"
                  >
                    {isOpen ? t("skills.hideAll") : t("skills.showAll")}
                  </button>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="mt-14 pt-8 border-t border-border/50 max-w-4xl mx-auto">
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
