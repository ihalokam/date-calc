import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";
import Footer from "@/app/Components/HeaderNFooter/Footer";

export const metadata: Metadata = {
    title: "Days Until Mother's Day — Live Countdown",
    description: "How many days until Mother's Day? Countdown to the second Sunday of May.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-mothers-day" },
};

/** Second Sunday of May */
function nextMothersDay(): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    function getMothersDay(y: number): Date {
        const d = new Date(y, 4, 1); // May 1
        const dow = d.getDay(); // 0=Sun
        const daysToSun = dow === 0 ? 0 : 7 - dow;
        return new Date(y, 4, 1 + daysToSun + 7); // 2nd Sunday
    }
    let d = getMothersDay(now.getFullYear());
    if (d < today) d = getMothersDay(now.getFullYear() + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function MothersDayPage() {
    return (
        <>
            <EventDetail
                name="Mother's Day"
                description="Second Sunday in May — celebrate the mums in your life."
                emoji="🌸"
                tone="pink"
                targetDate={nextMothersDay()}
            />
            <Footer />
        </>
    );
}
