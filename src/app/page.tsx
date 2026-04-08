import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyInvest from "@/components/WhyInvest";
import Coverage from "@/components/Coverage";
import Advertise from "@/components/Advertise";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Advertise />
        <Services />
        <Partners />
        <WhyInvest />
        <Coverage />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}