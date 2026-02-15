import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ScrollReveal>
          <HeroSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <SkillsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <CertificationsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ProjectsSection />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
