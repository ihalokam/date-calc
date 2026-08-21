"use client";

import { useEffect, useState } from "react";
import type { TimeFormat } from "./Timeinput";

function formatClock(date: Date, format: TimeFormat) {
    const h24 = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    if (format === "24h") {
        return { main: `${String(h24).padStart(2, "0")}:${minutes}:${seconds}`, period: null as string | null };
    }

    const period = h24 >= 12 ? "PM" : "AM";
    const hour12 = h24 % 12 === 0 ? 12 : h24 % 12;
    return { main: `${hour12}:${minutes}:${seconds}`, period };
}

export default function LiveClock() {
    // Start as null so the server-rendered placeholder and the first client
    // render match exactly — the real clock only starts ticking after mount.
    const [now, setNow] = useState<Date | null>(null);
    const [format, setFormat] = useState<TimeFormat>("12h");

    useEffect(() => {
        setNow(new Date());
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const display = now ? formatClock(now, format) : null;
    const dateLabel = now
        ? now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
        : null;
    const timeZone = now ? Intl.DateTimeFormat().resolvedOptions().timeZone : null;

    return (
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-4 pb-2">
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-6 py-4">
                <div className="text-center">
                    <div className="flex items-baseline justify-center gap-2">
                        <span className="text-3xl font-medium tabular-nums text-neutral-900 sm:text-4xl">
                            {display ? display.main : "--:--:--"}
                        </span>
                        {display?.period && (
                            <span className="text-sm font-medium text-neutral-400">{display.period}</span>
                        )}
                    </div>
                    <div className="mt-1 text-xs text-neutral-400">
                        {dateLabel ?? "\u00A0"}
                        {timeZone && <span className="ml-1.5 text-neutral-300">· {timeZone}</span>}
                    </div>
                </div>

                <div className="ml-2 inline-flex shrink-0 rounded-lg border border-neutral-200 p-0.5">
                    <button
                        type="button"
                        onClick={() => setFormat("12h")}
                        className={`rounded-md px-2 py-1 text-xs font-medium ${format === "12h" ? "bg-neutral-900 text-white" : "text-neutral-500"
                            }`}
                    >
                        12h
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormat("24h")}
                        className={`rounded-md px-2 py-1 text-xs font-medium ${format === "24h" ? "bg-neutral-900 text-white" : "text-neutral-500"
                            }`}
                    >
                        24h
                    </button>
                </div>
            </div>
        </div>
    );
}