export default function ExplainerSection() {
    return (
        <section className="mx-auto max-w-2xl px-4 py-10">
            <h2 className="mb-3 text-lg font-medium text-neutral-900">
                How the calculation works
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-neutral-600">
                <p>
                    A duration like &quot;8 hours 45 minutes&quot; and its decimal
                    form &quot;8.75 hours&quot; represent the same span of time, but
                    most payroll and invoicing software expects decimal hours, not
                    hours and minutes. This calculator shows both at once so you
                    don&apos;t have to convert by hand — 45 minutes is 0.75 of an
                    hour, not &quot;.45,&quot; which is a common source of payroll
                    errors when people convert manually.
                </p>
                <p>
                    If your end time is earlier than your start time — like a 10:00
                    PM to 6:00 AM overnight shift — this calculator assumes the span
                    rolls into the next day rather than returning a negative or
                    incorrect result. If you need to calculate across specific
                    calendar dates instead of just clock times, use the &quot;spans
                    multiple days&quot; option to set exact start and end dates.
                </p>
                <p>
                    Twice a year, clocks shift for daylight saving time in regions
                    that observe it. A span that crosses one of these transitions is
                    either one hour longer or one hour shorter than the clock times
                    alone would suggest — this calculator accounts for that
                    automatically and flags it when it happens, rather than silently
                    giving you a slightly wrong number.
                </p>
                <p>
                    Need a date-based calculation instead — days between two dates,
                    or adding time to a date?{" "}
                    <a
                        href="/"
                        className="text-neutral-900 underline underline-offset-2"
                    >
                        Use the date calculator
                    </a>
                    .
                </p>
            </div>
        </section>
    );
}