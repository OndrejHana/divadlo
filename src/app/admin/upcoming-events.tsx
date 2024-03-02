import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getEvents } from "@/server/events";
import dayjs from "dayjs";
import Link from "next/link";

export default async function UpcomingEvents() {
    const events = await getEvents();

    return (
        <Card className="flex w-full max-w-2xl flex-col gap-4 p-2 shadow">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Nadcházející akce
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Seznam nadcházejících akcí
                    </p>
                </div>
                <Button variant="default" asChild>
                    <Link href="admin/events/add-event">Přidat akci</Link>
                </Button>
            </div>
            <div>
                {events.map((event) => (
                    <Link
                        href={`/admin/events/${event.id}`}
                        key={event.id}
                        className="flex justify-between rounded p-1 transition-all duration-200 ease-in-out hover:bg-muted "
                    >
                        <div className="flex gap-2">
                            <h3 className="font-medium">{event.play.name}</h3>
                            <p className="text-muted-foreground">
                                {event.hall.name}
                            </p>
                        </div>
                        <p className="text-muted-foreground">
                            {dayjs(event.time).format("DD.MM.YYYY")}
                        </p>
                    </Link>
                ))}
            </div>
        </Card>
    );
}
