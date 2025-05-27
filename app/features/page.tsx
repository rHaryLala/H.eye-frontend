import Features from "@/components/features-1";
import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/header";
import DisplayCards from "@/components/ui/display-cards";


export default function FeaturesPage() {
  return (
      <>
        <HeroHeader />
        <Features />
        <DisplayCards />
        <FooterSection />
      </>
  )
}
