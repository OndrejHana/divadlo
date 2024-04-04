"use client";

import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddHallFormState } from "@/types/hall";
import { addHallAction } from "@/server/halls";
import ErrorBanner from "@/components/error-banner";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const initialState: AddHallFormState = {
    hall: undefined,
    message: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="default" type="submit" disabled={pending}>
            Odeslat
        </Button>
    );
}

export default function AddHallForm() {
    const [state, formAction] = useFormState(addHallAction, initialState);
    const { toast } = useToast();

    useEffect(() => {
        if (!!state.message) {
            toast({
                title: "Přidat sál",
                description: state.message,
            });
        }
    }, [state, toast]);

    return (
        <form action={formAction} className="flex flex-col gap-2 p-4">
            <Label htmlFor="hallName" className="text-md">
                Název sálu
            </Label>
            <Input type="text" name="hallName" placeholder="hlavní hala" />
            <Label htmlFor="numberOfSeats" className="text-md">
                Počet sedadel
            </Label>
            <Input type="number" name="numberOfSeats" placeholder="100" />
            <SubmitButton />
        </form>
    );
}
