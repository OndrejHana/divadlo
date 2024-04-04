"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { addPlayAction } from "@/server/plays";
import { AddPlayFormState } from "@/types/play";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState: AddPlayFormState = {
    play: undefined,
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

export default function AddPlayForm() {
    const [state, formAction] = useFormState(addPlayAction, initialState);
    const { toast } = useToast();

    useEffect(() => {
        if (!!state.message) {
            toast({
                title: "Přidat divadelní hru",
                description: state.message,
            });
        }
    }, [state, toast]);

    return (
        <Card className="flex w-full max-w-2xl flex-col gap-2 overflow-hidden rounded-none">
            <div className="bg-primary p-4 text-primary-foreground">
                <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Přidejte divadelní hru
                </h1>
                <p>Přidejte novou divadelní hru do systému</p>
            </div>
            <form action={formAction} className="flex flex-col gap-2 p-4">
                <Label htmlFor="name" className="text-md">
                    Název hry
                </Label>
                <Input type="text" name="name" placeholder="Název hry" />
                <Label htmlFor="author" className="text-md">
                    Autor hry
                </Label>
                <Input type="text" name="author" placeholder="Autor hry" />
                <Label htmlFor="description" className="text-md">
                    Popis hry
                </Label>
                <Textarea name="description" placeholder="Popis hry" />
                <Label htmlFor="yearOfRelease" className="text-md">
                    Rok vydání
                </Label>
                <Input
                    type="number"
                    name="yearOfRelease"
                    placeholder="Rok vydání"
                />
                <SubmitButton />
            </form>
        </Card>
    );
}
