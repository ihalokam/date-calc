import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import Navbar from "../Components/HeaderNFooter/Navbar";
import Footer from "../Components/HeaderNFooter/Footer";

export const metadata: Metadata = {
    title: `Cookie Policy — ${SITE_CONFIG.siteName}`,
    description: `Which cookies ${SITE_CONFIG.siteName} and its advertising partners use.`,
    alternates: { canonical: `${SITE_CONFIG.domain}/cookie-policy` },
};

export default function CookiePolicyPage() {
    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-2xl px-4 py-14">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Cookie policy
                </h1>
                <p className="mt-2 text-sm text-neutral-400">
                    Effective {SITE_CONFIG.cookiePolicyEffectiveDate}
                </p>

                <div className="mt-6 space-y-6 text-sm leading-relaxed text-neutral-600">
                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            What are cookies
                        </h2>
                        <p>
                            Cookies are small text files stored on your device that help
                            websites remember information about your visit.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Cookies used on this site
                        </h2>

                        <div className="mt-3 overflow-hidden rounded-lg border border-neutral-200">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-neutral-50 text-neutral-500">
                                    <tr>
                                        <th className="px-3 py-2 font-medium">Provider</th>
                                        <th className="px-3 py-2 font-medium">Purpose</th>
                                        <th className="px-3 py-2 font-medium">Type</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200">
                                    <tr>
                                        <td className="px-3 py-2">Google AdSense</td>
                                        <td className="px-3 py-2">
                                            Ad delivery and personalization based on browsing
                                            history
                                        </td>
                                        <td className="px-3 py-2">Third-party, advertising</td>
                                    </tr>
                                    <tr>
                                        <td className="px-3 py-2">
                                            {/* TODO: replace/remove this row once you confirm
                        which analytics provider (if any) you're using */}
                                            Google Analytics
                                        </td>
                                        <td className="px-3 py-2">Aggregate traffic measurement</td>
                                        <td className="px-3 py-2">Third-party, analytics</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-3">
                            We do not set our own tracking cookies for the calculators
                            themselves — all date math runs client-side without needing to
                            remember state between visits.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Managing cookies
                        </h2>
                        <p>
                            You can control or delete cookies through your browser
                            settings. Opting out of advertising cookies specifically:{" "}
                            <a
                                href="https://adssettings.google.com"
                                className="text-neutral-900 underline underline-offset-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Google Ads Settings
                            </a>{" "}
                            or{" "}
                            <a
                                href="https://www.aboutads.info/choices"
                                className="text-neutral-900 underline underline-offset-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                aboutads.info/choices
                            </a>
                            . Note that disabling cookies may affect ad relevance but will
                            not affect the calculators&apos; functionality.
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