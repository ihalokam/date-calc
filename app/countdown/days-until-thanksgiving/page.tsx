import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";

export const metadata: Metadata = {
    title: "Days Until Thanksgiving — Live Countdown",
    description: "How many days until Thanksgiving? Countdown to the fourth Thursday of November.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-thanksgiving" },
};

/** Fourth Thursday of November */
function nextThanksgiving(): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    function getDay(y: number): Date {
        const d = new Date(y, 10, 1); // Nov 1
        const dow = d.getDay(); // 0=Sun
        const daysToThu = (4 - dow + 7) % 7;
        return new Date(y, 10, 1 + daysToThu + 21); // 4th Thursday
    }
    let d = getDay(now.getFullYear());
    if (d < today) d = getDay(now.getFullYear() + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function ThanksgivingPage() {
    return (
        <EventDetail
            name="Thanksgiving"
            description="Fourth Thursday of November — turkey, gratitude, and family."
            emoji="🦃"
            tone="orange"
            targetDate={nextThanksgiving()}
        />
    );
}
