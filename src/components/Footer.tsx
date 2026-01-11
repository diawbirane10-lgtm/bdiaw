import { Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Name and Copyright */}
          <div>
            <p className="font-semibold text-lg mb-1">Birane Diaw</p>
            <p className="text-sm text-background/70">
              Génie Électrique, spécialité IEEA • FST Marrakech
            </p>
          </div>

          {/* Contact Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-background/80 hover:text-background transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href="mailto:birane.diaw@example.com"
              className="flex items-center gap-2 text-background/80 hover:text-background transition-colors duration-200"
              aria-label="Email"
            >
              <Mail size={20} />
              <span className="text-sm">Email</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-8 pt-6 text-center">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Birane Diaw. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
