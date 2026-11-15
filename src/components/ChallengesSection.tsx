import { Award, ArrowUpRight, CalendarDays, Github, Orbit, Presentation, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const copy = {
  en: {
    eyebrow: "Competitions & Challenges",
    title: "Engineering beyond the classroom",
    intro: "Applied challenges, demonstrable prototypes and documented participation.",
    event: "NASA Space Apps Challenge 2026",
    status: "Project submitted · Participation certificate issued",
    role: "Lunar Landing Site Navigator · POLARIS",
    description: "Developed POLARIS, an interactive lunar south-pole mission decision-support prototype combining NASA/JPL Horizons ephemerides, LOLA-derived topography, time-dependent mission scenarios and a preliminary photovoltaic–battery energy budget. A constrained engineering Copilot performs reproducible what-if calculations.",
    scope: "Electrical contribution",
    detail: "PV generation, load energy, battery state of charge, shortfall analysis and explicit limitations. Educational feasibility model — not a flight-qualified electrical design.",
    view: "Explore prototype", slides: "7-slide overview", code: "Source code",
    certificate: "Galactic Problem Solver · participation certificate (14–15 Nov 2026)",
    disclaimer: "Participation certificate — not an award, ranking or jury prize."
  },
  fr: {
    eyebrow: "Challenges & Competitions",
    title: "L'ingénierie au-delà des cours",
    intro: "Challenges appliqués, prototypes démontrables et participations documentées.",
    event: "NASA Space Apps Challenge 2026",
    status: "Projet soumis · Certificat de participation obtenu",
    role: "Lunar Landing Site Navigator · POLARIS",
    description: "Développement de POLARIS, prototype d'aide à la décision pour les missions au pôle Sud lunaire : éphémérides NASA/JPL Horizons, topographie dérivée de LOLA, scénarios temporels et bilan énergétique photovoltaïque–batterie. Un Copilot d'ingénierie encadré réalise des simulations reproductibles.",
    scope: "Contribution en génie électrique",
    detail: "Production PV, consommation, état de charge, déficits énergétiques et limites explicites. Modèle de faisabilité pédagogique, non qualifié pour le vol spatial.",
    view: "Voir le prototype", slides: "Présentation — 7 slides", code: "Code source",
    certificate: "Galactic Problem Solver · certificat de participation (14–15 nov. 2026)",
    disclaimer: "Certificat de participation, et non prix, classement ou récompense du jury."
  },
  ar: {
    eyebrow: "المسابقات والتحديات",
    title: "الهندسة خارج قاعات الدراسة",
    intro: "تحديات عملية ونماذج قابلة للتجربة ومشاركات موثقة.",
    event: "NASA Space Apps Challenge 2026",
    status: "تم تقديم المشروع · شهادة مشاركة",
    role: "Lunar Landing Site Navigator · POLARIS",
    description: "تطوير POLARIS، نموذج لدعم قرارات المهمات قرب القطب الجنوبي للقمر باستخدام بيانات NASA/JPL Horizons وتضاريس LOLA وسيناريوهات المهمات وحساب طاقة الألواح الشمسية والبطارية، مع مساعد هندسي للحسابات القابلة لإعادة الإنتاج.",
    scope: "المساهمة في الهندسة الكهربائية",
    detail: "إنتاج الطاقة الشمسية والاستهلاك وحالة شحن البطارية والعجز الطاقي وحدود النموذج. نموذج دراسة أولية وليس نظامًا مؤهلًا للطيران.",
    view: "فتح النموذج", slides: "عرض من 7 شرائح", code: "المصدر البرمجي",
    certificate: "Galactic Problem Solver · شهادة مشاركة (14–15 نوفمبر 2026)",
    disclaimer: "شهادة مشاركة، وليست جائزة أو ترتيبًا من لجنة التحكيم."
  }
} as const;

const ChallengesSection = () => {
  const { lang } = useLanguage();
  const c = copy[lang];
  return (
    <section id="challenges" className="section-padding relative" aria-labelledby="challenges-title">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">{c.eyebrow}</span>
          <h2 id="challenges-title" className="section-title">{c.title}</h2>
          <div className="section-divider" />
          <p className="text-muted-foreground mt-4 max-w-2xl">{c.intro}</p>
        </div>
        <article className="card-project border border-border overflow-hidden">
          <div className="h-1 bg-primary w-full" aria-hidden="true" />
          <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(260px,.7fr)] gap-7 p-1 md:p-3">
            <div>
              <div className="flex gap-2 items-center flex-wrap mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary inline-flex items-center gap-2"><Orbit size={15}/>{c.event}</span>
                <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><CalendarDays size={13}/> November 2026</span>
              </div>
              <h3 className="font-body font-bold text-foreground text-xl md:text-2xl mb-3">POLARIS — Lunar Mission Decision Intelligence</h3>
              <p className="text-sm font-semibold text-foreground mb-3">{c.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{c.description}</p>
              <div className="border-l-2 border-primary pl-4 mb-5">
                <p className="text-xs uppercase tracking-wider font-bold text-primary mb-1">{c.scope}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.detail}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a className="inline-flex gap-2 items-center rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-xs font-bold hover:brightness-110" href="https://polaris-spaceapps-2026.vercel.app/" target="_blank" rel="noopener noreferrer">{c.view}<ArrowUpRight size={14}/></a>
                <a className="inline-flex gap-2 items-center rounded-md border border-border px-4 py-2.5 text-xs font-bold text-foreground hover:border-primary" href="https://polaris-spaceapps-2026.vercel.app/submission-slides.html" target="_blank" rel="noopener noreferrer"><Presentation size={14}/>{c.slides}</a>
                <a className="inline-flex gap-2 items-center rounded-md border border-border px-4 py-2.5 text-xs font-bold text-foreground hover:border-primary" href="https://github.com/diawbirane10-lgtm/polaris_nasaspaceapps" target="_blank" rel="noopener noreferrer"><Github size={14}/>{c.code}</a>
              </div>
            </div>
            <aside className="rounded-lg border border-border bg-secondary/30 p-5 self-start">
              <Award size={27} className="text-primary mb-4" aria-hidden="true"/>
              <p className="text-xs uppercase tracking-wider font-bold text-primary mb-2">{c.status}</p>
              <p className="font-semibold text-foreground leading-relaxed mb-3">{c.certificate}</p>
              <p className="text-xs text-muted-foreground leading-relaxed flex gap-2 items-start"><ShieldCheck size={16} className="shrink-0 mt-0.5" aria-hidden="true"/>{c.disclaimer}</p>
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
};
export default ChallengesSection;
