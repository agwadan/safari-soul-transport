import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import SafariSoulStandard from "@/components/home/SafariSoulStandard";
import FleetShowcase from "@/components/home/FleetShowcase";
import MobilityServices from "@/components/home/MobilityServices";
import HowItWorks from "@/components/home/HowItWorks";
import TrustCredentials from "@/components/home/TrustCredentials";

export default function Page() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <SafariSoulStandard />
        <FleetShowcase />
        <MobilityServices />
        <HowItWorks />
        {/* <TrustCredentials /> */}
      </main>
      <Footer />
    </>
  );
}
