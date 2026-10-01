import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";

import Footer from "@/app/Components/HeaderNFooter/Footer";
export const metadata: Metadata = {
    title: "Days Until Christmas 2025 — Live Countdown to December 25",
    description: "How many days until Christmas? Live countdown to December 25.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-christmas" },
};

function nextChristmas(): string {
    const now = new Date();
    const y = now.getFullYear();
    const candidate = new Date(y, 11, 25);
    return candidate >= now ? `${y}-12-25` : `${y + 1}-12-25`;
}

export default function ChristmasPage() {


    return (
        <>


            <EventDetail
                name="Christmas"
                description="Celebrated on December 25 across the globe."
                emoji="🎄"
                tone="emerald"
                targetDate={nextChristmas()}
            />
            <Footer />
        </>
    );
}