import { dbGetActors } from "@/db-handler/db-actors";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";

function SkeletonActors() {
    return (
        <div className="flex flex-wrap">
            <Skeleton className="w-1/4 p-4" />
            <Skeleton className="w-1/4 p-4" />
            <Skeleton className="w-1/4 p-4" />
        </div>
    );
}

async function Actors() {
    const actors = await dbGetActors();

    return (
        <div className="flex h-full w-full grow flex-wrap">
            {actors.map((actor) => (
                <Link
                    key={actor.id}
                    className="p-4"
                    href={`/actors/${actor.id}`}
                >
                    <div className="h-48 w-48 overflow-hidden rounded-full bg-muted">
                        {actor.actorImage ? (
                            <Image
                                src={actor.actorImage}
                                layout="responsive"
                                width={300}
                                height={300}
                                alt=""
                            />
                        ) : (
                            <div className="h-full w-full bg-muted" />
                        )}
                    </div>
                    <h2 className="text-2xl font-bold text-primary">
                        {actor.person.firstName} {actor.person.lastName}
                    </h2>
                </Link>
            ))}
        </div>
    );
}

export default function Page() {
    return (
        <div className="flex h-full w-full flex-col">
            <h1 className="w-full p-8 text-4xl font-bold text-primary">
                Umělci divadla
            </h1>
            <Suspense fallback={<SkeletonActors />}>
                <Actors />
            </Suspense>
        </div>
    );
}
