import FeedbackCarousel from "./FeedbackCarousel";

const FEEDBACK = [
    {
        name: "Michael",
        quote:
            "I was looking for a proper age calculator. Finally found it — thank you.",
    },
    {
        name: "Jessica",
        quote:
            "My mind just can't process day counts that fast, so this tool is genuinely handy for me.",
    },
    {
        name: "Oliver",
        quote:
            "I'm a contract worker and I always mess up dates in my head — this site has exactly what I need.",
    },
    {
        name: "Charlotte",
        quote:
            "Nice, clean experience. I used to work with a cluttered one — I think I found the gem.",
    },
    {
        name: "Isla",
        quote: "Okay, now my schedules are actually on track.",
    },
    {
        name: "Haashir",
        quote:
            "I used to mess up our video shoot schedules. My whole team switched to datecalculator.site — everyone's happy now.",
    },
    {
        name: "Zayed",
        quote: "Now I can actually know how old something is, instantly.",
    },
] as const;

export default function Feedback() {
    return (
        <section className="mx-auto max-w-4xl px-4 py-14">
            <div className="mb-8 text-center">
                <h2 className="text-lg font-medium text-neutral-900">
                    What people use it for
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                    Real feedback from people who use these tools regularly.
                </p>
            </div>

            <FeedbackCarousel feedback={FEEDBACK} />
        </section>
    );
}