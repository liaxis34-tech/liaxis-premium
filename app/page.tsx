import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductReveal from "@/components/ProductReveal";
import CharmBuilder from "@/components/CharmBuilder";
import CharmMeaning from "@/components/CharmMeaning";
import Lifestyle from "@/components/Lifestyle";
import CustomerGallery from "@/components/CustomerGallery";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import StickyBuyBar from "@/components/StickyBuyBar";
import ReserveModal from "@/components/ReserveModal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductReveal />
        <CharmBuilder />
        <CharmMeaning />
        <Lifestyle />
        <CustomerGallery />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
      <StickyBuyBar />
      <ReserveModal />
    </>
  );
}
