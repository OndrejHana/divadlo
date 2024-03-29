"use client";

import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AddActorFormState } from "@/types/actor";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addActorAction } from "@/server/actors";

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
    const [_, formAction] = useFormState(addActorAction, initialState);

    return (
        <Card className="w-full max-w-2xl overflow-hidden">
            <div className="bg-primary p-4 text-primary-foreground">
                <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight ">
                    Přidejte herce
                </h1>
                <p className="text-sm">Přidejte nového herce do systému</p>
            </div>
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
                <Label htmlFor="email" className="text-md">
                    Email herce
                </Label>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email herce"
                    required
                />
                <Label htmlFor="phone" className="text-md">
                    Telefonní číslo herce
                </Label>
                <Input
                    type="tel"
                    name="phone"
                    placeholder="Telefonní číslo herce"
                    required
                />
                <Label htmlFor="description" className="text-md">
                    Popis herce
                </Label>
                <Textarea
                    name="description"
                    placeholder="Popis herce"
                    required
                />
                <Label htmlFor="city" className="text-md">
                    Město bydliště herce
                </Label>
                <Input
                    type="text"
                    name="city"
                    placeholder="Město bydliště herce"
                    required
                />
                <Label htmlFor="street" className="text-md">
                    Ulice bydliště herce
                </Label>
                <Input
                    type="text"
                    name="street"
                    placeholder="Ulice bydliště herce"
                    required
                />
                <Label htmlFor="houseNumber" className="text-md">
                    Číslo popisné bydliště herce
                </Label>
                <Input
                    type="text"
                    name="houseNumber"
                    placeholder="Číslo popisné bydliště herce"
                    required
                />
                <Label htmlFor="zipCode" className="text-md">
                    PSČ bydliště herce
                </Label>
                <Input
                    type="text"
                    name="zipCode"
                    placeholder="PSČ bydliště herce"
                    required
                />

                <SubmitButton />
            </form>
        </Card>
    );
}
