"use client";

import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import Link from "next/link";
import { LoginUserFormState } from "@/types/login";
import { loginUserAction } from "@/server/auth";

const initialState: LoginUserFormState = {
    user: undefined,
    message: "",
};

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="default" type="submit" disabled={pending}>
            Přihlásit se
        </Button>
    );
}
function RegisterButton() {
    return (
        <Link href="/register">
            <Button variant="outline" className="w-full">Registrovat se</Button>
        </Link>
    );
}

export default function AddLoginUserForm() {
    const [state, formAction] = useFormState(loginUserAction, initialState);
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
            <LoginButton />
            <RegisterButton />
        </form>
    );
}
