import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";

export const metadata: Metadata = {
    title: "Days Until Kiss Day — Live Countdown to February 13",
    description: "How many days until Kiss Day (February 13)? The day before Valentine's.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-kiss-day" },
};

function nextKissDay(): string {
    const now = new Date();
    const y = now.getFullYear();
    const candidate = new Date(y, 1, 13);
    return candidate >= now ? `${y}-02-13` : `${y + 1}-02-13`;
}

export default function KissDayPage() {
    return (
        <EventDetail
            name="Kiss Day"
            description="February 13 — the day before Valentine's, sealed with a kiss."
            emoji="💋"
            tone="red"
            targetDate={nextKissDay()}
        />
    );
}
