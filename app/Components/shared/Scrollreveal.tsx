"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + slides content in once it scrolls into view. This component is
 * "use client" only because IntersectionObserver needs the browser — any
 * server-rendered content passed in as `children` is still rendered on the
 * server and shipped in the initial HTML, so this adds motion without
 * moving text out of the crawlable, no-JS page source.
 */
export default function ScrollReveal({
    children,
    delayMs = 0,
    className,
}: {
    children: React.ReactNode;
    delayMs?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
            className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                } ${className ?? ""}`}
        >
            {children}
        </div>
    );
}