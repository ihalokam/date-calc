import type { Metadata } from "next";
import Navbar from "@/app/Components/HeaderNFooter/Navbar";
import Footer from "@/app/Components/HeaderNFooter/Footer";
import CountdownIndexHero from "@/app/Components/countdown/CountdownIndexHero";
import CountdownCategorySection from "@/app/Components/countdown/CountdownCategorySection";
import { COUNTDOWN_EVENTS, CATEGORY_META, type EventCategory } from "@/lib/countdown/countdown-events";

export const metadata: Metadata = {
    title: "Countdown to Every Holiday & Event — Christmas, Diwali, Thanksgiving & More",
    description:
        "Browse live countdown pages for every major holiday and event worldwide — Christmas, Easter, Diwali, Valentine's Day, Thanksgiving, Holi and more.",
    alternates: { canonical: "https://datecalculator.site/countdown" },
};

const CATEGORY_ORDER: EventCategory[] = ["global", "human", "us", "india"];

export default function CountdownIndexPage() {
    const byCategory = CATEGORY_ORDER.map((cat) => ({
        cat,
        meta: CATEGORY_META[cat],
        events: COUNTDOWN_EVENTS.filter((e) => e.category === cat),
    }));

    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: COUNTDOWN_EVENTS.map((event, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: event.name,
            url: `https://datecalculator.site/countdown/${event.slug}`,
        })),
    };

    return (
        <>
            <Navbar />
            <main>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
                />
                <CountdownIndexHero />
                <div className="mx-auto max-w-5xl px-4 pb-20 space-y-14">
                    {byCategory.map(({ cat, meta, events }) => (
                        <CountdownCategorySection
                            key={cat}
                            category={cat}
                            label={meta.label}
                            subtitle={meta.subtitle}
                            events={events}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}