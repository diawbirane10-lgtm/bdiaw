import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useVisitTracker = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await supabase.functions.invoke("track-visit", {
          body: {
            page: window.location.pathname,
            user_agent: navigator.userAgent,
            referrer: document.referrer || null,
          },
        });
      } catch (e) {
        // Silently fail - don't impact UX
      }
    };
    trackVisit();
  }, []);
};
