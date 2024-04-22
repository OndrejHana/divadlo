import { dbGetPlays } from "@/db-handler/db-plays";
import { Play } from "@/types/play";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Link from "next/link";
import { dbGetEvents } from "@/db-handler/db-events";

function PlayCard({ play }: { play: Play }) {
    return (
        <Link
            className="w-full border-y border-primary bg-muted"
            href={`/plays/${play.id}`}
        >
            <div className="flex w-full flex-col gap-4 p-4">
                <div>
                    <h2 className="text-2xl font-bold text-primary">
                        {play.name}
                    </h2>
                    <p className="text-muted-foreground">{play.name}</p>
                </div>
                <p>{play.description}</p>
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
    const plays = await dbGetPlays();
    return (
        <div className="flex h-full w-full flex-col gap-2 p-2">
            {plays.map((play) => (
                <PlayCard key={play.id} play={play} />
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
