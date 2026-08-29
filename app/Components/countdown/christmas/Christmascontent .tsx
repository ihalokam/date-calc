const SECTIONS = [
    {
        q: "How do we calculate the days until Christmas?",
        icon: "🎄",
        a: "This page checks today's date against December 25 of the current year. If December 25 hasn't happened yet this year, the countdown targets that date. If it has already passed, the countdown automatically rolls forward to December 25 of next year instead — so the number you see is always the real number of calendar days until the next upcoming Christmas, recalculated fresh every time the page loads.",
    },
    {
        q: "Which date do people around the world celebrate Christmas?",
        icon: "🌍",
        a: "Most of the world — Catholic, Protestant, and much of the Western Christian tradition — celebrates on December 25, following the Gregorian calendar. However, several Orthodox churches, including the Russian, Georgian, Serbian, and Ethiopian Orthodox Churches, still follow the older Julian calendar for religious dates. Because the Julian calendar has drifted about 13 days behind the Gregorian calendar over the centuries, their \"December 25\" falls on January 7 in the modern Gregorian calendar most of the world uses day-to-day. The Armenian Apostolic Church observes Nativity on January 6, combined with its celebration of Epiphany.",
    },
    {
        q: "What is the history behind Christmas being on December 25?",
        icon: "📜",
        a: "The earliest clear historical record of Christmas being celebrated on December 25 comes from Rome in 336 AD, during the reign of Emperor Constantine. The New Testament itself doesn't state a birth date, so the choice of December 25 has been explained by historians in two main ways. One theory holds that the early Church set the date to align with, or gradually replace, existing Roman winter festivals held around the same time, such as Saturnalia and the feast of Sol Invictus (the \"Unconquered Sun\"), which celebrated the winter solstice. A second theory, sometimes called the \"calculation theory,\" suggests early Christians arrived at December 25 by counting nine months forward from March 25, a date some early theologians associated with Jesus's conception. Historians don't fully agree on which explanation is more accurate, and both may have played some role.",
    },
    {
        q: "Was Jesus Christ actually born on December 25?",
        icon: "⭐",
        a: "Most historians and biblical scholars think it's unlikely that December 25 is the actual historical birth date — it isn't stated anywhere in the Bible, and the date wasn't formally observed until roughly three centuries after the events it commemorates. Some scholars point to a detail in the Gospel of Luke, which describes shepherds \"keeping watch over their flocks by night\" in open fields — a practice more commonly associated with warmer months in the region than the cold, wet winter season in Judea — as a clue that a birth in spring or another season may be more historically plausible. December 25 is best understood as the date the Church came to observe the celebration, rather than a historically documented birth record.",
    },
    {
        q: "History of Christmas",
        icon: "🕰️",
        a: "Christmas has changed shape considerably over roughly 1,700 years. Its early observance overlapped with existing winter customs, including gift-giving traditions from Roman Saturnalia and the Yule log tradition from Germanic and Norse midwinter festivals. In 17th-century England and among Puritan colonists in early America, Christmas celebrations were actually banned for a period, seen as too closely tied to pagan festivity and excess. Much of the Christmas imagery recognized today took shape during the Victorian era in the 19th century — Christmas trees were popularized in Britain after Prince Albert and Queen Victoria were depicted with one, and Charles Dickens's 1843 novella A Christmas Carol helped cement themes of family, charity, and goodwill now closely associated with the holiday. The modern figure of Santa Claus developed from a blend of the Dutch Sinterklaas, the English Father Christmas, and 19th–20th century American illustrations and advertising that shaped his now-familiar red-suited appearance.",
    },
    {
        q: "Which countries celebrate Christmas to the fullest?",
        icon: "🎅",
        a: "A handful of countries stand out for the scale and length of their celebrations. The Philippines is often cited as having the world's longest Christmas season, with festivities and dawn masses (Simbang Gabi) beginning as early as September. Germany and Austria are famous for elaborate Christmas markets (Christkindlmarkt), a tradition with roots going back centuries. The United States treats Christmas as a major national and commercial event, centered on traditions like the Rockefeller Center tree lighting. Mexico observes Las Posadas and Nochebuena with strong family and community traditions. In the Nordic countries, Finland holds particular significance as the officially recognized \"hometown\" of Santa Claus. Meanwhile, Australia and New Zealand celebrate a distinctly different Christmas — during their summer season, often with beach gatherings rather than snow.",
    },
    {
        q: "What are the must-visit places for Christmas, and what makes them special?",
        icon: "✈️",
        a: "A few destinations are especially known for their Christmas atmosphere. Rovaniemi, Finland, sits on the Arctic Circle and is home to Santa Claus Village, the officially recognized home of Santa Claus. Strasbourg, France, calls itself the \"Capital of Christmas\" and hosts one of Europe's oldest Christmas markets, dating back to 1570. Nuremberg, Germany, is famous for its historic Christkindlesmarkt and traditional gingerbread (Lebkuchen). Vienna, Austria, offers elegant markets known for mulled wine (Glühwein) and classical holiday music. New York City draws visitors for the Rockefeller Center tree and the Fifth Avenue holiday window displays. And Bethlehem, in the West Bank, remains one of the most significant Christmas pilgrimage destinations in the world, centered on the Church of the Nativity and its Midnight Mass in Manger Square.",
    },
    {
        q: "Where was Jesus born?",
        icon: "⛪",
        a: "According to the Gospels of Matthew and Luke in the New Testament, Jesus was born in Bethlehem, a town in the region of Judea. Bethlehem is located today in the West Bank, administered by the Palestinian Authority, a short distance south of Jerusalem. The Church of the Nativity, built over the traditional site of the birth, is one of the oldest continuously operating churches in the world and remains a major Christian pilgrimage site, particularly during the Christmas season.",
    },
] as const;

export { SECTIONS as CHRISTMAS_FAQ };

export default function ChristmasContent() {
    return (
        <section className="mx-auto max-w-2xl px-4 py-12">
            <div className="mb-8 text-center">
                <span className="text-3xl">🎄</span>
                <h2 className="mt-2 text-xl font-semibold text-neutral-900">
                    Everything about Christmas
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                    The history, dates, and places behind December 25.
                </p>
            </div>

            <div className="space-y-6">
                {SECTIONS.map((section) => (
                    <article
                        key={section.q}
                        className="rounded-2xl border border-red-100 bg-gradient-to-br from-white to-red-50/40 p-5"
                    >
                        <h3 className="flex items-start gap-2 text-base font-medium text-neutral-900">
                            <span aria-hidden="true">{section.icon}</span>
                            {section.q}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                            {section.a}
                        </p>
                    </article>
                ))}
            </div>

            <p className="mt-8 text-center text-xs text-neutral-400">
                Need a different date range?{" "}
                <a href="/" className="text-emerald-700 underline underline-offset-2">
                    Try the full date calculator
                </a>
                .
            </p>

        </section>

    );
}