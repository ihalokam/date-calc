"use client";

import Navbar from "@/app/Components/HeaderNFooter/Navbar";
import Footer from "@/app/Components/HeaderNFooter/Footer";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type EventTone =
    | "blue" | "emerald" | "amber" | "rose" | "violet"
    | "orange" | "sky" | "pink" | "green" | "red";

interface EventDetailProps {
    name: string;
    description: string;
    emoji: string;
    tone: EventTone;
    targetDate: string; // ISO date string e.g. "2025-12-25"
    approximate?: boolean;
}

const TONE_THEME: Record<
    EventTone,
    { gradient: string; badge: string; ring: string; text: string; particle: string }
> = {
    emerald: {
        gradient: "linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 100%)",
        badge: "bg-emerald-100 text-emerald-800",
        ring: "ring-emerald-300",
        text: "text-emerald-300",
        particle: "#6ee7b7",
    },
    violet: {
        gradient: "linear-gradient(135deg, #2e1065 0%, #3b0764 40%, #4c1d95 100%)",
        badge: "bg-violet-100 text-violet-800",
        ring: "ring-violet-300",
        text: "text-violet-300",
        particle: "#c4b5fd",
    },
    amber: {
        gradient: "linear-gradient(135deg, #451a03 0%, #78350f 40%, #92400e 100%)",
        badge: "bg-amber-100 text-amber-800",
        ring: "ring-amber-300",
        text: "text-amber-300",
        particle: "#fcd34d",
    },
    rose: {
        gradient: "linear-gradient(135deg, #4c0519 0%, #881337 40%, #9f1239 100%)",
        badge: "bg-rose-100 text-rose-800",
        ring: "ring-rose-300",
        text: "text-rose-300",
        particle: "#fda4af",
    },
    blue: {
        gradient: "linear-gradient(135deg, #0c1445 0%, #1e3a8a 40%, #1d4ed8 100%)",
        badge: "bg-blue-100 text-blue-800",
        ring: "ring-blue-300",
        text: "text-blue-300",
        particle: "#93c5fd",
    },
    orange: {
        gradient: "linear-gradient(135deg, #431407 0%, #7c2d12 40%, #9a3412 100%)",
        badge: "bg-orange-100 text-orange-800",
        ring: "ring-orange-300",
        text: "text-orange-300",
        particle: "#fdba74",
    },
    sky: {
        gradient: "linear-gradient(135deg, #082f49 0%, #0c4a6e 40%, #0369a1 100%)",
        badge: "bg-sky-100 text-sky-800",
        ring: "ring-sky-300",
        text: "text-sky-300",
        particle: "#7dd3fc",
    },
    pink: {
        gradient: "linear-gradient(135deg, #500724 0%, #831843 40%, #9d174d 100%)",
        badge: "bg-pink-100 text-pink-800",
        ring: "ring-pink-300",
        text: "text-pink-300",
        particle: "#f9a8d4",
    },
    green: {
        gradient: "linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 100%)",
        badge: "bg-green-100 text-green-800",
        ring: "ring-green-300",
        text: "text-green-300",
        particle: "#86efac",
    },
    red: {
        gradient: "linear-gradient(135deg, #450a0a 0%, #7f1d1d 40%, #991b1b 100%)",
        badge: "bg-red-100 text-red-800",
        ring: "ring-red-300",
        text: "text-red-300",
        particle: "#fca5a5",
    },
};

function calcCountdown(targetISO: string) {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(`${targetISO}T00:00:00`);
    const diff = target.getTime() - todayStart.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const label = target.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
    return { days, label };
}

function AnimatedNumber({ value }: { value: number }) {
    const [display, setDisplay] = useState(value);
    const prev = useRef(value);

    useEffect(() => {
        if (prev.current === value) return;
        const start = prev.current;
        const end = value;
        const duration = 600;
        const startTime = performance.now();
        function tick(now: number) {
            const t = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(start + (end - start) * eased));
            if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        prev.current = value;
    }, [value]);

    return <>{display.toLocaleString()}</>;
}

export default function EventDetail({
    name,
    description,
    emoji,
    tone,
    targetDate,
    approximate,
}: EventDetailProps) {
    const theme = TONE_THEME[tone];
    const { days, label } = calcCountdown(targetDate);

    return (
        <>
            <Navbar />
            <main>
                {/* Hero banner */}
                <div
                    className="relative flex min-h-[340px] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center"
                    style={{ background: theme.gradient }}
                >
                    {/* Subtle radial glow overlay */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)`,
                        }}
                    />

                    {/* Floating emoji */}
                    <span
                        className="relative mb-4 text-5xl"
                        style={{ filter: "drop-shadow(0 0 18px rgba(255,255,255,0.25))" }}
                    >
                        {emoji}
                    </span>

                    {/* Back link */}
                    <Link
                        href="/countdown"
                        className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        All countdowns
                    </Link>

                    <h1 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                        Days Until {name}
                    </h1>
                    <p className={`relative mt-2 max-w-md text-sm leading-relaxed sm:text-base ${theme.text}`}>
                        {description}
                    </p>
                </div>

                {/* Countdown card */}
                <div className="mx-auto -mt-10 max-w-md px-4">
                    <div className={`relative rounded-3xl border-2 bg-white p-8 text-center shadow-xl ${theme.ring}`}>
                        {days === 0 ? (
                            <p className="text-3xl font-extrabold text-neutral-900">🎉 Today!</p>
                        ) : days < 0 ? (
                            <p className="text-2xl font-bold text-neutral-500">Event has passed</p>
                        ) : (
                            <>
                                <span className="block text-6xl font-extrabold tabular-nums tracking-tighter text-neutral-900 sm:text-7xl">
                                    <AnimatedNumber value={days} />
                                </span>
                                <span className="mt-1 block text-sm font-medium uppercase tracking-widest text-neutral-400">
                                    days to go
                                </span>
                            </>
                        )}

                        <p className="mt-5 text-sm font-medium text-neutral-500">
                            {label}
                        </p>

                        {approximate && (
                            <p className="mt-2 text-xs text-neutral-400">
                                ⚠️ Approximate — subject to official moon sighting
                            </p>
                        )}
                    </div>
                </div>

                {/* Spacer */}
                <div className="py-16" />
            </main>
            <Footer />
        </>
    );
}
