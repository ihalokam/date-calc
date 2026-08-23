import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";

export const metadata: Metadata = {
    title: "Days Until Labor Day (US) — Live Countdown",
    description: "How many days until Labor Day? Countdown to the first Monday of September.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-labor-day-us" },
};

/** First Monday of September */
function nextLaborDay(): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    function getDay(y: number): Date {
        const d = new Date(y, 8, 1); // Sep 1
        const dow = d.getDay();
        const daysToMon = (1 - dow + 7) % 7;
        return new Date(y, 8, 1 + daysToMon);
    }
    let d = getDay(now.getFullYear());
    if (d < today) d = getDay(now.getFullYear() + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function LaborDayPage() {
    return (
        <EventDetail
            name="Labor Day (US)"
            description="First Monday of September — a long weekend for working Americans."
            emoji="⚒️"
            tone="sky"
            targetDate={nextLaborDay()}
        />
    );
}
