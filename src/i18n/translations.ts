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

    // Project 1 - CubeSat ADCS
    "proj.1.title": "Simulation & Contrôle d'Attitude d'un Nano-Satellite (1U)",
    "proj.1.subtitle": "Mini-Projet CubeSat — ADCS",
    "proj.1.contexte": "Dans le cadre d'un mini-projet académique autour de la technologie CubeSat, simulation du système de contrôle d'attitude (ADCS) d'un nano-satellite 1U.",
    "proj.1.objectif": "Stabiliser le satellite après déploiement (detumbling), assurer un pointage nadir, et visualiser la dynamique 6DOF en 3D.",
    "proj.1.contribution": "Modélisation complète du système ADCS, implémentation des lois de commande PID, et visualisation 3D de la dynamique orbitale.",
    "proj.1.pdfLabel": "Fiche technique",

    // Project 2 - CubeSat EPS
    "proj.2.title": "Conception PCB : Système de Gestion de Puissance (EPS)",
    "proj.2.subtitle": "Mini-Projet CubeSat — EPS",
    "proj.2.contexte": "Second volet du projet CubeSat, centré sur l'alimentation électrique embarquée au format PC/104.",
    "proj.2.objectif": "Concevoir le module EPS avec conversion Buck (3.3V/5.0V), protections électriques, et générer le dossier de fabrication Gerber.",
    "proj.2.contribution": "Schéma électrique complet sous Eeschema, routage PCB sous Pcbnew, vérification DRC/ERC, et export Gerber X2.",
    "proj.2.pdfLabel": "Fiche technique",

    // Project 3 - Conditionnement Analogique
    "proj.3.title": "Chaîne de Conditionnement Analogique",
    "proj.3.subtitle": "Capteur Piézoélectrique",
    "proj.3.contexte": "Projet de modélisation d'une chaîne de conditionnement pour capteur piézoélectrique, dans un contexte de surveillance vibratoire industrielle.",
    "proj.3.objectif": "Concevoir et simuler une chaîne complète : amplification de charge, filtrage, et mise en forme du signal vibratoire.",
    "proj.3.contribution": "Modélisation du capteur et des étages d'amplification, simulation fonctionnelle et analyse des performances.",

    // Project 4 - Énergie Houlomotrice
    "proj.4.title": "Énergie Houlomotrice",
    "proj.4.subtitle": "Conversion et Injection Réseau par Commande Vectorielle",
    "proj.4.contexte": "Projet de fin de semestre sur les énergies marines renouvelables, encadré par Pr. Moulay Rachid DOUIRI.",
    "proj.4.objectif": "Étudier et simuler un système de récupération de l'énergie des vagues avec génératrice PMSG et injection réseau via commande FOC.",
    "proj.4.contribution": "Modélisation de la chaîne complète (vagues → mécanique → PMSG → convertisseurs → réseau), implémentation de la commande vectorielle, et analyse des performances.",
    "proj.4.resultats": "Injection réseau stable avec THD < 5%, suivi de couple performant, et validation des courbes de puissance.",
    "proj.4.pdfLabel": "Télécharger le rapport",

    // Project 5 - TPs Électronique
    "proj.5.title": "TPs Électronique Analogique",
    "proj.5.subtitle": "Simulations LTSpice — Pr. Ahmad Chitnalah",
    "proj.5.contexte": "Série de 5 travaux pratiques en électronique analogique, combinant simulation et manipulation en laboratoire.",
    "proj.5.objectif": "Maîtriser le comportement des composants fondamentaux (RLC, diodes, transistors) par la simulation puis la validation expérimentale.",
    "proj.5.contribution": "Réalisation des simulations LTSpice, mesures en laboratoire, rédaction des comptes rendus avec analyse comparative simulation/expérimental.",
    "proj.5.tp1": "TP1 — Circuit RLC",
    "proj.5.tp2": "TP2 — Diodes",
    "proj.5.tp3": "TP3 — Diode Zener",
    "proj.5.tp4": "TP4 — Transistor BJT",
    "proj.5.tp5": "TP5 — JFET",

    // Project 6 - TPs Signal
    "proj.6.title": "TPs Traitement du Signal",
    "proj.6.subtitle": "Analyse spectrale & filtrage — Pr. Fouad Sefyani",
    "proj.6.contexte": "Série de 4 travaux pratiques sur les fondamentaux du traitement numérique du signal.",
    "proj.6.objectif": "Comprendre et appliquer les outils d'analyse fréquentielle, la transformée de Fourier et les techniques de filtrage numérique.",
    "proj.6.contribution": "Implémentation MATLAB des algorithmes FFT, conception de filtres numériques, analyse spectrale de signaux réels, et rédaction des rapports.",
    "proj.6.tp1": "TP1 — Introduction",
    "proj.6.tp2": "TP2 — Analyse fréquentielle",
    "proj.6.tp3": "TP3 — Filtrage",
    "proj.6.tp4": "TP4 — Applications",

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

    // Project 1 - CubeSat ADCS
    "proj.1.title": "Nano-Satellite (1U) Attitude Control & Simulation",
    "proj.1.subtitle": "CubeSat Mini-Project — ADCS",
    "proj.1.contexte": "As part of an academic mini-project on CubeSat technology, simulation of the attitude determination and control system (ADCS) of a 1U nanosatellite.",
    "proj.1.objectif": "Stabilize the satellite after deployment (detumbling), ensure nadir pointing, and visualize 6DOF dynamics in 3D.",
    "proj.1.contribution": "Complete ADCS system modeling, PID control law implementation, and 3D visualization of orbital dynamics.",
    "proj.1.pdfLabel": "Technical sheet",

    // Project 2 - CubeSat EPS
    "proj.2.title": "PCB Design: Electrical Power System (EPS)",
    "proj.2.subtitle": "CubeSat Mini-Project — EPS",
    "proj.2.contexte": "Second part of the CubeSat project, focused on the onboard power supply in PC/104 format.",
    "proj.2.objectif": "Design the EPS module with Buck conversion (3.3V/5.0V), electrical protections, and generate the Gerber manufacturing files.",
    "proj.2.contribution": "Complete electrical schematic in Eeschema, PCB routing in Pcbnew, DRC/ERC verification, and Gerber X2 export.",
    "proj.2.pdfLabel": "Technical sheet",

    // Project 3 - Analog Conditioning
    "proj.3.title": "Analog Signal Conditioning Chain",
    "proj.3.subtitle": "Piezoelectric Sensor",
    "proj.3.contexte": "Modeling project of a conditioning chain for a piezoelectric sensor, in an industrial vibration monitoring context.",
    "proj.3.objectif": "Design and simulate a complete chain: charge amplification, filtering, and vibration signal shaping.",
    "proj.3.contribution": "Sensor and amplification stage modeling, functional simulation and performance analysis.",

    // Project 4 - Wave Energy
    "proj.4.title": "Wave Energy",
    "proj.4.subtitle": "Grid Injection via Field-Oriented Control",
    "proj.4.contexte": "End-of-semester project on marine renewable energies, supervised by Prof. Moulay Rachid DOUIRI.",
    "proj.4.objectif": "Study and simulate a wave energy harvesting system with PMSG generator and grid injection via FOC control.",
    "proj.4.contribution": "Complete chain modeling (waves → mechanics → PMSG → converters → grid), vector control implementation, and performance analysis.",
    "proj.4.resultats": "Stable grid injection with THD < 5%, efficient torque tracking, and power curve validation.",
    "proj.4.pdfLabel": "Download report",

    // Project 5 - Analog Electronics Labs
    "proj.5.title": "Analog Electronics Labs",
    "proj.5.subtitle": "LTSpice Simulations — Prof. Ahmad Chitnalah",
    "proj.5.contexte": "Series of 5 lab sessions in analog electronics, combining simulation and hands-on laboratory work.",
    "proj.5.objectif": "Master the behavior of fundamental components (RLC, diodes, transistors) through simulation and experimental validation.",
    "proj.5.contribution": "LTSpice simulations, laboratory measurements, lab report writing with comparative simulation/experimental analysis.",
    "proj.5.tp1": "Lab 1 — RLC Circuit",
    "proj.5.tp2": "Lab 2 — Diodes",
    "proj.5.tp3": "Lab 3 — Zener Diode",
    "proj.5.tp4": "Lab 4 — BJT Transistor",
    "proj.5.tp5": "Lab 5 — JFET",

    // Project 6 - Signal Processing Labs
    "proj.6.title": "Signal Processing Labs",
    "proj.6.subtitle": "Spectral Analysis & Filtering — Prof. Fouad Sefyani",
    "proj.6.contexte": "Series of 4 lab sessions on digital signal processing fundamentals.",
    "proj.6.objectif": "Understand and apply frequency analysis tools, Fourier transform and digital filtering techniques.",
    "proj.6.contribution": "MATLAB implementation of FFT algorithms, digital filter design, spectral analysis of real signals, and report writing.",
    "proj.6.tp1": "Lab 1 — Introduction",
    "proj.6.tp2": "Lab 2 — Frequency Analysis",
    "proj.6.tp3": "Lab 3 — Filtering",
    "proj.6.tp4": "Lab 4 — Applications",

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

    // Project 1 - CubeSat ADCS
    "proj.1.title": "محاكاة والتحكم في توجيه قمر صناعي نانوي (1U)",
    "proj.1.subtitle": "مشروع مصغر CubeSat — ADCS",
    "proj.1.contexte": "في إطار مشروع أكاديمي مصغر حول تقنية CubeSat، محاكاة نظام تحديد والتحكم في التوجيه (ADCS) لقمر صناعي نانوي 1U.",
    "proj.1.objectif": "تثبيت القمر الصناعي بعد الإطلاق (detumbling)، ضمان التوجيه نحو الأرض، وتصور ديناميكية 6DOF ثلاثية الأبعاد.",
    "proj.1.contribution": "نمذجة كاملة لنظام ADCS، تنفيذ قوانين التحكم PID، وتصور ثلاثي الأبعاد للديناميكية المدارية.",
    "proj.1.pdfLabel": "الورقة التقنية",

    // Project 2 - CubeSat EPS
    "proj.2.title": "تصميم PCB: نظام إدارة الطاقة الكهربائية (EPS)",
    "proj.2.subtitle": "مشروع مصغر CubeSat — EPS",
    "proj.2.contexte": "الجزء الثاني من مشروع CubeSat، يركز على التغذية الكهربائية المدمجة بتنسيق PC/104.",
    "proj.2.objectif": "تصميم وحدة EPS مع تحويل Buck (3.3V/5.0V)، حمايات كهربائية، وإنشاء ملفات تصنيع Gerber.",
    "proj.2.contribution": "مخطط كهربائي كامل في Eeschema، توجيه PCB في Pcbnew، التحقق DRC/ERC، وتصدير Gerber X2.",
    "proj.2.pdfLabel": "الورقة التقنية",

    // Project 3 - Analog Conditioning
    "proj.3.title": "سلسلة تكييف الإشارة التناظرية",
    "proj.3.subtitle": "مستشعر كهرضغطي",
    "proj.3.contexte": "مشروع نمذجة سلسلة تكييف لمستشعر كهرضغطي في سياق مراقبة الاهتزازات الصناعية.",
    "proj.3.objectif": "تصميم ومحاكاة سلسلة كاملة: تضخيم الشحنة، الترشيح، وتشكيل إشارة الاهتزاز.",
    "proj.3.contribution": "نمذجة المستشعر ومراحل التضخيم، محاكاة وظيفية وتحليل الأداء.",

    // Project 4 - Wave Energy
    "proj.4.title": "طاقة الأمواج",
    "proj.4.subtitle": "الحقن في الشبكة عبر التحكم الشعاعي",
    "proj.4.contexte": "مشروع نهاية الفصل حول الطاقات البحرية المتجددة، تحت إشراف الأستاذ مولاي رشيد الدويري.",
    "proj.4.objectif": "دراسة ومحاكاة نظام استرجاع طاقة الأمواج مع مولد PMSG وحقن في الشبكة عبر التحكم FOC.",
    "proj.4.contribution": "نمذجة السلسلة الكاملة (أمواج ← ميكانيك ← PMSG ← محولات ← شبكة)، تنفيذ التحكم الشعاعي، وتحليل الأداء.",
    "proj.4.resultats": "حقن مستقر في الشبكة مع THD أقل من 5%، تتبع عزم دوران فعال، والتحقق من منحنيات القدرة.",
    "proj.4.pdfLabel": "تحميل التقرير",

    // Project 5 - Analog Electronics Labs
    "proj.5.title": "أعمال تطبيقية في الإلكترونيات التناظرية",
    "proj.5.subtitle": "محاكاة LTSpice — الأستاذ أحمد شتنالح",
    "proj.5.contexte": "سلسلة من 5 أعمال تطبيقية في الإلكترونيات التناظرية، تجمع بين المحاكاة والعمل المخبري.",
    "proj.5.objectif": "إتقان سلوك المكونات الأساسية (RLC، الصمامات الثنائية، الترانزستورات) عبر المحاكاة والتحقق التجريبي.",
    "proj.5.contribution": "إنجاز محاكاة LTSpice، قياسات مخبرية، كتابة التقارير مع تحليل مقارن بين المحاكاة والتجربة.",
    "proj.5.tp1": "TP1 — دارة RLC",
    "proj.5.tp2": "TP2 — الصمامات الثنائية",
    "proj.5.tp3": "TP3 — صمام زينر",
    "proj.5.tp4": "TP4 — ترانزستور BJT",
    "proj.5.tp5": "TP5 — JFET",

    // Project 6 - Signal Processing Labs
    "proj.6.title": "أعمال تطبيقية في معالجة الإشارة",
    "proj.6.subtitle": "التحليل الطيفي والترشيح — الأستاذ فؤاد السفياني",
    "proj.6.contexte": "سلسلة من 4 أعمال تطبيقية حول أساسيات معالجة الإشارة الرقمية.",
    "proj.6.objectif": "فهم وتطبيق أدوات التحليل الترددي، تحويل فورييه وتقنيات الترشيح الرقمي.",
    "proj.6.contribution": "تنفيذ خوارزميات FFT في MATLAB، تصميم مرشحات رقمية، تحليل طيفي لإشارات حقيقية، وكتابة التقارير.",
    "proj.6.tp1": "TP1 — مقدمة",
    "proj.6.tp2": "TP2 — التحليل الترددي",
    "proj.6.tp3": "TP3 — الترشيح",
    "proj.6.tp4": "TP4 — التطبيقات",

    // Footer
    "footer.label": "اتصل بي",
    "footer.title": "تواصل معي",
    "footer.email": "البريد الإلكتروني",
    "footer.phone": "الهاتف",
    "footer.copyright": "© {year} بيران دياو — مراكش، المغرب",
  },
};
