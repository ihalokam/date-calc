import { COUNTDOWN_EVENTS } from "@/lib/countdown/countdown-events";
import EventCard from "@/app/Components/countdown/EventCard";

export default function EventGrid() {
    return (
        <section className="mx-auto max-w-4xl px-4 py-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {COUNTDOWN_EVENTS.map((event) => (
                    <EventCard key={event.slug} event={event} />
                ))}
            </div>
        </section>
    );
}