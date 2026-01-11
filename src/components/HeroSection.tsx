import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center pt-[72px] bg-background"
    >
      <div className="section-container w-full">
        <div className="max-w-3xl">
          {/* Subtitle */}
          <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">
            Portfolio Ingénieur
          </p>

          {/* Name */}
          <h1 className="heading-primary text-4xl lg:text-5xl xl:text-6xl mb-6">
            Birane Diaw
          </h1>

          {/* Role */}
          <h2 className="text-xl lg:text-2xl text-foreground font-medium mb-4">
            Génie Électrique, spécialité IEEA
          </h2>
          <p className="text-muted-foreground text-sm mb-2">
            (Informatique, Électronique, Électrotechnique, Automatique)
          </p>

          {/* Institution */}
          <p className="text-lg text-muted-foreground mb-8">
            Étudiant à la FST Marrakech, Université Cadi Ayyad
          </p>

          {/* CTA Button */}
          <a
            href="#projets"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Mes Projets
            <ArrowDown size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
