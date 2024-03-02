import { getEvent } from "@/server/events";
import { format } from "date-fns";

export default async function Page({ params }: { params: { slug: string } }) {
    const event = await getEvent(parseInt(params.slug));

    if (!event) {
        return <h1>Event not found</h1>;
    }

    return (
        <div>
            <h1>{event.play.name}</h1>
            <p>{event.hall.name}</p>
            <p>{format(event.time, "dd/MM/YYYY")}</p>
        </div>
    );
}
