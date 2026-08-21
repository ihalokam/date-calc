"use client";

export type TimeFormat = "12h" | "24h";

const HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1); // 1..12
const HOURS_24 = Array.from({ length: 24 }, (_, i) => i); // 0..23
const MINUTES = Array.from({ length: 60 }, (_, i) => i); // 0..59

function to24hFrom12h(hour12: number, minute: number, period: "AM" | "PM"): string {
    let h = hour12 % 12;
    if (period === "PM") h += 12;
    return `${String(h).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function to12h(value24: string): { hour12: number; minute: number; period: "AM" | "PM" } {
    const [h, m] = value24.split(":").map(Number);
    const period: "AM" | "PM" = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return { hour12, minute: m, period };
}

export default function TimeInput({
    value,
    onChange,
    format,
    ariaLabel,
}: {
    /** 24-hour "HH:MM" string, e.g. "17:30" — always the source of truth regardless of display format */
    value: string;
    onChange: (value24: string) => void;
    format: TimeFormat;
    ariaLabel?: string;
}) {
    const [h24, m] = value.split(":").map(Number);

    if (format === "24h") {
        return (
            <div className="flex items-center gap-1.5" role="group" aria-label={ariaLabel}>
                <select
                    value={h24}
                    onChange={(e) =>
                        onChange(`${String(Number(e.target.value)).padStart(2, "0")}:${String(m).padStart(2, "0")}`)
                    }
                    className="date-input w-16 text-center"
                    aria-label="Hour"
                >
                    {HOURS_24.map((h) => (
                        <option key={h} value={h}>
                            {String(h).padStart(2, "0")}
                        </option>
                    ))}
                </select>
                <span className="text-neutral-400">:</span>
                <select
                    value={m}
                    onChange={(e) =>
                        onChange(`${String(h24).padStart(2, "0")}:${String(Number(e.target.value)).padStart(2, "0")}`)
                    }
                    className="date-input w-16 text-center"
                    aria-label="Minute"
                >
                    {MINUTES.map((min) => (
                        <option key={min} value={min}>
                            {String(min).padStart(2, "0")}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    // 12h mode
    const { hour12, minute, period } = to12h(value);
    const update = (nextHour: number, nextMinute: number, nextPeriod: "AM" | "PM") => {
        onChange(to24hFrom12h(nextHour, nextMinute, nextPeriod));
    };

    return (
        <div className="flex items-center gap-1.5" role="group" aria-label={ariaLabel}>
            <select
                value={hour12}
                onChange={(e) => update(Number(e.target.value), minute, period)}
                className="date-input w-16 text-center"
                aria-label="Hour"
            >
                {HOURS_12.map((hr) => (
                    <option key={hr} value={hr}>
                        {hr}
                    </option>
                ))}
            </select>

            <span className="text-neutral-400">:</span>

            <select
                value={minute}
                onChange={(e) => update(hour12, Number(e.target.value), period)}
                className="date-input w-16 text-center"
                aria-label="Minute"
            >
                {MINUTES.map((min) => (
                    <option key={min} value={min}>
                        {String(min).padStart(2, "0")}
                    </option>
                ))}
            </select>

            <div className="ml-1 inline-flex rounded-lg border border-neutral-200 p-0.5">
                <button
                    type="button"
                    onClick={() => update(hour12, minute, "AM")}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium ${period === "AM" ? "bg-neutral-900 text-white" : "text-neutral-500"
                        }`}
                >
                    AM
                </button>
                <button
                    type="button"
                    onClick={() => update(hour12, minute, "PM")}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium ${period === "PM" ? "bg-neutral-900 text-white" : "text-neutral-500"
                        }`}
                >
                    PM
                </button>
            </div>
        </div>
    );
}