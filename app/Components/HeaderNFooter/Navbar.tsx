import Link from "next/link";

const NAV_LINKS = [

    { href: "/days-between-two-dates", label: "Days between" },
    { href: "/business-days-calculator", label: "Business days" },
    { href: "/age-calculator", label: "Age" },
    { href: "/days-until", label: "Countdown" },
] as const;

export default function Navbar() {
    return (
        <header className="border-b border-neutral-200 bg-white">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
                <Link href="/" className="text-sm font-semibold tracking-tight text-neutral-900">
                    datecalculator<span className="text-neutral-400">.site</span>
                </Link>


            </div>
        </header>
    );
}