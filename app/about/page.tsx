import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import Navbar from "../Components/HeaderNFooter/Navbar";
import Footer from "../Components/HeaderNFooter/Footer";

export const metadata: Metadata = {
    title: `About — ${SITE_CONFIG.siteName}`,
    description:
        "Why this date calculator exists, how it works, and who built it.",
    alternates: { canonical: `${SITE_CONFIG.domain}/about` },
};

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-2xl px-4 py-14">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    About {SITE_CONFIG.siteName}
                </h1>

                <div className="mt-6 space-y-5 text-sm leading-relaxed text-neutral-600">
                    <p>
                        {/* TODO: replace with your real origin story — 2-3 sentences,
              specific, not generic. Example prompt for yourself: what
              annoyed you about existing date calculators that made you
              build this one? */}
                        {SITE_CONFIG.siteName} was built to be a fast, accurate, and
                        distraction-free way to do date math — finding the number of days
                        between two dates, adding or subtracting time from a date, and
                        quickly answering questions like &quot;what date is 90 days from
                        today.&quot;
                    </p>

                    <p>
                        Every calculation runs locally in your browser. No dates you enter
                        are sent to or stored on our servers — see the{" "}
                        <a
                            href="/privacy-policy"
                            className="text-neutral-900 underline underline-offset-2"
                        >
                            privacy policy
                        </a>{" "}
                        for details.
                    </p>

                    <h2 className="pt-2 text-lg font-medium text-neutral-900">
                        How the calculations work
                    </h2>
                    <p>
                        Date math accounts for the actual Gregorian calendar — variable
                        month lengths, leap years, and the ambiguity of operations like
                        &quot;add one month&quot; to a date near the end of a month. We
                        document these conventions on each tool page so results are
                        predictable, not a black box.
                    </p>

                    <h2 className="pt-2 text-lg font-medium text-neutral-900">
                        Who&apos;s behind this
                    </h2>
                    <p>
                        {/* TODO: add a real name/team and, ideally, a short relevant
              credential or background line. AdSense and users both trust
              a site more when there's an accountable person behind it,
              not an anonymous "we". */}
                        [Add a short note about who runs this site — a name, background,
                        or team description.]
                    </p>

                    <p>
                        Questions, feedback, or found a bug?{" "}
                        <a
                            href="/contact"
                            className="text-neutral-900 underline underline-offset-2"
                        >
                            Get in touch
                        </a>
                        .
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
}