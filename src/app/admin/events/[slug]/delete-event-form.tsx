"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { deleteEvent } from "@/server/events";
import { DeleteEventFormState } from "@/types/event";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="destructive" type="submit" disabled={pending}>
            Smazat událost
        </Button>
    );
}

export default function DeleteEventForm({ eventId }: { eventId: number }) {
    const initialState: DeleteEventFormState = {
        event: {
            id: eventId,
        },
        message: "",
    };
    const [state, formAction] = useFormState(deleteEvent, initialState);

    const { toast } = useToast();

    useEffect(() => {
        if (!!state.message) {
            toast({
                title: "Smazat událost",
                description: state.message,
            });
        }
    }, [state, toast]);

    return (
        <form action={formAction}>
            <Input type="hidden" name="id" value={eventId} />
            <SubmitButton />
        </form>
    );
}
