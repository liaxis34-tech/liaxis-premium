import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import BuildYourCharm from "@/components/BuildYourCharm";
import ProductShowcase from "@/components/ProductShowcase";
import GalleryMasonry from "@/components/GalleryMasonry";
import SocialProof from "@/components/SocialProof";
import UGCWall from "@/components/UGCWall";
import WhyCharmora from "@/components/WhyCharmora";
import FAQ from "@/components/FAQ";
import StickyBuyBar from "@/components/StickyBuyBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StorySection />
        <BuildYourCharm />
        <ProductShowcase />
        <GalleryMasonry />
        <SocialProof />
        <UGCWall />
        <WhyCharmora />
        <FAQ />
      </main>
      <Footer />
      <StickyBuyBar />
    </>
  );
}
