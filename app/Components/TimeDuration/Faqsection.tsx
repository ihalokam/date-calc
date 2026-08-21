const FAQS = [
    {
        q: "What is this time duration calculator for?",
        a: "It finds the amount of time between two clock times — in hours and minutes, and as decimal hours — and includes a payroll mode that deducts unpaid breaks and flags overtime, plus a quick shortcut for \"how long until\" or \"how long since\" a time today.",
    },
    {
        q: "Should I round to the nearest quarter hour for payroll?",
        a: "Some employers round to the nearest 6, 15, or 30 minutes for payroll simplicity, while others pay exact minutes worked. This calculator gives you the exact, unrounded duration — round afterward according to your employer's or payroll provider's policy, since rounding rules vary and aren't standardized.",
    },
    {
        q: "Decimal hours vs. hh:mm — which do QuickBooks, Gusto, or ADP expect?",
        a: "Most payroll platforms, including QuickBooks, Gusto, and ADP, expect hours logged in decimal form (e.g. 8.75 hours), not hours-and-minutes format (8h 45m). This calculator shows both, with a one-click \"copy decimal\" button for pasting straight into timesheet fields.",
    },
    {
        q: "How does this handle an overnight shift?",
        a: "If your end time is earlier than your start time, the calculator assumes the shift crosses midnight into the next day rather than returning a negative result — a 10:00 PM to 6:00 AM shift correctly calculates as 8 hours.",
    },
    {
        q: "Does this account for daylight saving time?",
        a: "Yes. If a calculated span crosses a daylight saving transition, the result is adjusted automatically and a note appears letting you know the span included a DST change.",
    },
    {
        q: "Is my time data sent to a server?",
        a: "No. All calculations run locally in your browser using JavaScript. Nothing you enter is transmitted or stored.",
    },
] as const;

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