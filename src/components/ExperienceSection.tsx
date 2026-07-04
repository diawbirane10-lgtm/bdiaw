import { Briefcase } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ExperienceSection = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      period: t("experience.e1.period"),
      title: t("experience.e1.title"),
      company: t("experience.e1.company"),
      project: t("experience.e1.project"),
      tasks: [t("experience.e1.task1"), t("experience.e1.task2"), t("experience.e1.task3")],
    },
    {
      period: t("experience.e2.period"),
      title: t("experience.e2.title"),
      company: t("experience.e2.company"),
      project: t("experience.e2.project"),
      tasks: [t("experience.e2.task1"), t("experience.e2.task2"), t("experience.e2.task3")],
    },
  ];

  return (
    <section id="experience" className="section-padding section-alt">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">{t("experience.label")}</span>
          <h2 className="section-title flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-primary" />
            {t("experience.title")}
          </h2>
          <div className="section-divider" />
        </div>

        <div className="space-y-0 max-w-3xl">
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
