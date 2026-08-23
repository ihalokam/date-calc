import Link from "next/link";
import type { CountdownEvent, EventCategory } from "@/lib/countdown/countdown-events";

const CATEGORY_PALETTE: Record<
    EventCategory,
    { heading: string; border: string; glow: string }
> = {
    global: {
        heading: "text-violet-700",
        border: "border-violet-100",
        glow: "rgba(139,92,246,0.08)",
    },
    human: {
        heading: "text-rose-600",
        border: "border-rose-100",
        glow: "rgba(244,63,94,0.07)",
    },
    us: {
        heading: "text-blue-700",
        border: "border-blue-100",
        glow: "rgba(59,130,246,0.07)",
    },
    india: {
        heading: "text-amber-700",
        border: "border-amber-100",
        glow: "rgba(245,158,11,0.09)",
    },
};

const TONE_CARD: Record<
    CountdownEvent["tone"],
    { bg: string; badge: string; arrow: string; glow: string }
> = {
    blue: {
        bg: "hover:bg-blue-50/60",
        badge: "bg-blue-100 text-blue-700",
        arrow: "text-blue-500",
        glow: "#3b82f6",
    },
    emerald: {
        bg: "hover:bg-emerald-50/60",
        badge: "bg-emerald-100 text-emerald-700",
        arrow: "text-emerald-500",
        glow: "#10b981",
    },
    amber: {
        bg: "hover:bg-amber-50/60",
        badge: "bg-amber-100 text-amber-700",
        arrow: "text-amber-500",
        glow: "#f59e0b",
    },
    rose: {
        bg: "hover:bg-rose-50/60",
        badge: "bg-rose-100 text-rose-700",
        arrow: "text-rose-500",
        glow: "#f43f5e",
    },
    violet: {
        bg: "hover:bg-violet-50/60",
        badge: "bg-violet-100 text-violet-700",
        arrow: "text-violet-500",
        glow: "#8b5cf6",
    },
    orange: {
        bg: "hover:bg-orange-50/60",
        badge: "bg-orange-100 text-orange-700",
        arrow: "text-orange-500",
        glow: "#f97316",
    },
    sky: {
        bg: "hover:bg-sky-50/60",
        badge: "bg-sky-100 text-sky-700",
        arrow: "text-sky-500",
        glow: "#0ea5e9",
    },
    pink: {
        bg: "hover:bg-pink-50/60",
        badge: "bg-pink-100 text-pink-700",
        arrow: "text-pink-500",
        glow: "#ec4899",
    },
    green: {
        bg: "hover:bg-green-50/60",
        badge: "bg-green-100 text-green-700",
        arrow: "text-green-500",
        glow: "#22c55e",
    },
    red: {
        bg: "hover:bg-red-50/60",
        badge: "bg-red-100 text-red-700",
        arrow: "text-red-500",
        glow: "#ef4444",
    },
};

interface Props {
    category: EventCategory;
    label: string;
    subtitle: string;
    events: CountdownEvent[];
}

export default function CountdownCategorySection({ category, label, subtitle, events }: Props) {
    const pal = CATEGORY_PALETTE[category];

    return (
        <section aria-labelledby={`cat-${category}`}>
            {/* Section heading */}
            <div className={`mb-5 border-b pb-3 ${pal.border}`}>
                <h2
                    id={`cat-${category}`}
                    className={`text-xl font-bold tracking-tight ${pal.heading}`}
                >
                    {label}
                </h2>
                <p className="mt-0.5 text-sm text-neutral-500">{subtitle}</p>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => {
                    const tone = TONE_CARD[event.tone];
                    return (
                        <Link
                            key={event.slug}
                            href={`/countdown/${event.slug}`}
                            className={`group relative flex items-start gap-3.5 rounded-2xl border border-neutral-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${tone.bg}`}
                            style={{
                                "--glow": tone.glow,
                            } as React.CSSProperties}
                        >
                            {/* Emoji badge */}
                            <span
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl ${tone.badge}`}
                            >
                                {event.emoji}
                            </span>

                            {/* Text */}
                            <div className="min-w-0 flex-1">
                                <h3 className="truncate text-sm font-semibold text-neutral-900">
                                    {event.name}
                                </h3>
                                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-neutral-500">
                                    {event.description}
                                </p>
                            </div>

                            {/* Arrow */}
                            <span
                                className={`shrink-0 self-center transition-transform duration-200 group-hover:translate-x-0.5 ${tone.arrow}`}
                                aria-hidden="true"
                            >
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <path
                                        d="M6 3L11 8L6 13"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
