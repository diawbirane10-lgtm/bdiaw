import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

interface CounterItem {
  value: string;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const AnimatedNumber = ({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-2xl lg:text-3xl font-body font-extrabold text-primary">
      {prefix}{count}{suffix}
    </span>
  );
};

const AnimatedCounters = () => {
  const { t } = useLanguage();

  const counters: CounterItem[] = [
    { value: "L3", label: t("hero.stat.licence") },
    { value: "2×", numericValue: 2, suffix: "×", label: t("hero.stat.stages") },
    { value: "4", numericValue: 4, label: t("hero.stat.certifications") },
    { value: "6+", numericValue: 6, suffix: "+", label: t("hero.stat.projects") },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-10 border-t border-border"
    >
      {counters.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          {stat.numericValue !== undefined ? (
            <AnimatedNumber target={stat.numericValue} suffix={stat.suffix} prefix={stat.prefix} />
          ) : (
            <span className="text-2xl lg:text-3xl font-body font-extrabold text-primary">
              {stat.value}
            </span>
          )}
          <p className="text-xs font-body text-muted-foreground mt-1">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedCounters;
