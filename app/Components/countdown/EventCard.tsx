import Link from "next/link";
import type { CountdownEvent } from "@/lib/countdown/countdown-events";

const TONE_STYLES: Record<CountdownEvent["tone"], { badge: string; ring: string }> = {
    blue: { badge: "bg-blue-50 text-blue-700", ring: "group-hover:border-blue-200" },
    emerald: { badge: "bg-emerald-50 text-emerald-700", ring: "group-hover:border-emerald-200" },
    amber: { badge: "bg-amber-50 text-amber-700", ring: "group-hover:border-amber-200" },
    rose: { badge: "bg-rose-50 text-rose-700", ring: "group-hover:border-rose-200" },
    violet: { badge: "bg-violet-50 text-violet-700", ring: "group-hover:border-violet-200" },
    orange: { badge: "bg-orange-50 text-orange-700", ring: "group-hover:border-orange-200" },
    sky: { badge: "bg-sky-50 text-sky-700", ring: "group-hover:border-sky-200" },
    pink: { badge: "bg-pink-50 text-pink-700", ring: "group-hover:border-pink-200" },
    green: { badge: "bg-green-50 text-green-700", ring: "group-hover:border-green-200" },
    red: { badge: "bg-red-50 text-red-700", ring: "group-hover:border-red-200" },
};

export default function EventCard({ event }: { event: CountdownEvent }) {
    const tone = TONE_STYLES[event.tone];

    return (
        <Link
            href={`/countdown/${event.slug}`}
            className={`group flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 ${tone.ring}`}
        >
            <div>
                <h3 className="text-base font-medium text-neutral-900">{event.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">{event.description}</p>
            </div>

            <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5 ${tone.badge}`}
                aria-hidden="true"
            >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
        </Link>
    );
}