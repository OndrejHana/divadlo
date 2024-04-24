import { AspectRatio } from "@/components/ui/aspect-ratio";
import { dbGetEventsByPlayId } from "@/db-handler/db-events";
import { dbGetPlay } from "@/db-handler/db-plays";
import Image from "next/image";
import image from "@/public/main.jpg";
import { EventCard } from "../../event-list";

export const dynamic = "force-dynamic";

async function Events({ playId }: { playId: number }) {
    const events = await dbGetEventsByPlayId(playId);

    return (
        <div className="flex w-full gap-8 overflow-x-auto p-8">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}

export default async function Page({ params }: { params: { slug: string } }) {
    const play = await dbGetPlay(parseInt(params.slug));

    if (!play) {
        return (
            <h1 className="text-center text-4xl font-bold text-primary">
                Hra nebyla nalezena
            </h1>
        );
    }

    return (
        <div className="flex h-full w-full flex-col justify-center">
            <AspectRatio ratio={4 / 1} className="relative w-full bg-muted">
                <Image
                    src={play.playImage || image}
                    layout="fill"
                    objectFit="cover"
                    alt="Theater"
                />
                <div className="absolute z-10 flex h-full w-full items-end p-16">
                    <h1 className="h-fit text-4xl font-bold text-primary-foreground xl:text-6xl">
                        {play.name}
                    </h1>
                </div>
            </AspectRatio>
            <AspectRatio
                ratio={4 / 1}
                className="relative flex w-full bg-muted overflow-hidden"
            >
                <div className="flex flex-col gap-8 bg-secondary p-8 text-secondary-foreground circleaftef">
                    <div>
                        <p>Autor:</p>
                        <h2 className="text-xl font-semibold">{play.author}</h2>
                    </div>
                    <div>
                        <p>Rok vydání:</p>
                        <h2 className="text-xl font-semibold">
                            {play.yearOfRelease}
                        </h2>
                    </div>
                    <div>
                        <p>Délka hry:</p>
                        <h2 className="text-xl font-semibold">
                            {play.durationMinutes} minut
                        </h2>
                    </div>
                </div>
                <div className="p-8">
                    <p className="text-md pl-14">{play.description}</p>
                </div>
            </AspectRatio>
            <h2 className=" bg-primary p-2 px-8 text-2xl font-semibold text-primary-foreground">
                Nejbližší představení
            </h2>
            <Events playId={play.id} />
        </div>
    );
}
