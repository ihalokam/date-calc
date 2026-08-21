import ScrollReveal from "@/app/Components/shared/Scrollreveal";

const FEATURES = [
    {
        tone: "blue" as const,
        title: "Time Between Two Times",
        tagline: "The exact hours and minutes between any two clock times.",
        bestFor: ["Meeting length", "Flight duration", "Study sessions", "Overnight shifts"],
        description:
            "Enter a start time and an end time and get the duration instantly, shown as hours and minutes, decimal hours, and total minutes at once. Handles spans that cross midnight automatically — a 10:00 PM to 6:00 AM overnight shift correctly returns 8 hours without any extra setting to flag.",
        example: { input: "9:00 AM → 5:45 PM", output: "8h 45m · 8.75 hrs · 525 min" },
        icon: (
            <path d="M8 3v5l3.5 2M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        ),
    },
    {
        tone: "emerald" as const,
        title: "Payroll & Work Hours",
        tagline: "Net work hours after breaks, with automatic overtime detection.",
        bestFor: ["Freelancers", "Hourly employees", "Timesheet entry", "Overtime tracking"],
        description:
            "Built for logging actual paid hours, not just raw clock time. Enter a start and end time, subtract an unpaid break, and set an optional daily overtime threshold — the calculator returns net hours in decimal form, ready to paste into QuickBooks, Gusto, ADP, or any timesheet that expects decimal hours instead of hours-and-minutes.",
        example: { input: "9:00 AM → 5:45 PM, 45 min break", output: "8.00 hrs net" },
        icon: (
            <path d="M2 6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6Z M5.5 5V3.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        ),
    },
    {
        tone: "amber" as const,
        title: "Time Until / Time Since",
        tagline: "How long until an upcoming time, or how long since a past one.",
        bestFor: ["Countdown to a deadline today", "Elapsed-time tracking", "Quick reminders"],
        description:
            "A single time field, one toggle. Pick a time today and instantly see how many hours and minutes remain until it happens, or how much time has passed since it occurred — no need to manually check the current time and subtract by hand.",
        example: { input: "Until 6:00 PM (now 2:15 PM)", output: "3h 45m remaining" },
        icon: (
            <path d="M4 2h8 M4 14h8 M5 2c0 4 3 4 3 6s-3 2-3 6 M11 2c0 4-3 4-3 6s3 2 3 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
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
                    Our Time Duration Calculator's Features
                </h2>
                <p className="mx-auto mt-1 max-w-md text-sm text-neutral-500">
                    Each mode is built for a different way people actually ask
                    &quot;how much time is that&quot; — pick the one that matches
                    what you&apos;re trying to do.
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