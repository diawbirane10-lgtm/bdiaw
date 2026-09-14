"use client";

import { useEffect } from "react";

export default function NavDock() {
  useEffect(() => {
    const media = window.matchMedia("(min-width: 901px)");
    let nav = null;
    let originalParent = null;
    let placeholder = null;

    const locate = () => {
      nav = document.getElementById("portfolio-navigation");
      if (!nav) return false;
      if (!originalParent) {
        originalParent = nav.parentNode;
        placeholder = document.createComment("portfolio-navigation-home");
        originalParent.insertBefore(placeholder, nav);
      }
      return true;
    };

    const sync = () => {
      if (!locate()) return;
      const topbar = document.querySelector(".topbar");
      const switches = topbar?.querySelector(".switches");
      if (media.matches && topbar && switches) {
        topbar.insertBefore(nav, switches);
        nav.classList.add("navDocked");
      } else if (placeholder?.parentNode) {
        placeholder.parentNode.insertBefore(nav, placeholder.nextSibling);
        nav.classList.remove("navDocked");
      }
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });
    media.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
      if (nav && placeholder?.parentNode) {
        placeholder.parentNode.insertBefore(nav, placeholder.nextSibling);
        nav.classList.remove("navDocked");
      }
      placeholder?.remove();
    };
  }, []);

  return null;
}
