import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";

export const metadata: Metadata = {
    title: "Days Until Hug Day — Live Countdown to December 4",
    description: "How many days until Hug Day (December 4)? Spread warmth with the world.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-hug-day" },
};

function nextHugDay(): string {
    const now = new Date();
    const y = now.getFullYear();
    const candidate = new Date(y, 11, 4);
    return candidate >= now ? `${y}-12-04` : `${y + 1}-12-04`;
}

export default function HugDayPage() {
    return (
        <EventDetail
            name="Hug Day"
            description="December 4 — National Hug Day. Spread warmth freely."
            emoji="🤗"
            tone="orange"
            targetDate={nextHugDay()}
        />
    );
}
