import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const focusPages = [
  {
    href: "/power-systems",
    title: "Power Systems",
    text: "HVDC, BESS, grid-forming control, power electronics and critical electrical infrastructure.",
  },
  {
    href: "/nuclear-energy",
    title: "Nuclear Energy",
    text: "Electrical architecture, grid integration, protection, stability and instrumentation & control.",
  },
  {
    href: "/critical-systems",
    title: "Critical Systems",
    text: "Avionics, railway electrical systems, embedded control and resilient architectures.",
  },
  {
    href: "/research",
    title: "Research",
    text: "Applied R&D across electrical energy systems, control, modelling and intelligent infrastructure.",
  },
];

const FocusLinksSection = () => (
  <section className="section-padding border-t border-border/40" aria-labelledby="engineering-focus-title">
    <div className="section-container">
      <div className="section-header">
        <span className="section-label">Engineering Focus</span>
        <h2 id="engineering-focus-title" className="section-title">Explore by technical domain</h2>
        <div className="section-divider" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {focusPages.map((page) => (
          <Link key={page.href} to={page.href} className="card-elegant p-6 hover-lift group block">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="font-black text-lg tracking-tight">{page.title}</h3>
              <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{page.text}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default FocusLinksSection;
