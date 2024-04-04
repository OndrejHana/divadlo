"use client";

import { Button } from "@/components/ui/button";
import { deletePlayAction } from "@/server/plays";
import { DeletePlayFormState } from "@/types/play";
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
    const [_, formAction] = useFormState(deletePlayAction, initialState);

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={playId} />
            <SubmitButton />
        </form>
    );
}
