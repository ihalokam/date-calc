import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";
import Footer from "@/app/Components/HeaderNFooter/Footer";

export const metadata: Metadata = {
    title: "Days Until Halloween — Live Countdown to October 31",
    description: "How many days until Halloween? Countdown to October 31.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-halloween" },
};

function nextHalloween(): string {
    const now = new Date();
    const y = now.getFullYear();
    const candidate = new Date(y, 9, 31);
    return candidate >= now ? `${y}-10-31` : `${y + 1}-10-31`;
}

export default function HalloweenPage() {
    return (
        <>
            <EventDetail
                name="Halloween"
                description="October 31 — costumes, candy, and all things spooky."
                emoji="🎃"
                tone="orange"
                targetDate={nextHalloween()}
            />
            <Footer />
        </>
    );
}
