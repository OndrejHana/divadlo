import { dbGetPlays } from "@/db-handler/db-plays";
import { Play } from "@/types/play";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Link from "next/link";
import { dbGetEvents } from "@/db-handler/db-events";
import { Event } from "@/types/event";
import { Table } from "lucide-react";


function PlayCardSkeleton() {
    return (
        <div className="flex h-full w-full justify-center self-center items-center justify-items-center flex-col gap-2 p-2">
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
    const events = await dbGetEvents();
    return (
        <table className="w-2/3">
            <thead className="bg-orange-950 text-white">
                <tr>
                    <th className="text-left p-2">Název akce</th>
                    <th className="text-left p-2">Datum</th>
                    <th className="text-left p-2">Scéna</th>
                    <th className="text-center p-2">Vstupenky</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event) => (
                    <tr className="border-solid border" key={event.id}>
                        <td className="p-2">
                             <Link href={`/plays/${event.play.id}`}>{event.play.name}</Link>
                        </td>
                        <td className="p-2">{event.time.toLocaleString()}</td>
                        <td className="p-2">{event.hall.name}</td>
                        <td className="flex p-2 justify-center items-center"><Link className="items-center bg-red-950 rounded p-1 text-white" href={`/events/${event.id}`}>Zakoupit</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default async function Page() {
    return (
        <div className="flex h-full w-full flex-col justify-center">
            <h1 className="w-full p-8 text-4xl font-bold text-primary">
                Program
            </h1>
            <div className="max-h-full grow flex justify-center">
                <Suspense fallback={<PlayCardSkeleton />}>
                    <PlayList />
                </Suspense>
            </div>
        </div>
    );
}
