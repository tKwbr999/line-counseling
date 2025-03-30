import Benefits from "@/components/benefits";
import CounselingSection from "@/components/counseling-section";
import Header from "@/components/header";
import Hero from "@/components/hero";
import LineCta from "@/components/line-cta";
import Pricing from "@/components/pricing";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <Benefits />
      <Pricing />
      <CounselingSection />
      <LineCta />
    </div>
  );
}
