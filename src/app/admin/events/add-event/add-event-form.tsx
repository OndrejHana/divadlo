"use client";

import { Button } from "@/components/ui/button";
import { AddEventFormState } from "@/types/event";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { addEventAction } from "@/server/events";
import { Label } from "@/components/ui/label";
import { DateTimePicker } from "@/components/datetime-picker";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

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
    const [state, formAction] = useFormState(addEventAction, initialState);

    const { toast } = useToast();

    useEffect(() => {
        if (!!state.message) {
            toast({
                title: "Přidat událost",
                description: state.message,
            });
        }
    }, [state, toast]);

    const [time, setTime] = useState(new Date());

    return (
        <form action={formAction} className="flex flex-col gap-2 p-4">
            {children}
            <Label htmlFor="time">Čas</Label>
            <Input type="hidden" name="time" value={time.toISOString()} />
            <DateTimePicker
                value={{
                    date: time,
                    hasTime: true,
                }}
                onChange={({ date }) => {
                    setTime(date);
                }}
            />
            <SubmitButton />
        </form>
    );
}
