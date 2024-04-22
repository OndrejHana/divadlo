import { dbGetPlays } from "@/db-handler/db-plays";
import { Play } from "@/types/play";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Link from "next/link";
import { dbGetEvents } from "@/db-handler/db-events";
import { Event } from "@/types/event";

function PlayCard({ event }: { event: Event }) {
    return (
        <Link
            className="w-full border-y bg-muted justify-center"
            href={`/events/${event.id}`}
        >
            <div className="flex w-full flex-row gap p justify-center">
                <div className="flex w-full flex-col gap-4 p-4">
                        <h2 className="text-2xl font-bold text-primary m-0 p-0">
                            {event.play.name}
                        </h2>
                        <p>{event.play.author}</p>
                </div>
                <div className="flex w-full flex-col gap-4 p-4">
                    <p>{event.hall.name}</p>
                    <p><Date>{event.time}</Date></p>
                </div>

            </div>
        </Link>
    );
}

function PlayCardSkeleton() {
    return (
        <div className="flex h-full w-full flex-col gap-2 p-2">
            <Skeleton className="h-32 w-full rounded-none border-y border-primary" />
            <Skeleton className="h-32 w-full rounded-none border-y border-primary" />
            <Skeleton className="h-32 w-full rounded-none border-y border-primary" />
        </div>
    );
}

async function PlayList() {
    const events = await dbGetEvents();
    return (
        <div className="flex h-full w-full flex-col gap-2 p-2">
            {events.map((event) => (
                <PlayCard key={event.id} event={event} />
            ))}
        </div>
    );
}

export default async function Page() {
    return (
        <div className="flex h-full w-full flex-col justify-center">
            <h1 className="w-full p-8 text-4xl font-bold text-primary">
                Program
            </h1>
            <div className="max-h-full grow">
                <Suspense fallback={<PlayCardSkeleton />}>
                    <PlayList />
                </Suspense>
            </div>
        </div>
    );
}
