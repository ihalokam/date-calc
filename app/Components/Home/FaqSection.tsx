const FAQS = [
    {
        q: "What is datecalculator.site?",
        a: "datecalculator.site is a free set of date calculation tools. On this homepage you can find the number of days between two dates, add or subtract time from a date, and jump to common shortcuts like 30, 60, or 90 days from today — all in one place, calculated instantly in your browser.",
    },
    {
        q: "How do I calculate the number of days between two dates?",
        a: "Open the \"Days between\" tab, pick a start date and an end date, and the total number of days appears immediately, along with a breakdown into years, months, and weeks, plus business days and the day of the week each date falls on.",
    },
    {
        q: "How do I calculate the number of weeks between two dates?",
        a: "Use the \"Days between\" tab the same way — the result includes a weeks-and-days breakdown alongside the total day count, so you don't need a separate weeks-only calculator.",
    },
    {
        q: "What does the add/subtract date tool do?",
        a: "The \"Add/subtract\" tab takes a starting date plus a number of days, weeks, months, or years, and gives you the resulting date — useful for things like working out a deadline, a due date, or an anniversary a set amount of time from a known date.",
    },
    {
        q: "What does the quick shortcuts tool do?",
        a: "The \"Quick shortcuts\" tab gives you one-click answers for common intervals like 30, 60, or 90 days from today, plus a custom field if you need a different number of days, weeks, or months — no need to look up today's date and do the math yourself.",
    },
    {
        q: "What makes this date calculator better?",
        a: "It's fast, accurate across leap years and variable month lengths, and runs entirely in your browser with no data sent to a server. The three tools — days between, add/subtract, and quick shortcuts — cover most real-world date questions from a single page, with extra detail like business days and day-of-week included by default rather than hidden behind extra clicks.",
    },
    {
        q: "Does the days-between calculation include the end date?",
        a: "No. The result is the number of days from the start date up to but not including the end date — the same convention used for lease terms, age, and most legal deadlines. If you need an inclusive count, add one day to the result.",
    },
    {
        q: "What's the difference between calendar days and business days?",
        a: "Calendar days count every day, including weekends. Business days exclude Saturdays and Sundays. Contract deadlines, payment terms, and legal filing windows often specify one or the other explicitly — check the relevant document before assuming.",
    },
    {
        q: "Why does adding one month sometimes change the day of the month?",
        a: "Months have different lengths. Adding one month to January 31 can't land on February 31, since it doesn't exist — this calculator rolls forward to the last valid day of the target month (February 28, or 29 in a leap year).",
    },
    {
        q: "Is my date data sent to a server?",
        a: "No. All calculations run locally in your browser using JavaScript. Nothing about the dates you enter is transmitted or stored.",
    },
] as const;
/** Exported so page.tsx can reuse the same data for FAQPage JSON-LD without duplicating content. */
export { FAQS };

export default function FaqSection() {
    return (
        <section className="mx-auto max-w-2xl px-4 pb-16">
            <h2 className="mb-3 text-lg font-medium text-neutral-900">
                Common questions
            </h2>
            <div className="divide-y divide-neutral-200 border-t border-neutral-200">
                {FAQS.map((item) => (
                    <details key={item.q} className="group py-3">
                        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-neutral-900">
                            {item.q}
                            <span className="ml-4 text-neutral-400 transition-transform group-open:rotate-180">
                                ⌄
                            </span>
                        </summary>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                            {item.a}
                        </p>
                    </details>
                ))}
            </div>
        </section>
    );
}