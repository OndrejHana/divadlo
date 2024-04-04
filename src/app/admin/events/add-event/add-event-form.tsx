"use client";

import { Button } from "@/components/ui/button";
import { AddEventFormState } from "@/types/event";
import { useFormState, useFormStatus } from "react-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { addEventAction } from "@/server/events";
import { Label } from "@/components/ui/label";
import { DateTimePicker } from "@/components/datetime-picker";
import { useState } from "react";
import ErrorBanner from "@/components/error-banner";

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

    const [time, setTime] = useState(new Date());

    return (
        <form action={formAction} className="flex flex-col gap-2 p-4">
            {!!state.message && <ErrorBanner message={state.message} />}
            {children}
            <Label htmlFor="time">Čas</Label>
            <Input type="hidden" name="time" value={time.toISOString()} />
            <DateTimePicker
                value={{
                    date: time,
                    hasTime: true,
                }}
                onChange={({ date }) => setTime(date)}
            />
            <SubmitButton />
        </form>
    );
}
