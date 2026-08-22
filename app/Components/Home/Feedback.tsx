"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FEEDBACK = [
    {
        name: "Michael",
        quote:
            "I was looking for a proper age calculator. Finally found it — thank you.",
    },
    {
        name: "Jessica",
        quote:
            "My mind just can't process day counts that fast, so this tool is genuinely handy for me.",
    },
    {
        name: "Oliver",
        quote:
            "I'm a contract worker and I always mess up dates in my head — this site has exactly what I need.",
    },
    {
        name: "Charlotte",
        quote:
            "Nice, clean experience. I used to work with a cluttered one — I think I found the gem.",
    },
    {
        name: "Isla",
        quote: "Okay, now my schedules are actually on track.",
    },
    {
        name: "Haashir",
        quote:
            "I used to mess up our video shoot schedules. My whole team switched to datecalculator.site — everyone's happy now.",
    },
    {
        name: "Zayed",
        quote: "Now I can actually know how old something is, instantly.",
    },
] as const;

// Rotates a small set of flat accent tints across avatar initials — same
// badge-tint pattern used in the calculator's result breakdown, so the
// palette feels consistent site-wide rather than a one-off.
const PALETTES = [
    "bg-blue-50 text-blue-700",
    "bg-amber-50 text-amber-700",
    "bg-emerald-50 text-emerald-700",
    "bg-rose-50 text-rose-700",
    "bg-violet-50 text-violet-700",
] as const;

const AUTOPLAY_MS = 4000;

export default function Feedback() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    const scrollToIndex = useCallback((index: number) => {
        const track = trackRef.current;
        if (!track) return;
        const slide = track.children[index] as HTMLElement | undefined;
        if (!slide) return;
        track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    }, []);

    // Autoplay — advances one slide at a time, wraps around, pauses on hover/touch
    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setActive((prev) => {
                const next = (prev + 1) % FEEDBACK.length;
                scrollToIndex(next);
                return next;
            });
        }, AUTOPLAY_MS);
        return () => clearInterval(timer);
    }, [paused, scrollToIndex]);

    // Keep the active dot in sync if the user drags/swipes manually
    const handleScroll = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        const { scrollLeft, children } = track;
        let closest = 0;
        let closestDist = Infinity;
        Array.from(children).forEach((child, i) => {
            const dist = Math.abs((child as HTMLElement).offsetLeft - scrollLeft);
            if (dist < closestDist) {
                closestDist = dist;
                closest = i;
            }
        });
        setActive(closest);
    }, []);

    const goTo = (index: number) => {
        const wrapped = (index + FEEDBACK.length) % FEEDBACK.length;
        setActive(wrapped);
        scrollToIndex(wrapped);
    };

    return (
        <section
            className="mx-auto max-w-4xl px-4 py-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
        >
            <div className="mb-8 text-center">
                <h2 className="text-lg font-medium text-neutral-900">
                    What people use it for
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                    Real feedback from people who use these tools regularly.
                </p>
            </div>

            <div className="relative">
                <div
                    ref={trackRef}
                    onScroll={handleScroll}
                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {FEEDBACK.map((item, i) => (
                        <div
                            key={item.name}
                            className="w-[82%] shrink-0 snap-center rounded-2xl border border-neutral-200 bg-white p-6 sm:w-[46%] lg:w-[31%]"
                        >
                            <p className="min-h-[4.5rem] text-sm leading-relaxed text-neutral-700">
                                &ldquo;{item.quote}&rdquo;
                            </p>
                            <div className="mt-5 flex items-center gap-2.5">
                                <span
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${PALETTES[i % PALETTES.length]
                                        }`}
                                    aria-hidden="true"
                                >
                                    {item.name.charAt(0)}
                                </span>
                                <span className="text-sm font-medium text-neutral-900">
                                    {item.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Arrow controls — hidden on small screens, swipe handles it there */}
                <button
                    onClick={() => goTo(active - 1)}
                    aria-label="Previous testimonial"
                    className="absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-2 text-neutral-500 hover:text-neutral-900 sm:block"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M10 3L5 8L10 13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <button
                    onClick={() => goTo(active + 1)}
                    aria-label="Next testimonial"
                    className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-2 text-neutral-500 hover:text-neutral-900 sm:block"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M6 3L11 8L6 13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            {/* Dots — each button has a 24×24px hit area (WCAG touch-target
          minimum) even though the visible pill inside stays small. */}
            <div className="mt-5 flex justify-center gap-0.5">
                {FEEDBACK.map((item, i) => (
                    <button
                        key={item.name}
                        onClick={() => goTo(i)}
                        aria-label={`Go to testimonial ${i + 1}`}
                        className="flex h-6 w-6 items-center justify-center"
                    >
                        <span
                            className={`h-1.5 rounded-full transition-all ${active === i ? "w-5 bg-neutral-900" : "w-1.5 bg-neutral-300"
                                }`}
                        />
                    </button>
                ))}
            </div>
        </section>
    );
}