import { Linkedin, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="section-padding bg-secondary/40 border-t border-border">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">{t("footer.label")}</span>
          <h2 className="section-title">{t("footer.title")}</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <a
            href="mailto:diawbirane10@gmail.com"
            className="card-elegant flex items-center gap-3 hover-lift group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-body">{t("footer.email")}</p>
              <p className="text-sm font-body font-medium text-foreground group-hover:text-primary transition-colors">
                diawbirane10@gmail.com
              </p>
            </div>
          </a>

          <a
            href="tel:+212669148524"
            className="card-elegant flex items-center gap-3 hover-lift group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-body">{t("footer.phone")}</p>
              <p className="text-sm font-body font-medium text-foreground group-hover:text-primary transition-colors">
                +212 669 148 524
              </p>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/birane-diaw-b83b47374"
            target="_blank"
            rel="noopener noreferrer"
            className="card-elegant flex items-center gap-3 hover-lift group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Linkedin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-body">LinkedIn</p>
              <p className="text-sm font-body font-medium text-foreground group-hover:text-primary transition-colors">
                Birane Diaw
              </p>
            </div>
          </a>
        </div>

        <div className="text-center pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground font-body">
            {t("footer.copyright").replace("{year}", new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
