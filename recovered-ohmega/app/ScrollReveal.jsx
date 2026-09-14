"use client";

import { useEffect } from "react";

const SELECTORS = [
  "main section:not(:first-of-type)",
  "#experience .experienceItem",
  ".projectCard",
  ".project-card",
  ".researchItem",
  ".research-card",
  ".skillCard",
  ".skill-card",
  ".eventItem",
  ".event-card",
  ".timelineItem",
  ".timeline-item",
].join(",");

export default function ScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observed = new WeakSet();

    let observer;

    const prepare = (root = document) => {
      root.querySelectorAll?.(SELECTORS).forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);

        if (reduceMotion) {
          el.classList.add("scrollReveal", "scrollRevealVisible");
          return;
        }

        el.classList.add("scrollReveal");

        const parent = el.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter((node) => node.matches?.(SELECTORS));
          const index = siblings.indexOf(el);
          if (index > -1) el.style.setProperty("--reveal-delay", `${Math.min(index * 70, 280)}ms`);
        }

        observer?.observe(el);
      });
    };

    if (!reduceMotion) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("scrollRevealVisible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -8% 0px",
        }
      );
    }

    prepare();

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches?.(SELECTORS)) prepare(node.parentElement || document);
          else prepare(node);
        });
      });
    });

    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer?.disconnect();
    };
  }, []);

  return null;
}
