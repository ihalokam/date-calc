const TOOLS = [
    {
        href: "/",
        label: "Date calculator",
        description: "Calculate days, weeks, months and years betweeen two dates",
    },


] as const;

export default function ToolsGrid() {
    return (
        <section className="mx-auto max-w-2xl px-4 py-10">
            <h2 className="mb-4 text-lg font-medium text-neutral-900">
                Explore related tools
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
}