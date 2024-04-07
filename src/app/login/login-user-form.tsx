"use client";

import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { AddActorFormState } from "@/types/actor";
import { Label } from "@/components/ui/label";
import { addActorAction } from "@/server/actors";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const initialState: LoginUserFormState = {
    user: undefined,
    message: "",
};

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="default" type="submit" disabled={pending}>
            Přihlásti se
        </Button>
    );
}
function RegisterButton() {
    const { pending } = useFormStatus();
    return (
        <Button variant="outline" type="submit" disabled={pending}>
            Registrovat se
        </Button>
    );
}

export default function AddActorForm() {
    const [state, formAction] = useFormState(addActorAction, initialState);
    const { toast } = useToast();

    useEffect(() => {
        if (!!state.message) {
            toast({
                title: "Přihlášení",
                description: state.message,
            });
        }
    }, [state, toast]);

    return (
        <form action={formAction} className="flex flex-col gap-2 p-4">
            <Label htmlFor="name" className="text-md">
                Uživatelské jméno
            </Label>
            <Input type="text" name="name" placeholder="" />
            <Label htmlFor="password" className="text-md">
                Heslo
            </Label>
            <Input type="password" name="password" placeholder="" />
            <LoginButton />
            <RegisterButton />
        </form>
    );
}
