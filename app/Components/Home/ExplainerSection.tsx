export default function ExplainerSection() {
    return (
        <section className="mx-auto max-w-2xl px-4 py-10">
            <h2 className="mb-3 text-lg font-medium text-neutral-900">
                How the calculation works
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-neutral-600">
                <p>
                    Counting days sounds simple until you hit a month with 28 days
                    instead of 30, or a leap year that adds one back in. This
                    calculator uses the actual Gregorian calendar, not a fixed
                    30-day-month approximation, so results stay accurate across
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
                    Business day counts exclude Saturdays and Sundays by default. For
                    calculations that also need to exclude public holidays for a
                    specific country, use the{" "}
                    <a
                        href="/business-days-calculator"
                        className="text-neutral-900 underline underline-offset-2"
                    >
                        business days calculator
                    </a>
                    .
                </p>
            </div>
        </section>
    );
}