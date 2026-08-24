import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import WhatToAsk from "@/components/landing/WhatToAsk";
import HowItWorks from "@/components/landing/HowItWorks";
import PricingSection from "@/components/landing/PricingSection";
import Hero from "@/components/landing/Hero";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
        <Header />
      <Hero />
      <HowItWorks />
      <WhatToAsk />
      <PricingSection />
      <CTA />
      <Footer />
          </div>
  );
}
