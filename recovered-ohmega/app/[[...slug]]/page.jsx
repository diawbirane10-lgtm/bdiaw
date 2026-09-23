"use client";
import {useEffect,useMemo,useState} from "react";
import {usePathname} from "next/navigation";
import EventsSection from "../EventsSection";

const github="https://github.com/diawbirane10-lgtm";
const linkedin="https://www.linkedin.com/in/birane-diaw-b83b47374";
const x="https://x.com/epsilonp0";
const mail="mailto:diawbirane10@gmail.com";
const juri="https://www.journalssystem.com/juri/";
const orcid="https://orcid.org/0009-0003-4015-7854";

const schoolLinks={
  emsi:"https://emsi.ma/",
  fst:"https://www.fstg-marrakech.ac.ma/",
  csmh:"https://www.mariste.sn/"
};

const logos={
  juri:"https://www.journalssystem.com/juri/_static/juri-head5.jpg",
  emsi:"https://emsi.ma/wp-content/uploads/2024/03/logo-vert.png",
  fst:"https://stagiairesdocs.s3.eu-west-3.amazonaws.com/wp-content/uploads/2024/02/09171154/FST-MARRAKECH-900x420-1.png",
  csmh:"https://static.wixstatic.com/media/4756a4_faa0a0d9af674babb0e0633405535241~mv2.png"
};

const experienceLogos={
  s4e:"/brand-s4e.svg",
  menara:"/brand-menara.svg"
};

