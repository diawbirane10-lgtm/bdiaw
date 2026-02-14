import { Mail, Linkedin, MapPin, Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="accueil" className="min-h-[85vh] flex items-center pt-24 pb-16 bg-background">
      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">
          {/* Left — Identity */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm font-body font-medium text-muted-foreground">Disponible pour un stage</span>
            </div>

            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-extrabold text-foreground tracking-tight mb-4">
              Birane Diaw
            </h1>

            <p className="text-xl lg:text-2xl font-body font-medium text-primary mb-6">
              Étudiant en Génie Électrique
            </p>

            <p className="text-muted-foreground text-base font-body leading-relaxed max-w-lg mb-8">
              Passionné par l'instrumentation, l'automatique et les systèmes embarqués. 
              Je cherche à mettre mes compétences techniques au service de projets industriels concrets.
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground font-body mb-10">
              <MapPin className="w-4 h-4 text-primary" />
              <span>FST Marrakech — Université Cadi Ayyad</span>
            </div>

            {/* Contact row */}
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:diawbirane10@gmail.com"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-body font-semibold text-sm hover:bg-primary/90 transition-all duration-200"
              >
                <Mail size={16} />
                Me contacter
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

          {/* Right — Quick stats */}
          <div className="hidden lg:flex flex-col gap-4 min-w-[220px]">
            {[
              { value: "L3", label: "Licence IEEA" },
              { value: "2×", label: "Stages SAE SARL" },
              { value: "3", label: "Certifications" },
              { value: "6+", label: "Projets techniques" },
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