"use client";
import {useEffect,useMemo,useState} from "react";
import {usePathname} from "next/navigation";
import EventsSection from "../EventsSection";

const github="https://github.com/diawbirane10-lgtm";
const linkedin="https://www.linkedin.com/in/birane-diaw-b83b47374";
const x="https://x.com/epsilonp0";
const mail="mailto:diawbirane10@gmail.com";
const juri="https://www.journalssystem.com/juri/";
const iet="https://www.theiet.org/";
const orcid="https://orcid.org/0009-0003-4015-7854";

const researchAbstracts={
  iet:{
    en:`The replacement of synchronous generation by converter-interfaced wind, solar and storage resources reduces the natural kinetic response available after a power imbalance. Offshore wind power plants connected through Voltage-Source Converter High-Voltage Direct Current (VSC-HVDC) links can contribute fast active power, but the available support is spread across different physical reserves. Wind rotors, the HVDC DC link and battery storage differ in response speed, usable energy, recovery behaviour and sensitivity to weak-grid conditions. A controller tuned at one operating point may therefore improve the frequency nadir while drawing excessive rotor energy, depressing DC voltage or using battery energy inefficiently. This chapter develops a reduced-order and risk-aware co-design framework for an aggregated Type-4 offshore wind power plant, a VSC-HVDC link and an alternating-current (AC)-coupled Battery Energy Storage System (BESS). The nonlinear model retains grid frequency, primary response, rotor speed, wind-power actuation, DC-link energy, HVDC transfer, battery power, state of charge and filtered frequency measurement. Three strategies are assessed: an uncoordinated reference, fixed supplementary gains and an adaptive controller whose wind, HVDC and battery participation changes with rotor reserve, DC-voltage headroom, state of charge, converter margin and grid strength. The gain vector is selected by minimizing expected composite loss together with Conditional Value-at-Risk (CVaR). Numerical linearization, Jacobian eigenvalues and spectral-abscissa maps are used for local stability screening, while Latin-hypercube Monte Carlo scenarios quantify performance under uncertainty. In the reported 120-scenario validation, the adaptive strategy reduces mean loss by 10.4% and 90%-CVaR by 6.4% relative to fixed gains, with no sampled constraint violation. The results also reveal a practical trade-off: faster frequency containment requires greater use of kinetic and battery energy and may reduce the local damping margin.`,
    fr:`La montée en puissance des moyens de production et de stockage raccordés au réseau par électronique de puissance réduit progressivement la réponse inertielle naturellement fournie par les machines synchrones lors d’un déséquilibre de puissance. Les parcs éoliens offshore connectés par des liaisons à convertisseurs de source de tension en courant continu haute tension (VSC-HVDC) peuvent apporter un soutien actif très rapide, mais cette contribution repose sur plusieurs réserves physiques aux caractéristiques très différentes : énergie cinétique des rotors, énergie disponible dans le bus continu HVDC et stockage batterie. Ces sources ne présentent ni les mêmes constantes de temps, ni les mêmes limites énergétiques, ni les mêmes contraintes de récupération, et leur comportement se dégrade différemment lorsque le réseau devient faible. Dans ce contexte, un réglage efficace à un point de fonctionnement donné peut améliorer le nadir de fréquence tout en sollicitant excessivement les rotors, en provoquant une baisse trop importante de la tension DC ou en mobilisant inutilement le BESS. Ce chapitre propose donc une approche de co-conception à ordre réduit intégrant explicitement le risque pour un parc éolien offshore Type-4 agrégé, une liaison VSC-HVDC et un système de stockage d’énergie par batterie (BESS) couplé côté courant alternatif (AC). Le modèle non linéaire représente conjointement la fréquence du réseau, la réponse primaire, la vitesse rotorique, la commande de puissance éolienne, l’énergie du bus continu, le transfert de puissance HVDC, la puissance batterie, l’état de charge et la mesure filtrée de fréquence. Trois stratégies sont comparées : une configuration non coordonnée, un réglage à gains fixes et une commande adaptative faisant varier la contribution de l’éolien, de l’HVDC et du BESS en fonction de la réserve rotorique, de la marge de tension DC, de l’état de charge, de la marge convertisseur et de la force du réseau. Le vecteur de gains est déterminé en minimisant à la fois la perte composite espérée et la Conditional Value-at-Risk (CVaR). La stabilité locale est examinée par linéarisation numérique, analyse des valeurs propres du Jacobien et cartes d’abscisse spectrale, tandis qu’une campagne Monte Carlo fondée sur un Latin hypercube permet d’évaluer les performances sous incertitude. Sur les 120 scénarios étudiés, la stratégie adaptative réduit la perte moyenne de 10,4 % et la 90%-CVaR de 6,4 % par rapport aux gains fixes, sans violation de contrainte observée. Les résultats mettent enfin en évidence un compromis essentiel : améliorer la tenue en fréquence exige de mobiliser davantage l’énergie cinétique et la batterie, ce qui peut se faire au détriment de la marge locale d’amortissement.`
  },
  juri:{
    en:`Converter-dominated renewable power systems are increasingly vulnerable to rapid frequency excursions because the displacement of synchronous generation reduces effective system inertia. This study evaluates a grid-forming (GFM) control strategy based on a Virtual Synchronous Machine (VSM) supported by a direct-current (DC)-coupled Battery Energy Storage System (BESS) in a representative three-terminal voltage-source converter high-voltage DC renewable power system. The main contribution is a compact, five-state, reduced-order model that simultaneously captures the alternating current (AC) frequency, common DC bus voltage, governor response, BESS active power, and state-of-charge dynamics while enabling a reproducible assessment of coupled AC/DC stability under multiple contingency conditions. The model was independently cross-verified in the software using adaptive BDF, fixed-step fourth-order Runge–Kutta, and Radau solvers, with the existing Simulink implementation retained as an additional check. Three disturbances were considered: a 280 MW load increase, 400 MW wind-generation loss, and 300 MW solar-power ramp over 100 ms. Compared with the grid-following baseline, the GFM-BESS improved the frequency nadir by 1.615–1.616 Hz across all the tested scenarios and reduced the 200 ms Rate of Change of Frequency (RoCoF) in the severe wind-trip case from 2.186 to 1.244 Hz/s. The common DC-bus voltage remained within the ±5% study benchmark. The BESS reached 99% of its 200 MW rating within 0.117–0.166 s and delivered only 0.141–0.144 MWh up to the nadir, demonstrating that short-term performance is constrained primarily by power capability rather than energy capacity. These results highlight the effectiveness and limitations of the DC-coupled storage for coordinated frequency and DC voltage support in low-inertia multiterminal DC systems.`,
    fr:`Les réseaux électriques fortement dominés par des convertisseurs deviennent plus sensibles aux variations rapides de fréquence, car le recul de la production synchrone réduit l’inertie globale disponible. Cette étude évalue une stratégie de commande grid-forming (GFM) reposant sur une machine synchrone virtuelle (Virtual Synchronous Machine, VSM), associée à un système de stockage d’énergie par batterie (Battery Energy Storage System, BESS) couplé côté courant continu (DC), dans un système renouvelable à trois terminaux fondé sur des convertisseurs de source de tension et des liaisons HVDC (VSC-HVDC). La contribution principale réside dans un modèle réduit compact à cinq états, capable de représenter simultanément la fréquence côté AC, la tension du bus continu commun, la réponse de la régulation primaire, la puissance active du BESS et l’évolution de l’état de charge. Cette formulation permet d’analyser de manière reproductible les interactions entre dynamique de fréquence et dynamique du bus DC sous plusieurs scénarios de perturbation. Le modèle a été vérifié indépendamment à l’aide de trois solveurs numériques — BDF adaptatif, Runge–Kutta d’ordre 4 à pas fixe et Radau — tandis que l’implémentation Simulink existante a été conservée comme validation complémentaire. Trois événements ont été étudiés : une augmentation de charge de 280 MW, une perte de 400 MW de production éolienne et une rampe solaire de 300 MW appliquée sur 100 ms. Par rapport à la configuration de référence grid-following, le GFM-BESS améliore le nadir de fréquence de 1,615 à 1,616 Hz selon le scénario et réduit, dans le cas sévère de perte éolienne, le taux de variation de fréquence (Rate of Change of Frequency, RoCoF) mesuré sur 200 ms de 2,186 à 1,244 Hz/s. La tension du bus DC commun reste dans la plage de ±5 % retenue pour l’étude. Le BESS atteint 99 % de sa puissance nominale de 200 MW en seulement 0,117 à 0,166 s, tout en ne délivrant que 0,141 à 0,144 MWh jusqu’au nadir. Ce résultat montre que, pour ce type d’événement court, la contrainte déterminante est avant tout la puissance disponible du stockage plutôt que sa capacité énergétique. L’étude met ainsi en évidence à la fois l’intérêt et les limites d’un BESS couplé côté DC pour assurer conjointement le soutien en fréquence et la maîtrise de la tension continue dans les systèmes HVDC multiterminaux à faible inertie.`
  }
};

