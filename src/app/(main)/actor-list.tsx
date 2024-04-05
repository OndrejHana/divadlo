import { dbGetActors } from "@/db-handler/db-actors";
import { Actor } from "@/types/actor";

function Card({ actor }: { actor: Actor }) {
    return (
        <div className="relative h-64 min-w-48">
            <div className="h-full w-full bg-muted" />
            <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-end">
                <div className="flex w-full flex-col py-8 px-12 text-xl font-bold text-primary">
                    <p className="text-left">{actor.person.firstName}</p>
                    <p className="text-right">{actor.person.lastName}</p>
                </div>
            </div>
        </div>
    );
}

export default async function MainPageActorList() {
    const actors = await dbGetActors();

    return (
        <div className="flex h-full w-full flex-col gap-2 bg-secondary py-8 text-secondary-foreground lg:px-16">
            <h2 className="text-2xl font-bold ">Naši herci</h2>
            <div className="flex gap-4 overflow-x-auto">
                {actors.map((actor) => (
                    <Card key={actor.id} actor={actor} />
                ))}
            </div>
        </div>
    );
}
