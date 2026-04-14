import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
}

const variants: Record<Direction, Variants> = {
  up: {
    hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  left: {
    hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  right: {
    hidden: { opacity: 0, x: 40, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
};

const ScrollReveal = ({ children, delay = 0, direction = "up" }: ScrollRevealProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={variants[direction]}
    transition={{
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {children}
  </motion.div>
);

export default ScrollReveal;

// Staggered container for grids
export const StaggerContainer = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);
