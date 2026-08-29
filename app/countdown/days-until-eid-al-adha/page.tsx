import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";
import Footer from "@/app/Components/HeaderNFooter/Footer";

export const metadata: Metadata = {
    title: "Days Until Eid al-Adha — Live Countdown",
    description: "How many days until Eid al-Adha? Live countdown based on the Islamic lunar calendar.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-eid-al-adha" },
};

function nextEidAlAdha(): string {
    const lookup: Record<number, string> = {
        2025: "2025-06-06",
        2026: "2026-05-27",
        2027: "2027-05-16",
    };
    const today = new Date();
    const upcoming = Object.values(lookup)
        .map((iso) => new Date(`${iso}T00:00:00`))
        .filter((d) => d >= today)
        .sort((a, b) => a.getTime() - b.getTime());
    const d = upcoming[0] || new Date(2027, 4, 16);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function EidAlAdhaPage() {
    return (
        <>
            <EventDetail
                name="Eid al-Adha"
                description="The Festival of Sacrifice, marking the end of Hajj."
                emoji="🌙"
                tone="amber"
                targetDate={nextEidAlAdha()}
                approximate
            />
            <Footer />
        </>
    );
}
