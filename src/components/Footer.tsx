import { Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border py-16">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Name and role */}
          <div className="text-center md:text-left">
            <p className="font-display text-2xl text-foreground tracking-wide mb-2">
              Birane Diaw
            </p>
            <p className="text-sm text-muted-foreground font-body tracking-wide">
              Génie Électrique, spécialité IEEA
            </p>
            <p className="text-xs text-muted-foreground font-body mt-1">
              FST Marrakech — Université Cadi Ayyad
            </p>
          </div>

          {/* Contact Links */}
          <div className="flex items-center gap-8">
            <a
              href="https://www.linkedin.com/in/birane-diaw-b83b47374"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
              <span className="text-sm font-body tracking-wide">LinkedIn</span>
            </a>
            <a
              href="mailto:diawbirane10@gmail.com"
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
              aria-label="Email"
            >
              <Mail size={18} />
              <span className="text-sm font-body tracking-wide hidden sm:inline">diawbirane10@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Elegant divider */}
        <div className="elegant-divider my-10" />

        {/* Bottom Bar */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground font-body tracking-wide">
            © {new Date().getFullYear()} Birane Diaw — Manners Maketh Man
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
