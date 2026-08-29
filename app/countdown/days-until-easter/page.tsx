import type { Metadata } from "next";
import EventDetail from "@/app/Components/countdown/EventDetail";
import Footer from "@/app/Components/HeaderNFooter/Footer";

export const metadata: Metadata = {
    title: "Days Until Easter — Live Countdown to Easter Sunday",
    description: "How many days until Easter? Countdown to Easter Sunday — date calculated automatically each year.",
    alternates: { canonical: "https://datecalculator.site/countdown/days-until-easter" },
};

function getEasterDate(year: number): Date {
    const a = year % 19, b = Math.floor(year / 100), c = year % 100;
    const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4), k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day);
}

function nextEaster(): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let d = getEasterDate(now.getFullYear());
    if (d < today) d = getEasterDate(now.getFullYear() + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function EasterPage() {
    return (
        <>
            <EventDetail
                name="Easter"
                description="Western Easter Sunday — the date shifts every year with the lunar calendar."
                emoji="🐣"
                tone="violet"
                targetDate={nextEaster()}
            />
            <Footer />
        </>
    );
}
