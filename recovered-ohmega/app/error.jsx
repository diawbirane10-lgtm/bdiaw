"use client";

export default function PortfolioError({ retry }) {
  return (
    <main style={{ maxWidth: 640, margin: "64px auto", padding: 24, color: "#111", background: "#fff", fontFamily: "Arial, sans-serif" }}>
      <h1>Birane DIAW — Portfolio</h1>
      <p lang="fr">L’affichage a été interrompu. Vous pouvez réessayer ou me contacter par email.</p>
      <p lang="en">The page could not finish displaying. Please try again or contact me by email.</p>
      <button type="button" onClick={() => retry()} style={{ padding: "12px 20px", cursor: "pointer" }}>Réessayer / Try again</button>
      <p><a href="/">Recharger le portfolio / Reload portfolio</a></p>
      <p><a href="mailto:diawbirane10@gmail.com">diawbirane10@gmail.com</a></p>
    </main>
  );
}
