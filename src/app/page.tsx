import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import LatestTools from "@/components/home/LatestTools";
import UserTestimonial from "@/components/home/UserTestimonial";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <LatestTools />
      <UserTestimonial />
      <HowItWorks />
    </div>
  );
}
