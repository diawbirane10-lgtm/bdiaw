import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import ProjectCard, { ProjectData } from "./ProjectCard";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type Category = "automation" | "power" | "digital" | "hardware";

interface ProjectEntry extends ProjectData {
  category: Category;
  cardTags?: string[];
}

const ProjectsSection = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Category | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const projects: ProjectEntry[] = [
    {
      category: "automation",
      cardTags: ["Structured Text", "IEC 61131-3", "GRAFCET"],
      titleKey: "proj.asrs.title",
      subtitleKey: "proj.asrs.subtitle",
      statusType: "completed",
      date: "June 2026",
      contexteKey: "proj.asrs.contexte",
      objectifKey: "proj.asrs.objectif",
      contributionKey: "proj.asrs.contribution",
      resultatsKey: "proj.asrs.resultats",
      outils: [
        "CODESYS 3.5 SP22", "Structured Text", "IEC 61131-3", "SoftPLC",
        "CODESYS Control Win SL", "GRAFCET", "RFID", "Profinet IO",
        "Industrial Automation", "SMED", "HMI", "AS/RS",
      ],
      githubLink: "https://github.com/diawbirane10-lgtm/codesys_asrs/tree/main/Project_ASRS_CodeSYS",
    },
    {
      category: "digital",
      cardTags: ["State-Space", "MATLAB", "PID"],
      titleKey: "proj.b747.title",
      subtitleKey: "proj.b747.subtitle",
      statusType: "completed",
      date: "May 2026",
      contexteKey: "proj.b747.contexte",
      objectifKey: "proj.b747.objectif",
      contributionKey: "proj.b747.contribution",
      resultatsKey: "proj.b747.resultats",
      outils: ["MATLAB/Simulink", "Control System Toolbox", "State Space", "PID Control", "Flight Dynamics", "Linearization", "Nonlinear Simulation", "Boeing 747"],
      galleryLabelKey: "proj.b747.galleryLabel",
      subGalleries: [
        { titleKey: "proj.b747.gallery.linear", items: [
          { src: "/projects/b747-flight-controller/linear-schema.png", captionKey: "proj.b747.cap.linear.schema" },
          { src: "/projects/b747-flight-controller/linear-psi.png", captionKey: "proj.b747.cap.linear.psi" },
          { src: "/projects/b747-flight-controller/linear-alt.png", captionKey: "proj.b747.cap.linear.alt" },
          { src: "/projects/b747-flight-controller/linear-lat.png", captionKey: "proj.b747.cap.linear.lat" },
          { src: "/projects/b747-flight-controller/linear-long.png", captionKey: "proj.b747.cap.linear.long" },
        ]},
        { titleKey: "proj.b747.gallery.nonlinear", items: [
          { src: "/projects/b747-flight-controller/nonlinear-schema.png", captionKey: "proj.b747.cap.nl.schema" },
          { src: "/projects/b747-flight-controller/nonlinear-heading.png", captionKey: "proj.b747.cap.nl.heading" },
          { src: "/projects/b747-flight-controller/nonlinear-alt.png", captionKey: "proj.b747.cap.nl.alt" },
        ]},
        { titleKey: "proj.b747.gallery.reference", items: [
          { src: "/projects/b747-flight-controller/real-b747.jpg", captionKey: "proj.b747.cap.real" },
        ]},
      ],
      pdfLink: "/documents/flight_controller_script.m",
      pdfLabelKey: "proj.b747.scriptLabel",
    },
    {
      category: "power",
      cardTags: ["dq Control", "MPPT P&O", "Simulink"],
      titleKey: "proj.pv108.title",
      subtitleKey: "proj.pv108.subtitle",
      statusType: "completed",
      date: "May 2026",
      contexteKey: "proj.pv108.contexte",
      objectifKey: "proj.pv108.objectif",
      contributionKey: "proj.pv108.contribution",
      resultatsKey: "proj.pv108.resultats",
      outils: ["MATLAB/Simulink", "Simscape Electrical", "MPPT P&O", "Boost DC-DC", "VSI 2-Level", "LCL Filter", "PLL", "dq Control", "PWM IGBT", "Grid-Connected PV"],
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
      category: "digital",
      cardTags: ["Streamlit", "Extended Kalman", "FastAPI"],
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
      category: "digital",
      cardTags: ["Python", "OOP", "Control Theory"],
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
      category: "hardware",
      cardTags: ["RF Design", "PCB", "MATLAB"],
      titleKey: "proj.radar.title",
      subtitleKey: "proj.radar.subtitle",
      statusType: "completed",
      date: "April 2026",
      contexteKey: "proj.radar.contexte",
      objectifKey: "proj.radar.objectif",
      contributionKey: "proj.radar.contribution",
      resultatsKey: "proj.radar.resultats",
      outils: ["MATLAB", "Antenna Toolbox", "PCB Antenna Designer", "Simulink", "Simscape Electrical", "gerberWrite", "FR4", "Microstrip", "RF Design", "2-Layer PCB"],
      galleryLabelKey: "proj.radar.galleryLabel",
      gallery: [
        { src: "/projects/airport-radar-pcb/schema-electronique-rf.png", altKey: "proj.radar.alt.schema", captionKey: "proj.radar.cap.schema" },
        { src: "/projects/airport-radar-pcb/pcb-layout-concept.png", altKey: "proj.radar.alt.pcb", captionKey: "proj.radar.cap.pcb" },
        { src: "/projects/airport-radar-pcb/patch-dimensions.png", altKey: "proj.radar.alt.dim", captionKey: "proj.radar.cap.dim" },
        { src: "/projects/airport-radar-pcb/patch-geometry.png", altKey: "proj.radar.alt.geometry", captionKey: "proj.radar.cap.geometry" },
        { src: "/projects/airport-radar-pcb/input-impedance.png", altKey: "proj.radar.alt.impedance", captionKey: "proj.radar.cap.impedance" },
      ],
      githubLink: "https://github.com/diawbirane10-lgtm/airport-radar-patch-pcb-matlab",
    },
    {
      category: "hardware",
      cardTags: ["KiCad 8", "ESP32-S3", "2-Layer PCB"],
      titleKey: "proj.pcb.title",
      subtitleKey: "proj.pcb.subtitle",
      statusType: "completed",
      date: "March 2026",
      contexteKey: "proj.pcb.contexte",
      objectifKey: "proj.pcb.objectif",
      contributionKey: "proj.pcb.contribution",
      resultatsKey: "proj.pcb.resultats",
      outils: ["KiCad 8", "Schematic Capture", "PCB Routing", "2-Layer PCB", "ESP32-S3-WROOM-1", "MAX1551 LiPo Charger", "RT9080 LDO 3.3V", "WS2812B", "USB Native", "ERC / DRC"],
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
      category: "hardware",
      cardTags: ["MATLAB", "FFT", "Embedded"],
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
      category: "digital",
      cardTags: ["ML / SVM", "Signal Processing", "Ferroviaire"],
      titleKey: "proj.new.title",
      subtitleKey: "proj.new.subtitle",
      statusType: "completed",
      date: "March 2026",
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
      category: "power",
      cardTags: ["Simscape Electrical", "Control", "MATLAB"],
      titleKey: "proj.4.title",
      subtitleKey: "proj.4.subtitle",
      statusType: "completed",
      date: "January 2026",
      contexteKey: "proj.4.contexte",
      objectifKey: "proj.4.objectif",
      contributionKey: "proj.4.contribution",
      outils: ["MATLAB/Simulink", "Simscape Electrical", "Control System Toolbox"],
      resultatsKey: "proj.4.resultats",
      pdfLink: "/documents/projet-houlomotrice.pdf",
      pdfLabelKey: "proj.4.pdfLabel",
    },
    {
      category: "digital",
      cardTags: ["Simscape Multibody", "Robotics", "UAV"],
      titleKey: "proj.8.title",
      subtitleKey: "proj.8.subtitle",
      statusType: "completed",
      date: "April 2026",
      contexteKey: "proj.8.contexte",
      objectifKey: "proj.8.objectif",
      contributionKey: "proj.8.contribution",
      outils: ["MATLAB", "Simscape Multibody", "Simulink", "Robotics", "UAV", "Dynamic Modeling"],
      pdfLink: "/documents/MAV_aerial_manipulator.pdf",
      pdfLabelKey: "proj.8.pdfLabel",
    },
  ];

  const filters: { key: Category | "all"; labelKey: string }[] = [
    { key: "all", labelKey: "proj.filter.all" },
    { key: "automation", labelKey: "proj.filter.automation" },
    { key: "power", labelKey: "proj.filter.power" },
    { key: "digital", labelKey: "proj.filter.digital" },
    { key: "hardware", labelKey: "proj.filter.hardware" },
  ];

  const visible = useMemo(
    () => projects.map((p, i) => ({ p, i })).filter(({ p }) => filter === "all" || p.category === filter),
    [filter],
  );

  const active = openIndex !== null ? projects[openIndex] : null;

  return (
    <section id="projets" className="section-padding relative">
      <div className="section-container relative z-10">
        <div className="text-center space-y-4 mb-10 max-w-2xl mx-auto">
          <span className="text-xs font-black tracking-widest text-primary uppercase">{t("proj.label")}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">{t("proj.title")}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{t("proj.intro")}</p>

          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {filters.map((f) => {
              const activeTab = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    "px-4 py-2 text-xs font-bold rounded-lg transition-all",
                    activeTab
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary/60 text-muted-foreground hover:bg-secondary",
                  )}
                >
                  {t(f.labelKey)}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map(({ p, i }) => (
              <motion.button
                key={p.titleKey}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                onClick={() => setOpenIndex(i)}
                className="group text-left bg-card border border-border/60 rounded-2xl hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-primary bg-primary/10 px-2.5 py-1 rounded">
                      {t(`proj.filter.${p.category}`)}
                    </span>
                    {p.date && (
                      <span className="text-[10px] font-semibold text-muted-foreground">{p.date}</span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-foreground leading-snug">{t(p.titleKey)}</h3>
                  {p.subtitleKey && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {t(p.subtitleKey)}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(p.cardTags ?? p.outils.slice(0, 3)).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-background border border-border text-muted-foreground text-[10px] font-medium rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="w-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-3 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <span>{t("proj.explore")}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Sheet open={openIndex !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl overflow-y-auto p-0 bg-background"
        >
          {active && (
            <div className="p-4 sm:p-6">
              <SheetTitle className="sr-only">{t(active.titleKey)}</SheetTitle>
              <ProjectCard project={active} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default ProjectsSection;
