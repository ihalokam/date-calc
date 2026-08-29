import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";
import Footer from "@/app/Components/HeaderNFooter/Footer";

export const metadata: Metadata = {
    title: "Days Until India Republic Day — Live Countdown to January 26",
    description: "How many days until India Republic Day (January 26)?",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-republic-day-india" },
};

function nextRepublicDay(): string {
    const now = new Date();
    const y = now.getFullYear();
    const candidate = new Date(y, 0, 26);
    return candidate >= now ? `${y}-01-26` : `${y + 1}-01-26`;
}

export default function RepublicDayPage() {
    return (
        <>
            <EventDetail
                name="India Republic Day"
                description="January 26 — the day India's constitution came into force."
                emoji="🏛️"
                tone="sky"
                targetDate={nextRepublicDay()}
            />
            <Footer />
        </>
    );
}
