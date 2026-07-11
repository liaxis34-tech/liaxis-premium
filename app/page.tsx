import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FullWidthShowcase from "@/components/FullWidthShowcase";
import EditorialStory from "@/components/EditorialStory";
import ProductExperience from "@/components/ProductExperience";
import DetailGallery from "@/components/DetailGallery";
import Benefits from "@/components/Benefits";
import FabricTech from "@/components/FabricTech";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import StickyBuyBar from "@/components/StickyBuyBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FullWidthShowcase />
        <EditorialStory />
        <ProductExperience />
        <DetailGallery />
        <Benefits />
        <FabricTech />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
      <StickyBuyBar />
    </>
  );
}
