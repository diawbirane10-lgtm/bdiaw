import { ArrowDown, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";


const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="accueil" className="min-h-screen flex items-center">
      <div className="section-container w-full pt-24 pb-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-body font-medium text-muted-foreground tracking-wide uppercase">
              {t("hero.available")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.1] mb-4"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl font-body font-medium text-primary mb-3"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-sm font-body text-muted-foreground mb-8 max-w-lg leading-relaxed"
          >
            {t("hero.tagline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3 mb-16"
          >
            <a
              href="#projets"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-body font-semibold text-sm hover:opacity-90 transition-opacity duration-200"
            >
              {t("hero.cta.projects")}
              <ArrowDown size={15} />
            </a>
            <a
              href="/documents/CV_Birane_Diaw.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-lg font-body font-medium text-sm hover:bg-secondary transition-colors duration-200"
            >
              <Download size={15} />
              {t("hero.cta.cv")}
            </a>
          </motion.div>
        </div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-10 border-t border-border"
        >
          <h2 className="font-body font-bold text-sm text-foreground uppercase tracking-wide mb-4">
            {t("hero.about")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <p className="text-sm font-body text-muted-foreground leading-relaxed">
              {t("hero.about1")}
            </p>
            <p className="text-sm font-body text-muted-foreground leading-relaxed">
              {t("hero.about2")}
            </p>
          </div>
        </motion.div>

        
      </div>
    </section>
  );
};

export default HeroSection;
