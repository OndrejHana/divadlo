import { getHalls } from "@/db-handler/db-halls";
import { getPlays } from "@/db-handler/db-plays";
import { ChevronDown } from "lucide-react";

export async function PlayInput() {
    const plays = await getPlays();

    return (
        <div className="flex h-10 w-full overflow-hidden rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <select
                name="playId"
                id="playId"
                className="h-full w-full appearance-none bg-background px-3 py-2 "
            >
                {plays.map((play) => (
                    <option key={play.id} value={play.id}>
                        {play.name}
                    </option>
                ))}
            </select>
            <ChevronDown className="h-full pr-1 text-muted-foreground" />
        </div>
    );
}

export async function HallInput() {
    const halls = await getHalls();

    return (
        <div className="flex h-10 w-full overflow-hidden rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <select
                name="hallId"
                id="hallId"
                className="h-full w-full appearance-none bg-background px-3 py-2"
            >
                {halls.map((hall) => (
                    <option key={hall.id} value={hall.id}>
                        {hall.name}
                    </option>
                ))}
            </select>
            <ChevronDown className="h-full pr-1 text-muted-foreground" />
        </div>
    );
}
