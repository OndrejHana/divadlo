"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deletePlayAction } from "@/server/plays";
import { DeletePlayFormState } from "@/types/play";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="destructive" type="submit" disabled={pending}>
            Smazat hru
        </Button>
    );
}

export default function DeletePlayForm({ playId }: { playId: number }) {
    const initialState: DeletePlayFormState = {
        play: {
            id: playId,
        },
        message: "",
    };
    const [state, formAction] = useFormState(deletePlayAction, initialState);

    const { toast } = useToast();

    useEffect(() => {
        if (!!state.message) {
            toast({
                title: "Smazat divadelní hru",
                description: state.message,
            });
        }
    }, [state, toast]);
    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={playId} />
            <SubmitButton />
        </form>
    );
}
