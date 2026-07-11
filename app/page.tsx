import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGallery from "@/components/ProductGallery";
import ProductExperience from "@/components/ProductExperience";
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
        <ProductGallery />
        <ProductExperience />
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
