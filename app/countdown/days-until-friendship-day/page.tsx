import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";
import Footer from "@/app/Components/HeaderNFooter/Footer";

export const metadata: Metadata = {
    title: "Days Until Friendship Day — Live Countdown",
    description: "How many days until Friendship Day? Countdown to the first Sunday of August.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-friendship-day" },
};

/** First Sunday of August */
function nextFriendshipDay(): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    function getDay(y: number): Date {
        const d = new Date(y, 7, 1); // Aug 1
        const dow = d.getDay();
        const daysToSun = dow === 0 ? 0 : 7 - dow;
        return new Date(y, 7, 1 + daysToSun);
    }
    let d = getDay(now.getFullYear());
    if (d < today) d = getDay(now.getFullYear() + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function FriendshipDayPage() {
    return (
        <>
            <EventDetail
                name="Friendship Day"
                description="First Sunday of August — celebrate the people who make life better."
                emoji="🤝"
                tone="amber"
                targetDate={nextFriendshipDay()}
            />
            <Footer />
        </>
    );
}
