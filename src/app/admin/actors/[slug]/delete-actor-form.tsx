"use client";

import { Button } from "@/components/ui/button";
import { deleteActorAction } from "@/server/actors";
import { DeleteActorFormState } from "@/types/actor";
import { useFormState } from "react-dom";

const initialState: DeleteActorFormState = {
    message: "",
};

export default function DeleteActorForm({ actorId }: { actorId: number }) {
    const [_, formAction] = useFormState(deleteActorAction, initialState);

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={actorId} />
            <Button
                variant="destructive"
                type="submit"
                className="rounded-md bg-red-500 p-2 text-white"
            >
                Smazat herce
            </Button>
        </form>
    );
}
