import { Award, Download, ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const CertificationsSection = () => {
  const { t } = useLanguage();

  const certifications = [
    {
      title: "EF SET English Certificate — C2 Proficient (71/100)",
      issuer: "EF Education First",
      description: t("cert.efset.desc"),
      justificatif: "/documents/ef_set_certificate.pdf",
    },
    {
      title: "Coding With Python",
      issuer: "GOMYCODE",
      description: t("cert.python.desc"),
      justificatif: "/documents/certif_python_gomycode.jpeg",
    },
    {
      title: "Introduction to PLC and Industrial Automation",
      issuer: "LinkedIn Learning",
      description: t("cert.plc.desc"),
      justificatif: "/documents/linkedin_learning_plc.pdf",
    },
    {
      title: "Electronics Foundations: Fundamentals",
      issuer: "LinkedIn Learning",
      description: t("cert.electronics.desc"),
      justificatif: "/documents/linkedin_learning_certificate.pdf",
    },
  ];

  return (
    <section id="certifications" className="section-padding">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">{t("cert.label")}</span>
          <h2 className="section-title">{t("cert.title")}</h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certifications.map((cert, i) => (
            <div key={i} className="card-elegant hover-lift flex flex-col group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-body text-sm font-semibold text-foreground mb-0.5">{cert.title}</h3>
                  <p className="text-xs text-muted-foreground font-body mb-2">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground/80 font-body leading-relaxed">{cert.description}</p>
                </div>
              </div>
              <a
                href={cert.justificatif}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-primary hover:underline pt-3 mt-4 border-t border-border w-full justify-center"
              >
                <Download size={12} />
                {t("cert.proof")}
                <ExternalLink size={10} className="opacity-40" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
