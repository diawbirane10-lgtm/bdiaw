import { ArrowDown, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="accueil" className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 0.08, scale: 1, rotate: 0 }}
        transition={{ duration: 2, delay: 0.3, ease }}
        className="absolute top-20 right-0 w-[500px] h-[500px] z-0"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-primary">
          <path d="M100 10 L190 60 L190 140 L100 190 L10 140 L10 60 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M100 40 L160 70 L160 130 L100 160 L40 130 L40 70 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "120px", opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease }}
        className="absolute left-8 top-24 w-[2px] bg-gradient-to-b from-primary to-transparent z-20 hidden lg:block"
      />

      <div className="section-container w-full relative z-20 pb-20 pt-32">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="flex items-center gap-2 mb-10 text-xs font-body text-muted-foreground tracking-wide"
        >
          <span className="hover:text-primary cursor-pointer transition-colors">{t("nav.home")}</span>
          <ChevronRight size={12} />
          <span className="text-primary font-semibold">Portfolio</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="flex items-center gap-2.5 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-body font-bold text-primary tracking-[0.15em] uppercase">
            {t("hero.available")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="font-body text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.05] mb-4 uppercase"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
          className="text-lg md:text-xl font-body font-semibold text-primary mb-4 tracking-wide"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
          className="text-sm font-body text-muted-foreground mb-10 max-w-xl leading-relaxed"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <button
            onClick={() => document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded font-body font-bold text-sm tracking-wide uppercase hover:brightness-110 transition-all duration-300 group cursor-pointer"
          >
            {t("hero.cta.projects")}
            <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform duration-300" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.8, ease }}
          className="pt-12 border-t border-border/50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10">
            <div>
              <h2 className="font-body font-black text-2xl lg:text-3xl text-foreground uppercase tracking-tight mb-2">
                {t("hero.about")}
              </h2>
              <div className="w-10 h-1 bg-primary rounded-full" />
            </div>
            <div className="space-y-5">
              <p className="text-sm font-body text-muted-foreground leading-relaxed max-w-prose">
                {t("hero.about1")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
