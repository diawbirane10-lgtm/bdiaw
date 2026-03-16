import { Mail, Linkedin, MapPin, Phone, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="section-container relative z-10 w-full pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-body font-medium text-muted-foreground tracking-wide">
              {t("hero.available")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-foreground tracking-tight mb-2 glow-subtle"
          >
            {t("hero.title").split(" ")[0]}
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-muted-foreground/60 tracking-tight mb-6"
          >
            {t("hero.title").split(" ").slice(1).join(" ")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl lg:text-2xl font-body font-medium text-primary/80 mb-4"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center gap-2 text-sm text-muted-foreground font-body mb-10"
          >
            <MapPin className="w-4 h-4 text-primary/60" />
            <span>{t("hero.location")}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href="mailto:diawbirane10@gmail.com"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-body font-semibold text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
            >
              <Mail size={16} />
              {t("hero.contact")}
            </a>
            <a
              href="https://www.linkedin.com/in/birane-diaw-b83b47374"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-body font-medium text-sm hover:border-primary/40 hover:text-primary transition-all duration-300"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href="tel:+212669148524"
              className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-body font-medium text-sm hover:border-primary/40 hover:text-primary transition-all duration-300"
            >
              <Phone size={16} />
              +212 669 148 524
            </a>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-12 border-t border-border/40"
        >
          {[
            { value: "L3", label: t("hero.stat.licence") },
            { value: "2×", label: t("hero.stat.stages") },
            { value: "3", label: t("hero.stat.certifications") },
            { value: "6+", label: t("hero.stat.projects") },
          ].map((stat, i) => (
            <div key={i} className="text-center lg:text-left py-4">
              <span className="text-3xl lg:text-4xl font-display font-extrabold text-primary">{stat.value}</span>
              <p className="text-sm font-body text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* About section integrated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 pt-12 border-t border-border/40"
        >
          <h2 className="font-display font-bold text-xl text-foreground mb-6">{t("hero.about")}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <p className="text-muted-foreground text-sm font-body leading-relaxed">
              {t("hero.about1")}
            </p>
            <p className="text-muted-foreground text-sm font-body leading-relaxed">
              {t("hero.about2")}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#projets" className="text-muted-foreground/40 hover:text-primary transition-colors">
          <ChevronDown size={28} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
