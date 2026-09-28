"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type Lang = "en" | "fr";

type Project = {
  slug: string;
  title: string;
  image: string;
  field: Record<Lang, string>;
  body: Record<Lang, string>;
};

type Props = {
  projects: Project[];
  lang: Lang;
};

type FilterKey = "all" | "power" | "renewables" | "mobility" | "twins";

const filters: Array<{ key: FilterKey; en: string; fr: string }> = [
  { key: "all", en: "All work", fr: "Tous" },
  { key: "power", en: "Power systems", fr: "Réseaux électriques" },
  { key: "renewables", en: "Renewables", fr: "Énergies renouvelables" },
  { key: "mobility", en: "Mobility", fr: "Mobilité électrique" },
  { key: "twins", en: "Digital twins", fr: "Jumeaux numériques" },
];

function categoryOf(slug: string): Exclude<FilterKey, "all"> {
  if (slug.includes("digital-twin")) return "twins";
  if (slug.includes("wave")) return "renewables";
  if (slug.includes("railway")) return "mobility";
  return "power";
}

function categoryLabel(key: Exclude<FilterKey, "all">, lang: Lang) {
  const found = filters.find((filter) => filter.key === key);
  return found ? found[lang] : key;
}

export default function LightswindPortfolio({ projects, lang }: Props) {
  const [active, setActive] = useState<FilterKey>("all");

  const visible = useMemo(
    () => projects.filter((project) => active === "all" || categoryOf(project.slug) === active),
    [active, projects]
  );

  return (
    <div className="lightswindPortfolio">
      <div className="lightswindFilterBar" role="tablist" aria-label={lang === "fr" ? "Filtrer les projets" : "Filter projects"}>
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            role="tab"
            aria-selected={active === filter.key}
            className={`lightswindFilter${active === filter.key ? " isActive" : ""}`}
            onClick={() => setActive(filter.key)}
          >
            {filter[lang]}
          </button>
        ))}
      </div>

      <motion.div layout className="lightswindMasonry">
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => {
            const category = categoryOf(project.slug);
            return (
              <motion.a
                layout
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`lightswindProjectCard lightswindProjectCard--${index % 4}`}
                initial={{ opacity: 0, y: 22, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.985 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span className="lightswindProjectScrim" aria-hidden="true" />
                <span className="lightswindProjectTopline">
                  <span className="lightswindProjectCategory">{categoryLabel(category, lang)}</span>
                  <span className="lightswindProjectArrow" aria-hidden="true">↗</span>
                </span>
                <span className="lightswindProjectCopy">
                  <span className="lightswindProjectField">{project.field[lang]}</span>
                  <strong>{project.title}</strong>
                  <span className="lightswindProjectSummary">{project.body[lang]}</span>
                </span>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
