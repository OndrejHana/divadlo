import { dbGetPlays } from "@/db-handler/db-plays";
import { Play } from "@/types/play";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

function PlayCard({ play }: { play: Play }) {
    return (
        <Link href={`/plays/${play.id}`}
            className="flex w-full h-24 border-y border-primary bg-muted gap-2"
        >
            <div className="h-auto w-64 bg-primary">
                {play.playImage && (
                    <Image
                        src={play.playImage}
                        className="h-full w-full object-cover"
                        height={64}
                        width={256}
                        alt={play.name}
                    />
                )}
            </div>
            <div className="flex flex-col p-2">
                <h2 className="text-2xl font-bold text-primary">
                    {play.name}
                </h2>
                <p className="text-muted-foreground">{play.author}</p>
            </div>
        </Link>
    );
}

function idk({ play }: { play: Play }) {
    return (
        <Link
            className="flex w-full items-start justify-start border-y border-primary bg-muted"
            href={`/plays/${play.id}`}
        >
            <div className="h-fit max-h-64 w-64 grow bg-secondary">
                {play.playImage && (
                    <Image
                        src={play.playImage}
                        className="h-full w-full object-cover"
                        height={64}
                        width={256}
                        alt={play.name}
                    />
                )}
            </div>
            <div className="flex w-full flex-col gap-4 overflow-hidden p-4">
                <div>
                    <h2 className="text-2xl font-bold text-primary">
                        {play.name}
                    </h2>
                    <p className="text-muted-foreground">{play.author}</p>
                    <p>{play.description}</p>
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
                Repertoár
            </h1>
            <div className="max-h-full grow">
                <Suspense fallback={<PlayCardSkeleton />}>
                    <PlayList />
                </Suspense>
            </div>
        </div>
    );
}
