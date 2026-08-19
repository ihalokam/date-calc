import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "../lib/site-config";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            // Nothing to disallow yet — this is a public tools site with no
            // account areas, admin routes, or duplicate query-param pages that
            // need blocking. Revisit if you add e.g. filtered/sorted list views
            // that create near-duplicate crawlable URLs.
        },
        sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
    };
}