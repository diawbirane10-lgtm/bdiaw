import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
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
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ScrollReveal>
          <ProjectsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.05} direction="left">
          <SkillsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.05} direction="right">
          <CertificationsSection />
        </ScrollReveal>
        <ScrollReveal direction="scale">
          <TestimonialsSection />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
};
