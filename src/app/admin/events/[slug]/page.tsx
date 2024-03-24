import { dbGetEvent } from "@/db-handler/db-events";
import UpdateEventForm from "./update-event-form";
import { HallInput, PlayInput } from "../form-buttons";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
    const event = await dbGetEvent(parseInt(params.slug));

    return (
        <div className="flex h-full w-full justify-center">
            {event ? (
                <UpdateEventForm event={event}>
                    <Label htmlFor="play">Hra</Label>
                    <div className="flex w-full gap-2">
                        <PlayInput playId={event.play.id} />
                        <Button asChild>
                            <Link href="/admin/plays/add-play">Přidat hru</Link>
                        </Button>
                    </div>
                    <Label htmlFor="hall">Sál</Label>
                    <div className="flex w-full gap-2">
                        <HallInput hallId={event.hall.id} />
                        <Button asChild>
                            <Link href="/admin/halls/add-hall">Přidat sál</Link>
                        </Button>
                    </div>
                </UpdateEventForm>
            ) : (
                <h1 className="text-center text-4xl font-bold text-primary">
                    Událost nebyla nalezena
                </h1>
            )}
        </div>
    );
}
