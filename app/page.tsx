import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { QuoteGenerator } from "@/components/QuoteGenerator";
import { CallToAction } from "@/components/CallToAction";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="relative">
        <Navbar />
        <Hero />
        <QuoteGenerator />
        <Features />
      </main>
      <Footer />
    </>
  );
}