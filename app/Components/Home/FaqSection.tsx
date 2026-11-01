const FAQS = [
    {
        q: "How do I calculate the number of days between two dates?",
        a: "Open the \"Days between\" tab, pick a start date and an end date, and the total number of days appears immediately — broken down into years, months, days, and weeks. Business days and the day of the week for each date are shown automatically.",
    },
    {
        q: "What date is 30 days from today?",
        a: "Use the \"Quick shortcuts\" tab and click the \"30 days\" chip — the result date is calculated from today's date instantly. You can also use the \"Add/subtract\" tab: set today as the start date, enter 30, choose \"days\", and hit Add.",
    },
    {
        q: "What date is 90 days from today?",
        a: "Open the \"Quick shortcuts\" tab and click the \"90 days\" chip. The exact date 90 calendar days from today will appear immediately, including the day of the week.",
    },
    {
        q: "How many days is 3 months?",
        a: "It depends on which 3 months. Three calendar months can be 89, 90, 91, or 92 days depending on whether February or a 31-day month is included. Use the \"Days between\" tab with your specific start date to get the precise count for your situation.",
    },
    {
        q: "How do I add days to a date?",
        a: "Open the \"Add/subtract\" tab, enter your starting date, type the number of days you want to add, make sure \"days\" is selected as the unit, and click Add. The resulting date appears immediately, corrected for month lengths and leap years.",
    },
    {
        q: "Does the days-between calculation include the end date?",
        a: "No. The result is the number of days from the start date up to but not including the end date — the same convention used for lease terms, age calculations, and most legal deadlines. If you need an inclusive count, add one day to the result.",
    },
    {
        q: "What's the difference between calendar days and business days?",
        a: "Calendar days count every day including weekends. Business days exclude Saturdays and Sundays. Contract deadlines, payment terms, and legal filing windows often specify one or the other explicitly — check the relevant document before assuming.",
    },
    {
        q: "How many weeks between two dates?",
        a: "Use the \"Days between\" tab — the result automatically includes a weeks-and-days breakdown alongside the total day count. For example, 90 days displays as 12 weeks and 6 days.",
    },
    {
        q: "Why does adding one month sometimes change the day of the month?",
        a: "Months have different lengths. Adding one month to January 31 can't land on February 31 since it doesn't exist — this calculator rolls forward to the last valid day of the target month (February 28, or 29 in a leap year).",
    },
    {
        q: "Is my date data sent to a server?",
        a: "No. All calculations run locally in your browser using JavaScript. Nothing about the dates you enter is transmitted or stored anywhere.",
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