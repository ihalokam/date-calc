import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";
import Footer from "@/app/Components/HeaderNFooter/Footer";

export const metadata: Metadata = {
    title: "Days Until India Independence Day — Live Countdown to August 15",
    description: "How many days until India Independence Day (August 15)?",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-independence-day-india" },
};

function nextIndiaIndependenceDay(): string {
    const now = new Date();
    const y = now.getFullYear();
    const candidate = new Date(y, 7, 15);
    return candidate >= now ? `${y}-08-15` : `${y + 1}-08-15`;
}

export default function IndiaIndependenceDayPage() {
    return (
        <>
            <EventDetail
                name="India Independence Day"
                description="August 15 — India's independence, celebrated since 1947."
                emoji="🇮🇳"
                tone="green"
                targetDate={nextIndiaIndependenceDay()}
            />
            <Footer />
        </>
    );
}
