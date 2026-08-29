import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";
import Footer from "@/app/Components/HeaderNFooter/Footer";
export const metadata: Metadata = {
    title: "Days Until Diwali — Live Countdown to the Festival of Lights",
    description: "How many days until Diwali? Countdown to the Festival of Lights.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-diwali" },
};

function nextDiwali(): string {
    // Diwali dates (lunar-based — updated annually)
    const lookup: Record<number, string> = {
        2024: "2024-11-01",
        2025: "2025-10-20",
        2026: "2026-11-08",
        2027: "2027-10-29",
    };
    const today = new Date();
    const upcoming = Object.values(lookup)
        .map((iso) => new Date(`${iso}T00:00:00`))
        .filter((d) => d >= today)
        .sort((a, b) => a.getTime() - b.getTime());
    const d = upcoming[0] || new Date(2027, 9, 29);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function DiwaliPage() {
    return (
        <>
            <EventDetail
                name="Diwali"
                description="The Festival of Lights — diyas, fireworks, sweets, and joy."
                emoji="🪔"
                tone="amber"
                targetDate={nextDiwali()}
                approximate
            />
            <Footer />
        </>
    );
}
