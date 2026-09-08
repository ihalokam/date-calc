import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/Components/HeaderNFooter/Navbar";
import Footer from "@/app/Components/HeaderNFooter/Footer";
import { getDateDifference } from "@/lib/date-utils";
import { format } from "date-fns";

interface Props {
    searchParams: Promise<{ start?: string; end?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { start, end } = await searchParams;
    return {
        title: `Days between ${start ?? "?"} and ${end ?? "?"} — Date Calculator`,
        description: `Calculate the number of days, weeks, months and years between ${start} and ${end}.`,
    };
}

function parseISO(v: string) {
    return new Date(`${v}T00:00:00`);
}

function formatDisplay(d: Date) {
    return format(d, "EEEE, MMMM d, yyyy");
}

export default async function DaysBetweenPage({ searchParams }: Props) {
    const { start, end } = await searchParams;

    const isValid = start && end && /^\d{4}-\d{2}-\d{2}$/.test(start) && /^\d{4}-\d{2}-\d{2}$/.test(end);

    if (!isValid) {
        return (
            <main className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
                    <h1 className="text-2xl font-semibold text-neutral-800">Invalid dates</h1>
                    <p className="text-neutral-500">The start or end date in the URL is missing or invalid.</p>
                    <Link href="/" className="mt-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700">
                        Back to calculator
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    const startDate = parseISO(start);
    const endDate = parseISO(end);
    const diff = getDateDifference(startDate, endDate);

    const shareUrl = `https://datecalculator.site/days-between-two-dates?start=${start}&end=${end}`;

    return (
        <main className="flex min-h-screen flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: `Days between ${start} and ${end}`,
                        description: `There are ${diff.totalDays} days between ${start} and ${end}.`,
                        url: shareUrl,
                    }),
                }}
            />
            <Navbar />

            <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
                <nav className="mb-6 text-sm text-neutral-500">
                    <Link href="/" className="hover:text-neutral-800">Home</Link>
                    <span className="mx-2">/</span>
                    <span>Days between dates</span>
                </nav>

                <h1 className="text-2xl font-semibold text-neutral-900">
                    Days between {formatDisplay(startDate)} and {formatDisplay(endDate)}
                </h1>

                {/* Main result */}
                <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
                    <p className="text-sm text-neutral-500">Total days</p>
                    <p className="mt-1 text-6xl font-medium tabular-nums text-neutral-900">
                        {diff.totalDays.toLocaleString()}
                    </p>
                    <p className="mt-1 text-lg text-neutral-500">days</p>

                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700">
                            {diff.years} yr &nbsp;·&nbsp; {diff.months} mo &nbsp;·&nbsp; {diff.days} d
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-800">
                            {diff.weeks} wks &nbsp;·&nbsp; {diff.weeksRemainderDays} d
                        </span>
                    </div>
                </div>

                {/* Stat chips */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                        { label: "Business days", value: diff.businessDays.toLocaleString() },
                        { label: "Start falls on", value: diff.startDay },
                        { label: "End falls on", value: diff.endDay },
                    ].map(({ label, value }) => (
                        <div key={label} className="rounded-xl border border-neutral-100 bg-neutral-50 px-3 py-3 text-center">
                            <div className="text-xs text-neutral-500">{label}</div>
                            <div className="mt-1 text-lg font-semibold tabular-nums text-neutral-800">{value}</div>
                        </div>
                    ))}
                </div>

                {/* Dates summary */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3">
                        <div className="text-xs text-neutral-500">Start date</div>
                        <div className="mt-0.5 font-medium text-neutral-800">{formatDisplay(startDate)}</div>
                    </div>
                    <div className="rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3">
                        <div className="text-xs text-neutral-500">End date</div>
                        <div className="mt-0.5 font-medium text-neutral-800">{formatDisplay(endDate)}</div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                    <Link
                        href={`/?tab=between&start=${start}&end=${end}`}
                        className="flex-1 rounded-lg border border-neutral-200 py-2.5 text-center text-sm font-medium hover:bg-neutral-50"
                    >
                        ← Recalculate
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 rounded-lg bg-neutral-900 py-2.5 text-center text-sm font-medium text-white hover:bg-neutral-700"
                    >
                        New calculation
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    );
}
