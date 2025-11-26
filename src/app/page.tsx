import CTABanner from "@/components/home/CtaSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import LatestTools from "@/components/home/LatestTools";
import UserTestimonial from "@/components/home/UserTestimonial";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background font-sans">
      <HeroSection />
      <LatestTools />
      <UserTestimonial />
      <HowItWorks />
      <CTABanner />
    </div>
  );
}
