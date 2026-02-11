import { Award } from "lucide-react";

const CertificationsSection = () => {
  const certifications = [
    { title: "Coding With Python", issuer: "GOMYCODE" },
    { title: "Introduction to PLC and Industrial Automation", issuer: "LinkedIn Learning" },
    { title: "Electronics Foundations : Fundamentals", issuer: "LinkedIn Learning" },
  ];

  return (
    <section id="certifications" className="section-padding bg-background">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Validation</span>
          <h2 className="section-title flex items-center gap-3">
            <Award className="w-8 h-8 text-primary" />
            Certifications
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <div key={i} className="card-elegant text-center hover-lift">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-base text-foreground mb-2">{cert.title}</h3>
              <p className="text-xs text-muted-foreground font-body">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
