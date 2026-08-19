import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import Navbar from "../Components/HeaderNFooter/Navbar";
import Footer from "../Components/HeaderNFooter/Footer";

export const metadata: Metadata = {
    title: `Terms of Service — ${SITE_CONFIG.siteName}`,
    description: `The terms governing use of ${SITE_CONFIG.siteName}.`,
    alternates: { canonical: `${SITE_CONFIG.domain}/terms-of-service` },
};

export default function TermsOfServicePage() {
    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-2xl px-4 py-14">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Terms of service
                </h1>
                <p className="mt-2 text-sm text-neutral-400">
                    Effective {SITE_CONFIG.termsEffectiveDate}
                </p>

                <div className="mt-6 space-y-6 text-sm leading-relaxed text-neutral-600">
                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Acceptance of terms
                        </h2>
                        <p>
                            By using {SITE_CONFIG.siteName}, you agree to these terms. If
                            you do not agree, please do not use this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Use of the tools
                        </h2>
                        <p>
                            Our calculators are provided for general informational and
                            planning purposes. You are responsible for verifying results
                            before relying on them for legal, financial, medical, or other
                            consequential decisions — for example, contract deadlines,
                            statutes of limitation, or visa expiration dates.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            No warranty
                        </h2>
                        <p>
                            This site is provided &quot;as is&quot; without warranties of
                            any kind, express or implied. We do not guarantee that
                            calculations will be uninterrupted, error-free, or fit for any
                            particular purpose.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Limitation of liability
                        </h2>
                        <p>
                            To the fullest extent permitted by law,{" "}
                            {SITE_CONFIG.siteName} and its operators are not liable for any
                            damages arising from reliance on results produced by this site,
                            including missed deadlines or financial loss.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Advertising
                        </h2>
                        <p>
                            This site displays advertising served by Google AdSense and
                            other third-party ad networks. We are not responsible for the
                            content of third-party advertisements.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Changes to these terms
                        </h2>
                        <p>
                            We may revise these terms from time to time. Continued use of
                            the site after changes constitutes acceptance of the revised
                            terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Governing law
                        </h2>
                        <p>
                            {/* TODO: fill in SITE_CONFIG.jurisdiction in
                lib/site-config.ts, e.g. "the laws of India" — leave
                generic until you decide, or consult a lawyer if this
                site starts generating meaningful revenue. */}
                            These terms are governed by the laws of{" "}
                            {SITE_CONFIG.jurisdiction || "[jurisdiction to be added]"}.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-2 text-base font-medium text-neutral-900">
                            Contact
                        </h2>
                        <p>
                            Questions about these terms:{" "}
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