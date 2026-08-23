import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";

export const metadata: Metadata = {
    title: "Days Until Valentine's Day — Live Countdown to February 14",
    description: "How many days until Valentine's Day? Live countdown to February 14.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-valentines-day" },
};

function nextValentinesDay(): string {
    const now = new Date();
    const y = now.getFullYear();
    const candidate = new Date(y, 1, 14);
    return candidate >= now ? `${y}-02-14` : `${y + 1}-02-14`;
}

export default function ValentinesDayPage() {
    return (
        <EventDetail
            name="Valentine's Day"
            description="February 14 — the day of love and affection."
            emoji="💝"
            tone="rose"
            targetDate={nextValentinesDay()}
        />
    );
}