import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/Components/HeaderNFooter/Navbar";
import Footer from "@/app/Components/HeaderNFooter/Footer";
import { shiftDate, formatLong } from "@/lib/date-utils";

interface Props {
    params: Promise<{ amount: string }>;
    searchParams: Promise<{ unit?: string; dir?: string }>;
}

type ShortcutUnit = "days" | "weeks" | "months";
const VALID_UNITS: ShortcutUnit[] = ["days", "weeks", "months"];

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { amount } = await params;
    const { unit = "days", dir } = await searchParams;
    const direction = dir === "-1" ? "subtract" : "add";
    return {
        title: `${direction === "add" ? "Add" : "Subtract"} ${amount} ${unit} from today — Date Calculator`,
        description: `The date that is ${amount} ${unit} ${direction === "add" ? "from" : "before"} today.`,
    };
}

export default async function DaysFromTodayPage({ params, searchParams }: Props) {
    const { amount: amountStr } = await params;
    const { unit = "days", dir } = await searchParams;
    const amount = Number(amountStr);
    const direction = dir === "-1" ? -1 : 1;

    const isValid = !isNaN(amount) && amount >= 0 && VALID_UNITS.includes(unit as ShortcutUnit);

    if (!isValid) {
        return (
            <main className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
                    <h1 className="text-2xl font-semibold text-neutral-800">Invalid parameters</h1>
                    <p className="text-neutral-500">The URL parameters are missing or invalid.</p>
                    <Link href="/" className="mt-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700">
                        Back to calculator
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    const today = new Date();
    const result = shiftDate(today, amount * direction, unit as ShortcutUnit);
    const dirLabel = direction === 1 ? "from" : "before";

    return (
        <main className="flex min-h-screen flex-col">
            <Navbar />

            <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
                <nav className="mb-6 text-sm text-neutral-500">
                    <Link href="/" className="hover:text-neutral-800">Home</Link>
                    <span className="mx-2">/</span>
                    <span>Days from today</span>
                </nav>

                <h1 className="text-2xl font-semibold text-neutral-900">
                    {amount} {unit} {dirLabel} today
                </h1>

                {/* Main result */}
                <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
                    <p className="text-sm text-neutral-500">Result</p>
                    <p className="mt-2 text-4xl font-medium text-neutral-900">{formatLong(result)}</p>
                </div>

                {/* Details */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3">
                        <div className="text-xs text-neutral-500">Today</div>
                        <div className="mt-0.5 font-medium text-neutral-800">{formatLong(today)}</div>
                    </div>
                    <div className="rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3">
                        <div className="text-xs text-neutral-500">Offset</div>
                        <div className="mt-0.5 font-medium text-neutral-800">
                            {direction === 1 ? "+" : "−"}{amount} {unit}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                    <Link
                        href="/"
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
