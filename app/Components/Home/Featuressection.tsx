import ScrollReveal from "@/app/Components/shared/Scrollreveal";

const FEATURES = [
    {
        tone: "blue" as const,
        title: "Days Between Two Dates",
        tagline: "The exact days, weeks, and months between any two dates.",
        bestFor: ["Contract deadlines", "Age gaps", "Trip planning", "Legal filing windows"],
        description:
            "Pick a start date and an end date and get the total day count instantly, broken down into years, months, and days, plus a separate weeks-and-days count. Business days and the day of the week for each date are included by default, not hidden behind an extra click.",
        example: { input: "Aug 19 → Nov 17, 2026", output: "90 days · 0 yr 2 mo 29 d · 12 wks 6 d" },
        icon: (
            <path d="M2 3.5A1 1 0 0 1 3 2.5h10a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-9Z M2 6h12 M5 2v2 M11 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        ),
    },
    {
        tone: "emerald" as const,
        title: "Add / Subtract",
        tagline: "Add or subtract days, weeks, months, or years from any date.",
        bestFor: ["Due dates", "Anniversaries", "Warranty expiration", "Follow-up reminders"],
        description:
            "Enter a starting date, a duration, and a unit, then add or subtract — the resulting date appears instantly. Correctly handles month-length differences, so adding one month to January 31 rolls forward to February 28 (or 29 in a leap year) instead of returning an invalid date.",
        example: { input: "Aug 19, 2026 + 90 days", output: "Tuesday, November 17, 2026" },
        icon: (
            <path d="M8 3v5 M5.5 5.5h5 M5 12h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        ),
    },
    {
        tone: "amber" as const,
        title: "Quick Shortcuts",
        tagline: "Instant answers for common intervals like 30, 60, or 90 days from today.",
        bestFor: ["Return policy deadlines", "Escrow & loan terms", "Custom day/week/month offsets"],
        description:
            "One-click chips for the most common intervals people search for, plus a custom field for any amount in days, weeks, or months. Results compute instantly from today's date with no page reload — click a preset or type your own and get a real date back immediately.",
        example: { input: "+90 days from today", output: "Nov 17, 2026 (Tue)" },
        icon: (
            <path d="M9 2 4 9h3l-1 5 6-8H9l1-4Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        ),
    },
];

const TONE_STYLES: Record<"blue" | "emerald" | "amber", { badge: string; ring: string }> = {
    blue: { badge: "bg-blue-50 text-blue-700", ring: "group-hover:border-blue-200" },
    emerald: { badge: "bg-emerald-50 text-emerald-700", ring: "group-hover:border-emerald-200" },
    amber: { badge: "bg-amber-50 text-amber-700", ring: "group-hover:border-amber-200" },
};

export default function FeaturesSection() {
    return (
        <section className="mx-auto max-w-4xl px-4 py-14">
            <div className="mb-9 text-center">
                <h2 className="text-lg font-medium text-neutral-900">
                    Our Date Calculator's Features
                </h2>
                <p className="mx-auto mt-1 max-w-md text-sm text-neutral-500">
                    Each mode is built for a different way people actually ask
                    &quot;what date is that&quot; — pick the one that matches what
                    you&apos;re trying to do.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {FEATURES.map((feature, i) => {
                    const tone = TONE_STYLES[feature.tone];
                    return (
                        <ScrollReveal key={feature.title} delayMs={i * 120}>
                            <article
                                className={`group h-full rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_1px_0_0_rgba(0,0,0,0.04)] ${tone.ring}`}
                            >
                                <span
                                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${tone.badge}`}
                                    aria-hidden="true"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        {feature.icon}
                                    </svg>
                                </span>

                                <h3 className="mt-4 text-base font-medium text-neutral-900">
                                    {feature.title}
                                </h3>
                                <p className="mt-1 text-sm text-neutral-500">{feature.tagline}</p>

                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {feature.bestFor.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                                    {feature.description}
                                </p>

                                <details className="group/details mt-4 border-t border-neutral-100 pt-3">
                                    <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-medium text-neutral-500 hover:text-neutral-900">
                                        See a worked example
                                        <span className="text-neutral-400 transition-transform group-open/details:rotate-180">
                                            ⌄
                                        </span>
                                    </summary>
                                    <div className="mt-2 rounded-lg bg-neutral-50 px-3 py-2 text-xs">
                                        <div className="text-neutral-500">{feature.example.input}</div>
                                        <div className="mt-0.5 font-medium tabular-nums text-neutral-900">
                                            {feature.example.output}
                                        </div>
                                    </div>
                                </details>
                            </article>
                        </ScrollReveal>
                    );
                })}
            </div>
        </section>
    );
}