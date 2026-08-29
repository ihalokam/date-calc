const TOOLS = [
    {
        href: "/time-duration-calculator",
        label: "Time duration calculator",
        description: "Calculate hours and minutes between two times.",
    },
    {
        href: "/countdown",
        label: "Countdown",
        description: "Countdown to a specific date.",
    },
    {
        href: "/countdown/days-until-christmas",
        label: "Days until Christmas",
        description: "Countdown to Christmas.",
    },
    {
        href: "/countdown/days-until-diwali",
        label: "Days until Diwali",
        description: "Countdown to Diwali.",
    },
    {
        href: "/countdown/days-until-easter",
        label: "Days until Easter",
        description: "Countdown to Easter.",
    },
    {
        href: "/countdown/days-until-eid-al-adha",
        label: "Days until Eid al-Adha",
        description: "Countdown to Eid al-Adha.",
    },
    {
        href: "/countdown/days-until-fathers-day",
        label: "Days until Father's Day",
        description: "Countdown to Father's Day.",
    },
    {
        href: "/countdown/days-until-friendship-day",
        label: "Days until Friendship Day",
        description: "Countdown to Friendship Day.",
    },
    {
        href: "/countdown/days-until-halloween",
        label: "Days until Halloween",
        description: "Countdown to Halloween.",
    },
    {
        href: "/countdown/days-until-holi",
        label: "Days until Holi",
        description: "Countdown to Holi.",
    },
    {
        href: "/countdown/days-until-hug-day",
        label: "Days until Hug Day",
        description: "Countdown to Hug Day.",
    },
    {
        href: "/countdown/days-until-independence-day",
        label: "Days until Independence Day",
        description: "Countdown to Independence Day.",
    },
    {
        href: "/countdown/days-until-independence-day-india",
        label: "Days until Independence Day India",
        description: "Countdown to Independence Day India.",
    },
    {
        href: "/countdown/days-until-kiss-day",
        label: "Days until Kiss Day",
        description: "Countdown to Kiss Day.",
    },
    {
        href: "/countdown/days-until-labor-day-us",
        label: "Days until Labor Day US",
        description: "Countdown to Labor Day US.",
    },
    {
        href: "/countdown/days-until-mothers-day",
        label: "Days until Mother's Day",
        description: "Countdown to Mother's Day.",
    },
    {
        href: "/countdown/days-until-new-year",
        label: "Days until New Year",
        description: "Countdown to New Year.",
    },
    {
        href: "/countdown/days-until-republic-day-india",
        label: "Days until Republic Day India",
        description: "Countdown to Republic Day India.",
    },
    {
        href: "/countdown/days-until-thanksgiving",
        label: "Days until Thanksgiving",
        description: "Countdown to Thanksgiving.",
    },
    {
        href: "/countdown/days-until-valentines-day",
        label: "Days until Valentine's Day",
        description: "Countdown to Valentine's Day.",
    },

] as const;

export default function ToolsGrid() {

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


    return null;
}