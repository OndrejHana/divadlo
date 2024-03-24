"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteEvent } from "@/server/events";
import { DeleteEventFormState } from "@/types/event";
import { useFormState } from "react-dom";

const initialState: DeleteEventFormState = {
    message: "",
};

export default function DeleteEventForm({ eventId }: { eventId: number }) {
    const [_, formAction] = useFormState(deleteEvent, initialState);

    return (
        <form action={formAction}>
            <Input type="hidden" name="id" value={eventId} />
            <Button
                variant="destructive"
                type="submit"
                className="rounded-md bg-red-500 p-2 text-white"
            >
                Smazat událost
            </Button>
        </form>
    );
}
