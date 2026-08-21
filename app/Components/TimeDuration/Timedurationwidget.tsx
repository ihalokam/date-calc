"use client";

import { useMemo, useState } from "react";
import {
    getTimeDuration,
    getPayrollDuration,
    getQuickShortcut,
    formatTimeLabel,
} from "@/lib/time-calc/time-utils";
import TimeInput, { type TimeFormat } from "./Timeinput";

type Tab = "between" | "payroll" | "shortcuts";

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function TimeDurationWidget() {
    const [tab, setTab] = useState<Tab>("between");
    // Shared across all tabs — a display preference, not per-calculation state
    const [format, setFormat] = useState<TimeFormat>("12h");

    // "Time between two times" state
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("17:30");
    const [spansDays, setSpansDays] = useState(false);
    const [startDate, setStartDate] = useState(todayISO());
    const [endDate, setEndDate] = useState(todayISO());

    // "Payroll" state
    const [pStartTime, setPStartTime] = useState("09:00");
    const [pEndTime, setPEndTime] = useState("17:30");
    const [pSpansDays, setPSpansDays] = useState(false);
    const [pStartDate, setPStartDate] = useState(todayISO());
    const [pEndDate, setPEndDate] = useState(todayISO());
    const [breakMinutes, setBreakMinutes] = useState(30);
    const [otEnabled, setOtEnabled] = useState(true);
    const [otThreshold, setOtThreshold] = useState(8);

    // "Quick shortcuts" state
    const [direction, setDirection] = useState<"until" | "since">("until");
    const [targetTime, setTargetTime] = useState("18:00");

    const between = useMemo(
        () => getTimeDuration(startTime, endTime, spansDays, startDate, endDate),
        [startTime, endTime, spansDays, startDate, endDate]
    );

    const payroll = useMemo(
        () =>
            getPayrollDuration(
                pStartTime,
                pEndTime,
                pSpansDays,
                breakMinutes,
                otEnabled ? otThreshold : null,
                pStartDate,
                pEndDate
            ),
        [pStartTime, pEndTime, pSpansDays, breakMinutes, otEnabled, otThreshold, pStartDate, pEndDate]
    );

    const shortcut = useMemo(
        () => getQuickShortcut(direction, targetTime),
        [direction, targetTime]
    );

    const handleCopy = (text: string) => {
        navigator.clipboard?.writeText(text).catch(() => { });
    };

    return (
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div
                role="tablist"
                aria-label="Choose calculation type"
                className="flex items-center justify-between gap-1 border-b border-neutral-200 px-3 pt-3"
            >
                <div className="flex gap-1">
                    <TabButton active={tab === "between"} onClick={() => setTab("between")}>
                        Time between
                    </TabButton>
                    <TabButton active={tab === "payroll"} onClick={() => setTab("payroll")}>
                        Payroll / work hours
                    </TabButton>
                    <TabButton active={tab === "shortcuts"} onClick={() => setTab("shortcuts")}>
                        Time until / Time since
                    </TabButton>
                </div>

                <div className="mb-2 inline-flex shrink-0 rounded-lg border border-neutral-200 p-0.5">
                    <button
                        type="button"
                        onClick={() => setFormat("12h")}
                        className={`rounded-md px-2.5 py-1 text-xs font-medium ${format === "12h" ? "bg-neutral-900 text-white" : "text-neutral-500"
                            }`}
                    >
                        12h
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormat("24h")}
                        className={`rounded-md px-2.5 py-1 text-xs font-medium ${format === "24h" ? "bg-neutral-900 text-white" : "text-neutral-500"
                            }`}
                    >
                        24h
                    </button>
                </div>
            </div>

            <div className="p-5 sm:p-6">
                {tab === "between" && (
                    <section role="tabpanel" aria-label="Time between two times">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field label="Start time">
                                <TimeInput value={startTime} onChange={setStartTime} format={format} ariaLabel="Start time" />
                            </Field>
                            <Field label="End time">
                                <TimeInput value={endTime} onChange={setEndTime} format={format} ariaLabel="End time" />
                            </Field>
                        </div>

                        <label className="mt-3 flex items-center gap-2 text-sm text-neutral-600">
                            <input
                                type="checkbox"
                                checked={spansDays}
                                onChange={(e) => setSpansDays(e.target.checked)}
                                className="h-4 w-4 rounded border-neutral-300"
                            />
                            Spans multiple days
                        </label>

                        {spansDays && (
                            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Field label="Start date">
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="date-input"
                                    />
                                </Field>
                                <Field label="End date">
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="date-input"
                                    />
                                </Field>
                            </div>
                        )}

                        <ResultCard
                            big={`${between.hours}h ${between.minutes}m`}
                            badges={[
                                { label: "decimal", value: `${between.decimalHours} hrs`, tone: "blue" },
                                { label: "total", value: `${between.totalMinutes} min`, tone: "neutral" },
                            ]}
                        />

                        {between.crossesDST && (
                            <p className="mt-3 text-xs text-amber-700">
                                This span crosses a daylight saving change — adjusted automatically.
                            </p>
                        )}

                        <ActionRow
                            onCopy={() =>
                                handleCopy(
                                    `${formatTimeLabel(startTime)} – ${formatTimeLabel(endTime)} = ${between.hours}h ${between.minutes}m (${between.decimalHours} hrs)`
                                )
                            }
                            onCopyDecimal={() => handleCopy(String(between.decimalHours))}
                        />
                    </section>
                )}

                {tab === "payroll" && (
                    <section role="tabpanel" aria-label="Payroll and work hours calculator">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field label="Start time">
                                <TimeInput value={pStartTime} onChange={setPStartTime} format={format} ariaLabel="Start time" />
                            </Field>
                            <Field label="End time">
                                <TimeInput value={pEndTime} onChange={setPEndTime} format={format} ariaLabel="End time" />
                            </Field>
                        </div>

                        <label className="mt-3 flex items-center gap-2 text-sm text-neutral-600">
                            <input
                                type="checkbox"
                                checked={pSpansDays}
                                onChange={(e) => setPSpansDays(e.target.checked)}
                                className="h-4 w-4 rounded border-neutral-300"
                            />
                            Spans multiple days
                        </label>

                        {pSpansDays && (
                            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Field label="Start date">
                                    <input
                                        type="date"
                                        value={pStartDate}
                                        onChange={(e) => setPStartDate(e.target.value)}
                                        className="date-input"
                                    />
                                </Field>
                                <Field label="End date">
                                    <input
                                        type="date"
                                        value={pEndDate}
                                        onChange={(e) => setPEndDate(e.target.value)}
                                        className="date-input"
                                    />
                                </Field>
                            </div>
                        )}

                        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field label="Unpaid break (minutes)">
                                <input
                                    type="number"
                                    min={0}
                                    value={breakMinutes}
                                    onChange={(e) => setBreakMinutes(Math.max(0, Number(e.target.value)))}
                                    className="date-input"
                                />
                            </Field>
                            <Field label="Overtime after (hours)">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={otEnabled}
                                        onChange={(e) => setOtEnabled(e.target.checked)}
                                        className="h-4 w-4 rounded border-neutral-300"
                                        aria-label="Enable overtime threshold"
                                    />
                                    <input
                                        type="number"
                                        min={0}
                                        step={0.5}
                                        disabled={!otEnabled}
                                        value={otThreshold}
                                        onChange={(e) => setOtThreshold(Math.max(0, Number(e.target.value)))}
                                        className="date-input disabled:opacity-40"
                                    />
                                </div>
                            </Field>
                        </div>

                        <ResultCard
                            big={`${payroll.netHours}h ${payroll.netRemainderMinutes}m`}
                            badges={[
                                { label: "decimal", value: `${payroll.netDecimalHours} hrs`, tone: "blue" },
                                { label: "gross", value: `${payroll.hours}h ${payroll.minutes}m`, tone: "neutral" },
                            ]}
                        />

                        {payroll.isOvertime && (
                            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
                                Overtime: {Math.floor(payroll.overtimeMinutes / 60)}h{" "}
                                {payroll.overtimeMinutes % 60}m past the {otThreshold}h threshold
                            </p>
                        )}
                        {payroll.crossesDST && (
                            <p className="mt-3 text-xs text-amber-700">
                                This span crosses a daylight saving change — adjusted automatically.
                            </p>
                        )}

                        <ActionRow
                            onCopy={() =>
                                handleCopy(
                                    `${formatTimeLabel(pStartTime)} – ${formatTimeLabel(pEndTime)} (−${breakMinutes}m break) = ${payroll.netHours}h ${payroll.netRemainderMinutes}m (${payroll.netDecimalHours} hrs)`
                                )
                            }
                            onCopyDecimal={() => handleCopy(String(payroll.netDecimalHours))}
                        />
                    </section>
                )}

                {tab === "shortcuts" && (
                    <section role="tabpanel" aria-label="Quick time shortcuts">
                        <div className="inline-flex rounded-lg border border-neutral-200 p-1">
                            <DirectionButton active={direction === "until"} onClick={() => setDirection("until")}>
                                Until
                            </DirectionButton>
                            <DirectionButton active={direction === "since"} onClick={() => setDirection("since")}>
                                Since
                            </DirectionButton>
                        </div>

                        <div className="mt-3">
                            <Field label={direction === "until" ? "Target time" : "Reference time"}>
                                <TimeInput value={targetTime} onChange={setTargetTime} format={format} ariaLabel="Time" />
                            </Field>
                        </div>

                        <ResultCard
                            big={`${shortcut.hours}h ${shortcut.minutes}m`}
                            badges={[{ label: "decimal", value: `${shortcut.decimalHours} hrs`, tone: "blue" }]}
                        />

                        <ActionRow
                            onCopy={() =>
                                handleCopy(
                                    `${direction === "until" ? "Time until" : "Time since"} ${formatTimeLabel(targetTime)}: ${shortcut.hours}h ${shortcut.minutes}m`
                                )
                            }
                            onCopyDecimal={() => handleCopy(String(shortcut.decimalHours))}
                        />
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

const BADGE_PALETTES: Record<"blue" | "neutral", string> = {
    blue: "bg-blue-50 text-blue-800",
    neutral: "bg-neutral-100 text-neutral-700",
};

function ResultCard({
    big,
    badges,
}: {
    big: string;
    badges: { label: string; value: string; tone: "blue" | "neutral" }[];
}) {
    return (
        <div className="mt-5 rounded-xl bg-neutral-50 px-6 py-5 text-center">
            <div className="text-sm text-neutral-500">Result</div>
            <div className="mt-1 text-4xl font-medium tabular-nums text-neutral-900">{big}</div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {badges.map((badge) => (
                    <span
                        key={badge.label}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium ${BADGE_PALETTES[badge.tone]}`}
                    >
                        {badge.value}
                    </span>
                ))}
            </div>
        </div>
    );
}

function ActionRow({
    onCopy,
    onCopyDecimal,
}: {
    onCopy: () => void;
    onCopyDecimal: () => void;
}) {
    return (
        <div className="mt-4 flex gap-2">
            <button
                onClick={onCopy}
                className="flex-1 rounded-lg border border-neutral-200 py-2 text-sm font-medium hover:bg-neutral-50"
            >
                Copy for timesheet
            </button>
            <button
                onClick={onCopyDecimal}
                className="flex-1 rounded-lg border border-neutral-200 py-2 text-sm font-medium hover:bg-neutral-50"
            >
                Copy decimal
            </button>
        </div>
    );
}
