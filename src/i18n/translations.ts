export type Lang = "fr" | "en" | "ar";

export const translations: Record<Lang, Record<string, string>> = {
  fr: {
    // Nav
    "nav.home": "Accueil",
    "nav.skills": "Compétences",
    "nav.projects": "Projets",
    "nav.contact": "Contact",

    // Hero
    "hero.available": "Disponible pour un stage",
    "hero.title": "Birane Diaw",
    "hero.subtitle": "Étudiant en Génie Électrique",
    "hero.location": "FST Marrakech — Université Cadi Ayyad",
    "hero.contact": "Me contacter",
    "hero.about": "À propos",
    "hero.about1": "Étudiant en Génie Électrique, spécialité IEEA (Informatique Industrielle, Électronique, Électrotechnique et Automatique), je me spécialise dans la conception de systèmes embarqués, le contrôle-commande et l'instrumentation industrielle. Mon parcours allie une solide formation théorique à une expérience terrain acquise lors de deux stages chez S4E SARL, où j'ai participé à des projets de mise en service haute tension et de dimensionnement électrique sur des sites industriels au Sénégal, au Mali et en Mauritanie.",
    "hero.about2": "Rigoureux, curieux et orienté résultats, je m'intéresse particulièrement aux projets concrets mêlant modélisation, simulation et prototypage — de la commande vectorielle de machines électriques à la conception de systèmes de puissance pour nanosatellites. Je maîtrise MATLAB/Simulink, LTspice, Python et les outils de CAO électronique, et je cherche à contribuer à des environnements techniques exigeants.",
    "hero.stat.licence": "Licence IEEA",
    "hero.stat.stages": "Stages terrain (S4E SARL)",
    "hero.stat.certifications": "Certifications",
    "hero.stat.projects": "Projets techniques",

    // Skills
    "skills.label": "Expertise",
    "skills.title": "Compétences Techniques",
    "skills.cat1": "Automatique & Systèmes Industriels",
    "skills.cat2": "Instrumentation & Mesures",
    "skills.cat3": "Électronique",
    "skills.cat4": "Électrotechnique",
    "skills.cat5": "Modélisation & Simulation",
    "skills.cat6": "Programmation & Logiciels",
    "skills.cat7": "IA & Productivité",
    "skills.languages": "Langues",
    "skills.lang.fr": "Français",
    "skills.lang.fr.level": "Courant / Technique",
    "skills.lang.en": "Anglais",
    "skills.lang.en.level": "Bon niveau",
    "skills.lang.wo": "Wolof",
    "skills.lang.wo.level": "Maternel",

    // Certifications
    "cert.label": "Validation",
    "cert.title": "Certifications",
    "cert.proof": "Justificatif",

    // Projects
    "proj.label": "Réalisations",
    "proj.title": "Projets",
    "proj.context": "Contexte",
    "proj.objective": "Objectif",
    "proj.contribution": "Contribution",
    "proj.results": "Résultats",
    "proj.tools": "Outils",
    "proj.status.upcoming": "À venir",
    "proj.status.progress": "En cours",
    "proj.status.completed": "Terminé",
    "proj.download": "Télécharger le rapport",
    "proj.note": "Note : Les comptes rendus des TPs d'Électrotechnique, d'Automatique et d'Informatique Industrielle ont été rédigés sur feuille et ne sont pas disponibles au format numérique.",

    // Footer
    "footer.label": "Contact",
    "footer.title": "Me Contacter",
    "footer.email": "Email",
    "footer.phone": "Téléphone",
    "footer.copyright": "© {year} Birane Diaw — Marrakech, Maroc",
  },
  en: {
    // Nav
    "nav.home": "Home",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Hero
    "hero.available": "Available for internship",
    "hero.title": "Birane Diaw",
    "hero.subtitle": "Electrical Engineering Student",
    "hero.location": "FST Marrakech — Cadi Ayyad University",
    "hero.contact": "Contact me",
    "hero.about": "About",
    "hero.about1": "Electrical Engineering student specializing in IEEA (Industrial Computing, Electronics, Electrical Engineering & Automation), I focus on embedded systems design, control engineering and industrial instrumentation. My background combines strong theoretical training with hands-on experience from two internships at S4E SARL, where I contributed to high-voltage commissioning and electrical sizing projects at industrial sites in Senegal, Mali and Mauritania.",
    "hero.about2": "Rigorous, curious and results-oriented, I am particularly interested in hands-on projects combining modeling, simulation and prototyping — from vector control of electrical machines to power system design for nanosatellites. I am proficient in MATLAB/Simulink, LTspice, Python and electronic CAD tools, and seek to contribute to demanding technical environments.",
    "hero.stat.licence": "IEEA Bachelor's",
    "hero.stat.stages": "Field internships (S4E SARL)",
    "hero.stat.certifications": "Certifications",
    "hero.stat.projects": "Technical projects",

    // Skills
    "skills.label": "Expertise",
    "skills.title": "Technical Skills",
    "skills.cat1": "Automation & Industrial Systems",
    "skills.cat2": "Instrumentation & Measurements",
    "skills.cat3": "Electronics",
    "skills.cat4": "Electrical Engineering",
    "skills.cat5": "Modeling & Simulation",
    "skills.cat6": "Programming & Software",
    "skills.cat7": "AI & Productivity",
    "skills.languages": "Languages",
    "skills.lang.fr": "French",
    "skills.lang.fr.level": "Fluent / Technical",
    "skills.lang.en": "English",
    "skills.lang.en.level": "Good level",
    "skills.lang.wo": "Wolof",
    "skills.lang.wo.level": "Native",

    // Certifications
    "cert.label": "Validation",
    "cert.title": "Certifications",
    "cert.proof": "Certificate",

    // Projects
    "proj.label": "Achievements",
    "proj.title": "Projects",
    "proj.context": "Context",
    "proj.objective": "Objective",
    "proj.contribution": "Contribution",
    "proj.results": "Results",
    "proj.tools": "Tools",
    "proj.status.upcoming": "Upcoming",
    "proj.status.progress": "In Progress",
    "proj.status.completed": "Completed",
    "proj.download": "Download report",
    "proj.note": "Note: Lab reports for Electrical Engineering, Automation and Industrial Computing were handwritten and are not available in digital format.",

    // Footer
    "footer.label": "Contact",
    "footer.title": "Get in Touch",
    "footer.email": "Email",
    "footer.phone": "Phone",
    "footer.copyright": "© {year} Birane Diaw — Marrakech, Morocco",
  },
  ar: {
    // Nav
    "nav.home": "الرئيسية",
    "nav.skills": "المهارات",
    "nav.projects": "المشاريع",
    "nav.contact": "اتصل بي",

    // Hero
    "hero.available": "متاح للتدريب",
    "hero.title": "بيران دياو",
    "hero.subtitle": "طالب في الهندسة الكهربائية",
    "hero.location": "كلية العلوم والتقنيات بمراكش — جامعة القاضي عياض",
    "hero.contact": "تواصل معي",
    "hero.about": "نبذة عني",
    "hero.about1": "طالب في الهندسة الكهربائية، تخصص IEEA (المعلوميات الصناعية، الإلكترونيات، الهندسة الكهربائية والأتمتة)، أتخصص في تصميم الأنظمة المدمجة والتحكم والقياس الصناعي. يجمع مساري بين تكوين نظري متين وخبرة ميدانية اكتسبتها خلال تدريبين في شركة S4E SARL، حيث شاركت في مشاريع تشغيل الجهد العالي والتصميم الكهربائي في مواقع صناعية بالسنغال ومالي وموريتانيا.",
    "hero.about2": "دقيق وفضولي وموجه نحو النتائج، أهتم بشكل خاص بالمشاريع العملية التي تجمع بين النمذجة والمحاكاة والنمذجة الأولية — من التحكم الشعاعي للآلات الكهربائية إلى تصميم أنظمة الطاقة للأقمار الصناعية النانوية. أتقن MATLAB/Simulink و LTspice و Python وأدوات التصميم الإلكتروني بمساعدة الحاسوب.",
    "hero.stat.licence": "إجازة IEEA",
    "hero.stat.stages": "تدريبات ميدانية (S4E SARL)",
    "hero.stat.certifications": "شهادات",
    "hero.stat.projects": "مشاريع تقنية",

    // Skills
    "skills.label": "الخبرة",
    "skills.title": "المهارات التقنية",
    "skills.cat1": "الأتمتة والأنظمة الصناعية",
    "skills.cat2": "القياس والأجهزة",
    "skills.cat3": "الإلكترونيات",
    "skills.cat4": "الهندسة الكهربائية",
    "skills.cat5": "النمذجة والمحاكاة",
    "skills.cat6": "البرمجة والبرمجيات",
    "skills.cat7": "الذكاء الاصطناعي والإنتاجية",
    "skills.languages": "اللغات",
    "skills.lang.fr": "الفرنسية",
    "skills.lang.fr.level": "طلاقة / تقني",
    "skills.lang.en": "الإنجليزية",
    "skills.lang.en.level": "مستوى جيد",
    "skills.lang.wo": "الولوف",
    "skills.lang.wo.level": "اللغة الأم",

    // Certifications
    "cert.label": "التحقق",
    "cert.title": "الشهادات",
    "cert.proof": "الشهادة",

    // Projects
    "proj.label": "الإنجازات",
    "proj.title": "المشاريع",
    "proj.context": "السياق",
    "proj.objective": "الهدف",
    "proj.contribution": "المساهمة",
    "proj.results": "النتائج",
    "proj.tools": "الأدوات",
    "proj.status.upcoming": "قريباً",
    "proj.status.progress": "قيد التنفيذ",
    "proj.status.completed": "مكتمل",
    "proj.download": "تحميل التقرير",
    "proj.note": "ملاحظة: تقارير مختبر الهندسة الكهربائية والأتمتة والمعلوميات الصناعية كُتبت يدوياً وليست متوفرة بصيغة رقمية.",

    // Footer
    "footer.label": "اتصل بي",
    "footer.title": "تواصل معي",
    "footer.email": "البريد الإلكتروني",
    "footer.phone": "الهاتف",
    "footer.copyright": "© {year} بيران دياو — مراكش، المغرب",
  },
};
