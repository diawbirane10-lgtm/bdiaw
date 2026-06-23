import { useLanguage } from "@/i18n/LanguageContext";
import ProjectCard, { ProjectData } from "./ProjectCard";
import { StaggerContainer, StaggerItem } from "./ScrollReveal";

const ProjectsSection = () => {
  const { t } = useLanguage();

  const projects: ProjectData[] = [
    {
      titleKey: "proj.asrs.title",
      subtitleKey: "proj.asrs.subtitle",
      statusType: "completed",
      date: "June 2026",
      contexteKey: "proj.asrs.contexte",
      objectifKey: "proj.asrs.objectif",
      contributionKey: "proj.asrs.contribution",
      resultatsKey: "proj.asrs.resultats",
      outils: [
        "CODESYS 3.5 SP22",
        "Structured Text",
        "IEC 61131-3",
        "SoftPLC",
        "CODESYS Control Win SL",
        "GRAFCET",
        "RFID",
        "Profinet IO",
        "Industrial Automation",
        "SMED",
        "HMI",
        "AS/RS",
        "CODESYS 3.5 SP22 – Final Platform",
      ],
      githubLink: "https://github.com/diawbirane10-lgtm/codesys_asrs/tree/main/Project_ASRS_CodeSYS",
    },
    {
      titleKey: "proj.batt.title",
      subtitleKey: "proj.batt.subtitle",
      statusType: "completed",
      date: "May 2026",
      contexteKey: "proj.batt.contexte",
      objectifKey: "proj.batt.objectif",
      contributionKey: "proj.batt.contribution",
      resultatsKey: "proj.batt.resultats",
      outils: ["Python", "Streamlit", "FastAPI", "NumPy", "Pandas", "Plotly", "EKF", "BMS"],
      pdfLink: "/documents/Rapport_Digital_Twin_LiIon.pdf",
      pdfLabelKey: "proj.batt.pdfLabel",
      liveLink: "https://digitwinbattpacks1.streamlit.app/",
      liveLabelKey: "proj.batt.liveLabel",
      githubLink: "https://github.com/diawbirane10-lgtm/Digital_Twin_Li-ion_Batt_Packs",
    },
    {
      titleKey: "proj.dt.title",
      subtitleKey: "proj.dt.subtitle",
      statusType: "completed",
      date: "May 2026",
      contexteKey: "proj.dt.contexte",
      objectifKey: "proj.dt.objectif",
      contributionKey: "proj.dt.contribution",
      resultatsKey: "proj.dt.resultats",
      outils: ["Python", "NumPy", "SciPy", "Matplotlib", "CustomTkinter", "OOP", "Control Theory", "Signal Processing", "Power Electronics"],
      pdfLink: "/documents/Digital_Twin_complet-report.pdf",
      pdfLabelKey: "proj.dt.pdfLabel",
      githubLink: "https://github.com/diawbirane10-lgtm/digital-twin-motor",
    },
    {
      titleKey: "proj.pcb.title",
      subtitleKey: "proj.pcb.subtitle",
      statusType: "completed",
      date: "March 2026",
      contexteKey: "proj.pcb.contexte",
      objectifKey: "proj.pcb.objectif",
      contributionKey: "proj.pcb.contribution",
      resultatsKey: "proj.pcb.resultats",
      outils: [
        "KiCad 8",
        "Schematic Capture",
        "PCB Routing",
        "2-Layer PCB",
        "ESP32-S3-WROOM-1",
        "MAX1551 LiPo Charger",
        "RT9080 LDO 3.3V",
        "WS2812B",
        "USB Native",
        "ERC / DRC",
      ],
      galleryLabelKey: "proj.pcb.galleryLabel",
      gallery: [
        { src: "/projects/pcb_mars/schema-full.png", captionKey: "proj.pcb.cap.full" },
        { src: "/projects/pcb_mars/esp32-block.png", captionKey: "proj.pcb.cap.esp32" },
        { src: "/projects/pcb_mars/charger-usb-headers.png", captionKey: "proj.pcb.cap.charger" },
        { src: "/projects/pcb_mars/voltage-regulator.png", captionKey: "proj.pcb.cap.reg" },
        { src: "/projects/pcb_mars/rgb-boot.png", captionKey: "proj.pcb.cap.rgb" },
        { src: "/projects/pcb_mars/pcb-layout-kicad.png", captionKey: "proj.pcb.cap.layout" },
      ],
    },
    {
      titleKey: "proj.new.title",
      subtitleKey: "proj.new.subtitle",
      statusType: "completed",
      contexteKey: "proj.new.contexte",
      objectifKey: "proj.new.objectif",
      contributionKey: "proj.new.contribution",
      outils: ["MATLAB", "Simulink", "Signal Processing", "Machine Learning", "SVM", "Maintenance Prédictive", "Ferroviaire"],
      pdfLinks: [
        { labelKey: "proj.new.rapport", href: "/documents/rapport_prelim_defauts.pdf" },
        { labelKey: "proj.new.fiche", href: "/documents/fiche_tech_defauts.pdf" },
      ],
    },
    {
      titleKey: "proj.imu.title",
      subtitleKey: "proj.imu.subtitle",
      statusType: "completed",
      date: "Jan 2026",
      contexteKey: "proj.imu.contexte",
      objectifKey: "proj.imu.objectif",
      contributionKey: "proj.imu.contribution",
      resultatsKey: "proj.imu.resultats",
      outils: ["MATLAB", "Signal Processing Toolbox", "Butterworth", "FFT", "Embedded Systems"],
      pdfLink: "/documents/Rapport_Projet_Telemetrie_IMU_MATLAB.pdf",
      pdfLabelKey: "proj.imu.pdfLabel",
    },
    {
      titleKey: "proj.4.title",
      subtitleKey: "proj.4.subtitle",
      statusType: "completed",
      contexteKey: "proj.4.contexte",
      objectifKey: "proj.4.objectif",
      contributionKey: "proj.4.contribution",
      outils: ["MATLAB/Simulink", "Simscape Electrical", "Control System Toolbox"],
      resultatsKey: "proj.4.resultats",
      pdfLink: "/documents/projet-houlomotrice.pdf",
      pdfLabelKey: "proj.4.pdfLabel",
    },
    {
      titleKey: "proj.8.title",
      subtitleKey: "proj.8.subtitle",
      statusType: "completed",
      contexteKey: "proj.8.contexte",
      objectifKey: "proj.8.objectif",
      contributionKey: "proj.8.contribution",
      outils: ["MATLAB", "Simscape Multibody", "Simulink", "Robotics", "UAV", "Dynamic Modeling"],
      pdfLink: "/documents/MAV_aerial_manipulator.pdf",
      pdfLabelKey: "proj.8.pdfLabel",
    },
  ];

  return (
    <section id="projets" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="section-header">
          <span className="section-label">{t("proj.label")}</span>
          <h2 className="section-title">{t("proj.title")}</h2>
          <div className="section-divider" />
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <StaggerItem key={index}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ProjectsSection;
