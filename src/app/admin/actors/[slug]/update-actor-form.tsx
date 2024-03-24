"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateActorAction } from "@/server/actors";
import { Actor, UpdateActorFormState } from "@/types/actor";
import { useFormState } from "react-dom";
import DeleteActorForm from "./delete-actor-form";

const initialState: UpdateActorFormState = {
    actor: undefined,
    message: "",
};

export default function UpdateActorForm({ actor }: { actor: Actor }) {
    const [_, formAction] = useFormState(updateActorAction, initialState);

    return (
        <Card className="w-full max-w-2xl overflow-hidden">
            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
                <div className="flex h-full flex-col">
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Upravit herce
                    </h2>
                    <p className="text-sm">
                        Upravte existujícího herce v systému
                    </p>
                </div>
                <DeleteActorForm actorId={actor.id} />
            </div>
            <form action={formAction} className="flex flex-col gap-2 p-4">
                <Input type="hidden" name="id" value={actor.id} />
                <Label htmlFor="firstName">Jméno herce</Label>
                <Input type="text" name="firstName" value={actor.firstName} />
                <Label htmlFor="lastName">Příjmení herce</Label>
                <Input type="text" name="lastName" value={actor.lastName} />
                <Label htmlFor="email">Email herce</Label>
                <Input type="email" name="email" value={actor.email} />
                <Button type="submit" className="w-full">
                    Upravit herce
                </Button>
            </form>
        </Card>
    );
}
