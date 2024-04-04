"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateActorAction } from "@/server/actors";
import { Actor, UpdateActorFormState } from "@/types/actor";
import { useFormState, useFormStatus } from "react-dom";
import DeleteActorForm from "./delete-actor-form";
import { useState } from "react";
import ErrorBanner from "@/components/error-banner";
import { Textarea } from "@/components/ui/textarea";

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
            personId: actor.person.id,
            firstName: actor.person.firstName,
            lastName: actor.person.lastName,
            email: actor.person.email,
            phone: actor.person.phone,
            addressId: actor.person.address.id,
            city: actor.person.address.city,
            street: actor.person.address.street,
            houseNumber: actor.person.address.houseNumber,
            zipCode: actor.person.address.zipCode,
        },
        message: "",
    };

    const [state, formAction] = useFormState(updateActorAction, initialState);

    const [firstName, setFirstName] = useState(actor.person.firstName);
    const [lastName, setLastName] = useState(actor.person.lastName);
    const [description, setDescription] = useState(actor.description);
    const [email, setEmail] = useState(actor.person.email);
    const [phone, setPhone] = useState(actor.person.phone);
    const [city, setCity] = useState(actor.person.address.city);
    const [street, setStreet] = useState(actor.person.address.street);
    const [houseNumber, setHouseNumber] = useState(
        actor.person.address.houseNumber,
    );
    const [zipCode, setZipCode] = useState(actor.person.address.zipCode);

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
                {!!state.message && <ErrorBanner message={state.message} />}
                <Input type="hidden" name="id" value={state.actor.id} />
                <Input
                    type="hidden"
                    name="personId"
                    value={state.actor.personId}
                />
                <Input
                    type="hidden"
                    name="addressId"
                    value={state.actor.addressId}
                />
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
                <Label htmlFor="email">Email herce</Label>
                <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Label htmlFor="phone">Telefonní číslo herce</Label>
                <Input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Label htmlFor="city">Město bydliště herce</Label>
                <Input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <Label htmlFor="street">Ulice bydliště herce</Label>

                <Input
                    type="text"
                    name="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />
                <Label htmlFor="houseNumber">Číslo popisné</Label>
                <Input
                    type="text"
                    name="houseNumber"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(parseInt(e.target.value))}
                />
                <Label htmlFor="zipCode">PSČ</Label>
                <Input
                    type="text"
                    name="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                />

                <SubmitButton />
            </form>
        </Card>
    );
}
