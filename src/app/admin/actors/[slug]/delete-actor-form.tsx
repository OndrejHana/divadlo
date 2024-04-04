"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { deleteActorAction } from "@/server/actors";
import { useEffect } from "react";
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
    const [state, formAction] = useFormState(deleteActorAction, {
        actorId: { id: actorId },
        message: "",
    });

    const { toast } = useToast();

    useEffect(() => {
        if (!!state.message) {
            toast({
                title: "Smazat herce",
                description: state.message,
            });
        }
    }, [state, toast]);

    return (
        <form action={formAction}>
            <Input type="hidden" name="id" value={actorId} />
            <SubmitButton />
        </form>
    );
}
