import { ArrowDown, Zap } from "lucide-react";
import spidermanWebBg from "@/assets/spiderman-web-bg.png";

const HeroSection = () => {
  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center pt-[72px] bg-background relative overflow-hidden"
    >
      {/* Spider-Man Web Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${spidermanWebBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-spidey-dark/50" />

      <div className="section-container w-full relative z-10">
        <div className="max-w-3xl">
          {/* Glitch-style subtitle */}
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-primary animate-pulse" />
            <p className="text-primary font-display font-medium tracking-[0.3em] uppercase text-sm glow-text">
              Portfolio Ingénieur
            </p>
          </div>

          {/* Name with glow effect */}
          <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-black mb-6 tracking-tight">
            <span className="text-foreground">Birane</span>{" "}
            <span className="text-primary glow-text">Diaw</span>
          </h1>

          {/* Role with colored accent */}
          <h2 className="text-xl lg:text-2xl font-display font-semibold mb-4">
            <span className="text-foreground">Génie Électrique</span>
            <span className="text-secondary glow-text-blue">, spécialité IEEA</span>
          </h2>
          
          <p className="text-muted-foreground text-sm mb-2 font-body tracking-wide">
            (Informatique, Électronique, Électrotechnique, Automatique)
          </p>

          {/* Institution */}
          <p className="text-lg text-muted-foreground mb-10 font-body">
            Étudiant à la <span className="text-secondary">FST Marrakech</span>, Université Cadi Ayyad
          </p>

          {/* CTA Button - Cyber style */}
          <a
            href="#projets"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-display font-bold uppercase tracking-wider hover:bg-primary/90 transition-all duration-300 pulse-glow group"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
            }}
          >
            Mes Projets
            <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
