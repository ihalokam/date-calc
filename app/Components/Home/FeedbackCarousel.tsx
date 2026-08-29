"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PALETTES = [
    "bg-blue-50 text-blue-700",
    "bg-amber-50 text-amber-700",
    "bg-emerald-50 text-emerald-700",
    "bg-rose-50 text-rose-700",
    "bg-violet-50 text-violet-700",
] as const;

const AUTOPLAY_MS = 4000;

type FeedbackItem = {
    name: string;
    quote: string;
};

type FeedbackCarouselProps = {
    feedback: readonly FeedbackItem[];
};

export default function FeedbackCarousel({
    feedback,
}: FeedbackCarouselProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    const scrollToIndex = useCallback((index: number) => {
        const track = trackRef.current;
        if (!track) return;

        const slide = track.children[index] as HTMLElement | undefined;
        if (!slide) return;

        track.scrollTo({
            left: slide.offsetLeft,
            behavior: "smooth",
        });
    }, []);

    // Autoplay
    useEffect(() => {
        if (paused) return;

        const timer = setInterval(() => {
            setActive((prev) => {
                const next = (prev + 1) % feedback.length;
                scrollToIndex(next);
                return next;
            });
        }, AUTOPLAY_MS);

        return () => clearInterval(timer);
    }, [paused, scrollToIndex, feedback.length]);

    // Keep active dot in sync with manual scrolling
    const handleScroll = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;

        const { scrollLeft, children } = track;

        let closest = 0;
        let closestDist = Infinity;

        Array.from(children).forEach((child, i) => {
            const dist = Math.abs(
                (child as HTMLElement).offsetLeft - scrollLeft
            );

            if (dist < closestDist) {
                closestDist = dist;
                closest = i;
            }
        });

        setActive(closest);
    }, []);

    const goTo = (index: number) => {
        const wrapped =
            (index + feedback.length) % feedback.length;

        setActive(wrapped);
        scrollToIndex(wrapped);
    };

    return (
        <>
            <div
                className="relative"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onTouchStart={() => setPaused(true)}
            >
                <div
                    ref={trackRef}
                    onScroll={handleScroll}
                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {feedback.map((item, i) => (
                        <div
                            key={item.name}
                            className="w-[82%] shrink-0 snap-center rounded-2xl border border-neutral-200 bg-white p-6 sm:w-[46%] lg:w-[31%]"
                        >
                            <p className="min-h-[4.5rem] text-sm leading-relaxed text-neutral-700">
                                &ldquo;{item.quote}&rdquo;
                            </p>

                            <div className="mt-5 flex items-center gap-2.5">
                                <span
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${PALETTES[
                                        i % PALETTES.length
                                        ]
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

                {/* Previous */}
                <button
                    onClick={() => goTo(active - 1)}
                    aria-label="Previous testimonial"
                    className="absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-2 text-neutral-500 hover:text-neutral-900 sm:block"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path
                            d="M10 3L5 8L10 13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                {/* Next */}
                <button
                    onClick={() => goTo(active + 1)}
                    aria-label="Next testimonial"
                    className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-2 text-neutral-500 hover:text-neutral-900 sm:block"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
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

            {/* Dots */}
            <div className="mt-5 flex justify-center gap-0.5">
                {feedback.map((item, i) => (
                    <button
                        key={item.name}
                        onClick={() => goTo(i)}
                        aria-label={`Go to testimonial ${i + 1}`}
                        className="flex h-6 w-6 items-center justify-center"
                    >
                        <span
                            className={`h-1.5 rounded-full transition-all ${active === i
                                    ? "w-5 bg-neutral-900"
                                    : "w-1.5 bg-neutral-300"
                                }`}
                        />
                    </button>
                ))}
            </div>
        </>
    );
}