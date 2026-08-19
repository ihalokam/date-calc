import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import Navbar from "../Components/HeaderNFooter/Navbar";
import Footer from "../Components/HeaderNFooter/Footer";

export const metadata: Metadata = {
    title: `Privacy Policy — ${SITE_CONFIG.siteName}`,
    description: `How ${SITE_CONFIG.siteName} handles data, cookies, and third-party advertising.`,
    alternates: { canonical: `${SITE_CONFIG.domain}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-2xl px-4 py-14">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Privacy policy
                </h1>
                <p className="mt-2 text-sm text-neutral-400">
                    Effective {SITE_CONFIG.privacyPolicyEffectiveDate}
                </p>

                <div className="mt-6 space-y-6 text-sm leading-relaxed text-neutral-600">
                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Overview
                        </h2>
                        <p>
                            {SITE_CONFIG.siteName} (&quot;we,&quot; &quot;us&quot;) provides
                            date calculation tools. This policy explains what data is
                            collected when you use this site and how it is used.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Calculation data
                        </h2>
                        <p>
                            The dates and durations you enter into our calculators are
                            processed entirely in your browser using JavaScript. This data
                            is not transmitted to, or stored on, our servers.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Cookies and advertising
                        </h2>
                        <p>
                            We use Google AdSense to display advertising on this site.
                            Google and its partners may use cookies, web beacons, and
                            similar technologies to serve ads based on your prior visits to
                            this and other websites.
                        </p>
                        <p className="mt-2">
                            You can opt out of personalized advertising by visiting{" "}
                            <a
                                href="https://adssettings.google.com"
                                className="text-neutral-900 underline underline-offset-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Google Ads Settings
                            </a>
                            , or{" "}
                            <a
                                href="https://www.aboutads.info/choices"
                                className="text-neutral-900 underline underline-offset-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                aboutads.info/choices
                            </a>{" "}
                            if you are outside the EU. See our{" "}
                            <a
                                href="/cookie-policy"
                                className="text-neutral-900 underline underline-offset-2"
                            >
                                cookie policy
                            </a>{" "}
                            for a full breakdown of cookies used on this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Analytics
                        </h2>
                        <p>
                            {/* TODO: name your actual analytics provider (e.g. Google
                Analytics, Plausible, Vercel Analytics) once you add one,
                and update this paragraph to match what it actually
                collects (page views, referrer, approximate location,
                device type, etc.) */}
                            [We use / do not currently use] a web analytics service to
                            understand aggregate traffic patterns, such as which pages are
                            visited and approximate geographic region. This data is
                            anonymized/aggregated and is not used to identify individual
                            visitors.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Your rights
                        </h2>
                        <p>
                            Depending on your location, you may have rights under
                            regulations such as the GDPR or CCPA to access, correct, or
                            request deletion of personal data we hold about you. Since we
                            do not collect personal data through our calculators, there is
                            generally nothing tied to you to access or delete. For
                            questions, contact us at{" "}
                            <a
                                href={`mailto:${SITE_CONFIG.contactEmail}`}
                                className="text-neutral-900 underline underline-offset-2"
                            >
                                {SITE_CONFIG.contactEmail}
                            </a>
                            .
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Children&apos;s privacy
                        </h2>
                        <p>
                            This site is not directed at children under 13, and we do not
                            knowingly collect personal data from children.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Changes to this policy
                        </h2>
                        <p>
                            We may update this policy from time to time. The effective
                            date above reflects the most recent revision.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Contact
                        </h2>
                        <p>
                            Questions about this policy:{" "}
                            <a
                                href={`mailto:${SITE_CONFIG.contactEmail}`}
                                className="text-neutral-900 underline underline-offset-2"
                            >
                                {SITE_CONFIG.contactEmail}
                            </a>
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}