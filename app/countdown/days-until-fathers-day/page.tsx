import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";
import Footer from "@/app/Components/HeaderNFooter/Footer";

export const metadata: Metadata = {
    title: "Days Until Father's Day — Live Countdown",
    description: "How many days until Father's Day? Countdown to the third Sunday of June.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-fathers-day" },
};

/** Third Sunday of June */
function nextFathersDay(): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    function getFathersDay(y: number): Date {
        const d = new Date(y, 5, 1); // June 1
        const dow = d.getDay();
        const daysToSun = dow === 0 ? 0 : 7 - dow;
        return new Date(y, 5, 1 + daysToSun + 14); // 3rd Sunday
    }
    let d = getFathersDay(now.getFullYear());
    if (d < today) d = getFathersDay(now.getFullYear() + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function FathersDayPage() {
    return (
        <>
            <EventDetail
                name="Father's Day"
                description="Third Sunday in June — a day to honour dads everywhere."
                emoji="👔"
                tone="blue"
                targetDate={nextFathersDay()}
            />
            <Footer />
        </>
    );
}
