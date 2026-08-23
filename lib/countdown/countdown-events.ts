export type EventTone = "blue" | "emerald" | "amber" | "rose" | "violet" | "orange" | "sky" | "pink" | "green" | "red";
export type EventCategory = "global" | "human" | "us" | "india";

export interface CountdownEvent {
    /** URL slug — must match the folder under app/countdown/ */
    slug: string;
    name: string;
    description: string;
    tone: EventTone;
    category: EventCategory;
    emoji: string;
}

export const CATEGORY_META: Record<EventCategory, { label: string; subtitle: string }> = {
    global: {
        label: "🌍 Global Celebrations",
        subtitle: "Holidays and events celebrated all around the world",
    },
    human: {
        label: "❤️ For Us Humans",
        subtitle: "Love, appreciation, and the relationships that make life meaningful",
    },
    us: {
        label: "🇺🇸 American Holidays",
        subtitle: "US federal holidays and beloved American traditions",
    },
    india: {
        label: "🇮🇳 Indian Festivals",
        subtitle: "Diwali, Holi, and the festivals that colour India",
    },
};

export const COUNTDOWN_EVENTS: CountdownEvent[] = [
    // ── Global ────────────────────────────────────────────────
    {
        slug: "days-until-christmas",
        name: "Christmas",
        description: "Celebrated on December 25 across the globe.",
        tone: "emerald",
        category: "global",
        emoji: "🎄",
    },
    {
        slug: "days-until-easter",
        name: "Easter",
        description: "Western Easter Sunday — the date shifts every year.",
        tone: "violet",
        category: "global",
        emoji: "🐣",
    },
    {
        slug: "days-until-eid-al-adha",
        name: "Eid al-Adha",
        description: "The Festival of Sacrifice, marking the end of Hajj.",
        tone: "amber",
        category: "global",
        emoji: "🌙",
    },
    {
        slug: "days-until-new-year",
        name: "New Year's Day",
        description: "January 1 — the start of a fresh year, worldwide.",
        tone: "sky",
        category: "global",
        emoji: "🎆",
    },

    // ── Human / Relationship ──────────────────────────────────
    {
        slug: "days-until-valentines-day",
        name: "Valentine's Day",
        description: "February 14 — the day of love and affection.",
        tone: "rose",
        category: "human",
        emoji: "💝",
    },
    {
        slug: "days-until-mothers-day",
        name: "Mother's Day",
        description: "Second Sunday in May — celebrate the mums in your life.",
        tone: "pink",
        category: "human",
        emoji: "🌸",
    },
    {
        slug: "days-until-fathers-day",
        name: "Father's Day",
        description: "Third Sunday in June — a day to honour dads.",
        tone: "blue",
        category: "human",
        emoji: "👔",
    },
    {
        slug: "days-until-hug-day",
        name: "Hug Day",
        description: "December 4 — National Hug Day, spread warmth.",
        tone: "orange",
        category: "human",
        emoji: "🤗",
    },
    {
        slug: "days-until-kiss-day",
        name: "Kiss Day",
        description: "February 13 — the day before Valentine's, sealed with a kiss.",
        tone: "red",
        category: "human",
        emoji: "💋",
    },
    {
        slug: "days-until-friendship-day",
        name: "Friendship Day",
        description: "First Sunday of August — celebrate your best friends.",
        tone: "amber",
        category: "human",
        emoji: "🤝",
    },

    // ── US ────────────────────────────────────────────────────
    {
        slug: "days-until-thanksgiving",
        name: "Thanksgiving",
        description: "Fourth Thursday of November — turkey, gratitude, family.",
        tone: "orange",
        category: "us",
        emoji: "🦃",
    },
    {
        slug: "days-until-independence-day",
        name: "Independence Day",
        description: "July 4 — America's birthday and fireworks night.",
        tone: "blue",
        category: "us",
        emoji: "🎇",
    },
    {
        slug: "days-until-halloween",
        name: "Halloween",
        description: "October 31 — costumes, candy, and all things spooky.",
        tone: "orange",
        category: "us",
        emoji: "🎃",
    },
    {
        slug: "days-until-labor-day-us",
        name: "Labor Day (US)",
        description: "First Monday of September — a long weekend for working Americans.",
        tone: "sky",
        category: "us",
        emoji: "⚒️",
    },

    // ── India ─────────────────────────────────────────────────
    {
        slug: "days-until-diwali",
        name: "Diwali",
        description: "The Festival of Lights — dates shift each year with the lunar calendar.",
        tone: "amber",
        category: "india",
        emoji: "🪔",
    },
    {
        slug: "days-until-holi",
        name: "Holi",
        description: "The Festival of Colours — celebrated in spring.",
        tone: "violet",
        category: "india",
        emoji: "🌈",
    },
    {
        slug: "days-until-independence-day-india",
        name: "India Independence Day",
        description: "August 15 — India's independence since 1947.",
        tone: "green",
        category: "india",
        emoji: "🇮🇳",
    },
    {
        slug: "days-until-republic-day-india",
        name: "India Republic Day",
        description: "January 26 — the day India's constitution came into force.",
        tone: "sky",
        category: "india",
        emoji: "🏛️",
    },
];