const researchPublications={
  "risk-aware-wind-hvdc-bess":{
    key:"iet",
    type:{en:"Book chapter",fr:"Chapitre d’ouvrage"},
    status:{en:"Accepted · Publication expected shortly",fr:"Accepté · Publication prévue très prochainement"},
    title:"Risk-Aware Co-Design of Synthetic Inertia and Battery Support for HVDC-Connected Wind Power Plants under Grid and Wind Uncertainty",
    venue:{en:"The Institution of Engineering and Technology (IET) · Chapter 9",fr:"The Institution of Engineering and Technology (IET) · Chapitre 9"},
    abstract:researchAbstracts.iet,
    logo:"/iet-logo.png",
    logoAlt:"The Institution of Engineering and Technology (IET) logo",
    publisherUrl:iet,
    publisherLabel:{en:"Official IET website",fr:"Site officiel IET"}
  },
  "grid-forming-vsm-hvdc-bess":{
    key:"juri",
    type:{en:"Journal article",fr:"Article de revue"},
    status:{en:"Accepted for publication · DOI forthcoming",fr:"Accepté pour publication · DOI à venir"},
    title:"Grid-Forming Virtual Synchronous Machine Control with Battery Storage for Frequency Stability in Multiterminal High-Voltage Direct-Current Systems",
    venue:{en:"Journal of Undergraduate Research International, KFUPM · JURI-00314-2026-02",fr:"Journal of Undergraduate Research International, KFUPM · JURI-00314-2026-02"},
    abstract:researchAbstracts.juri,
    logo:"https://www.journalssystem.com/juri/_static/juri-head5.jpg",
    logoAlt:"Journal of Undergraduate Research International logo",
    publisherUrl:juri,
    publisherLabel:{en:"Journal website",fr:"Site de la revue"}
  }
};

