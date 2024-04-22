"use client";

import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { AddActorFormState } from "@/types/actor";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addActorAction } from "@/server/actors";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";


const initialState: AddActorFormState = {
    actor: undefined,
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

export default function AddActorForm() {
    const [state, formAction] = useFormState(addActorAction, initialState);
    const [hasImage, setHasImage] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (!!state.message) {
            toast({
                title: "Přidat herce",
                description: state.message,
            });
        }
    }, [state, toast]);

    return (
        <form action={formAction} className="flex flex-col gap-2 p-4">
            <Label htmlFor="firstName" className="text-md">
                Jméno herce
            </Label>
            <Input
                name="firstName"
                placeholder="Jméno herce"
                type="text"
                required
            />
            <Label htmlFor="lastName" className="text-md">
                Příjmení herce
            </Label>
            <Input
                name="lastName"
                placeholder="Příjmení herce"
                type="text"
                required
            />
            <Label htmlFor="description" className="text-md">
                Popis herce
            </Label>
            <Textarea name="description" placeholder="Popis herce" required />
            <Label htmlFor="actorImage" className="text-md">
                Portrét herce
            </Label>
            <Input
                type="file"
                name="actorImage"
                onChange={(e) => {
                    if (!e.target.files) return;
                    const file = e.target.files[0];
                    if (file) {
                        setHasImage(true);
                    }
                }}
            />
            <Input type="hidden" name="hasImage" value={hasImage.toString()} />
            <SubmitButton />
        </form>
    );
}
