"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteHallAction } from "@/server/halls";
import { DeleteHallFormState } from "@/types/hall";
import { useFormState } from "react-dom";

const initialState: DeleteHallFormState = {
    message: "",
};

export default function DeleteHallForm({ hallId }: { hallId: number }) {
    const [_, formAction] = useFormState(deleteHallAction, initialState);
    return (
        <form action={formAction}>
            <Input type="hidden" name="id" value={hallId} />
            <Button type="submit" variant="destructive">
                Smazat halu
            </Button>
        </form>
    );
}
