import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        
        <ExperienceSection />
        <SkillsSection />
        <CertificationsSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
