import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const FormationSection = () => {
  const { t } = useLanguage();

  const formations = [
    {
      period: t("formation.f1.period"),
      status: t("formation.f1.status"),
      title: t("formation.f1.title"),
      institution: t("formation.f1.institution"),
      details: [t("formation.f1.detail1"), t("formation.f1.detail2")],
    },
    {
      period: t("formation.f2.period"),
      title: t("formation.f2.title"),
      subtitle: t("formation.f2.subtitle"),
      institution: t("formation.f2.institution"),
    },
    {
      period: t("formation.f3.period"),
      title: t("formation.f3.title"),
      institution: t("formation.f3.institution"),
    },
  ];

  return (
    <section id="formation" className="section-padding bg-background">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">{t("formation.label")}</span>
          <h2 className="section-title flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-primary" />
            {t("formation.title")}
          </h2>
          <div className="section-divider" />
        </div>

        <div className="space-y-0 max-w-3xl">
          {formations.map((f, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-date">
                {f.period}
                {f.status && (
                  <span className="ml-1 px-2 py-0.5 text-[10px] bg-primary/10 text-primary rounded-full border border-primary/20">
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
