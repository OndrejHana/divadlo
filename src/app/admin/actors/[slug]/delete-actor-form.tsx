"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteActorAction } from "@/server/actors";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="destructive" type="submit" disabled={pending}>
            Smazat herce
        </Button>
    );
}

export default function DeleteActorForm({ actorId }: { actorId: number }) {
    const [_, formAction] = useFormState(deleteActorAction, {
        actorId: { id: actorId },
        message: "",
    });

    return (
        <form action={formAction}>
            <Input type="hidden" name="id" value={actorId} />
            <SubmitButton />
        </form>
    );
}
