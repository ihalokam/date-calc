import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";

export const metadata: Metadata = {
    title: "Days Until Independence Day — Live Countdown to July 4",
    description: "How many days until July 4th? Live countdown to American Independence Day.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-independence-day" },
};

function nextIndependenceDay(): string {
    const now = new Date();
    const y = now.getFullYear();
    const candidate = new Date(y, 6, 4);
    return candidate >= now ? `${y}-07-04` : `${y + 1}-07-04`;
}

export default function IndependenceDayPage() {
    return (
        <EventDetail
            name="Independence Day"
            description="July 4 — America's birthday and fireworks night."
            emoji="🎇"
            tone="blue"
            targetDate={nextIndependenceDay()}
        />
    );
}
