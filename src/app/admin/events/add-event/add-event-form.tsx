"use client";

import { Button } from "@/components/ui/button";
import { AddEventFormState } from "@/types/event";
import { useFormState, useFormStatus } from "react-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { addEventAction } from "@/server/events";
import { Label } from "@/components/ui/label";

const initialState: AddEventFormState = {
    event: undefined,
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

export default function AddEventForm({
    children,
}: {
    children: React.ReactNode;
}) {
    const [_, formAction] = useFormState(addEventAction, initialState);

    return (
        <Card className="flex w-full max-w-2xl flex-col gap-2 overflow-hidden rounded-none">
            <div className="bg-primary p-4">
                <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight text-primary-foreground">
                    Přidejte divadelní akci
                </h1>
                <p className="text-primary-foreground">
                    Přidejte novou divadelní akci do systému
                </p>
            </div>
            <form action={formAction} className="flex flex-col gap-2 p-4">
                {children}
                <Label htmlFor="time">Čas</Label>
                <Input type="date" name="time" />
                <SubmitButton />
            </form>
        </Card>
    );
}
