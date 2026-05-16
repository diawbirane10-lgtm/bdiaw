import { Linkedin, Mail, Phone, MessageCircle, Github } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useState, useRef, useEffect } from "react";

const Footer = () => {
  const { t } = useLanguage();
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowPhoneMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <footer id="contact" className="section-padding border-t border-border/50 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03]">
        <svg viewBox="0 0 200 200" className="w-full h-full text-primary">
          <path d="M100 10 L190 60 L190 140 L100 190 L10 140 L10 60 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <div className="section-header">
          <span className="section-label">{t("footer.label")}</span>
          <h2 className="section-title">{t("footer.title")}</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <a
            href="mailto:diawbirane10@gmail.com"
            className="card-elegant flex items-center gap-4 hover-lift group"
          >
            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-body uppercase tracking-wider">{t("footer.email")}</p>
              <p className="text-sm font-body font-semibold text-foreground group-hover:text-primary transition-colors">
                diawbirane10@gmail.com
              </p>
            </div>
          </a>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowPhoneMenu(!showPhoneMenu)}
              className="w-full card-elegant flex items-center gap-4 hover-lift group text-left"
            >
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-body uppercase tracking-wider">{t("footer.phone")}</p>
                <p className="text-sm font-body font-semibold text-foreground group-hover:text-primary transition-colors">
                  +212 669 148 524
                </p>
              </div>
            </button>

            {showPhoneMenu && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-2xl z-50 overflow-hidden animate-fade-in">
                <a
                  href="https://wa.me/212669148524"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
                  onClick={() => setShowPhoneMenu(false)}
                >
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-body font-medium text-foreground">WhatsApp</span>
                </a>
                <a
                  href="tel:+212669148524"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors border-t border-border"
                  onClick={() => setShowPhoneMenu(false)}
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-sm font-body font-medium text-foreground">{t("footer.call")}</span>
                </a>
              </div>
            )}
          </div>

          <a
            href="https://www.linkedin.com/in/birane-diaw-b83b47374"
            target="_blank"
            rel="noopener noreferrer"
            className="card-elegant flex items-center gap-4 hover-lift group"
          >
            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
              <Linkedin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-body uppercase tracking-wider">LinkedIn</p>
              <p className="text-sm font-body font-semibold text-foreground group-hover:text-primary transition-colors">
                Birane Diaw
              </p>
            </div>
          </a>

          <a
            href="https://github.com/diawbirane10-lgtm"
            target="_blank"
            rel="noopener noreferrer"
            className="card-elegant flex items-center gap-4 hover-lift group"
          >
            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
              <Github className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-body uppercase tracking-wider">GitHub</p>
              <p className="text-sm font-body font-semibold text-foreground group-hover:text-primary transition-colors">
                diawbirane10-lgtm
              </p>
            </div>
          </a>
        </div>

        <div className="text-center pt-8 border-t border-border/50">
          <p className="text-xs text-muted-foreground font-body tracking-wider">
            {t("footer.copyright").replace("{year}", new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
