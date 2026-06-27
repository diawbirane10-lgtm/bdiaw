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
      titleKey: "proj.b747.title",
      subtitleKey: "proj.b747.subtitle",
      statusType: "completed",
      date: "May 2026",
      contexteKey: "proj.b747.contexte",
      objectifKey: "proj.b747.objectif",
      contributionKey: "proj.b747.contribution",
      resultatsKey: "proj.b747.resultats",
      outils: [
        "MATLAB/Simulink",
        "Control System Toolbox",
        "State Space",
        "PID Control",
        "Flight Dynamics",
        "Linearization",
        "Nonlinear Simulation",
        "Boeing 747",
      ],
      galleryLabelKey: "proj.b747.galleryLabel",
      subGalleries: [
        {
          titleKey: "proj.b747.gallery.linear",
          items: [
            { src: "/projects/b747-flight-controller/linear-schema.png", captionKey: "proj.b747.cap.linear.schema" },
            { src: "/projects/b747-flight-controller/linear-psi.png", captionKey: "proj.b747.cap.linear.psi" },
            { src: "/projects/b747-flight-controller/linear-alt.png", captionKey: "proj.b747.cap.linear.alt" },
            { src: "/projects/b747-flight-controller/linear-lat.png", captionKey: "proj.b747.cap.linear.lat" },
            { src: "/projects/b747-flight-controller/linear-long.png", captionKey: "proj.b747.cap.linear.long" },
          ],
        },
        {
          titleKey: "proj.b747.gallery.nonlinear",
          items: [
            { src: "/projects/b747-flight-controller/nonlinear-schema.png", captionKey: "proj.b747.cap.nl.schema" },
            { src: "/projects/b747-flight-controller/nonlinear-heading.png", captionKey: "proj.b747.cap.nl.heading" },
            { src: "/projects/b747-flight-controller/nonlinear-alt.png", captionKey: "proj.b747.cap.nl.alt" },
          ],
        },
        {
          titleKey: "proj.b747.gallery.reference",
          items: [
            { src: "/projects/b747-flight-controller/real-b747.jpg", captionKey: "proj.b747.cap.real" },
          ],
        },
      ],
      pdfLink: "/documents/flight_controller_script.m",
      pdfLabelKey: "proj.b747.scriptLabel",
    },
    {
      titleKey: "proj.pv108.title",
      subtitleKey: "proj.pv108.subtitle",
      statusType: "completed",
      date: "May 2026",
      contexteKey: "proj.pv108.contexte",
      objectifKey: "proj.pv108.objectif",
      contributionKey: "proj.pv108.contribution",
      resultatsKey: "proj.pv108.resultats",
      outils: [
        "MATLAB/Simulink",
        "Simscape Electrical",
        "MPPT P&O",
        "Boost DC-DC",
        "VSI 2-Level",
        "LCL Filter",
        "PLL",
        "dq Control",
        "PWM IGBT",
        "Grid-Connected PV",
      ],
      galleryLabelKey: "proj.pv108.galleryLabel",
      gallery: [
        { src: "/projects/pv-grid-connected/simulink-schema.png", captionKey: "proj.pv108.cap.schema" },
        { src: "/projects/pv-grid-connected/pv-power.png", captionKey: "proj.pv108.cap.pvpower" },
        { src: "/projects/pv-grid-connected/grid-vi.png", captionKey: "proj.pv108.cap.gridvi" },
        { src: "/projects/pv-grid-connected/dc-link.png", captionKey: "proj.pv108.cap.dclink" },
        { src: "/projects/pv-grid-connected/dq-currents.png", captionKey: "proj.pv108.cap.dq" },
        { src: "/projects/pv-grid-connected/power-factor.png", captionKey: "proj.pv108.cap.pf" },
        { src: "/projects/pv-grid-connected/irradiance.png", captionKey: "proj.pv108.cap.irr" },
        { src: "/projects/pv-grid-connected/thd.png", captionKey: "proj.pv108.cap.thd" },
      ],
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
      titleKey: "proj.radar.title",
      subtitleKey: "proj.radar.subtitle",
      statusType: "completed",
      date: "April 2026",
      contexteKey: "proj.radar.contexte",
      objectifKey: "proj.radar.objectif",
      contributionKey: "proj.radar.contribution",
      resultatsKey: "proj.radar.resultats",
      outils: [
        "MATLAB",
        "Antenna Toolbox",
        "PCB Antenna Designer",
        "Simulink",
        "Simscape Electrical",
        "gerberWrite",
        "FR4",
        "Microstrip",
        "RF Design",
        "2-Layer PCB",
      ],
      galleryLabelKey: "proj.radar.galleryLabel",
      gallery: [
        {
          src: "/projects/airport-radar-pcb/schema-electronique-rf.png",
          altKey: "proj.radar.alt.schema",
          captionKey: "proj.radar.cap.schema",
        },
        {
          src: "/projects/airport-radar-pcb/pcb-layout-concept.png",
          altKey: "proj.radar.alt.pcb",
          captionKey: "proj.radar.cap.pcb",
        },
        {
          src: "/projects/airport-radar-pcb/patch-dimensions.png",
          altKey: "proj.radar.alt.dim",
          captionKey: "proj.radar.cap.dim",
        },
        {
          src: "/projects/airport-radar-pcb/patch-geometry.png",
          altKey: "proj.radar.alt.geometry",
          captionKey: "proj.radar.cap.geometry",
        },
        {
          src: "/projects/airport-radar-pcb/input-impedance.png",
          altKey: "proj.radar.alt.impedance",
          captionKey: "proj.radar.cap.impedance",
        },
      ],
      githubLink: "https://github.com/diawbirane10-lgtm/airport-radar-patch-pcb-matlab",
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
