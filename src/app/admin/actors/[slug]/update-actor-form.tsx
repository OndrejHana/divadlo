"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateActorAction } from "@/server/actors";
import { Actor, UpdateActorFormState } from "@/types/actor";
import { useFormState, useFormStatus } from "react-dom";
import DeleteActorForm from "./delete-actor-form";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

export const dynamic = "force-dynamic";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="default" type="submit" disabled={pending}>
            Upravit herce
        </Button>
    );
}

export default function UpdateActorForm({ actor }: { actor: Actor }) {
    const initialState: UpdateActorFormState = {
        actor: {
            id: actor.id,
            description: actor.description,
            firstName: actor.person.firstName,
            lastName: actor.person.lastName,
            actorImage: actor.actorImage,
        },
        message: "",
    };

    const [state, formAction] = useFormState(updateActorAction, initialState);

    const { toast } = useToast();

    useEffect(() => {
        if (!!state.message) {
            toast({
                title: "Upravit herce",
                description: state.message,
            });
        }
    }, [state, toast]);

    const [firstName, setFirstName] = useState(actor.person.firstName);
    const [lastName, setLastName] = useState(actor.person.lastName);
    const [description, setDescription] = useState(actor.description);
    const [actorImage, setActorImage] = useState(actor.actorImage);

    if (!state.actor) {
        return null;
    }

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
                <Input type="hidden" name="id" value={state.actor.id} />
                <Label htmlFor="firstName">Jméno herce</Label>
                <Input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <Label htmlFor="lastName">Příjmení herce</Label>
                <Input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <Label htmlFor="description">Popis herce</Label>
                <Textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Label htmlFor="actorImage">Portrét herce</Label>
                {actorImage ? (
                    <>
                        <Input
                            type="hidden"
                            name="actorImage"
                            value={actorImage}
                        />
                        <Image
                            src={actorImage}
                            alt="portrét herce"
                            width={240}
                            height={240}
                        />
                    </>
                ) : (
                    <p className="text-sm">Portrét herce není k dispozici</p>
                )}
                <SubmitButton />
            </form>
        </Card>
    );
}
