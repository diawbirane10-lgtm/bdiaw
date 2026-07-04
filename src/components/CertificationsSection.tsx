import { Award, Download, ExternalLink, Calendar, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import TagList from "./TagList";

type Certification = {
  title: string;
  issuer: string;
  date?: string;
  description: string;
  justificatif: string;
  tags?: string[];
  featured?: boolean;
};

const CertificationsSection = () => {
  const { t } = useLanguage();

  const featured: Certification[] = [
    {
      title: "APA Group — Engineering for New Energy Job Simulation",
      issuer: "Forage",
      date: "June 2026",
      description: t("cert.apa.desc"),
      justificatif: "/documents/APA_Certif.pdf",
      tags: [
        "New Energy",
        "Solar PV",
        "Battery Storage",
        "Basis of Design",
        "Energy Calculations",
        "Emissions Offset",
        "Troubleshooting",
        "Safety Awareness",
        "Technical Documentation",
      ],
      featured: true,
    },
    {
      title: "GE Aerospace — Explore Electrical Engineering Job Simulation",
      issuer: "Forage",
      date: "June 2026",
      description: t("cert.ge.desc"),
      justificatif: "/documents/GEA_Certif_Completion.pdf",
      tags: [
        "Aerospace Systems",
        "Electrical Engineering",
        "Power Distribution",
        "Circuit Protection",
        "Avionics Troubleshooting",
        "Quality Assurance",
        "Safety Requirements",
        "Technical Documentation",
      ],
      featured: true,
    },
  ];

  const others: Certification[] = [
    {
      title: "Python Programming Certification",
      issuer: "GoMyCode",
      date: "February 2024",
      description: t("cert.python.desc"),
      justificatif: "/documents/certif_python_gomycode.jpeg",
      tags: ["Python", "OOP", "Data Handling", "Programming Fundamentals", "Problem Solving"],
    },
    {
      title: "EF SET English Certificate — C2 Proficient (71/100)",
      issuer: "EF Education First",
      description: t("cert.efset.desc"),
      justificatif: "/documents/ef_set_certificate.pdf",
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
    <section id="certifications" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="section-header">
          <span className="section-label">{t("cert.label")}</span>
          <h2 className="section-title">{t("cert.title")}</h2>
          <div className="section-divider" />
        </div>

        {/* Featured certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {featured.map((cert, i) => (
            <article key={i} className="card-project hover-lift flex flex-col group">
              <div className="w-full h-1 bg-gradient-to-r from-primary to-primary/30 rounded-full mb-5" />

              <div className="mb-3 flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5">
                  <Star className="w-3 h-3" />
                  Featured
                </span>
                {cert.date && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {cert.date}
                  </span>
                )}
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-body text-sm font-bold text-foreground mb-0.5 uppercase tracking-wide group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-primary font-body font-semibold">{cert.issuer}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground font-body leading-relaxed flex-grow">
                {cert.description}
              </p>

              {cert.tags && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <TagList tags={cert.tags} />
                </div>
              )}

              <a
                href={cert.justificatif}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-body font-bold text-primary-foreground bg-primary hover:brightness-110 px-3.5 py-2.5 mt-4 rounded-lg uppercase tracking-wider"
              >
                <Download size={13} />
                {t("cert.proof")}
                <ExternalLink size={11} className="opacity-70" />
              </a>
            </article>
          ))}
        </div>

        {/* Other certifications — compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {others.map((cert, i) => (
            <div key={i} className="card-elegant hover-lift flex flex-col group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-body text-sm font-bold text-foreground mb-0.5">{cert.title}</h3>
                  <p className="text-xs text-primary font-body font-semibold mb-2">
                    {cert.issuer}
                    {cert.date && <span className="text-muted-foreground font-normal"> · {cert.date}</span>}
                  </p>
                  <p className="text-xs text-muted-foreground font-body leading-relaxed">{cert.description}</p>
                  {cert.tags && (
                    <div className="mt-3">
                      <TagList tags={cert.tags} />
                    </div>
                  )}
                </div>
              </div>
              <a
                href={cert.justificatif}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-body font-bold text-foreground bg-secondary/70 border border-border hover:border-primary/40 hover:text-primary px-3 py-2 mt-4 rounded-lg w-full uppercase tracking-wider"
              >
                <Download size={12} />
                {t("cert.proof")}
                <ExternalLink size={10} className="opacity-60" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
