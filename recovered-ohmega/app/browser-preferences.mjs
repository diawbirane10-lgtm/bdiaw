// Storage may be unavailable in embedded browsers or when privacy settings deny it.
export function readLanguage() {
  try {
    const language = window.localStorage.getItem("ohmega-lang");
    return language === "fr" || language === "en" ? language : "en";
  } catch {
    return "en";
  }
}

export function saveLanguage(language) {
  try {
    window.localStorage.setItem("ohmega-lang", language);
  } catch {
    // The current page still changes language when persistence is unavailable.
  }
}
