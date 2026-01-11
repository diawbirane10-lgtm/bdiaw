import { Linkedin, Mail, Github, Heart } from "lucide-react";
import spidermanIcon from "@/assets/spiderman-icon.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border py-12 relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
      
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Name and role with Spider-Man icon */}
          <div className="flex items-center gap-4">
            <img 
              src={spidermanIcon} 
              alt="Spider-Man" 
              className="w-12 h-12 opacity-80"
            />
            <div>
              <p className="font-display font-bold text-xl text-foreground">Birane Diaw</p>
              <p className="text-sm text-muted-foreground font-body">
                Génie Électrique, spécialité IEEA • FST Marrakech
              </p>
            </div>
          </div>

          {/* Contact Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/birane-diaw-b83b47374"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-body hidden sm:inline">LinkedIn</span>
            </a>
            <a
              href="mailto:diawbirane10@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors duration-300 group"
              aria-label="Email"
            >
              <Mail size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-body hidden sm:inline">diawbirane10@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground font-body flex items-center justify-center gap-2">
            © {new Date().getFullYear()} Birane Diaw. Fait avec 
            <Heart className="w-4 h-4 text-primary animate-pulse" /> 
            et un peu de
            <span className="text-primary font-display">Spider-Sense</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
