import ActorList from "./actors/actor-list";
import UpcomingEvents from "./events/upcoming-events";
import HallList from "./halls/hall-list";
import PlayList from "./plays/play-list";

export const dynamic = "force-dynamic"

export default async function Page() {
    return (
        <main className="grid h-full w-full grow gap-4 p-4 xl:grid-cols-2">
            <div className="flex flex-col gap-4">
                <ActorList />
                <HallList />
                <PlayList />
            </div>
            <div>
                <UpcomingEvents />
            </div>
        </main>
    );
}
