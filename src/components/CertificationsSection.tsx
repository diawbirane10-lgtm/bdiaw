import { Award, Download, ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const CertificationsSection = () => {
  const { t } = useLanguage();

  const certifications = [
    {
      title: "Coding With Python",
      issuer: "GOMYCODE",
      justificatif: "/documents/certif_python_gomycode.jpeg",
    },
    {
      title: "Introduction to PLC and Industrial Automation",
      issuer: "LinkedIn Learning",
      justificatif: "/documents/linkedin_learning_plc.pdf",
    },
    {
      title: "Electronics Foundations : Fundamentals",
      issuer: "LinkedIn Learning",
      justificatif: "/documents/linkedin_learning_certificate.pdf",
    },
  ];

  return (
    <section id="certifications" className="section-padding bg-background">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">{t("cert.label")}</span>
          <h2 className="section-title flex items-center gap-3">
            <Award className="w-7 h-7 text-primary" />
            {t("cert.title")}
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <div key={i} className="card-elegant hover-lift flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground mb-2">{cert.title}</h3>
              <p className="text-xs text-muted-foreground font-body mb-5 flex-grow">{cert.issuer}</p>
              <a
                href={cert.justificatif}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-xs font-body font-medium text-primary hover:text-accent transition-colors duration-300 pt-4 border-t border-border/40 w-full"
              >
                <Download size={13} />
                {t("cert.proof")}
                <ExternalLink size={11} className="opacity-40" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