const softwareGroups=[
  {
    key:"engineering",
    title:{en:"Core Engineering",fr:"Ingénierie — logiciels principaux"},
    items:[
      {name:"MathWorks MATLAB & Simulink",logo:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Matlab_icon.png"},
      {name:"DIgSILENT PowerFactory",logo:"https://appsforbtc.com/wp-content/uploads/2018/02/DIgSILENT-Logo_InDesign2_transparent.png"},
      {name:"Siemens TIA Portal",logo:"https://cdn.simpleicons.org/siemens/009999",fit:"wide"},
      {name:"Factory I/O",logo:"https://edu4industry.com/wp-content/uploads/2020/10/Factory-I_O-.png"},
      {name:"OpenPLC Editor",logo:"https://i0.wp.com/www.moreware.org/wp/wp-content/uploads/2022/12/openplc-editor-runtime-logo-v2.jpg?ssl=1&w=500",fit:"boost"},
      {name:"CODESYS",logo:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Codesys_Logo.svg"},
      {name:"Autodesk AutoCAD Electrical",logo:"https://cdn.simpleicons.org/autocad/E51050",fit:"boost"},
      {name:"Autodesk Fusion",logo:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Fusion360_Logo.svg",fit:"boost"},
      {name:"KiCad",logo:"https://commons.wikimedia.org/wiki/Special:Redirect/file/KiCad_logo_square.svg"}
    ]
  },
  {
    key:"work",
    title:{en:"Work Tools",fr:"Outils de travail"},
    items:[
      {name:"Microsoft Word",logo:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Microsoft_Office_Word_(2025%E2%80%93present).svg"},
      {name:"Microsoft Excel",logo:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Microsoft_Office_Excel_(2025%E2%80%93present).svg"},
      {name:"Microsoft Access",logo:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Microsoft_Office_Access_(2025-present).svg"},
      {name:"Microsoft PowerPoint",logo:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Microsoft_Office_PowerPoint_(2025%E2%80%93present).svg"},
      {name:"Visual Studio Code",logo:"https://code.visualstudio.com/assets/branding/code-stable.png",fit:"boost"}
    ]
  }
];


const projects=[
{no:"01",slug:"ufls-smartgrid",field:{en:"Power systems · protection logic",fr:"Réseaux électriques · protection"},title:"Smart-Grid UFLS Relay — ONEE & SENELEC",image:"https://d2ol7oe51mr4n9.cloudfront.net/user_3IntLmDThKw8IJ84Ymo2nubJp2q/a3ae89e8-81d2-48a8-95af-29cb064f6f51.png",visualNote:{en:"The illustration follows a frequency event from detection to selective load shedding: as system frequency crosses predefined thresholds, non-critical feeders are disconnected in stages while essential demand is preserved, giving generation and load time to rebalance.",fr:"L’illustration suit un incident de fréquence depuis sa détection jusqu’au délestage sélectif : lorsque la fréquence franchit les seuils définis, les départs non critiques sont déconnectés par étapes tandis que les charges essentielles restent alimentées, afin de laisser au système le temps de retrouver l’équilibre."},body:{en:"UFLS relay model for two grid contexts, with a six-state Stateflow automaton for staged shedding, restoration and validation.",fr:"Modèle de relais UFLS pour deux contextes de réseau, avec un automate Stateflow à six états pour le délestage, la restauration et la validation."},problem:{en:"Frequency events require protection logic that reacts quickly without hiding the assumptions behind each threshold.",fr:"Les événements de fréquence exigent une logique de protection rapide, sans masquer les hypothèses derrière chaque seuil."},solution:{en:"A staged UFLS controller with explicit states, thresholds and restoration rules.",fr:"Un contrôleur UFLS par paliers, avec états, seuils et règles de restauration explicitement définis."},steps:{en:["Define grid assumptions and frequency thresholds.","Build the Stateflow state machine.","Run disturbance scenarios.","Check staged shedding and restoration behaviour."],fr:["Définir les hypothèses réseau et les seuils de fréquence.","Construire l’automate Stateflow.","Tester les scénarios de perturbation.","Vérifier le délestage par paliers et la restauration."]},discussion:{en:"The value of the model is traceability: when the relay acts, why it acts, and how the grid returns toward normal operation remain visible.",fr:"La valeur du modèle est la traçabilité : quand le relais agit, pourquoi il agit et comment le réseau revient vers un fonctionnement normal."},links:[["GitHub","https://github.com/diawbirane10-lgtm/ufls-smartgrid-onee-senelec"],["Report EN","https://raw.githubusercontent.com/diawbirane10-lgtm/bdiaw/main/public/documents/ufls_smartgrid_project_report_EN.pdf"],["Rapport FR","https://raw.githubusercontent.com/diawbirane10-lgtm/bdiaw/main/public/documents/rapport_projet_ufls_smartgrid_FR.pdf"]]},
{no:"02",slug:"wave-energy-conversion",field:{en:"Renewable energy · machine control",fr:"Énergie renouvelable · commande"},title:"Wave-Energy Conversion Chain — FOC & Grid Injection",image:"https://d2ol7oe51mr4n9.cloudfront.net/user_3IntLmDThKw8IJ84Ymo2nubJp2q/7b8ee7bc-d56d-4a0e-a437-92ad584294e3.png",visualNote:{en:"The visual reads the model as an energy path: wave motion is converted into mechanical rotation, the PMSG produces variable electrical power, and the power-electronic stages condition that power before a synchronized grid-side converter delivers it to the network.",fr:"Le visuel présente le modèle comme une chaîne énergétique : le mouvement des vagues devient une rotation mécanique, la GSAP produit une puissance électrique variable, puis les convertisseurs la conditionnent et la régulent avant l’injection synchronisée au réseau."},body:{en:"Simulation of a wave-energy conversion chain using a PMSG, field-oriented control and grid-side injection.",fr:"Simulation d’une chaîne houlomotrice avec GSAP, commande vectorielle et injection côté réseau."},problem:{en:"Wave input is variable; the electrical chain must regulate power without pretending the source is stable.",fr:"L’entrée houlomotrice est variable ; la chaîne électrique doit réguler la puissance sans faire comme si la source était stable."},solution:{en:"A PMSG conversion model with field-oriented control and grid-injection logic.",fr:"Un modèle de conversion par GSAP avec commande vectorielle et logique d’injection réseau."},steps:{en:["Model the mechanical-to-electrical conversion chain.","Set the machine-control assumptions.","Connect the control loop to the grid-side stage.","Discuss the limits of the simulation."],fr:["Modéliser la chaîne de conversion mécanique-électrique.","Définir les hypothèses de commande machine.","Relier la boucle de commande à l’étage côté réseau.","Discuter les limites de la simulation."]},discussion:{en:"The project connects renewable-energy modelling with machine-control practice and shows where variability enters the system.",fr:"Le projet relie la modélisation d’énergie renouvelable à la commande de machine et montre où la variabilité entre dans le système."},links:[["Project report","https://raw.githubusercontent.com/diawbirane10-lgtm/bdiaw/main/public/documents/projet-houlomotrice.pdf"]]},
{no:"03",slug:"railway-traction-25kv",field:{en:"Railway electrification · energy recovery",fr:"Électrification ferroviaire · énergie"},title:"25 kV AC Railway Traction System",image:"https://d2ol7oe51mr4n9.cloudfront.net/user_3IntLmDThKw8IJ84Ymo2nubJp2q/50adc716-e56b-461e-921d-3e6e68357e46.png",visualNote:{en:"This view focuses on the braking phase: the traction machine reverses its energy flow, the converter conditions the recovered electrical power, and the traction network can absorb it instead of dissipating the train’s kinetic energy entirely as heat.",fr:"Cette vue se concentre sur la phase de freinage : la machine de traction inverse le flux d’énergie, le convertisseur conditionne la puissance électrique récupérée et le réseau de traction peut l’absorber au lieu de dissiper toute l’énergie cinétique du train sous forme de chaleur."},body:{en:"Traction-chain model linking 25 kV AC supply assumptions, train dynamics, catenary behaviour, converter control and regenerative braking.",fr:"Modèle de chaîne de traction reliant alimentation 25 kV AC, dynamique du train, caténaire, convertisseur et freinage régénératif."},problem:{en:"Traction systems mix infrastructure, converters and moving loads; treating them separately hides system behaviour.",fr:"Les systèmes de traction combinent infrastructure, convertisseurs et charges mobiles ; les isoler masque le comportement global."},solution:{en:"A full-chain model connecting supply assumptions, train dynamics and energy recovery.",fr:"Un modèle de chaîne complète reliant hypothèses d’alimentation, dynamique du train et récupération d’énergie."},steps:{en:["Define the 25 kV AC supply context.","Model the traction demand.","Represent converter and catenary constraints.","Analyse regenerative-braking contribution."],fr:["Définir le contexte d’alimentation 25 kV AC.","Modéliser la demande de traction.","Représenter les contraintes convertisseur et caténaire.","Analyser l’apport du freinage régénératif."]},discussion:{en:"The case shows where energy moves, where constraints appear and what regenerative braking adds to the system.",fr:"Le cas montre où circule l’énergie, où apparaissent les contraintes et ce que le freinage régénératif apporte au système."},links:[["Report EN","https://raw.githubusercontent.com/diawbirane10-lgtm/bdiaw/main/public/documents/railway_traction_project_report_EN.pdf"],["Rapport FR","https://raw.githubusercontent.com/diawbirane10-lgtm/bdiaw/main/public/documents/rapport_projet_traction_FR.pdf"]]},
{no:"04",slug:"digital-twin-liion-battery",field:{en:"Battery systems · engineering software",fr:"Batteries · logiciel"},title:"Digital Twin — Li-ion Battery Packs",image:"https://d2ol7oe51mr4n9.cloudfront.net/user_3IntLmDThKw8IJ84Ymo2nubJp2q/0eae7118-aa48-4196-b5b3-169d2e3bc94f.png",visualNote:{en:"The illustration maps the software observables around the pack—voltage, current and temperature—to the internal quantities the twin is meant to expose, such as state of charge, health indicators and thermal evolution. It is a conceptual view of the model and monitoring layer, not a photograph of deployed BMS hardware.",fr:"L’illustration relie les grandeurs observables du pack — tension, courant et température — aux états internes que le jumeau numérique cherche à rendre visibles, comme le SOC, les indicateurs de santé et l’évolution thermique. Il s’agit d’une vue conceptuelle du modèle et de la supervision, et non d’une photographie d’un BMS déployé."},body:{en:"Battery-pack digital twin around a Thevenin 2RC model, SOC, SOH/RUL, thermal behaviour and a lightweight app layer.",fr:"Jumeau numérique batterie avec modèle Thevenin 2RC, SOC, SOH/RUL, thermique et couche applicative légère."},problem:{en:"A battery pack cannot be understood only through voltage; internal state, degradation and temperature need to be visible.",fr:"Un pack batterie ne se comprend pas seulement par la tension ; l’état interne, la dégradation et la température doivent être visibles."},solution:{en:"A digital twin combining equivalent-circuit modelling, state estimation, degradation indicators and thermal behaviour.",fr:"Un jumeau numérique combinant modèle circuit équivalent, estimation d’état, indicateurs de dégradation et comportement thermique."},steps:{en:["Implement the Thevenin 2RC representation.","Estimate SOC and track health indicators.","Add thermal behaviour.","Expose scenarios through a lightweight interface."],fr:["Implémenter la représentation Thevenin 2RC.","Estimer le SOC et suivre les indicateurs de santé.","Ajouter le comportement thermique.","Exposer les scénarios dans une interface légère."]},discussion:{en:"The value is inspection: comparing scenarios and making battery behaviour easier to explain.",fr:"La valeur est l’inspection : comparer des scénarios et rendre le comportement batterie plus explicable."},links:[["GitHub","https://github.com/diawbirane10-lgtm/Digital_Twin_Li-ion_Batt_Packs"],["Live app","https://digitwinbattpacks1.streamlit.app/"],["Report","https://raw.githubusercontent.com/diawbirane10-lgtm/bdiaw/main/public/documents/Rapport_Digital_Twin_LiIon.pdf"]]},
{no:"05",slug:"digital-twin-electric-drive",field:{en:"Electric drives · control",fr:"Entraînements électriques · commande"},title:"Digital Twin — Variable-Speed Electric Drive",image:"https://d2ol7oe51mr4n9.cloudfront.net/user_3IntLmDThKw8IJ84Ymo2nubJp2q/235e835d-1cc3-4ccd-820a-aff5a6df4e10.png",visualNote:{en:"The illustration separates the simulated drive from its digital representation: electrical and mechanical states are propagated through the model while the cascade PI loops shape current and speed response. The project is simulation-first, so the physical bench shown here is illustrative rather than a claim of real-time hardware deployment.",fr:"L’illustration distingue l’entraînement représenté de son modèle numérique : les états électriques et mécaniques évoluent dans la simulation tandis que les boucles PI en cascade façonnent les réponses de courant et de vitesse. Le projet étant avant tout simulé, le banc représenté est illustratif et ne constitue pas une revendication de déploiement matériel temps réel."},body:{en:"Electric-drive digital twin using state-space modelling, numerical integration, H-bridge representation, cascade PI control and signal analysis.",fr:"Jumeau numérique d’un entraînement électrique avec modèle d’état, intégration numérique, pont en H, PI en cascade et analyse de signal."},problem:{en:"A drive model is useful only when the machine, converter and controller can be inspected together.",fr:"Un modèle d’entraînement n’est utile que si la machine, le convertisseur et le contrôleur peuvent être inspectés ensemble."},solution:{en:"A compact simulation chain connecting the model, converter representation and cascade PI control.",fr:"Une chaîne de simulation compacte reliant le modèle, la représentation du convertisseur et la commande PI en cascade."},steps:{en:["Build the state-space model.","Represent the H-bridge stage.","Tune the cascade PI control.","Analyse the simulated response."],fr:["Construire le modèle d’état.","Représenter l’étage pont en H.","Régler la commande PI en cascade.","Analyser la réponse simulée."]},discussion:{en:"The project keeps the control action understandable from assumptions to simulated response.",fr:"Le projet garde l’action de commande compréhensible depuis les hypothèses jusqu’à la réponse simulée."},links:[["GitHub","https://github.com/diawbirane10-lgtm/digital-twin-motor"],["Report","https://raw.githubusercontent.com/diawbirane10-lgtm/bdiaw/main/public/documents/Digital_Twin_complet-report.pdf"]]}];

const projectTags={
  "ufls-smartgrid":{
    skills:{en:["Power systems","UFLS","Protection logic"],fr:["Réseaux électriques","UFLS","Logique de protection"]},
    tools:["MATLAB","Simulink","Stateflow"],
    standards:["IEC 61850"]
  },
  "wave-energy-conversion":{
    skills:{en:["Renewable energy","PMSG / FOC","Grid injection"],fr:["Énergie renouvelable","GSAP / FOC","Injection réseau"]},
    tools:["MATLAB","Simulink","Simscape Electrical"],
    standards:["IEC 61000"]
  },
  "railway-traction-25kv":{
    skills:{en:["Railway traction","25 kV AC","Regenerative braking"],fr:["Traction ferroviaire","25 kV AC","Freinage régénératif"]},
    tools:["MATLAB","Simulink","Simscape Electrical"],
    standards:["IEC 61000"]
  },
  "digital-twin-liion-battery":{
    skills:{en:["Digital twin","ECM 2RC / EKF","BMS"],fr:["Jumeau numérique","ECM 2RC / EKF","BMS"]},
    tools:["Python","Streamlit","FastAPI"]
  },
  "digital-twin-electric-drive":{
    skills:{en:["Electric drives","State-space","Cascade PI / PWM"],fr:["Entraînements électriques","Espace d’état","PI en cascade / MLI"]},
    tools:["Python","NumPy / SciPy","Matplotlib"]
  }
};

const copy={en:{lang:"FR",title:"Birane Idriss DIAW",subtitle:"State Engineering Student — Electrical Engineering & Intelligent Systems.",intro:"Focused on high-power electrical systems, power systems, power electronics and critical electrical architectures. I work through modelling, simulation and system-level engineering, with particular interests in grid stability, HVDC / HVAC, grid-forming technologies and advanced electrical energy systems.",nav:["Profile","Work","Research","Experience","Tools","Contact"],research:{eyebrow:"Research",heading:"Accepted manuscript",summary:"This paper studies how grid-forming virtual synchronous machine control, supported by DC-coupled battery storage, can improve frequency stability in a renewable multi-terminal VSC-HVDC system. It connects converter behaviour, storage response and disturbance scenarios while keeping the control assumptions explicit.",meta:"Journal of Undergraduate Research International, KFUPM · JURI-00314-2026-02 · DOI forthcoming",link:"Journal website"},projects:{eyebrow:"Selected projects",heading:"Five selected engineering projects",open:"Open case study",more:"More projects",moreBody:"Additional prototypes and code repositories are available on GitHub.",github:"Open GitHub"},experience:{heading:"Engineering internships & field work",items:[["Final-Year Project Intern — Industrial Automation","Menara Préfa · Marrakech, Morocco","Apr — Jun 2026","Designed an intelligent AS/RS concept for automated mold changes on the QUADRA 10 press, with GRAFCET sequencing, RFID identification, PLC/HMI integration and simulation.","TIA Portal · GRAFCET · RFID · PLCSIM · Factory I/O","menara","IEC 61131-3 · IEC 60204-1 · ISO 12100"],["Intern — Engineering Office & Works Supervision","S4E SARL · Dakar, Senegal","Jul — Aug 2024","Contributed to an EDG tender file, LV sizing with Camelia, AutoCAD drawing updates, and field commissioning of a 225 kV / 20 MVA transformer at Manantali.","AutoCAD · Camelia · 225 kV · Commissioning","s4e"],["High-Voltage Engineering Intern","S4E SARL · Dakar, Senegal","Jul — Aug 2023","Observed and documented HV-substation operations, updated single-line diagrams and applied HSE procedures during field visits in Senegal, Mali and Mauritania.","HV substations · Single-line diagrams · HSE","s4e","IEC 61850"]]},path:{eyebrow:"Academic path",heading:"Engineering education",site:"School website",items:[["State Engineering Student — Electrical Engineering & Intelligent Systems","EMSI Rabat","Oct 2026 — Jun 2028","Engineering cycle focused on electrical engineering, intelligent systems and industrial technologies. The path connects power systems, smart grids, automation, supervision, embedded systems and applied engineering projects.",logos.emsi,schoolLinks.emsi],["Bachelor in Science and Techniques — Industrial Computing, Electronics, Electrical Engineering and Automation (IEEA)","FST Marrakech · Université Cadi Ayyad","Oct 2022 — Jun 2026","Four-year path combining a common scientific core in mathematics, computer science, physics and chemistry, followed by applied mathematics and a final-year reorientation toward electrical engineering. The degree now bridges modelling, industrial computing, electronics, electrotechnics and automatic control.",logos.fst,schoolLinks.fst],["Baccalauréat S2, Experimental Sciences","Cours Sainte Marie de Hann, Dakar","Jul 2022","Senegalese scientific track centred on experimental sciences, physics and mathematics. It built the base for scientific reasoning, observation, quantitative analysis and the transition toward engineering studies.",logos.csmh,schoolLinks.csmh]]},skills:{eyebrow:"Skills",heading:"Tools and methods",groups:[["Power systems, power electronics & smart grids","Smart grids · UFLS · VSC-HVDC · Grid-forming control · Virtual Synchronous Machine (VSM) · Droop control · Newton-Raphson power flow · PV conversion · Railway traction · Wave energy · Battery systems · Electric drives"],["Control & simulation","MATLAB/Simulink · Simscape Electrical · Stateflow · Clarke transform · Park transform · dq control · FOC · PLL / SRF-PLL · PID · MPC · Numerical simulation"],["Industrial automation & SCADA","Siemens TIA Portal · Siemens PLCs · CODESYS 3.5 · GRAFCET · OpenPLC · SCADA concepts"],["Embedded & electronics","KiCad · PCB design · ESP32 · C/C++ basics · Sensors · Telemetry · RF concepts"],["Engineering software","Python · FastAPI · Streamlit · CustomTkinter · Git/GitHub · Data processing · Technical documentation"],["Standards & industrial practices","IEC 61131-3 · IEC 60204-1 · IEC 61508 · IEC 62443 · IEC 61850 · IEC 61000 · ISO 12100 · ISO 13849-1 · ISA-101 · ISA-95 / IEC 62264"]]},contact:{heading:"Systems should remain understandable when they become complex.",body:"For internships, engineering collaboration or research discussions, email is the simplest entry point."},detail:["Back to portfolio","Problem","Solution","Build path","Discussion","Reports and links"]},fr:{lang:"EN",title:"Birane Idriss DIAW",subtitle:"Élève ingénieur d\'État — Génie électrique & systèmes intelligents.",intro:"Je me concentre sur les systèmes électriques de forte puissance, les réseaux électriques, l’électronique de puissance et les architectures électriques critiques. Mon travail s’appuie sur la modélisation, la simulation et l’ingénierie système, avec un intérêt particulier pour la stabilité des réseaux, le HVDC / HVAC, les technologies grid-forming et les systèmes électriques avancés.",nav:["Profil","Projets","Recherche","Expérience","Outils","Contact"],research:{eyebrow:"Recherche",heading:"Manuscrit accepté",summary:"Cet article étudie comment une commande grid-forming de type machine synchrone virtuelle, appuyée par un stockage batterie couplé côté DC, peut améliorer la stabilité fréquentielle d’un système VSC-HVDC multi-terminal à forte part renouvelable. Il relie le comportement des convertisseurs, la réponse du stockage et les scénarios de perturbation, avec des hypothèses de commande explicites.",meta:"Journal of Undergraduate Research International, KFUPM · JURI-00314-2026-02 · DOI à venir",link:"Site du journal"},projects:{eyebrow:"Projets sélectionnés",heading:"Cinq projets d’ingénierie sélectionnés",open:"Ouvrir la fiche projet",more:"Autres projets",moreBody:"D’autres prototypes et dépôts de code sont disponibles sur GitHub.",github:"Ouvrir GitHub"},experience:{heading:"Stages & expérience terrain",items:[["Stagiaire PFE — Maintenance & automatismes industriels","Menara Préfa · Marrakech, Maroc","Avr. — Juin 2026","Conception d’un concept AS/RS intelligent pour automatiser le changement de moules sur la presse QUADRA 10, avec séquencement GRAFCET, identification RFID, intégration automate/IHM et simulation.","TIA Portal · GRAFCET · RFID · PLCSIM · Factory I/O","menara","IEC 61131-3 · IEC 60204-1 · ISO 12100"],["Stagiaire — Bureau d’études et suivi de travaux","S4E SARL · Dakar, Sénégal","Juil. — Août 2024","Participation à un dossier d’appel d’offres EDG, dimensionnement BT avec Camelia, mise à jour de plans AutoCAD et mise en service terrain d’un transformateur 225 kV / 20 MVA à Manantali.","AutoCAD · Camelia · 225 kV · Mise en service","s4e"],["Stagiaire — Haute tension","S4E SARL · Dakar, Sénégal","Juil. — Août 2023","Observation et documentation d’installations HT, mise à jour de schémas unifilaires et application des procédures HSE lors de visites terrain au Sénégal, au Mali et en Mauritanie.","Postes HT · Schémas unifilaires · HSE","s4e","IEC 61850"]]},path:{eyebrow:"Parcours académique",heading:"Formation d’ingénieur",site:"Site de l’école",items:[["Élève ingénieur d\'État — Génie électrique & systèmes intelligents","EMSI Rabat","Oct. 2026 — Juin 2028","Cycle ingénieur orienté vers le génie électrique, les systèmes intelligents et les technologies industrielles. Le parcours relie réseaux électriques, smart grids, automatisation, supervision, systèmes embarqués et projets d’ingénierie appliquée.",logos.emsi,schoolLinks.emsi],["Bachelor en sciences et techniques — IEEA : informatique industrielle, électronique, électrotechnique et automatique","FST Marrakech · Université Cadi Ayyad","Oct. 2022 — Juin 2026","Parcours de quatre ans avec un cycle commun en mathématiques, informatique, physique et chimie, puis une spécialisation en mathématiques appliquées et une réorientation en dernière année vers le génie électrique. La formation relie aujourd’hui modélisation, informatique industrielle, électronique, électrotechnique et automatique.",logos.fst,schoolLinks.fst],["Baccalauréat S2, Sciences expérimentales","Cours Sainte Marie de Hann, Dakar","Juil. 2022","Série scientifique sénégalaise centrée sur les sciences expérimentales, les sciences physiques et les mathématiques. Elle a posé les bases du raisonnement scientifique, de l’observation, de l’analyse quantitative et du passage vers les études d’ingénierie.",logos.csmh,schoolLinks.csmh]]},skills:{eyebrow:"Compétences",heading:"Outils et méthodes",groups:[["Réseaux électriques, électronique de puissance & smart grids","Smart grids · UFLS · VSC-HVDC · Commande grid-forming · Machine synchrone virtuelle (VSM) · Commande droop · Calcul de flux Newton-Raphson · Conversion photovoltaïque · Traction ferroviaire · Énergie houlomotrice · Systèmes de batteries · Entraînements électriques"],["Commande & simulation","MATLAB/Simulink · Simscape Electrical · Stateflow · Transformée de Clarke · Transformée de Park · Commande dq · FOC · PLL / SRF-PLL · PID · MPC · Simulation numérique"],["Automatisation industrielle & SCADA","Siemens TIA Portal · Automates Siemens · CODESYS 3.5 · GRAFCET · OpenPLC · Concepts SCADA"],["Systèmes embarqués & électronique","KiCad · Conception de PCB · ESP32 · Bases C/C++ · Capteurs · Télémétrie · Concepts RF"],["Logiciels d’ingénierie","Python · FastAPI · Streamlit · CustomTkinter · Git/GitHub · Traitement de données · Documentation technique"],["Normes & pratiques industrielles","IEC 61131-3 · IEC 60204-1 · IEC 61508 · IEC 62443 · IEC 61850 · IEC 61000 · ISO 12100 · ISO 13849-1 · ISA-101 · ISA-95 / IEC 62264"]]},contact:{heading:"Les systèmes doivent rester compréhensibles même quand ils deviennent complexes.",body:"Pour un stage, une collaboration technique ou une discussion de recherche, l’email reste le point d’entrée le plus simple."},detail:["Retour au portfolio","Problème","Solution","Étapes","Discussion","Rapports et liens"]}};

function resourceLabel(label,lang){
  if(lang!=="fr")return label;
  const labels={
    "Project report":"Rapport du projet",
    "Report":"Rapport",
    "Report EN":"Rapport EN",
    "Rapport FR":"Rapport FR",
    "Live app":"Application en ligne",
    "GitHub":"GitHub"
  };
  return labels[label]||label;
}
function ExtLink({href,children,className=""}){const external=!href.startsWith("/")&&!href.startsWith("mailto:");return <a className={className} href={href} target={external?"_blank":undefined} rel={external?"noreferrer":undefined}>{children}{external?<span aria-hidden="true"> ↗</span>:null}</a>}
function Top({t,lang,setLang}){return <div className="topbar"><a className="brand" href="/"><span className="brandMark" aria-hidden="true">Ω</span><span className="brandText">OHMEGA</span></a><div className="switches"><button type="button" onClick={()=>setLang(lang==="en"?"fr":"en")}>{t.lang}</button></div></div>}
function Section({id,title,subtitle,children,cut=false}){return <section id={id} className={`section${cut?" cut":""}`}><div className="sectionHead"><h2 className="sectionTitle">{title}</h2><p className="sectionSubtitle">{subtitle}</p></div><div>{children}</div></section>}

function ProfileStats({lang}){
  const values=[17,1,3];
  const labels=lang==="fr"
    ?["Projets d’ingénierie","Publication de recherche","Expériences d’ingénierie"]
    :["Engineering projects","Research publication","Engineering experiences"];
  return <dl className="profileStats">{values.map((v,i)=><div className="profileStat" key={labels[i]}><dt>{i===0?String(v)+"+":v}</dt><dd>{labels[i]}</dd></div>)}</dl>
}

function SystemPreview({lang}){
  return <div className="systemPreview depthCard motionItem" aria-hidden="true">
    <div className="systemPreviewHead">
      <span>OHMEGA / SYSTEM VIEW</span>
      <span className="systemLive"><i></i> LIVE MODEL</span>
    </div>
    <div className="systemCanvas">
      <svg viewBox="0 0 640 360" focusable="false">
        <g className="systemGrid">
          <path d="M40 70H600M40 150H600M40 230H600M40 310H600"/>
          <path d="M110 30V330M240 30V330M370 30V330M500 30V330"/>
        </g>
        <path className="systemTrace" d="M52 238 C94 238 104 125 153 125 S215 277 266 277 S334 151 387 151 S457 230 514 230 S568 96 610 96"/>
        <g className="systemNodes">
          <circle cx="100" cy="250" r="9"/><circle cx="238" cy="184" r="9"/><circle cx="372" cy="214" r="9"/><circle cx="526" cy="126" r="9"/>
          <path d="M100 250L238 184L372 214L526 126"/>
        </g>
      </svg>
    </div>
    <div className="systemPreviewFoot">
      <span><b>50 Hz</b><small>{lang==="fr"?"Réseau":"Grid"}</small></span>
      <span><b>GFM</b><small>{lang==="fr"?"Commande":"Control"}</small></span>
      <span><b>PLC</b><small>{lang==="fr"?"Automatisation":"Automation"}</small></span>
    </div>
  </div>
}

function FeaturedProject({p,lang}){
  const tags=projectTags[p.slug];
  return <article className="projectFeature depthCard motionItem">
    <a className="projectFeatureMedia" href={`/projects/${p.slug}`} aria-label={p.title}>
      <img src={p.image} alt="" loading="lazy"/>
    </a>
    <div className="projectFeatureBody">
      <div className="projectFeatureMeta"><span>{p.no}</span><span>{p.field[lang]}</span></div>
      <h3><a href={`/projects/${p.slug}`}>{p.title}</a></h3>
      <p>{p.body[lang]}</p>
      <div className="projectFeatureFoot">
        <div className="projectTags">{tags?.skills[lang].slice(0,2).map(tag=><span className="projectTag" key={tag}>{tag}</span>)}</div>
        <a className="openCase" href={`/projects/${p.slug}`}>{lang==="fr"?"Ouvrir le projet":"Open case study"} <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </article>
}

function Home({t,lang}){
  const[navOpen,setNavOpen]=useState(false);
  const navTargets=["#about","#projects","#research","#experience","#software","#contact"];
  return <>
    <header className="heroV5" id="top">
      <div className="heroV5Copy motionItem">
        <div className="heroV5Topline">
          <span>{lang==="fr"?"GÉNIE ÉLECTRIQUE · SYSTÈMES INTELLIGENTS":"ELECTRICAL ENGINEERING · INTELLIGENT SYSTEMS"}</span>
          <span className="availabilityPill"><i></i>{lang==="fr"?"Disponible à l’international":"Available worldwide"}</span>
        </div>
        <h1>{t.title}</h1>
        <p className="heroRole">{t.subtitle}</p>
        <p className="heroIntro">{lang==="fr"
          ?"Je conçois et simule des systèmes électriques de puissance, de commande et d’automatisation avec une approche système claire, vérifiable et orientée terrain."
          :"I design and simulate power, control and automation systems with a clear, verifiable, system-level engineering approach."}</p>
        <div className="heroV5Actions">
          <a className="primaryAction" href="#projects">{lang==="fr"?"Voir les projets":"View selected work"} <span>↘</span></a>
          <a className="secondaryAction" href={mail}>{lang==="fr"?"Me contacter":"Contact"} <span>↗</span></a>
        </div>
      </div>
      <SystemPreview lang={lang}/>
      <button className="mobileMenuButton" type="button" aria-expanded={navOpen} aria-controls="portfolio-navigation" onClick={()=>setNavOpen(v=>!v)}>
        <span className="hamburgerIcon" aria-hidden="true"><span></span><span></span><span></span></span><span>Menu</span>
      </button>
      <nav id="portfolio-navigation" className={`nav${navOpen?" isOpen":""}`} aria-label={lang==="fr"?"Navigation du portfolio":"Portfolio navigation"}>
        {t.nav.map((n,i)=><a href={navTargets[i]} key={n} onClick={()=>setNavOpen(false)}>{n}</a>)}
      </nav>
    </header>

    <Section id="about" title={lang==="fr"?"Profil":"Profile"} subtitle={lang==="fr"?"Une lecture rapide":"At a glance"}>
      <div className="profileV5">
        <div className="profileV5Copy motionItem">
          <p className="profileLead">{lang==="fr"
            ?"Élève ingénieur d’État en Génie Électrique et Systèmes Intelligents, orienté réseaux électriques, électronique de puissance, automatisation et architectures critiques."
            :"State Engineering student in Electrical Engineering & Intelligent Systems, focused on power systems, power electronics, automation and critical electrical architectures."}</p>
          <p>{lang==="fr"
            ?"Mon fil conducteur : rendre les systèmes complexes compréhensibles, simulables et justifiables — du réseau électrique jusqu’à la logique de commande."
            :"My common thread: make complex systems understandable, simulatable and justifiable — from the electrical grid down to control logic."}</p>
          <div className="focusPills">
            <span>Power systems</span><span>HVDC / HVAC</span><span>Grid-forming</span><span>Industrial automation</span>
          </div>
        </div>
        <ProfileStats lang={lang}/>
      </div>
      <a className="educationV5 motionItem" href="https://emsi.ma/" target="_blank" rel="noreferrer">
        <span className="educationLogo" aria-hidden="true"><img src="https://emsi.ma/wp-content/uploads/2024/03/favicon.svg" alt=""/></span>
        <span><small>{lang==="fr"?"FORMATION ACTUELLE":"CURRENT EDUCATION"}</small><strong>École Marocaine des Sciences de l’Ingénieur · Rabat</strong><em>{lang==="fr"?"Génie Électrique & Systèmes Intelligents":"Electrical Engineering & Intelligent Systems"}</em></span>
        <b aria-hidden="true">↗</b>
      </a>
    </Section>

    <Section id="projects" title={lang==="fr"?"Projets sélectionnés":"Selected Work"} subtitle={lang==="fr"?"Trois études mises en avant, puis deux accès rapides":"Three featured cases, then two quick entries"}>
      <div className="featuredProjects">
        {projects.slice(0,3).map(p=><FeaturedProject p={p} lang={lang} key={p.slug}/>)}
      </div>
      <div className="moreProjects motionItem">
        <div className="moreProjectsHead"><span>{lang==="fr"?"Autres projets sélectionnés":"More selected work"}</span><ExtLink href={github}>{lang==="fr"?"Voir GitHub":"Explore GitHub"}</ExtLink></div>
        {projects.slice(3).map(p=><a className="projectQuick" href={`/projects/${p.slug}`} key={p.slug}>
          <span>{p.no}</span><strong>{p.title}</strong><em>{p.field[lang]}</em><b>↗</b>
        </a>)}
      </div>
    </Section>

    <Section id="research" title={lang==="fr"?"Recherche":"Research"} subtitle={lang==="fr"?"Une publication, un message clair":"One publication, one clear story"}>
      <article className="researchV5 depthCard motionItem">
        <div className="researchBrand"><a href={juri} target="_blank" rel="noreferrer"><img src={logos.juri} alt="Journal of Undergraduate Research International logo"/></a></div>
        <div className="researchV5Content">
          <span className="statusPill">{lang==="fr"?"Accepté pour publication · DOI à venir":"Accepted for publication · DOI forthcoming"}</span>
          <h3>Grid-Forming Virtual Synchronous Machine Control with Battery Storage for Frequency Stability in Multiterminal High-Voltage Direct-Current Systems</h3>
          <p>{lang==="fr"
            ?"Une étude de stabilité fréquentielle reliant commande grid-forming, VSM, VSC-HVDC multi-terminal et stockage batterie."
            :"A frequency-stability study connecting grid-forming control, VSM, multi-terminal VSC-HVDC and battery storage."}</p>
          <div className="researchV5Links"><ExtLink href={juri}>{t.research.link}</ExtLink><ExtLink href={orcid}>ORCID</ExtLink></div>
        </div>
      </article>
    </Section>

    <Section id="experience" title={lang==="fr"?"Expérience":"Experience"} subtitle={lang==="fr"?"Terrain, automatisation et haute tension":"Field work, automation and high voltage"}>
      <div className="experienceV5">
        {t.experience.items.map(([role,company,date,description,tags,logoKey,standards])=><article className="experienceV5Item motionItem" key={`${company}-${date}`}>
          <div className="experienceV5Date">{date}</div>
          <div className="experienceV5Body">
            <div className="experienceV5Title"><div><h3>{role}</h3><p>{company}</p></div><div className={`experienceLogo ${logoKey==="menara"?"menaraLogo":"s4eLogo"}`}><img src={experienceLogos[logoKey]} alt={`${company.split(" · ")[0]} logo`}/></div></div>
            <p className="experienceV5Text">{description}</p>
            <div className="experienceTags">{tags.split(" · ").slice(0,3).map(tag=><span className="experienceTag" key={tag}>{tag}</span>)}{standards?.split(" · ").slice(0,1).map(tag=><span className="experienceTag standardTag" key={tag}>{tag}</span>)}</div>
          </div>
        </article>)}
      </div>
    </Section>

    <Section id="software" title={lang==="fr"?"Outils":"Tools"} subtitle={lang==="fr"?"Deux familles, pas un mur de logos":"Two families, not a logo wall"}>
      <div className="softwareDeck">
        {softwareGroups.map(group=><article className="softwareDeckCard depthCard motionItem" key={group.key}>
          <div className="softwareDeckHead"><span>{group.key==="engineering"?"01":"02"}</span><h3>{group.title[lang]}</h3></div>
          <div className="softwareDeckList">
            {group.items.map(item=><div className="softwareDeckItem" key={item.name}>
              <span className={`softwareLogo${item.fit?` is-${item.fit}`:""}`} aria-hidden="true"><img src={item.logo} alt=""/></span>
              <span>{item.name}</span>
            </div>)}
          </div>
        </article>)}
      </div>
    </Section>

    <EventsSection lang={lang}/>

    <footer id="contact" className="footer motionSection">
      <div className="footerIndex">05</div>
      <h2 className="footerSectionTitle">Contact</h2>
      <div className="footerContactGrid">
        <div><h3 className="footerHeadline">{t.contact.heading}</h3><span className="footerIntro">{t.contact.body}</span></div>
        <div className="contactDetails">
          <div className="contactDetail"><span className="contactLabel">{lang==="fr"?"Localisation":"Location"}</span><div className="contactValue">{lang==="fr"?"Rabat, Maroc / Dakar, Sénégal":"Rabat, Morocco / Dakar, Senegal"}</div></div>
          <div className="contactDetail"><span className="contactLabel">Email</span><div className="contactValue"><a href={mail}>diawbirane10@gmail.com</a></div></div>
        </div>
      </div>
      <div className="footerBottom">
        <a className="footerBrand" href="#top" aria-label="Back to top"><span className="footerOmega">Ω</span><span>OHMEGA</span></a>
        <nav className="contactLinks" aria-label="Professional profiles">
          <a href={mail} aria-label="Email">
            <span className="contactIcon brandIcon gmailIcon" aria-hidden="true">
              <svg viewBox="0 0 48 48">
                <path fill="#4285F4" d="M6 38V16.5l8 6.1V38H6Z"/>
                <path fill="#34A853" d="M34 38V22.6l8-6.1V38h-8Z"/>
                <path fill="#EA4335" d="M6 16.5V11c0-3.1 3.6-4.9 6.1-3L24 17l11.9-9c2.5-1.9 6.1-.1 6.1 3v5.5l-18 13.7L6 16.5Z"/>
                <path fill="#FBBC04" d="M34 22.6 42 16.5v-5.2l-8 6.1v5.2Z"/>
                <path fill="#C5221F" d="M6 11.3v5.2l8 6.1v-5.2l-8-6.1Z"/>
              </svg>
            </span>
            <span>Email</span>
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <span className="contactIcon brandIcon linkedinIcon" aria-hidden="true">
              <svg viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" fill="#0A66C2"/>
                <path fill="#fff" d="M16.2 19.4h-5.1V35h5.1V19.4Zm-2.5-7.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM35.9 26c0-4.8-2.6-7-6.1-7-2.8 0-4.1 1.6-4.8 2.7v-2.3h-5.1V35H25v-7.7c0-2 .4-4 3-4 2.6 0 2.7 2.5 2.7 4.2V35h5.1l.1-9Z"/>
              </svg>
            </span>
            <span>LinkedIn</span>
          </a>
          <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <span className="contactIcon brandIcon githubIcon" aria-hidden="true">
              <svg viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" fill="#000"/>
                <path fill="#fff" d="M24 10.5A13.5 13.5 0 0 0 19.7 36.8c.7.1.9-.3.9-.7v-2.6c-4 .9-4.9-1.7-4.9-1.7-.6-1.7-1.6-2.2-1.6-2.2-1.3-.9.1-.9.1-.9 1.5.1 2.2 1.5 2.2 1.5 1.3 2.2 3.4 1.6 4.2 1.2.1-.9.5-1.6.9-2-3.2-.4-6.6-1.6-6.6-7.2 0-1.6.6-2.9 1.5-4-.2-.4-.7-1.9.1-4 0 0 1.2-.4 4.1 1.5a14 14 0 0 1 7.4 0c2.8-1.9 4-1.5 4-1.5.8 2.1.3 3.6.2 4 .9 1.1 1.5 2.4 1.5 4 0 5.6-3.4 6.8-6.7 7.2.5.5 1 1.4 1 2.8v4c0 .4.2.8.9.7A13.5 13.5 0 0 0 24 10.5Z"/>
              </svg>
            </span>
            <span>GitHub</span>
          </a>
          <a href={x} target="_blank" rel="noreferrer" aria-label="X">
            <span className="contactIcon brandIcon xIcon" aria-hidden="true">
              <svg viewBox="0 0 48 48">
                <rect x="2" y="2" width="44" height="44" rx="2" fill="#fff"/>
                <path fill="#11161C" d="M31.2 10h6.5L27 22.2 39.5 38H29.7l-7.6-9.8L13.5 38H7l11.9-13.6L6.9 10h10.1l6.8 8.7L31.2 10Zm-2.3 25.2h3.6L15.1 12.6h-3.9l17.7 22.6Z"/>
              </svg>
            </span>
            <span>X</span>
          </a>
          <a href={orcid} target="_blank" rel="noreferrer" aria-label="ORCID">
            <span className="contactIcon brandIcon orcidIcon" aria-hidden="true">
              <svg viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" fill="#A6CE39"/>
                <circle cx="15.5" cy="15" r="2.4" fill="#fff"/>
                <path fill="#fff" d="M13.3 20h4.4v15h-4.4V20Zm8.2 0h7c5.4 0 9.2 3 9.2 7.5S33.9 35 28.5 35h-7V20Zm4.4 3.8v7.4h2.4c3 0 4.8-1.3 4.8-3.7s-1.8-3.7-4.8-3.7h-2.4Z"/>
              </svg>
            </span>
            <span>ORCID</span>
          </a>
        </nav>
      </div>
    </footer>
  </>
}
function ProjectDetail({project,t,lang}){return <><header className="projectHero"><ExtLink href="/">{t.detail[0]}</ExtLink><p>{project.no} · {project.field[lang]}</p><h1>{project.title}</h1><h2>{project.body[lang]}</h2>{projectTags[project.slug]?.standards?.length?<div className="caseStudyStandards" aria-label={lang==="fr"?"Normes de référence":"Reference standards"}>{projectTags[project.slug].standards.map(tag=><span className="projectTag standardTag" key={tag}>{tag}</span>)}</div>:null}</header>{project.image?<figure className="projectVisual motionSection"><div className="projectVisualFrame"><img src={project.image} alt={project.title}/></div><figcaption><span>{lang==="fr"?"VUE CONCEPTUELLE DU PROJET":"PROJECT CONCEPT VIEW"}</span><p>{project.visualNote?.[lang]}</p></figcaption></figure>:null}<section className="detailGrid"><article><p>{t.detail[1]}</p><h2>{project.problem[lang]}</h2></article><article><p>{t.detail[2]}</p><h2>{project.solution[lang]}</h2></article><article><p>{t.detail[3]}</p><ol>{project.steps[lang].map(s=><li key={s}>{s}</li>)}</ol></article><article><p>{t.detail[4]}</p><h2>{project.discussion[lang]}</h2></article><article className="wide"><p>{t.detail[5]}</p><nav className="inline">{project.links.map(([label,href])=><ExtLink href={href} key={label}>{resourceLabel(label,lang)}</ExtLink>)}</nav></article></section></>}
export default function Portfolio(){const pathname=usePathname();const[lang,setLang]=useState("en");useEffect(()=>{const savedLang=localStorage.getItem("ohmega-lang");localStorage.removeItem("ohmega-theme");localStorage.removeItem("ohmega-theme-v2");if(savedLang)setLang(savedLang);document.documentElement.dataset.theme="light"},[]);useEffect(()=>{document.documentElement.dataset.theme="light";document.documentElement.lang=lang;localStorage.setItem("ohmega-lang",lang)},[lang]);const t=useMemo(()=>copy[lang],[lang]);const slug=pathname?.startsWith("/projects/")?pathname.split("/projects/")[1]?.split("/")[0]:null;const project=projects.find(p=>p.slug===slug);return <main className="site"><Top t={t} lang={lang} setLang={setLang}/>{project?<ProjectDetail project={project} t={t} lang={lang}/>:<Home t={t} lang={lang}/>}</main>}
