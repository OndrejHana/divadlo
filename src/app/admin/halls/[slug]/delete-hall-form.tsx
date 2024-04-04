"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { deleteHallAction } from "@/server/halls";
import { DeleteHallFormState } from "@/types/hall";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="destructive" type="submit" disabled={pending}>
            Smazat sál
        </Button>
    );
}

export default function DeleteHallForm({ hallId }: { hallId: number }) {
    const initialState: DeleteHallFormState = {
        hall: {
            id: hallId,
        },
        message: "",
    };
    const [state, formAction] = useFormState(deleteHallAction, initialState);

    const { toast } = useToast();

    useEffect(() => {
        if (!!state.message) {
            toast({
                title: "Smazat sál",
                description: state.message,
            });
        }
    }, [state, toast]);

    return (
        <form action={formAction}>
            <Input type="hidden" name="id" value={hallId} />
            <SubmitButton />
        </form>
    );
}
