import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { dbGetEvents } from "@/db-handler/db-events";
import Link from "next/link";
import { format } from "date-fns";

export default async function UpcomingEvents() {
    const events = await dbGetEvents();

    return (
        <Card className="flex w-full max-w-2xl flex-col rounded-none shadow">
            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
                <div className="flex h-full flex-col">
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Nadcházející akce
                    </h2>
                    <p className="text-sm">Seznam nadcházejících akcí</p>
                </div>
                <Button variant="secondary" asChild>
                    <Link href="/admin/events/add-event">Přidat akci</Link>
                </Button>
            </div>
            <div className="flex flex-col gap-[2px] bg-primary">
                {events.map((event) => (
                    <Link href={`/admin/events/${event.id}`} key={event.id}>
                        <div
                            key={event.id}
                            className="flex justify-between bg-background p-2 hover:bg-muted"
                        >
                            <div className="font-bold">{event.play.name}</div>
                            <div className="flex gap-2">
                                <div className="text-muted-foreground">
                                    {format(event.time, "dd.MM.yyyy hh:mm")}
                                </div>
                                <div>{event.hall.name}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </Card>
    );
}
