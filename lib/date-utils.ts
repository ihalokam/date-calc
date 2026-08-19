import {
    differenceInCalendarDays,
    eachDayOfInterval,
    isWeekend,
    addDays,
    addWeeks,
    addMonths,
    addYears,
    format,
} from "date-fns";

export type DateUnit = "days" | "weeks" | "months" | "years";

export interface DiffResult {
    totalDays: number;
    years: number;
    months: number;
    days: number;
    weeks: number;
    weeksRemainderDays: number;
    businessDays: number;
    startDay: string;
    endDay: string;
}

/** Days in the month before `date` (i.e. last day of the previous month). */
function daysInPreviousMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
}

/**
 * Full breakdown between two dates. `end` is treated as inclusive-exclusive
 * (standard calendar difference) — this matches how "days between" is
 * commonly understood and is called out explicitly in the FAQ copy.
 *
 * years/months/days is a civil-calendar breakdown (the same approach age
 * calculators use) so it always reads as a clean, non-negative count —
 * e.g. "3 months, 0 days", never "3 months, -2 days".
 */
export function getDateDifference(start: Date, end: Date): DiffResult {
    const [from, to] = start <= end ? [start, end] : [end, start];

    const totalDays = differenceInCalendarDays(to, from);

    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();

    if (days < 0) {
        months -= 1;
        days += daysInPreviousMonth(to);
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    const weeks = Math.floor(totalDays / 7);
    const weeksRemainderDays = totalDays - weeks * 7;

    const businessDays = eachDayOfInterval({ start: from, end: to }).filter(
        (d) => !isWeekend(d)
    ).length;

    return {
        totalDays,
        years,
        months,
        days,
        weeks,
        weeksRemainderDays,
        businessDays,
        startDay: format(from, "EEE"),
        endDay: format(to, "EEE"),
    };
}

/** Add or subtract a duration from a date. Positive amount = add, negative = subtract. */
export function shiftDate(date: Date, amount: number, unit: DateUnit): Date {
    switch (unit) {
        case "days":
            return addDays(date, amount);
        case "weeks":
            return addWeeks(date, amount);
        case "months":
            return addMonths(date, amount);
        case "years":
            return addYears(date, amount);
    }
}

export function formatLong(date: Date): string {
    return format(date, "EEEE, MMMM d, yyyy");
}

export const QUICK_SHORTCUTS = [7, 14, 30, 45, 60, 90, 120, 180, 365] as const;