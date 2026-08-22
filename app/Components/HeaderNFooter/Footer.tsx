import Link from "next/link";

// Routes below are linked now even though several pages haven't been built
// yet (see comments) — having the links live and crawlable from launch is
// what gets them indexed quickly once each page ships.

const TOOL_LINKS = [
    { href: "/time-duration-calculator", label: "Time duration calculator" },

] as const;

const COMPANY_LINKS = [
    { href: "/about", label: "About" }, // build soon — AdSense/E-E-A-T signal
    { href: "/contact", label: "Contact" }, // build soon — required for AdSense approval
] as const;

const LEGAL_LINKS = [
    { href: "/privacy-policy", label: "Privacy policy" }, // required for AdSense
    { href: "/terms-of-service", label: "Terms of service" }, // strongly recommended
    { href: "/cookie-policy", label: "Cookie policy" }, // covers ad personalization disclosure
] as const;

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-neutral-200 bg-neutral-50">
            <div className="mx-auto max-w-4xl px-4 py-10">
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                    <FooterColumn title="Tools" links={TOOL_LINKS} />
                    <div>
                        <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-600">
                            Company
                        </h3>
                        <ul className="space-y-2">
                            {COMPANY_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-neutral-600 hover:text-neutral-900"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                {/* External, intentionally followed (no rel="nofollow") */}
                                <a
                                    href="https://standardconvert.com/"
                                    target="_blank"
                                    rel="noopener"
                                    className="text-sm text-neutral-600 hover:text-neutral-900"
                                >
                                    Standard Convert
                                </a>
                            </li>
                        </ul>
                    </div>
                    <FooterColumn title="Legal" links={LEGAL_LINKS} />
                    <div>
                        <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-600">
                            About this site
                        </h3>
                        <p className="text-sm leading-relaxed text-neutral-600">
                            Free date calculation tools. All calculations run in your
                            browser — no data is collected or stored.
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-2 border-t border-neutral-200 pt-6 text-xs text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
                    <p>&copy; {year} datecalculator.site. All rights reserved.</p>
                    <Link href="/sitemap.xml" className="text-neutral-600 hover:text-neutral-700">
                        Sitemap
                    </Link>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({
    title,
    links,
}: {
    title: string;
    links: readonly { href: string; label: string }[];
}) {
    return (
        <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-600">
                {title}
            </h3>
            <ul className="space-y-2">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="text-sm text-neutral-600 hover:text-neutral-900"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}