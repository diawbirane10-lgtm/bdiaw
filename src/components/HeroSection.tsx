import { Mail, Linkedin, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="accueil" className="pt-24 pb-16 bg-background">
      <div className="section-container w-full">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-body font-medium text-muted-foreground">{t("hero.available")}</span>
          </div>

          <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-extrabold text-foreground tracking-tight mb-4">
            {t("hero.title")}
          </h1>

          <p className="text-xl lg:text-2xl font-body font-medium text-primary mb-8">
            {t("hero.subtitle")}
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground font-body mb-8">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{t("hero.location")}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:diawbirane10@gmail.com"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-body font-semibold text-sm hover:bg-primary/90 transition-all duration-200"
            >
              <Mail size={16} />
              {t("hero.contact")}
            </a>
            <a
              href="https://www.linkedin.com/in/birane-diaw-b83b47374"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-lg font-body font-medium text-sm hover:border-primary/40 hover:text-primary transition-all duration-200"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href="tel:+212669148524"
              className="inline-flex items-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-lg font-body font-medium text-sm hover:border-primary/40 hover:text-primary transition-all duration-200"
            >
              <Phone size={16} />
              +212 669 148 524
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-10 border-t border-border">
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-lg text-foreground mb-4">{t("hero.about")}</h2>
            <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4">
              {t("hero.about1")}
            </p>
            <p className="text-muted-foreground text-sm font-body leading-relaxed">
              {t("hero.about2")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { value: "L3", label: t("hero.stat.licence") },
              { value: "2×", label: t("hero.stat.stages") },
              { value: "3", label: t("hero.stat.certifications") },
              { value: "6+", label: t("hero.stat.projects") },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-secondary border border-border">
                <span className="text-2xl font-display font-extrabold text-primary">{stat.value}</span>
                <span className="text-sm font-body text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