const schoolLinks={
  emsi:"https://emsi.ma/",
  fst:"https://www.fstg-marrakech.ac.ma/",
  csmh:"https://www.mariste.sn/"
};

const logos={
  iet:"/iet-logo.png",
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
      {name:"MathWorks MATLAB & Simulink",logo:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Matlab_icon.png",primary:true},
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
      {name:"Python",logo:"https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg",fit:"boost"},
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

const copy={en:{lang:"FR",title:"Birane DIAW",subtitle:"State Engineering Student — Electrical Engineering & Intelligent Systems.",intro:"Engineering power, control and automation systems through modelling, simulation and system-level design.",nav:["About","Selected work","Research","Experience","Contact"],research:{eyebrow:"Research",heading:"Accepted manuscript",summary:"This paper studies how grid-forming virtual synchronous machine control, supported by DC-coupled battery storage, can improve frequency stability in a renewable multi-terminal VSC-HVDC system. It connects converter behaviour, storage response and disturbance scenarios while keeping the control assumptions explicit.",meta:"Journal of Undergraduate Research International, KFUPM · JURI-00314-2026-02 · DOI forthcoming",link:"Journal website"},projects:{eyebrow:"Selected projects",heading:"Five selected engineering projects",open:"Open case study",more:"More projects",moreBody:"Additional prototypes and code repositories are available on GitHub.",github:"Open GitHub"},experience:{heading:"Engineering internships & field work",items:[["Final-Year Project Intern — Industrial Automation","Menara Préfa · Marrakech, Morocco","Apr — Jun 2026","Designed an intelligent AS/RS concept for automated mold changes on the QUADRA 10 press, with GRAFCET sequencing, RFID identification, PLC/HMI integration and simulation.","TIA Portal · GRAFCET · RFID · PLCSIM · Factory I/O","menara","IEC 61131-3 · IEC 60204-1 · ISO 12100"],["Intern — Engineering Office & Works Supervision","S4E SARL · Dakar, Senegal","Jul — Aug 2024","Contributed to an EDG tender file, LV sizing with Camelia, AutoCAD drawing updates, and field commissioning of a 225 kV / 20 MVA transformer at Manantali.","AutoCAD · Camelia · 225 kV · Commissioning","s4e"],["High-Voltage Engineering Intern","S4E SARL · Dakar, Senegal","Jul — Aug 2023","Observed and documented HV-substation operations, updated single-line diagrams and applied HSE procedures during field visits in Senegal, Mali and Mauritania.","HV substations · Single-line diagrams · HSE","s4e","IEC 61850"]]},path:{eyebrow:"Academic path",heading:"Engineering education",site:"School website",items:[["State Engineering Student — Electrical Engineering & Intelligent Systems","EMSI Rabat","Oct 2026 — Jun 2028","Engineering cycle focused on electrical engineering, intelligent systems and industrial technologies. The path connects power systems, smart grids, automation, supervision, embedded systems and applied engineering projects.",logos.emsi,schoolLinks.emsi],["Bachelor in Science and Techniques — Industrial Computing, Electronics, Electrical Engineering and Automation (IEEA)","FST Marrakech · Université Cadi Ayyad","Oct 2022 — Jun 2026","Four-year path combining a common scientific core in mathematics, computer science, physics and chemistry, followed by applied mathematics and a final-year reorientation toward electrical engineering. The degree now bridges modelling, industrial computing, electronics, electrotechnics and automatic control.",logos.fst,schoolLinks.fst],["Baccalauréat S2, Experimental Sciences","Cours Sainte Marie de Hann, Dakar","Jul 2022","Senegalese scientific track centred on experimental sciences, physics and mathematics. It built the base for scientific reasoning, observation, quantitative analysis and the transition toward engineering studies.",logos.csmh,schoolLinks.csmh]]},skills:{eyebrow:"Skills",heading:"Tools and methods",groups:[["Power systems, power electronics & smart grids","Smart grids · UFLS · VSC-HVDC · Grid-forming control · Virtual Synchronous Machine (VSM) · Droop control · Newton-Raphson power flow · PV conversion · Railway traction · Wave energy · Battery systems · Electric drives"],["Control & simulation","MATLAB/Simulink · Simscape Electrical · Stateflow · Clarke transform · Park transform · dq control · FOC · PLL / SRF-PLL · PID · MPC · Numerical simulation"],["Industrial automation & SCADA","Siemens TIA Portal · Siemens PLCs · CODESYS 3.5 · GRAFCET · OpenPLC · SCADA concepts"],["Embedded & electronics","KiCad · PCB design · ESP32 · C/C++ basics · Sensors · Telemetry · RF concepts"],["Engineering software","Python · FastAPI · Streamlit · CustomTkinter · Git/GitHub · Data processing · Technical documentation"],["Standards & industrial practices","IEC 61131-3 · IEC 60204-1 · IEC 61508 · IEC 62443 · IEC 61850 · IEC 61000 · ISO 12100 · ISO 13849-1 · ISA-101 · ISA-95 / IEC 62264"]]},contact:{heading:"Systems should remain understandable when they become complex.",body:"For internships, engineering collaboration or research discussions, email is the simplest entry point."},detail:["Back to portfolio","Problem","Solution","Build path","Discussion","Reports and links"]},fr:{lang:"EN",title:"Birane DIAW",subtitle:"Élève ingénieur d\'État — Génie électrique & systèmes intelligents.",intro:"Conception et étude de systèmes de puissance, de commande et d’automatisation par la modélisation, la simulation et l’ingénierie système.",nav:["À propos","Projets sélectionnés","Recherche","Expérience","Contact"],research:{eyebrow:"Recherche",heading:"Manuscrit accepté",summary:"Cet article étudie comment une commande grid-forming de type machine synchrone virtuelle, appuyée par un stockage batterie couplé côté DC, peut améliorer la stabilité fréquentielle d’un système VSC-HVDC multi-terminal à forte part renouvelable. Il relie le comportement des convertisseurs, la réponse du stockage et les scénarios de perturbation, avec des hypothèses de commande explicites.",meta:"Journal of Undergraduate Research International, KFUPM · JURI-00314-2026-02 · DOI à venir",link:"Site du journal"},projects:{eyebrow:"Projets sélectionnés",heading:"Cinq projets d’ingénierie sélectionnés",open:"Ouvrir la fiche projet",more:"Autres projets",moreBody:"D’autres prototypes et dépôts de code sont disponibles sur GitHub.",github:"Ouvrir GitHub"},experience:{heading:"Stages & expérience terrain",items:[["Stagiaire PFE — Maintenance & automatismes industriels","Menara Préfa · Marrakech, Maroc","Avr. — Juin 2026","Conception d’un concept AS/RS intelligent pour automatiser le changement de moules sur la presse QUADRA 10, avec séquencement GRAFCET, identification RFID, intégration automate/IHM et simulation.","TIA Portal · GRAFCET · RFID · PLCSIM · Factory I/O","menara","IEC 61131-3 · IEC 60204-1 · ISO 12100"],["Stagiaire — Bureau d’études et suivi de travaux","S4E SARL · Dakar, Sénégal","Juil. — Août 2024","Participation à un dossier d’appel d’offres EDG, dimensionnement BT avec Camelia, mise à jour de plans AutoCAD et mise en service terrain d’un transformateur 225 kV / 20 MVA à Manantali.","AutoCAD · Camelia · 225 kV · Mise en service","s4e"],["Stagiaire — Haute tension","S4E SARL · Dakar, Sénégal","Juil. — Août 2023","Observation et documentation d’installations HT, mise à jour de schémas unifilaires et application des procédures HSE lors de visites terrain au Sénégal, au Mali et en Mauritanie.","Postes HT · Schémas unifilaires · HSE","s4e","IEC 61850"]]},path:{eyebrow:"Parcours académique",heading:"Formation d’ingénieur",site:"Site de l’école",items:[["Élève ingénieur d\'État — Génie électrique & systèmes intelligents","EMSI Rabat","Oct. 2026 — Juin 2028","Cycle ingénieur orienté vers le génie électrique, les systèmes intelligents et les technologies industrielles. Le parcours relie réseaux électriques, smart grids, automatisation, supervision, systèmes embarqués et projets d’ingénierie appliquée.",logos.emsi,schoolLinks.emsi],["Bachelor en sciences et techniques — IEEA : informatique industrielle, électronique, électrotechnique et automatique","FST Marrakech · Université Cadi Ayyad","Oct. 2022 — Juin 2026","Parcours de quatre ans avec un cycle commun en mathématiques, informatique, physique et chimie, puis une spécialisation en mathématiques appliquées et une réorientation en dernière année vers le génie électrique. La formation relie aujourd’hui modélisation, informatique industrielle, électronique, électrotechnique et automatique.",logos.fst,schoolLinks.fst],["Baccalauréat S2, Sciences expérimentales","Cours Sainte Marie de Hann, Dakar","Juil. 2022","Série scientifique sénégalaise centrée sur les sciences expérimentales, les sciences physiques et les mathématiques. Elle a posé les bases du raisonnement scientifique, de l’observation, de l’analyse quantitative et du passage vers les études d’ingénierie.",logos.csmh,schoolLinks.csmh]]},skills:{eyebrow:"Compétences",heading:"Outils et méthodes",groups:[["Réseaux électriques, électronique de puissance & smart grids","Smart grids · UFLS · VSC-HVDC · Commande grid-forming · Machine synchrone virtuelle (VSM) · Commande droop · Calcul de flux Newton-Raphson · Conversion photovoltaïque · Traction ferroviaire · Énergie houlomotrice · Systèmes de batteries · Entraînements électriques"],["Commande & simulation","MATLAB/Simulink · Simscape Electrical · Stateflow · Transformée de Clarke · Transformée de Park · Commande dq · FOC · PLL / SRF-PLL · PID · MPC · Simulation numérique"],["Automatisation industrielle & SCADA","Siemens TIA Portal · Automates Siemens · CODESYS 3.5 · GRAFCET · OpenPLC · Concepts SCADA"],["Systèmes embarqués & électronique","KiCad · Conception de PCB · ESP32 · Bases C/C++ · Capteurs · Télémétrie · Concepts RF"],["Logiciels d’ingénierie","Python · FastAPI · Streamlit · CustomTkinter · Git/GitHub · Traitement de données · Documentation technique"],["Normes & pratiques industrielles","IEC 61131-3 · IEC 60204-1 · IEC 61508 · IEC 62443 · IEC 61850 · IEC 61000 · ISO 12100 · ISO 13849-1 · ISA-101 · ISA-95 / IEC 62264"]]},contact:{heading:"Les systèmes doivent rester compréhensibles même quand ils deviennent complexes.",body:"Pour un stage, une collaboration technique ou une discussion de recherche, l’email reste le point d’entrée le plus simple."},detail:["Retour au portfolio","Problème","Solution","Étapes","Discussion","Rapports et liens"]}};

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
  const values=[17,2,3];
  const labels=lang==="fr"
    ?["Projets d’ingénierie","Publications de recherche","Expériences d’ingénierie"]
    :["Engineering projects","Research publications","Engineering experiences"];
  return <dl className="profileStats">{values.map((v,i)=><div className="profileStat" key={labels[i]}><dt>{i===0?String(v)+"+":v}</dt><dd>{labels[i]}</dd></div>)}</dl>
}

function Home({t,lang}){
  const[navOpen,setNavOpen]=useState(false);
  const navTargets=["#about","#projects","#research","#experience","#contact"];
  return <>
    <header className="hero heroReveal" id="top">
      <div className="heroKicker">
        <span>{lang==="fr"?"PORTFOLIO · GÉNIE ÉLECTRIQUE":"PORTFOLIO · ELECTRICAL ENGINEERING"}</span>
        <span className="heroIdentityStack">
          <span className="senegalMark">
            <svg className="senegalFlag" viewBox="0 0 30 20" aria-hidden="true" focusable="false">
              <rect x="0" y="0" width="10" height="20" fill="#00853F"/>
              <rect x="10" y="0" width="10" height="20" fill="#FDEF42"/>
              <rect x="20" y="0" width="10" height="20" fill="#E31B23"/>
              <polygon fill="#00853F" points="15,5.2 16.2,8.8 20,8.8 16.9,11 18.1,14.6 15,12.4 11.9,14.6 13.1,11 10,8.8 13.8,8.8"/>
            </svg>
            <span><span className="identityLead">ORIGINALLY FROM</span> — DAKAR, SENEGAL, WEST AFRICA</span>
          </span>
          <span className="moroccoMark">
            <svg className="moroccoFlag" viewBox="0 0 30 20" aria-hidden="true" focusable="false">
              <rect x="0" y="0" width="30" height="20" fill="#C1272D"/>
              <polygon points="15,4.2 16.7,9.1 21.9,9.2 17.8,12.2 19.3,17 15,14.1 10.7,17 12.2,12.2 8.1,9.2 13.3,9.1"
                fill="none" stroke="#006233" stroke-width="1.15" stroke-linejoin="round"/>
            </svg>
            <span><span className="identityLead">BASED IN</span> — RABAT, MOROCCO, NORTH AFRICA</span>
          </span>
        </span>
      </div>
      <div className="availabilityBar" aria-label={lang==="fr"?"Disponibilités":"Availability"}>
        <span className="availabilityDot" aria-hidden="true"></span>
        <span>{lang==="fr"?"DISPONIBLE À L’INTERNATIONAL POUR":"AVAILABLE WORLDWIDE FOR"}</span>
        <strong>{lang==="fr"?"STAGES · COLLABORATIONS DE RECHERCHE · FELLOWSHIPS":"INTERNSHIPS · RESEARCH COLLABORATIONS · FELLOWSHIPS"}</strong>
      </div>
      <h1>{t.title}</h1>
      <p className="lead">{t.subtitle}</p>
      <p className="introCopy">{t.intro}</p>
      <a className="heroScrollCue" href="#about" aria-label={lang==="fr"?"Découvrir le portfolio":"Explore the portfolio"}>
        <span>{lang==="fr"?"Découvrir":"Explore"}</span><span aria-hidden="true">↓</span>
      </a>
      <button className="mobileMenuButton" type="button" aria-expanded={navOpen} aria-controls="portfolio-navigation" onClick={()=>setNavOpen(v=>!v)}>
        <span className="hamburgerIcon" aria-hidden="true"><span></span><span></span><span></span></span><span>Menu</span>
      </button>
      <nav id="portfolio-navigation" className={`nav${navOpen?" isOpen":""}`} aria-label={lang==="fr"?"Navigation du portfolio":"Portfolio navigation"}>
        {t.nav.map((n,i)=><a href={navTargets[i]} key={n} onClick={()=>setNavOpen(false)}>{n}</a>)}
      </nav>
    </header>

    <Section id="about" title={lang==="fr"?"À propos":"About"} subtitle={lang==="fr"?"Profil d’ingénierie":"Engineering profile"}>
      <div className="aboutGrid">
        <div className="aboutStatement motionItem">
          <p className="aboutLead">{lang==="fr"
            ?"Élève ingénieur d’État en Génie Électrique et Systèmes Intelligents, orienté systèmes électriques de forte puissance, réseaux électriques, électronique de puissance et architectures électriques critiques."
            :"State Engineering student in Electrical Engineering & Intelligent Systems, focused on high-power electrical systems, power systems, power electronics and critical electrical architectures."}</p>
          <p>{lang==="fr"
            ?"Mon travail s’articule autour de la modélisation, de la simulation et de l’ingénierie système, à l’intersection des systèmes de puissance, de la commande et de l’automatisation — de la stabilité des réseaux, du HVDC / HVAC et des technologies grid-forming jusqu’aux systèmes électromécaniques et au contrôle industriel. Je m’intéresse particulièrement aux architectures intégrées où conversion de puissance, capteurs, actionnement et intelligence embarquée sont conçus ensemble pour assurer stabilité, performance et fiabilité."
            :"My work centers on modelling, simulation and system-level engineering across power, control and automation, from grid stability, HVDC / HVAC and grid-forming technologies to electromechanical systems and industrial control. I am particularly interested in integrated architectures where power conversion, sensing, actuation and embedded intelligence are engineered together for stability, performance and reliability."}</p>
        </div>
        <ProfileStats lang={lang}/>
      </div>
      <a className="educationStrip motionItem" href="https://emsi.ma/" target="_blank" rel="noreferrer" aria-label={lang==="fr"?"École Marocaine des Sciences de l’Ingénieur — site officiel":"École Marocaine des Sciences de l’Ingénieur — official website"}>
        <span className="educationLogo" aria-hidden="true"><img src="https://emsi.ma/wp-content/uploads/2024/03/favicon.svg" alt=""/></span>
        <span className="educationCopy">
          <span className="educationEyebrow">{lang==="fr"?"FORMATION ACTUELLE":"CURRENT EDUCATION"}</span>
          <strong>École Marocaine des Sciences de l’Ingénieur · Rabat</strong>
          <span>{lang==="fr"?"Génie Électrique & Systèmes Intelligents":"Electrical Engineering & Intelligent Systems"}</span>
        </span>
        <span className="educationArrow" aria-hidden="true">↗</span>
      </a>
    </Section>

    <Section id="projects" title={lang==="fr"?"Projets sélectionnés":"Selected Work"} subtitle={lang==="fr"?"Une sélection parmi plus de 17 projets":"A selection from 17+ engineering projects"}>
      <div className="workList">
        {projects.map(p=><article className="workRow motionItem" key={p.slug}>
          <div className="workRowIndex">{p.no}</div>
          <div className="workRowMain">
            <p className="workField">{p.field[lang]}</p>
            <h3><ExtLink href={`/projects/${p.slug}`} className="titleLink">{p.title}</ExtLink></h3>
            <p className="workBody">{p.body[lang]}</p>
          </div>
          <div className="workRowMeta">
            <div className="projectTags" aria-label={lang==="fr"?"Compétences et logiciels":"Skills and software"}>
              {projectTags[p.slug]?.skills[lang].slice(0,2).map(tag=><span className="projectTag" key={`skill-${tag}`}>{tag}</span>)}
              {projectTags[p.slug]?.tools.slice(0,1).map(tag=><span className="projectTag toolTag" key={`tool-${tag}`}>{tag}</span>)}
            </div>
            <ExtLink href={`/projects/${p.slug}`} className="workRowLink">{lang==="fr"?"Voir le projet":"View project"} <span aria-hidden="true">↗</span></ExtLink>
          </div>
        </article>)}
      </div>
      <div className="workArchive motionItem">
        <div><strong>17+</strong><span>{lang==="fr"?"projets d’ingénierie":"engineering projects"}</span></div>
        <p>{lang==="fr"?"Cette page n’en montre qu’une sélection. Le reste est disponible sur GitHub.":"This page shows only a selection. More projects are available on GitHub."}</p>
        <ExtLink href={github}>{lang==="fr"?"Explorer GitHub":"Explore GitHub"}</ExtLink>
      </div>
    </Section>

    <Section id="research" title={lang==="fr"?"Recherche":"Research"} subtitle={lang==="fr"?"Publications sélectionnées":"Selected publications"}>
      <div className="researchList">
        <article className="researchFeature motionItem ietPublication">
          <div className="researchBrand"><a href={iet} target="_blank" rel="noreferrer"><img src={logos.iet} alt="The Institution of Engineering and Technology (IET) logo"/></a></div>
          <div className="researchContent">
            <p className="meta">{lang==="fr"?"Chapitre d’ouvrage · Accepté · Publication prévue très prochainement":"Book chapter · Accepted · Publication expected shortly"}</p>
            <h3>Risk-Aware Co-Design of Synthetic Inertia and Battery Support for HVDC-Connected Wind Power Plants under Grid and Wind Uncertainty</h3>
            <ExtLink href="/research/risk-aware-wind-hvdc-bess" className="abstractPageLink">{lang==="fr"?"Voir l’abstract":"View abstract"} <span aria-hidden="true">↗</span></ExtLink>
            <p className="journal">{lang==="fr"?"The Institution of Engineering and Technology (IET) · Chapitre 9":"The Institution of Engineering and Technology (IET) · Chapter 9"}</p>
            <nav className="researchActions">
              <ExtLink href={iet}>{lang==="fr"?"Site officiel IET":"Official IET website"}</ExtLink>
              <ExtLink href={orcid}>ORCID 0009-0003-4015-7854</ExtLink>
            </nav>
          </div>
        </article>

        <article className="researchFeature motionItem juriPublication">
          <div className="researchBrand"><a href={juri} target="_blank" rel="noreferrer"><img src={logos.juri} alt="Journal of Undergraduate Research International logo"/></a></div>
          <div className="researchContent">
            <p className="meta">{lang==="fr"?"Accepté pour publication · DOI à venir":"Accepted for publication · DOI forthcoming"}</p>
            <h3>Grid-Forming Virtual Synchronous Machine Control with Battery Storage for Frequency Stability in Multiterminal High-Voltage Direct-Current Systems</h3>
            <ExtLink href="/research/grid-forming-vsm-hvdc-bess" className="abstractPageLink">{lang==="fr"?"Voir l’abstract":"View abstract"} <span aria-hidden="true">↗</span></ExtLink>
            <p className="journal">{t.research.meta}</p>
            <nav className="researchActions">
              <ExtLink href={juri}>{t.research.link}</ExtLink>
              <ExtLink href={orcid}>ORCID 0009-0003-4015-7854</ExtLink>
            </nav>
          </div>
        </article>
      </div>
    </Section>

    <Section id="experience" title={lang==="fr"?"Expérience":"Experience"} subtitle={t.experience.heading}>
      <div className="experienceList">{t.experience.items.map(([role,company,date,description,tags,logoKey,standards])=><article className="experienceItem motionItem" key={`${company}-${date}`}>
        <span className="experienceDate">{date}</span>
        <div className="experienceContent">
          <div className="experienceHeader"><div><h3>{role}</h3><p className="experienceMeta">{company}</p></div><div className={`experienceLogo ${logoKey==="menara"?"menaraLogo":"s4eLogo"}`}><img src={experienceLogos[logoKey]} alt={`${company.split(" · ")[0]} logo`}/></div></div>
          <p className="experienceBody">{description}</p>
          <div className="experienceTags">{tags.split(" · ").slice(0,5).map(tag=><span className="experienceTag" key={tag}>{tag}</span>)}{standards?.split(" · ").slice(0,2).map(tag=><span className="experienceTag standardTag" key={`standard-${tag}`}>{tag}</span>)}</div>
        </div>
      </article>)}</div>
    </Section>


    <Section id="software" title={lang==="fr"?"Logiciels d’ingénierie":"Engineering Software"} subtitle={lang==="fr"?"Environnements techniques & outils de travail":"Engineering environments & work tools"}>
      <div className="softwareGroups">
        {softwareGroups.map(group=><article className="softwareGroup motionItem" key={group.key}>
          <h3 className="softwareGroupTitle">{group.title[lang]}</h3>
          <div className="softwareList">
            {group.items.map(item=><div className="softwareItem" key={item.name}>
              <span className={`softwareLogo${item.fit?` is-${item.fit}`:""}`} aria-hidden="true"><img src={item.logo} alt=""/></span>
              <span className="softwareName">{item.name}{item.primary?` (${lang==="fr"?"environnement principal":"main environment"})`:""}</span>
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
              <img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/ORCID_iD.svg" alt=""/>
            </span>
            <span>ORCID</span>
          </a>
        </nav>
      </div>
    </footer>
  </>
}
function ResearchDetail({publication,lang}){return <>
  <header className="projectHero researchHero">
    <ExtLink href="/#research">{lang==="fr"?"← Retour à Research":"← Back to Research"}</ExtLink>
    <p>{publication.type[lang]} · {publication.status[lang]}</p>
    <h1>{publication.title}</h1>
    <h2>{publication.venue[lang]}</h2>
    <div className="researchDetailBrand"><img src={publication.logo} alt={publication.logoAlt}/></div>
  </header>
  <section className="detailGrid researchDetailGrid">
    <article className="wide researchAbstractArticle">
      <p>{lang==="fr"?"Résumé":"Abstract"}</p>
      <div className="researchAbstractBody">{publication.abstract[lang]}</div>
    </article>
    <article className="wide">
      <p>{lang==="fr"?"Publication & profils":"Publication & profiles"}</p>
      <nav className="inline">
        <ExtLink href={publication.publisherUrl}>{publication.publisherLabel[lang]}</ExtLink>
        <ExtLink href={orcid}>ORCID 0009-0003-4015-7854</ExtLink>
      </nav>
    </article>
  </section>
</>}
function ProjectDetail({project,t,lang}){return <><header className="projectHero"><ExtLink href="/">{t.detail[0]}</ExtLink><p>{project.no} · {project.field[lang]}</p><h1>{project.title}</h1><h2>{project.body[lang]}</h2>{projectTags[project.slug]?.standards?.length?<div className="caseStudyStandards" aria-label={lang==="fr"?"Normes de référence":"Reference standards"}>{projectTags[project.slug].standards.map(tag=><span className="projectTag standardTag" key={tag}>{tag}</span>)}</div>:null}</header>{project.image?<figure className="projectVisual motionSection"><div className="projectVisualFrame"><img src={project.image} alt={project.title}/></div><figcaption><span>{lang==="fr"?"VUE CONCEPTUELLE DU PROJET":"PROJECT CONCEPT VIEW"}</span><p>{project.visualNote?.[lang]}</p></figcaption></figure>:null}<section className="detailGrid"><article><p>{t.detail[1]}</p><h2>{project.problem[lang]}</h2></article><article><p>{t.detail[2]}</p><h2>{project.solution[lang]}</h2></article><article><p>{t.detail[3]}</p><ol>{project.steps[lang].map(s=><li key={s}>{s}</li>)}</ol></article><article><p>{t.detail[4]}</p><h2>{project.discussion[lang]}</h2></article><article className="wide"><p>{t.detail[5]}</p><nav className="inline">{project.links.map(([label,href])=><ExtLink href={href} key={label}>{resourceLabel(label,lang)}</ExtLink>)}</nav></article></section></>}
export default function Portfolio(){const pathname=usePathname();const[lang,setLang]=useState("en");useEffect(()=>{const savedLang=localStorage.getItem("ohmega-lang");localStorage.removeItem("ohmega-theme");localStorage.removeItem("ohmega-theme-v2");if(savedLang)setLang(savedLang);document.documentElement.dataset.theme="light"},[]);useEffect(()=>{document.documentElement.dataset.theme="light";document.documentElement.lang=lang;localStorage.setItem("ohmega-lang",lang)},[lang]);const t=useMemo(()=>copy[lang],[lang]);const projectSlug=pathname?.startsWith("/projects/")?pathname.split("/projects/")[1]?.split("/")[0]:null;const researchSlug=pathname?.startsWith("/research/")?pathname.split("/research/")[1]?.split("/")[0]:null;const project=projects.find(p=>p.slug===projectSlug);const publication=researchSlug?researchPublications[researchSlug]:null;return <main className="site"><Top t={t} lang={lang} setLang={setLang}/>{project?<ProjectDetail project={project} t={t} lang={lang}/>:publication?<ResearchDetail publication={publication} lang={lang}/>:<Home t={t} lang={lang}/>}</main>}
