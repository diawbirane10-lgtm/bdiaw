import { ReactLenis } from "lenis/react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ResearchSection from "@/components/ResearchSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useVisitTracker } from "@/hooks/useVisitTracker";

const Index = () => {
  useVisitTracker();
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, anchors: true }}>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <ScrollReveal>
            <ExperienceSection />
          </ScrollReveal>
          <ScrollReveal delay={0.05} direction="right">
            <ResearchSection />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <ProjectsSection />
          </ScrollReveal>
          <ScrollReveal delay={0.05} direction="right">
            <CertificationsSection />
          </ScrollReveal>
          <ScrollReveal delay={0.05} direction="left">
            <SkillsSection />
          </ScrollReveal>
          <ScrollReveal direction="scale">
            <TestimonialsSection />
          </ScrollReveal>
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Index;
