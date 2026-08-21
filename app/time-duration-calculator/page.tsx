import type { Metadata } from "next";
import Navbar from "@/app/Components/HeaderNFooter/Navbar";
import Footer from "@/app/Components/HeaderNFooter/Footer";
import TimeDurationWidget from "@/app/Components/TimeDuration/Timedurationwidget";
import Hero from "@/app/Components/TimeDuration/Hero";
import ExplainerSection from "@/app/Components/TimeDuration/ExplainerSection";
import FaqSection, { FAQS } from "@/app/Components/TimeDuration/Faqsection";
import ToolsGrid from "@/app/Components/TimeDuration/Toolsgrid";
import LiveClock from "@/app/Components/TimeDuration/Liveclock";
import FeaturesSection from "@/app/Components/TimeDuration/Featuressection";

export const metadata: Metadata = {
    title: "Time Duration Calculator — Hours Between Two Times, Work Hours & Overtime",
    description:
        "Free time duration calculator. Find hours and minutes between two times, calculate net work hours with breaks and overtime for payroll, or check how long until or since a time today.",
    alternates: { canonical: "https://datecalculator.site/time-duration-calculator" },
};

// Server Component: metadata, JSON-LD, and all written content render
// server-side and are crawlable without JS. Only <TimeDurationWidget />
// ships client JS.
export default function TimeDurationCalculatorPage() {
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
        name: "Time Duration Calculator",
        url: "https://datecalculator.site/time-duration-calculator",
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
            <LiveClock />

            <div className="mx-auto max-w-2xl px-4">
                <TimeDurationWidget />
            </div>

            <ExplainerSection />
            <FeaturesSection />
            <ToolsGrid />
            <FaqSection />

            <Footer />
        </main>
    );
}