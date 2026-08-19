const TOOLS = [
    {
        href: "/business-days-calculator",
        label: "Business days calculator",
        description: "Skip weekends and holidays",
    },
    {
        href: "/age-calculator",
        label: "Age calculator",
        description: "Your exact age in years, months, days",
    },
    {
        href: "/days-until",
        label: "Countdown",
        description: "Days until any date or event",
    },
    {
        href: "/week-number-calculator",
        label: "Week number",
        description: "Find the ISO week for any date",
    },
    {
        href: "/day-of-the-week-calculator",
        label: "Day of the week",
        description: "What day a date falls on",
    },
    {
        href: "/calendar",
        label: "Printable calendar",
        description: "Any month or year",
    },
] as const;

export default function ToolsGrid() {
    /*
    return (
        <section className="mx-auto max-w-2xl px-4 py-10">
            <h2 className="mb-4 text-lg font-medium text-neutral-900">
                Explore other date tools
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {TOOLS.map((tool) => (
                    <a
                        key={tool.href}
                        href={tool.href}
                        className="rounded-xl border border-neutral-200 p-4 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                    >
                        <div className="text-sm font-medium text-neutral-900">
                            {tool.label}
                        </div>
                        <div className="mt-1 text-xs text-neutral-500">
                            {tool.description}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
    */

    return null;
}