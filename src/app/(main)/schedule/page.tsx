import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Link from "next/link";
import { dbGetFutureEvents, dbGetPreviousEvents } from "@/db-handler/db-events";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

function PlayCardSkeleton() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center justify-items-center gap-2 self-center p-2">
            <Skeleton className="h-7 w-2/3 border-primary text-center" />
            <Skeleton className="h-7 w-2/3 border-primary text-center" />
            <Skeleton className="h-7 w-2/3 border-primary text-center" />
            <Skeleton className="h-7 w-2/3 border-primary text-center" />
            <Skeleton className="h-7 w-2/3 border-primary text-center" />
            <Skeleton className="h-7 w-2/3 border-primary text-center" />
        </div>
    );
}

async function PlayList() {
    const future = await dbGetFutureEvents();
    const previous = await dbGetPreviousEvents();
    return (
        <div className="w-full lg:max-w-4xl">
            <h2 className="text-2xl font-bold text-primary">
            Nejbližší představení
            </h2>
            <table className="w-full lg:max-w-4xl">
                <thead className="bg-secondary text-white">
                    <tr>
                        <th className="p-2 text-left">Název akce</th>
                        <th className="p-2 text-left">Datum</th>
                        <th className="p-2 text-left">Scéna</th>
                        <th className="p-2 text-center">Vstupenky</th>
                    </tr>
                </thead>
                <tbody>
                    {future.map((event) => (
                        <tr className="border border-solid" key={event.id}>
                            <td className="p-2">
                                <Link href={`/plays/${event.play.id}`}>
                                    {event.play.name}
                                </Link>
                            </td>
                            <td className="p-2">{event.time.toLocaleString()}</td>
                            <td className="p-2">{event.hall.name}</td>
                            <td className="flex items-center justify-center p-2">
                                <Button variant="default" asChild>
                                    <Link href={`/events/${event.id}`}>
                                        Zakoupit
                                    </Link>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="text-2xl font-bold text-primary mt-8">
                Předchozí představení
            </h2>
            <table className="w-full lg:max-w-4xl">
                <thead className="bg-secondary text-white">
                    <tr>
                        <th className="p-2 text-left">Název akce</th>
                        <th className="p-2 text-left">Datum</th>
                        <th className="p-2 text-left">Scéna</th>
                    </tr>
                </thead>
                <tbody>
                    {previous.map((event) => (
                        <tr className="border border-solid" key={event.id}>
                            <td className="p-2">
                                <Link href={`/plays/${event.play.id}`}>
                                    {event.play.name}
                                </Link>
                            </td>
                            <td className="p-2">{event.time.toLocaleString()}</td>
                            <td className="p-2">{event.hall.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default async function Page() {
    return (
        <div className="flex h-full w-full flex-col justify-center">
            <h1 className="w-full p-8 text-4xl font-bold text-primary">
                Program
            </h1>
            <div className="flex max-h-full grow justify-center">
                <Suspense fallback={<PlayCardSkeleton />}>
                    <PlayList />
                </Suspense>
            </div>
        </div>
    );
}
