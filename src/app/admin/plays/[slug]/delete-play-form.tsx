"use client";

import { Button } from "@/components/ui/button";
import { deletePlayAction } from "@/server/plays";
import { DeletePlayFormState } from "@/types/play";
import { useFormState } from "react-dom";

const initialState: DeletePlayFormState = {
    message: "",
};

export default function DeletePlayForm({ playId }: { playId: number }) {
    const [_, formAction] = useFormState(deletePlayAction, initialState);

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={playId} />
            <Button type="submit" variant="destructive">
                Smazat hru
            </Button>
        </form>
    );
}
