import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import Navbar from "../Components/HeaderNFooter/Navbar";
import Footer from "../Components/HeaderNFooter/Footer";

export const metadata: Metadata = {
    title: `Contact — ${SITE_CONFIG.siteName}`,
    description: `Get in touch with the team behind ${SITE_CONFIG.siteName}.`,
    alternates: {
        canonical: `${SITE_CONFIG.domain}/contact`,
    },
};

export default function ContactPage() {
    return (
        <>
            <Navbar />

            <main className="mx-auto max-w-2xl px-4 py-14">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    Contact
                </h1>

                <div className="mt-6 space-y-5 text-sm leading-relaxed text-neutral-600">
                    <p>
                        Found a bug, have a feature request, or a question about a
                        calculation? Reach out directly:
                    </p>

                    <a
                        href={`mailto:${SITE_CONFIG.contactEmail}`}
                        className="inline-block rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
                    >
                        {SITE_CONFIG.contactEmail}
                    </a>

                    <p className="text-xs text-neutral-400">
                        We aim to respond within a few business days.
                    </p>
                </div>
            </main>

            <Footer />
        </>
    );
}