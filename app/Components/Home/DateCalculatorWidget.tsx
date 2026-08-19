"use client";

import { useEffect, useMemo, useState } from "react";
import {
    getDateDifference,
    shiftDate,
    formatLong,
    QUICK_SHORTCUTS,
    type DateUnit,
} from "@/lib/date-utils";

type ShortcutUnit = "days" | "weeks" | "months";

type Tab = "between" | "shift" | "shortcuts";

const todayISO = () => new Date().toISOString().slice(0, 10);
const parseISO = (v: string) => new Date(`${v}T00:00:00`);

const getShareUrl = (params: Record<string, string>) => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.search = ""; // clear current search params
    Object.entries(params).forEach(([key, val]) => {
        url.searchParams.set(key, val);
    });
    return url.toString();
};

export default function DateCalculatorWidget() {
    const [tab, setTab] = useState<Tab>("between");

    // "Days between" state
    const [start, setStart] = useState(todayISO());
    const [end, setEnd] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() + 90);
        return d.toISOString().slice(0, 10);
    });

    // "Add / subtract" state
    const [baseDate, setBaseDate] = useState(todayISO());
    const [amount, setAmount] = useState(30);
    const [unit, setUnit] = useState<DateUnit>("days");
    const [direction, setDirection] = useState<1 | -1>(1);

    // "Quick shortcuts" state — custom amount/unit, computed from today
    const [shortcutAmount, setShortcutAmount] = useState(30);
    const [shortcutUnit, setShortcutUnit] = useState<ShortcutUnit>("days");
    const [shortcutDirection, setShortcutDirection] = useState<1 | -1>(1);

    // URL Query Parameter Initializer
    useEffect(() => {
        if (typeof window === "undefined") return;
        const params = new URLSearchParams(window.location.search);

        // Tab detection
        const urlTab = params.get("tab");
        if (urlTab === "between" || urlTab === "shift" || urlTab === "shortcuts") {
            setTab(urlTab);
        } else if (params.has("start") || params.has("end")) {
            setTab("between");
        } else if (params.has("base") || params.has("amount") || params.has("unit")) {
            setTab("shift");
        }

        // "Days between" values
        const urlStart = params.get("start");
        const urlEnd = params.get("end");
        if (urlStart) setStart(urlStart);
        if (urlEnd) setEnd(urlEnd);

        // "Add / subtract" values
        const urlBase = params.get("base");
        const urlAmount = params.get("amount");
        const urlUnit = params.get("unit");
        const urlDir = params.get("dir");

        if (urlBase) setBaseDate(urlBase);
        if (urlAmount) {
            const parsedAmount = parseInt(urlAmount, 10);
            if (!isNaN(parsedAmount)) {
                if (urlTab === "shortcuts") {
                    setShortcutAmount(parsedAmount);
                } else {
                    setAmount(parsedAmount);
                }
            }
        }
        if (urlUnit) {
            if (urlTab === "shortcuts") {
                if (urlUnit === "days" || urlUnit === "weeks" || urlUnit === "months") {
                    setShortcutUnit(urlUnit as ShortcutUnit);
                }
            } else {
                if (urlUnit === "days" || urlUnit === "weeks" || urlUnit === "months" || urlUnit === "years") {
                    setUnit(urlUnit as DateUnit);
                }
            }
        }
        if (urlDir) {
            const parsedDir = parseInt(urlDir, 10);
            if (parsedDir === 1 || parsedDir === -1) {
                if (urlTab === "shortcuts") {
                    setShortcutDirection(parsedDir as 1 | -1);
                } else {
                    setDirection(parsedDir as 1 | -1);
                }
            }
        }
    }, []);

    const betweenShareUrl = useMemo(() => {
        return getShareUrl({ tab: "between", start, end });
    }, [start, end]);

    const shiftShareUrl = useMemo(() => {
        return getShareUrl({
            tab: "shift",
            base: baseDate,
            amount: amount.toString(),
            unit,
            dir: direction.toString(),
        });
    }, [baseDate, amount, unit, direction]);

    const shortcutShareUrl = useMemo(() => {
        return getShareUrl({
            tab: "shortcuts",
            amount: shortcutAmount.toString(),
            unit: shortcutUnit,
            dir: shortcutDirection.toString(),
        });
    }, [shortcutAmount, shortcutUnit, shortcutDirection]);

    const diff = useMemo(() => {
        try {
            return getDateDifference(parseISO(start), parseISO(end));
        } catch {
            return null;
        }
    }, [start, end]);

    const shifted = useMemo(() => {
        try {
            return shiftDate(parseISO(baseDate), amount * direction, unit);
        } catch {
            return null;
        }
    }, [baseDate, amount, unit, direction]);

    const shortcutResult = useMemo(() => {
        try {
            return shiftDate(new Date(), shortcutAmount * shortcutDirection, shortcutUnit);
        } catch {
            return null;
        }
    }, [shortcutAmount, shortcutUnit, shortcutDirection]);

    const handleCopy = (text: string) => {
        navigator.clipboard?.writeText(text).catch(() => { });
    };

    return (
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            {/* Tabs */}
            <div
                role="tablist"
                aria-label="Choose calculation type"
                className="flex gap-1 border-b border-neutral-200 px-3 pt-3"
            >
                <TabButton active={tab === "between"} onClick={() => setTab("between")}>
                    Days between
                </TabButton>
                <TabButton active={tab === "shift"} onClick={() => setTab("shift")}>
                    Add / subtract
                </TabButton>
                <TabButton active={tab === "shortcuts"} onClick={() => setTab("shortcuts")}>
                    Quick shortcuts
                </TabButton>
            </div>

            <div className="p-5 sm:p-6">
                {tab === "between" && (
                    <section role="tabpanel" aria-label="Days between two dates">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field label="Start date">
                                <input
                                    type="date"
                                    value={start}
                                    onChange={(e) => setStart(e.target.value)}
                                    className="date-input"
                                />
                            </Field>
                            <Field label="End date">
                                <input
                                    type="date"
                                    value={end}
                                    onChange={(e) => setEnd(e.target.value)}
                                    className="date-input"
                                />
                            </Field>
                        </div>

                        {diff && (
                            <>
                                <ResultCard
                                    big={`${diff.totalDays.toLocaleString()} days`}
                                    small={
                                        <BreakdownRow
                                            groups={[
                                                [
                                                    { value: diff.years, unit: "yr" },
                                                    { value: diff.months, unit: "mo" },
                                                    { value: diff.days, unit: "d" },
                                                ],
                                                [
                                                    { value: diff.weeks, unit: "wks" },
                                                    { value: diff.weeksRemainderDays, unit: "d" },
                                                ],
                                            ]}
                                        />
                                    }
                                />

                                <div className="mt-4 grid grid-cols-3 gap-3">
                                    <StatChip label="Business days" value={diff.businessDays.toString()} />
                                    <StatChip label="Start falls on" value={diff.startDay} />
                                    <StatChip label="End falls on" value={diff.endDay} />
                                </div>

                                <ActionRow
                                    onCopy={() => handleCopy(`${diff.totalDays} days between ${start} and ${end}`)}
                                    shareUrl={betweenShareUrl}
                                />
                            </>
                        )}
                    </section>
                )}

                {tab === "shift" && (
                    <section role="tabpanel" aria-label="Add or subtract from a date">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field label="Start date">
                                <input
                                    type="date"
                                    value={baseDate}
                                    onChange={(e) => setBaseDate(e.target.value)}
                                    className="date-input"
                                />
                            </Field>

                            <Field label="Duration">
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        min={0}
                                        value={amount}
                                        onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                                        className="date-input w-20"
                                        aria-label="Amount"
                                    />
                                    <select
                                        value={unit}
                                        onChange={(e) => setUnit(e.target.value as DateUnit)}
                                        className="date-input flex-1"
                                        aria-label="Unit"
                                    >
                                        <option value="days">Days</option>
                                        <option value="weeks">Weeks</option>
                                        <option value="months">Months</option>
                                        <option value="years">Years</option>
                                    </select>
                                </div>
                            </Field>
                        </div>

                        <div className="mt-3 inline-flex rounded-lg border border-neutral-200 p-1">
                            <DirectionButton active={direction === 1} onClick={() => setDirection(1)}>
                                Add
                            </DirectionButton>
                            <DirectionButton active={direction === -1} onClick={() => setDirection(-1)}>
                                Subtract
                            </DirectionButton>
                        </div>

                        {shifted && (
                            <>
                                <ResultCard big={formatLong(shifted)} small={null} />
                                <ActionRow
                                    onCopy={() => handleCopy(formatLong(shifted))}
                                    shareUrl={shiftShareUrl}
                                />
                            </>
                        )}
                    </section>
                )}

                {tab === "shortcuts" && (
                    <section role="tabpanel" aria-label="Quick date shortcuts">
                        <p className="mb-3 text-sm text-neutral-500">
                            From today —{" "}
                            <time dateTime={todayISO()}>{formatLong(new Date())}</time>
                        </p>

                        {/* Preset chips — set the custom fields below and compute inline, no navigation */}
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                            {QUICK_SHORTCUTS.map((n) => (
                                <button
                                    key={`plus-${n}`}
                                    onClick={() => {
                                        setShortcutAmount(n);
                                        setShortcutUnit("days");
                                        setShortcutDirection(1);
                                    }}
                                    className={`rounded-lg border px-3 py-2 text-center text-sm font-medium ${shortcutAmount === n && shortcutUnit === "days" && shortcutDirection === 1
                                        ? "border-neutral-900 bg-neutral-900 text-white"
                                        : "border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50"
                                        }`}
                                >
                                    +{n}d
                                </button>
                            ))}
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
                            {QUICK_SHORTCUTS.map((n) => (
                                <button
                                    key={`minus-${n}`}
                                    onClick={() => {
                                        setShortcutAmount(n);
                                        setShortcutUnit("days");
                                        setShortcutDirection(-1);
                                    }}
                                    className={`rounded-lg border px-3 py-2 text-center text-sm font-medium ${shortcutAmount === n && shortcutUnit === "days" && shortcutDirection === -1
                                        ? "border-neutral-900 bg-neutral-900 text-white"
                                        : "border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50"
                                        }`}
                                >
                                    &minus;{n}d
                                </button>
                            ))}
                        </div>

                        {/* Custom amount — same result computed inline */}
                        <div className="mt-4 flex items-end gap-2">
                            <Field label="Custom amount">
                                <input
                                    type="number"
                                    min={0}
                                    value={shortcutAmount}
                                    onChange={(e) => setShortcutAmount(Math.max(0, Number(e.target.value)))}
                                    className="date-input w-24"
                                    aria-label="Custom amount"
                                />
                            </Field>
                            <select
                                value={shortcutUnit}
                                onChange={(e) => setShortcutUnit(e.target.value as ShortcutUnit)}
                                className="date-input"
                                aria-label="Unit"
                            >
                                <option value="days">Days</option>
                                <option value="weeks">Weeks</option>
                                <option value="months">Months</option>
                            </select>
                            <div className="inline-flex rounded-lg border border-neutral-200 p-1">
                                <DirectionButton
                                    active={shortcutDirection === 1}
                                    onClick={() => setShortcutDirection(1)}
                                >
                                    Add
                                </DirectionButton>
                                <DirectionButton
                                    active={shortcutDirection === -1}
                                    onClick={() => setShortcutDirection(-1)}
                                >
                                    Subtract
                                </DirectionButton>
                            </div>
                        </div>

                        {shortcutResult && (
                            <>
                                <ResultCard big={formatLong(shortcutResult)} small={null} />
                                <ActionRow
                                    onCopy={() => handleCopy(formatLong(shortcutResult))}
                                    shareUrl={shortcutShareUrl}
                                />
                            </>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
}

function TabButton({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            role="tab"
            aria-selected={active}
            onClick={onClick}
            className={`rounded-t-lg px-3 py-2 text-sm font-medium transition-colors ${active
                ? "border-b-2 border-neutral-900 text-neutral-900"
                : "text-neutral-500 hover:text-neutral-700"
                }`}
        >
            {children}
        </button>
    );
}

function DirectionButton({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={`rounded-md px-4 py-1.5 text-sm font-medium ${active ? "bg-neutral-900 text-white" : "text-neutral-600"
                }`}
        >
            {children}
        </button>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-sm text-neutral-500">{label}</span>
            {children}
        </label>
    );
}

function ResultCard({ big, small }: { big: string; small: React.ReactNode }) {
    return (
        <div className="mt-5 rounded-xl bg-neutral-50 px-6 py-5 text-center">
            <div className="text-sm text-neutral-500">Result</div>
            <div className="mt-1 text-4xl font-medium tabular-nums text-neutral-900">{big}</div>
            {small && <div className="mt-2">{small}</div>}
        </div>
    );
}

/** Renders "2 mo 29 d · 12 wks 6 d" as two visually distinct stat groups
 *  separated by a hairline divider, rather than one long run-on string. */
function BreakdownRow({
    groups,
}: {
    groups: { value: number; unit: string }[][];
}) {
    return (
        <div className="flex items-center justify-center gap-3 text-sm">
            {groups.map((group, i) => (
                <span key={i} className="flex items-center gap-3">
                    {i > 0 && <span className="h-4 w-px bg-neutral-300" aria-hidden="true" />}
                    <span className="flex gap-2.5">
                        {group.map((part, j) => (
                            <span key={j} className="flex items-baseline gap-1">
                                <span className="tabular-nums font-medium text-neutral-700">
                                    {part.value}
                                </span>
                                <span className="text-xs uppercase tracking-wide text-neutral-400">
                                    {part.unit}
                                </span>
                            </span>
                        ))}
                    </span>
                </span>
            ))}
        </div>
    );
}

function StatChip({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg bg-neutral-50 px-3 py-2.5 text-center">
            <div className="text-xs text-neutral-500">{label}</div>
            <div className="mt-0.5 text-lg font-medium tabular-nums">{value}</div>
        </div>
    );
}

function ActionRow({ onCopy, shareUrl }: { onCopy: () => void; shareUrl: string }) {
    const [copiedResult, setCopiedResult] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);

    const handleCopyResult = () => {
        onCopy();
        setCopiedResult(true);
        setTimeout(() => setCopiedResult(false), 2000);
    };

    const handleCopyLink = () => {
        navigator.clipboard?.writeText(shareUrl).catch(() => { });
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    return (
        <div className="mt-4 flex gap-2">
            <button
                onClick={handleCopyResult}
                className="flex-1 rounded-lg border border-neutral-200 py-2.5 text-center text-sm font-medium transition-all hover:bg-neutral-50 active:scale-95 focus:outline-none"
            >
                {copiedResult ? "Copied!" : "Copy result"}
            </button>
            <button
                onClick={handleCopyLink}
                className="flex-1 rounded-lg border border-neutral-200 py-2.5 text-center text-sm font-medium transition-all hover:bg-neutral-50 active:scale-95 focus:outline-none"
            >
                {copiedLink ? "Link copied!" : "Share link"}
            </button>
        </div>
    );
}