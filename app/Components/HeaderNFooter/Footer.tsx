import Link from "next/link";
import type { SVGProps } from "react";


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

const SOCIAL_LINKS = [
    {
        href: "https://www.instagram.com/ihalokam_off/",
        label: "Instagram",
        Icon: InstagramIcon,
    },
    {
        href: "https://www.facebook.com/people/L-HiTs/100075020381057/",
        label: "Facebook",
        Icon: FacebookIcon,
    },
    {
        href: "https://www.youtube.com/@ihalokam",
        label: "YouTube",
        Icon: YoutubeIcon,
    },
    {
        href: "https://x.com/deyy_hi",
        label: "X (Twitter)",
        Icon: XIcon,
    },
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
                        <ul className="mt-4 flex items-center gap-3">
                            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                                <li key={href}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900"
                                    >
                                        <Icon className="h-4 w-4" aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </ul>
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

function InstagramIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

function FacebookIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
}

function YoutubeIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
            <polygon points="10 15 15 12 10 9 10 15" />
        </svg>
    );
}

// lucide-react doesn't ship the X (formerly Twitter) glyph, so it's defined
// inline here to match the size/stroke conventions of the other icons.
function XIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            {...props}
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}