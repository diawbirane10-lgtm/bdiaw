import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const PREVIEW_COUNT = 4;

const TagList = ({ tags }: { tags: string[] }) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? tags : tags.slice(0, PREVIEW_COUNT);
  const hiddenCount = tags.length - PREVIEW_COUNT;

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {visible.map((tag) => (
        <span key={tag} className="skill-tag text-[11px]">{tag}</span>
      ))}
      {!expanded && hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="text-[11px] font-body font-bold text-primary/70 hover:text-primary uppercase tracking-wide px-1"
        >
          +{hiddenCount}
        </button>
      )}
      {expanded && hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="text-[11px] font-body font-semibold text-primary/70 hover:text-primary uppercase tracking-wide px-1"
        >
          {t("proj.hideTools")}
        </button>
      )}
    </div>
  );
};

export default TagList;
