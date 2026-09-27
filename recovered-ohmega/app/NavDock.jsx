"use client";

import { useEffect } from "react";

export default function NavDock() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 761px)");
    const mobile = window.matchMedia("(max-width: 760px)");
    let nav = null;
    let menuButton = null;
    let navPlaceholder = null;
    let menuPlaceholder = null;
    let frame = 0;
    let attempts = 0;

    const locate = () => {
      nav = document.getElementById("portfolio-navigation");
      menuButton = document.querySelector(".mobileMenuButton");
      if (!nav) return false;

      if (!navPlaceholder && nav.parentNode) {
        navPlaceholder = document.createComment("portfolio-navigation-home");
        nav.parentNode.insertBefore(navPlaceholder, nav);
      }

      if (menuButton && !menuPlaceholder && menuButton.parentNode) {
        menuPlaceholder = document.createComment("portfolio-menu-home");
        menuButton.parentNode.insertBefore(menuPlaceholder, menuButton);
      }

      return true;
    };

    const restore = (node, placeholder) => {
      if (!node || !placeholder?.parentNode) return;
      if (node.parentNode !== placeholder.parentNode || node.previousSibling !== placeholder) {
        placeholder.parentNode.insertBefore(node, placeholder.nextSibling);
      }
    };

    const sync = () => {
      if (!locate()) return false;
      const topbar = document.querySelector(".topbar");
      const switches = topbar?.querySelector(".switches");

      if (desktop.matches && topbar && switches) {
        restore(menuButton, menuPlaceholder);
        if (nav.parentNode !== topbar || nav.nextSibling !== switches) {
          topbar.insertBefore(nav, switches);
        }
        nav.classList.add("navDocked");
        nav.classList.remove("navMobileDocked");
      } else if (mobile.matches && topbar && switches && menuButton) {
        if (menuButton.parentNode !== topbar || menuButton.nextSibling !== switches) {
          topbar.insertBefore(menuButton, switches);
        }
        if (nav.parentNode !== topbar) {
          topbar.appendChild(nav);
        }
        nav.classList.remove("navDocked");
        nav.classList.add("navMobileDocked");
      } else {
        restore(nav, navPlaceholder);
        restore(menuButton, menuPlaceholder);
        nav.classList.remove("navDocked", "navMobileDocked");
      }
      return true;
    };

    const boot = () => {
      if (sync()) return;
      attempts += 1;
      if (attempts < 60) frame = window.requestAnimationFrame(boot);
    };

    boot();
    desktop.addEventListener("change", sync);
    mobile.addEventListener("change", sync);

    return () => {
      window.cancelAnimationFrame(frame);
      desktop.removeEventListener("change", sync);
      mobile.removeEventListener("change", sync);
      restore(nav, navPlaceholder);
      restore(menuButton, menuPlaceholder);
      nav?.classList.remove("navDocked", "navMobileDocked");
      navPlaceholder?.remove();
      menuPlaceholder?.remove();
    };
  }, []);

  return null;
}
