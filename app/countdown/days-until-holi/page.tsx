import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";

export const metadata: Metadata = {
    title: "Days Until Holi — Live Countdown to the Festival of Colours",
    description: "How many days until Holi? Countdown to the Festival of Colours.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-holi" },
};

function nextHoli(): string {
    const lookup: Record<number, string> = {
        2025: "2025-03-14",
        2026: "2026-03-03",
        2027: "2027-03-22",
    };
    const today = new Date();
    const upcoming = Object.values(lookup)
        .map((iso) => new Date(`${iso}T00:00:00`))
        .filter((d) => d >= today)
        .sort((a, b) => a.getTime() - b.getTime());
    const d = upcoming[0] || new Date(2027, 2, 22);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function HoliPage() {
    return (
        <EventDetail
            name="Holi"
            description="The Festival of Colours — celebrated across India every spring."
            emoji="🌈"
            tone="violet"
            targetDate={nextHoli()}
            approximate
        />
    );
}
