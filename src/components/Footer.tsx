import { Linkedin, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="section-padding section-alt border-t border-border">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">{t("footer.label")}</span>
          <h2 className="section-title">{t("footer.title")}</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <a
            href="mailto:diawbirane10@gmail.com"
            className="card-elegant flex items-center gap-4 hover-lift group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body mb-0.5">{t("footer.email")}</p>
              <p className="text-sm font-body font-medium text-foreground group-hover:text-primary transition-colors">
                diawbirane10@gmail.com
              </p>
            </div>
          </a>

          <a
            href="tel:+212669148524"
            className="card-elegant flex items-center gap-4 hover-lift group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body mb-0.5">{t("footer.phone")}</p>
              <p className="text-sm font-body font-medium text-foreground group-hover:text-primary transition-colors">
                +212 669 148 524
              </p>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/birane-diaw-b83b47374"
            target="_blank"
            rel="noopener noreferrer"
            className="card-elegant flex items-center gap-4 hover-lift group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body mb-0.5">LinkedIn</p>
              <p className="text-sm font-body font-medium text-foreground group-hover:text-primary transition-colors">
                Birane Diaw
              </p>
            </div>
          </a>
        </div>

        <div className="text-center pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground font-body">
            {t("footer.copyright").replace("{year}", new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
