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

export default function DateCalculatorWidget() {
    const [tab, setTab] = useState<Tab>("between");
    const [mounted, setMounted] = useState(false);

    // "Days between" state — starts empty; real "today" is only computed
    // client-side after mount (see effect below) to avoid a server/client
    // date mismatch if this page is ever served from a build-time or CDN
    // cache made on a different day than the visitor's "today."
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    // "Add / subtract" state
    const [baseDate, setBaseDate] = useState("");
    const [amount, setAmount] = useState(30);
    const [unit, setUnit] = useState<DateUnit>("days");
    const [direction, setDirection] = useState<1 | -1>(1);

    // "Quick shortcuts" state — custom amount/unit, computed from today
    const [shortcutAmount, setShortcutAmount] = useState(30);
    const [shortcutUnit, setShortcutUnit] = useState<ShortcutUnit>("days");
    const [shortcutDirection, setShortcutDirection] = useState<1 | -1>(1);

    useEffect(() => {
        const today = todayISO();
        const plus90 = new Date();
        plus90.setDate(plus90.getDate() + 90);

        setStart(today);
        setEnd(plus90.toISOString().slice(0, 10));
        setBaseDate(today);
        setMounted(true);
    }, []);

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

                        {mounted && diff ? (
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
                                    shareUrl={`/days-between-two-dates?start=${start}&end=${end}`}
                                />
                            </>
                        ) : (
                            <ResultSkeleton withStatChips />
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

                        {mounted && shifted ? (
                            <>
                                <ResultCard big={formatLong(shifted)} small={null} />
                                <ActionRow
                                    onCopy={() => handleCopy(formatLong(shifted))}
                                    shareUrl={`/add-subtract-date?base=${baseDate}&amount=${amount}&unit=${unit}&dir=${direction}`}
                                />
                            </>
                        ) : (
                            <ResultSkeleton />
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
                                    shareUrl={`/days-from-today/${shortcutAmount}?unit=${shortcutUnit}&dir=${shortcutDirection}`}
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

/** Placeholder matching ResultCard + (optional stat chips) + ActionRow's
 *  real height, shown until real "today"-derived dates are set client-side
 *  after mount. Without this, the result appearing a moment later shoves
 *  the content below it down the page — a real, measurable layout shift. */
function ResultSkeleton({ withStatChips = false }: { withStatChips?: boolean }) {
    return (
        <div aria-hidden="true">
            <div className="mt-5 animate-pulse rounded-xl bg-neutral-50 px-6 py-5 text-center">
                <div className="mx-auto h-3.5 w-12 rounded bg-neutral-200" />
                <div className="mx-auto mt-2 h-9 w-28 rounded bg-neutral-200" />
                <div className="mx-auto mt-3 h-6 w-40 rounded-full bg-neutral-200" />
            </div>

            {withStatChips && (
                <div className="mt-4 grid animate-pulse grid-cols-3 gap-3">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="rounded-lg bg-neutral-50 px-3 py-2.5">
                            <div className="mx-auto h-3 w-14 rounded bg-neutral-200" />
                            <div className="mx-auto mt-1.5 h-4 w-8 rounded bg-neutral-200" />
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-4 flex animate-pulse gap-2">
                <div className="h-9 flex-1 rounded-lg bg-neutral-100" />
                <div className="h-9 flex-1 rounded-lg bg-neutral-100" />
            </div>
        </div>
    );
}

/** Renders the civil breakdown ("0 yr 2 mo 29 d") and the weeks breakdown
 *  ("12 wks 6 d") as two distinct color-blocked badges, so they read as two
 *  separate facts rather than one run-on string. */
function BreakdownRow({
    groups,
}: {
    groups: { value: number; unit: string }[][];
}) {
    const palettes = [
        { bg: "bg-neutral-100", text: "text-neutral-700", label: "text-neutral-600" },
        { bg: "bg-blue-50", text: "text-blue-800", label: "text-blue-600" },
    ];

    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            {groups.map((group, i) => {
                const palette = palettes[i % palettes.length];
                return (
                    <span
                        key={i}
                        className={`inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 ${palette.bg}`}
                    >
                        {group.map((part, j) => (
                            <span key={j} className="flex items-baseline gap-1">
                                <span className={`tabular-nums text-sm font-medium ${palette.text}`}>
                                    {part.value}
                                </span>
                                <span className={`text-xs uppercase tracking-wide ${palette.label}`}>
                                    {part.unit}
                                </span>
                            </span>
                        ))}
                    </span>
                );
            })}
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
    return (
        <div className="mt-4 flex gap-2">
            <button
                onClick={onCopy}
                className="flex-1 rounded-lg border border-neutral-200 py-2 text-sm font-medium hover:bg-neutral-50"
            >
                Copy result
            </button>
            <a
                href={shareUrl}
                className="flex-1 rounded-lg border border-neutral-200 py-2 text-center text-sm font-medium hover:bg-neutral-50"
            >
                Share link
            </a>
        </div>
    );
}