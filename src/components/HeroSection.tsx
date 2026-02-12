import { ArrowDown, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="accueil" className="min-h-screen flex items-center pt-20 bg-background relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="section-container w-full relative z-10">
        <div className="max-w-2xl">
          <p className="section-label mb-6">Portfolio</p>

          <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl text-foreground mb-6">
            Birane Diaw
          </h1>

          <div className="section-divider mb-8" />

          <h2 className="text-xl lg:text-2xl font-body font-light mb-3 text-foreground/90 tracking-wide">
            Étudiant en Génie Électrique
          </h2>

          <p className="text-muted-foreground text-sm mb-2 font-body leading-relaxed max-w-lg">
            Passionné par l'instrumentation et les technologies innovantes. Je souhaite mettre mes compétences techniques au service des plateformes technologiques.
          </p>

          <p className="text-muted-foreground/70 text-sm mb-10 font-body flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            FST Marrakech — Université Cadi Ayyad
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#formation"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-3 rounded-lg font-body font-semibold text-sm hover:bg-primary/90 transition-all duration-300"
            >
              Découvrir mon parcours
              <ArrowDown size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-border text-foreground/80 px-7 py-3 rounded-lg font-body font-medium text-sm hover:border-primary/50 hover:text-primary transition-all duration-300"
            >
              Me contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
