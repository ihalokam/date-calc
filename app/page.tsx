import type { Metadata } from "next";
import DateCalculatorWidget from "../app/Components/Home/DateCalculatorWidget";
import Hero from "@/app/Components/Home/Hero";
import ToolsGrid from "@/app/Components/Home/ToolsGrid";
import ExplainerSection from "@/app/Components/Home/ExplainerSection";
import FaqSection, { FAQS } from "@/app/Components/Home/FaqSection";
import Feedback from "@/app/Components/Home/Feedback";
import Navbar from "@/app/Components/HeaderNFooter/Navbar";
import Footer from "@/app/Components/HeaderNFooter/Footer";
import FeaturesSection from "@/app/Components/Home/Featuressection";

export const metadata: Metadata = {
  title: "Date Calculator — Days Between Two Dates, Add or Subtract days from a date.",
  description:
    "Calculate how many days, weeks, months and years between two dates. Add or subtract days, weeks, months and years from a date.",
  alternates: { canonical: "https://datecalculator.site/" },
};

// This page is a Server Component: metadata, JSON-LD, and all written
// content render server-side and are crawlable without JS. Only
// <DateCalculatorWidget /> ships client JS.
export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Date Calculator",
    url: "https://datecalculator.site/",
    applicationCategory: "UtilitiesApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />
      <Hero />

      <div className="mx-auto max-w-2xl px-4">
        <DateCalculatorWidget />
      </div>

      <ExplainerSection />
      <FeaturesSection />
      <ToolsGrid />
      <Feedback />
      <FaqSection />
      <Footer />
    </main>
  );
}