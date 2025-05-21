import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";
import TeamSection from "@/components/team";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TeamSection />
      <FooterSection />
    </>
  );
}
