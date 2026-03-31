import { Quote } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const TestimonialsSection = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: t("testimonial.1.name"),
      role: t("testimonial.1.role"),
      text: t("testimonial.1.text"),
    },
    {
      name: t("testimonial.2.name"),
      role: t("testimonial.2.role"),
      text: t("testimonial.2.text"),
    },
    {
      name: t("testimonial.3.name"),
      role: t("testimonial.3.role"),
      text: t("testimonial.3.text"),
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">{t("testimonials.label")}</span>
          <h2 className="section-title">{t("testimonials.title")}</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="card-elegant flex flex-col gap-4 relative"
            >
              <Quote className="w-5 h-5 text-primary/30 absolute top-5 right-5" />
              <p className="text-sm font-body text-muted-foreground leading-relaxed italic">
                "{item.text}"
              </p>
              <div className="mt-auto pt-4 border-t border-border">
                <p className="text-sm font-body font-semibold text-foreground">
                  {item.name}
                </p>
                <p className="text-xs font-body text-muted-foreground">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
