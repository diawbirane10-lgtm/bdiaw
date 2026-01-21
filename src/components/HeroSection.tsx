import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center pt-20 bg-background relative"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/20 to-transparent" />

      <div className="section-container w-full relative z-10">
        <div className="max-w-2xl">
          {/* Elegant subtitle */}
          <p className="text-primary font-body font-medium tracking-[0.3em] uppercase text-sm mb-8">
            Portfolio
          </p>

          {/* Name with elegant styling */}
          <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-medium mb-8 tracking-wide text-foreground">
            Birane Diaw
          </h1>

          {/* Elegant divider */}
          <div className="w-20 h-px bg-primary mb-8" />

          {/* Role */}
          <h2 className="text-xl lg:text-2xl font-body font-light mb-4 text-foreground/90 tracking-wide">
            Génie Électrique, spécialité IEEA
          </h2>
          
          <p className="text-muted-foreground text-sm mb-3 font-body tracking-wide">
            Informatique, Électronique, Électrotechnique, Automatique
          </p>

          {/* Institution */}
          <p className="text-lg text-muted-foreground mb-12 font-body font-light">
            FST Marrakech — Université Cadi Ayyad
          </p>

          {/* CTA Button - Elegant style */}
          <a
            href="#projets"
            className="inline-flex items-center gap-4 border border-primary text-primary px-8 py-4 font-body font-medium uppercase tracking-[0.2em] text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-500 group"
          >
            Découvrir mes projets
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
