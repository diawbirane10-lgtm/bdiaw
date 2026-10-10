export const dakarV2gProject = {
  no: "06",
  slug: "dakar-v2g-iiot",
  field: { en: "Smart charging · IIoT · systems engineering", fr: "Recharge intelligente · IIoT · ingénierie système" },
  title: "Dakar V2G — Smart Charging & IIoT",
  titleFr: "Dakar V2G — Recharge intelligente & IIoT",
  image: "/projects/dakar-v2g/site-3d.png",
  visualKind: "capture",
  visualNote: {
    en: "Actual screenshot of the R2 simulator. Rotate and zoom the local site plan, select equipment, and move the charging point. Metric positions are illustrative; this is not a georeferenced reconstruction of Dakar. The interactive demo is currently in French.",
    fr: "Capture réelle du simulateur R2. Le plan permet de tourner, zoomer, sélectionner les équipements et déplacer la borne. Les positions métriques sont illustratives : l’implantation géographique à Dakar reste à valider."
  },
  body: {
    en: "A two-site engineering concept and interactive simulator for coordinated EV charging, conditional V2G and local resilience in the Dakar area.",
    fr: "Un concept d’ingénierie et un simulateur interactif à deux sites pour coordonner la recharge des véhicules, le V2G conditionnel et la résilience locale dans l’agglomération de Dakar."
  },
  problem: {
    en: "How can distant charging sites coordinate without making local operation depend on the cloud? The design must respect connection limits, vehicle departure needs and stored energy, while keeping grid access, V2G compatibility and telecom quality as assumptions to verify.",
    fr: "Comment coordonner des sites de recharge distants tout en préservant le fonctionnement local hors Internet ? La conception doit respecter les limites de raccordement, les besoins des véhicules au départ et l’énergie disponible, avec des hypothèses de réseau, de compatibilité V2G et de communication à vérifier."
  },
  solution: {
    en: "Grid supply as the proposed main source, a bounded local energy-management controller at each site, and central coordination. Start with smart unidirectional charging (V1G); enable bidirectional operation only with compatible equipment, consent and grid permission. Solar and stationary backup are evaluated as options rather than duplicated everywhere.",
    fr: "Le réseau est proposé comme source principale, avec un contrôleur de gestion d’énergie local borné sur chaque site et une coordination centrale. La recharge pilotée unidirectionnelle (V1G) constitue la base ; le fonctionnement bidirectionnel dépend du matériel, du consentement et des conditions réseau. Le solaire et le secours fixe sont des options à évaluer selon le site."
  },
  steps: {
    en: ["Review the concept across energy, control, telecoms, cybersecurity, regulation, GIS and operation.", "Integrate power into energy with a fixed 5-second step, conversion losses, reserve limits and departure requirements.", "Inject grid outages, WAN loss, solar changes, vehicle departures and hostile-command fixtures; observe local fallback and finite backup.", "Compare V1G and V2G under matching conditions, replay recorded states, and export complete JSON and CSV histories.", "Inspect the manipulable 3D site plan and validate the software with model equations, browser interactions and responsive checks."],
    fr: ["Revoir le concept sous les angles énergie, commande, télécoms, cybersécurité, réglementation, SIG et exploitation.", "Intégrer les puissances en énergie par pas fixe de 5 secondes, avec pertes, réserves et besoins au départ.", "Injecter coupures, pertes WAN, variations solaires, départs et commandes hostiles simulées ; observer le repli local et l’épuisement du secours.", "Comparer V1G et V2G à conditions identiques, relire les états enregistrés et exporter les chroniques JSON et CSV.", "Examiner le plan de site 3D manipulable et vérifier le logiciel par équations, interactions navigateur et contrôles responsives."]
  },
  discussion: {
    en: "The support scenario follows the aggregate power target more closely with V2G, but subsequent charging and conversion losses increase: flexibility does not imply an energy saving. R2 passed 96 temporal sequences and 311,042 step checks, with the simulator UI tested at ten screen sizes. These are software results with fictitious profiles. No hardware, live Senelec interface, grid-export agreement, physical protection or frequency/voltage study has been validated. The cyber controls are logical test fixtures, not an implemented industrial PKI.",
    fr: "Dans le scénario de soutien, le V2G suit mieux la consigne agrégée, mais augmente la recharge ultérieure et les pertes : la flexibilité ne garantit pas une économie d’énergie. R2 a passé 96 séquences temporelles et 311 042 contrôles de pas ; l’interface a été testée sur dix tailles d’écran. Ces résultats logiciels reposent sur des profils fictifs. Aucun matériel, flux Senelec réel, accord d’injection, protection physique ou étude de tension/fréquence n’est validé. Les contrôles cyber restent des règles logiques de test, sans PKI industrielle implémentée."
  },
  demo: "/demos/dakar-v2g.html",
  dossier: "/downloads/dakar-v2g/Dakar_V2G_Dossier_Engineering.zip",
  links: [["Interactive simulator (FR)", "/demos/dakar-v2g.html"], ["Engineering dossier (ZIP)", "/downloads/dakar-v2g/Dakar_V2G_Dossier_Engineering.zip"]]
};

export const dakarV2gTags = {
  skills: { en: ["IIoT architecture", "V1G / V2G", "Local resilience"], fr: ["Architecture IIoT", "V1G / V2G", "Résilience locale"] },
  tools: ["JavaScript", "HTML / CSS", "SVG 3D", "GeoJSON"]
};
