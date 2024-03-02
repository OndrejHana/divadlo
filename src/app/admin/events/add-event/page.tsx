"use client";

import { Button } from "@/components/ui/button";
import { AddEventFormState } from "@/types/event";
import { useFormState, useFormStatus } from "react-dom";
import { Card } from "@/components/ui/card";
import { HallInput, PlayInput } from "./add-event-input";
import { Input } from "@/components/ui/input";
import { addEvent } from "@/server/events";
import Link from "next/link";

const initialState: AddEventFormState = {
    event: undefined,
    message: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="default" type="submit" disabled={pending}>
            Přidat akci
        </Button>
    );
}

export default function Page() {
    const [_, formAction] = useFormState(addEvent, initialState);

    return (
        <div className="flex h-full w-full items-center justify-center">
            <Card className="flex w-full max-w-xl flex-col gap-4 p-2">
                <div>
                    <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Přidat akci
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Přidejte novou akci do systému
                    </p>
                </div>
                <form
                    action={formAction}
                    method="POST"
                    className="flex flex-col gap-2"
                >
                    <div className="flex gap-2">
                        <PlayInput />
                        <Button asChild variant="default" className="w-fit">
                            <Link href="admin/plays/add-play">Přidat hru</Link>
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        <HallInput />
                        <Button asChild variant="default" className="w-fit">
                            <Link href="admin/plays/add-hall">Přidat sál</Link>
                        </Button>
                    </div>
                    <Input type="date" name="time" />
                    <SubmitButton />
                </form>
            </Card>
        </div>
    );
}
