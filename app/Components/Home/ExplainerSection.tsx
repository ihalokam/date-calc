import Link from "next/link";

export default function ExplainerSection() {
    return (
        <section className="mx-auto max-w-2xl px-4 py-10">
            <h2 className="mb-3 text-lg font-medium text-neutral-900">
                How the date calculation works
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-neutral-600">
                <p>
                    Counting days sounds simple until you hit a month with 28 days
                    instead of 30, or a leap year that adds one back in. This
                    calculator uses the actual Gregorian calendar — not a fixed
                    30-day-month approximation — so results stay accurate across
                    February, leap years, and year boundaries.
                </p>
                <p>
                    Adding a month to a date isn&apos;t always the same number of days.
                    &quot;One month from January 31&quot; is commonly interpreted as
                    February 28 (or 29 in a leap year), since February has no 31st day
                    — the month rolls forward and the day clamps to the last valid
                    date. This calculator follows that convention.
                </p>
                <p>
                    Business day counts exclude Saturdays and Sundays. This matters for
                    contract deadlines, payment terms, court filing windows, and any
                    situation where a document specifies &quot;business days&quot; rather
                    than &quot;calendar days&quot; — always check which one applies to
                    your situation before relying on a count.
                </p>
                <p>
                    Common uses include calculating a 30-, 60-, or 90-day deadline from
                    a contract start date; working out a project timeline in weeks;
                    finding out how many days until a birthday, anniversary, or event;
                    or confirming whether a lease or warranty is still in effect. If you
                    need to calculate hours and minutes between two clock times, use the{" "}
                    <Link
                        href="/time-duration-calculator"
                        className="underline underline-offset-2 hover:text-neutral-900"
                    >
                        time duration calculator
                    </Link>{" "}
                    instead.
                </p>
            </div>
        </section>
    );
}
