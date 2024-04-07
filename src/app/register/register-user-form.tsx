"use client";

import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addActorAction } from "@/server/actors";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { registerUserAction } from "@/server/register";
import { RegisterUserFormState } from "@/types/register";

const initialState: RegisterUserFormState = {
    user: undefined,
    message: "",
};

function RegisterButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="default" type="submit" disabled={pending}>
            Registrovat se
        </Button>
    );
}

export default function RegisteUserForm() {
    const [state, formAction] = useFormState(registerUserAction, initialState);
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
        <form action={formAction} className="flex flex-col gap-2 p-4 w-2/6">
            <Label htmlFor="email" className="text-md">
                Email
            </Label>
            <Input type="email" name="email" placeholder="" />
            <Label htmlFor="password" className="text-md">
                Heslo
            </Label>
            <Input type="password" name="password" placeholder="" />
            <RegisterButton />
        </form>
    );
}
