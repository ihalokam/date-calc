import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";

export const metadata: Metadata = {
    title: "Days Until New Year's Day — Live Countdown to January 1",
    description: "How many days until New Year? Live countdown to January 1.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-new-year" },
};

function nextNewYear(): string {
    const now = new Date();
    const y = now.getFullYear();
    const candidate = new Date(y, 0, 1);
    return candidate >= now ? `${y}-01-01` : `${y + 1}-01-01`;
}

export default function NewYearPage() {
    return (
        <EventDetail
            name="New Year's Day"
            description="January 1 — the start of a fresh year, worldwide."
            emoji="🎆"
            tone="sky"
            targetDate={nextNewYear()}
        />
    );
}
