import { dbGetEvents } from "@/db-handler/db-events";
import { Event } from "@/types/event";

export function EventCard({ event }: { event: Event }) {
    return (
        <div className="relative flex h-64 w-64 justify-between">
            <div className="h-full w-48 bg-muted" />
            <div className="absolute right-0 flex h-full w-48 items-center">
                <div className="flex h-4/5 w-full flex-col justify-between bg-primary text-center text-primary-foreground shadow">
                    <div className="flex grow flex-col justify-between px-2 py-6">
                        <h3 className="text-lg font-bold">{event.play.name}</h3>
                        <p>
                            {event.time.toLocaleString("cs-CZ", {
                                timeZone: "Europe/Prague",
                            })}
                        </p>
                    </div>
                    <div className="w-full bg-secondary px-2 py-4 font-bold">
                        <p>Koupit vstupenky</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default async function MainPageEventList() {
    const events = await dbGetEvents();

    return (
        <div className="flex h-full w-full flex-col gap-8 px-2 py-8 lg:px-16">
            <h2 className="text-2xl font-bold text-primary">
                Nejbližší představení
            </h2>
            <div className="flex gap-8 overflow-x-auto">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}
