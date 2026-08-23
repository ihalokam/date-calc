export default function CountdownIndexHero() {
    return (
        <div
            className="relative overflow-hidden bg-neutral-950 py-20 text-center"
            style={{
                backgroundImage:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(236,72,153,0.12) 0%, transparent 70%)",
            }}
        >
            {/* Ambient orbs */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)" }}
            />

            <div className="relative mx-auto max-w-2xl px-4">
                <p className="mb-3 text-sm font-medium uppercase tracking-widest text-violet-400">
                    Live Countdowns
                </p>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    Every holiday.{" "}
                    <span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage: "linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)",
                        }}
                    >
                        Every countdown.
                    </span>
                </h1>
                <p className="mt-4 text-base leading-relaxed text-neutral-400 sm:text-lg">
                    Pick any event below for a dedicated countdown page that tells you
                    exactly how many days away it is.
                </p>
            </div>
        </div>
    );
}
