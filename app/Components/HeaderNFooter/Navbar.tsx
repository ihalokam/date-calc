import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
    { href: "/time-duration-calculator", label: "Time Duration" },

] as const;

export default function Navbar() {
    return (
        <header className="border-b border-neutral-200 bg-white">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-semibold tracking-tight text-neutral-900"
                >
                    <Image
                        src="/android-chrome-192x192.png"
                        alt="datecalculator.site logo"
                        width={26}
                        height={26}
                        className="rounded-md"
                        priority
                    />
                    datecalculator<span className="text-neutral-400">.site</span>
                </Link>

                {/* Desktop nav */}
                <nav aria-label="Main" className="hidden items-center gap-6 sm:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-neutral-600 hover:text-neutral-900"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile nav — CSS-only disclosure, no client component needed */}
                <details className="relative sm:hidden">
                    <summary className="list-none cursor-pointer rounded-md border border-neutral-200 px-2.5 py-1.5 text-sm text-neutral-600">
                        Menu
                    </summary>
                    <nav
                        aria-label="Main"
                        className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-neutral-200 bg-white p-2 shadow-sm"
                    >
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block rounded-md px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </details>
            </div>
        </header>
    );
}