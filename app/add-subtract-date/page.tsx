import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/Components/HeaderNFooter/Navbar";
import Footer from "@/app/Components/HeaderNFooter/Footer";
import { shiftDate, formatLong, type DateUnit } from "@/lib/date-utils";

interface Props {
    searchParams: Promise<{ base?: string; amount?: string; unit?: string; dir?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { base, amount, unit, dir } = await searchParams;
    const direction = dir === "-1" ? "subtract" : "add";
    return {
        title: `${direction === "add" ? "Add" : "Subtract"} ${amount} ${unit} ${direction === "add" ? "to" : "from"} ${base ?? "?"} — Date Calculator`,
        description: `Result of ${direction === "add" ? "adding" : "subtracting"} ${amount} ${unit} ${direction === "add" ? "to" : "from"} ${base}.`,
    };
}

const VALID_UNITS = ["days", "weeks", "months", "years"];

function parseISO(v: string) {
    return new Date(`${v}T00:00:00`);
}

export default async function AddSubtractDatePage({ searchParams }: Props) {
    const { base, amount: amountStr, unit, dir } = await searchParams;
    const amount = Number(amountStr ?? "0");
    const direction = dir === "-1" ? -1 : 1;

    const isValid =
        base &&
        /^\d{4}-\d{2}-\d{2}$/.test(base) &&
        !isNaN(amount) &&
        unit &&
        VALID_UNITS.includes(unit);

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

    const baseDate = parseISO(base);
    const result = shiftDate(baseDate, amount * direction, unit as DateUnit);
    const dirLabel = direction === 1 ? "Add" : "Subtract";
    const dirPrep = direction === 1 ? "to" : "from";

    return (
        <main className="flex min-h-screen flex-col">
            <Navbar />

            <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
                <nav className="mb-6 text-sm text-neutral-500">
                    <Link href="/" className="hover:text-neutral-800">Home</Link>
                    <span className="mx-2">/</span>
                    <span>Add / subtract date</span>
                </nav>

                <h1 className="text-2xl font-semibold text-neutral-900">
                    {dirLabel} {amount} {unit} {dirPrep} {formatLong(baseDate)}
                </h1>

                {/* Main result */}
                <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
                    <p className="text-sm text-neutral-500">Result</p>
                    <p className="mt-2 text-4xl font-medium text-neutral-900">{formatLong(result)}</p>
                </div>

                {/* Details */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                        { label: "Start date", value: formatLong(baseDate) },
                        { label: "Operation", value: `${dirLabel} ${amount} ${unit}` },
                        { label: "Result date", value: formatLong(result) },
                    ].map(({ label, value }) => (
                        <div key={label} className="rounded-xl border border-neutral-100 bg-neutral-50 px-3 py-3 text-center">
                            <div className="text-xs text-neutral-500">{label}</div>
                            <div className="mt-1 text-sm font-semibold text-neutral-800 break-words">{value}</div>
                        </div>
                    ))}
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
