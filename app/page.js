import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutSnippet from "@/components/home/AboutSnippet";
import InquiryBanner from "@/components/home/InquiryBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedProducts />
      <AboutSnippet />
      <InquiryBanner />
    </>
  );
}