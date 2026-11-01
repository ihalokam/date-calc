export default function Hero() {
    return (
        <div className="mx-auto max-w-2xl px-4 pb-6 pt-12 text-center sm:pt-16">
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                Date Calculator
            </h1>
            <p className="mt-2 text-lg font-medium text-neutral-600">
                Days Between Dates &amp; Add / Subtract Time
            </p>
            <p className="mt-3 text-base text-neutral-500">
                Find the exact number of days, weeks, months, or years between
                any two dates — or add and subtract time from a date instantly.
                Runs entirely in your browser, nothing is sent to a server.
            </p>
        </div>
    );
}
