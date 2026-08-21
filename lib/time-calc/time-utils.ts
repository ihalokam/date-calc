export interface DurationResult {
    totalMinutes: number;
    hours: number;
    minutes: number;
    decimalHours: number;
    crossesDST: boolean;
}

function parseTimeToMinutes(time: string): number {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

/** Combines an ISO date ("2026-08-19") and a time string ("14:30") into a Date. */
function combineDateTime(dateISO: string, time: string): Date {
    const [h, m] = time.split(":").map(Number);
    const d = new Date(`${dateISO}T00:00:00`);
    d.setHours(h, m, 0, 0);
    return d;
}

function buildResult(startDate: Date, endDate: Date): DurationResult {
    const totalMinutes = Math.round((endDate.getTime() - startDate.getTime()) / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const decimalHours = Math.round((totalMinutes / 60) * 100) / 100;

    // A DST transition changes each Date's UTC offset even though the wall-clock
    // times look like simple arithmetic — flagging it is the kind of edge case
    // most competing calculators quietly get wrong.
    const crossesDST = startDate.getTimezoneOffset() !== endDate.getTimezoneOffset();

    return { totalMinutes, hours, minutes, decimalHours, crossesDST };
}

/**
 * Duration between two clock times.
 * - Same-day mode: if end <= start, assumes the span rolls past midnight
 *   into the next day (e.g. a 10pm–6am overnight shift), so the user never
 *   has to manually flag "this crosses midnight."
 * - Multi-day mode: uses the explicit start/end dates as given.
 */
export function getTimeDuration(
    startTime: string,
    endTime: string,
    spansMultipleDays: boolean,
    startDateISO?: string,
    endDateISO?: string
): DurationResult {
    const todayISO = new Date().toISOString().slice(0, 10);

    if (spansMultipleDays && startDateISO && endDateISO) {
        const start = combineDateTime(startDateISO, startTime);
        const end = combineDateTime(endDateISO, endTime);
        return buildResult(start, end);
    }

    const start = combineDateTime(todayISO, startTime);
    let end = combineDateTime(todayISO, endTime);
    if (parseTimeToMinutes(endTime) <= parseTimeToMinutes(startTime)) {
        end = new Date(end.getTime() + 24 * 60 * 60 * 1000); // roll into next day
    }
    return buildResult(start, end);
}

export interface PayrollResult extends DurationResult {
    netMinutes: number;
    netHours: number;
    netRemainderMinutes: number;
    netDecimalHours: number;
    isOvertime: boolean;
    overtimeMinutes: number;
}

/** Same as getTimeDuration, plus break deduction and an optional daily overtime threshold. */
export function getPayrollDuration(
    startTime: string,
    endTime: string,
    spansMultipleDays: boolean,
    breakMinutes: number,
    overtimeThresholdHours: number | null,
    startDateISO?: string,
    endDateISO?: string
): PayrollResult {
    const base = getTimeDuration(startTime, endTime, spansMultipleDays, startDateISO, endDateISO);
    const netMinutes = Math.max(0, base.totalMinutes - breakMinutes);
    const netHours = Math.floor(netMinutes / 60);
    const netRemainderMinutes = netMinutes % 60;
    const netDecimalHours = Math.round((netMinutes / 60) * 100) / 100;

    const thresholdMinutes = overtimeThresholdHours != null ? overtimeThresholdHours * 60 : null;
    const isOvertime = thresholdMinutes != null && netMinutes > thresholdMinutes;
    const overtimeMinutes = isOvertime && thresholdMinutes != null ? netMinutes - thresholdMinutes : 0;

    return {
        ...base,
        netMinutes,
        netHours,
        netRemainderMinutes,
        netDecimalHours,
        isOvertime,
        overtimeMinutes,
    };
}

/** "How long until/since" a clock time today — rolls to the adjacent day if needed. */
export function getQuickShortcut(
    direction: "until" | "since",
    targetTime: string
): DurationResult {
    const now = new Date();
    const todayISO = now.toISOString().slice(0, 10);
    let target = combineDateTime(todayISO, targetTime);

    if (direction === "until") {
        if (target <= now) target = new Date(target.getTime() + 24 * 60 * 60 * 1000);
        return buildResult(now, target);
    } else {
        if (target >= now) target = new Date(target.getTime() - 24 * 60 * 60 * 1000);
        return buildResult(target, now);
    }
}

export function formatTimeLabel(time: string): string {
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}