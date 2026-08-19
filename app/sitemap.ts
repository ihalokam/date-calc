import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "../lib/site-config";

// Only list routes that actually exist and return 200 — an unbuilt page
// in the sitemap just wastes crawl budget and can look like a soft-404
// signal to Google. Move an entry up from the "not yet built" block below
// the same day you ship that page.
const STATIC_ROUTES: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
        { path: "/", priority: 1, changeFrequency: "daily" },
        { path: "/about", priority: 0.3, changeFrequency: "yearly" },
        { path: "/contact", priority: 0.3, changeFrequency: "yearly" },
        { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
        { path: "/terms-of-service", priority: 0.2, changeFrequency: "yearly" },
        { path: "/cookie-policy", priority: 0.2, changeFrequency: "yearly" },

        // Not yet built — uncomment as each ships:
        // { path: "/days-between-two-dates", priority: 0.9, changeFrequency: "daily" },
        // { path: "/add-subtract-date", priority: 0.9, changeFrequency: "daily" },
        // { path: "/business-days-calculator", priority: 0.8, changeFrequency: "weekly" },
        // { path: "/age-calculator", priority: 0.8, changeFrequency: "weekly" },
        // { path: "/days-until", priority: 0.7, changeFrequency: "weekly" },
        // { path: "/week-number-calculator", priority: 0.6, changeFrequency: "weekly" },
        // { path: "/day-of-the-week-calculator", priority: 0.6, changeFrequency: "weekly" },
        // { path: "/calendar", priority: 0.6, changeFrequency: "monthly" },
    ];

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return STATIC_ROUTES.map((route) => ({
        url: `${SITE_CONFIG.domain}${route.path}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

    // Once /days-from-today/[n] and /days-ago/[n] are built, add their
    // entries back in here using QUICK_SHORTCUTS from ../lib/date-utils
    // (see previous version of this file for the exact flatMap pattern).
}