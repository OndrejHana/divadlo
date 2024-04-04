"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updateEvent } from "@/server/events";
import { Event, UpdateEventFormState } from "@/types/event";
import { useFormState, useFormStatus } from "react-dom";
import DeleteEventForm from "./delete-event-form";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { DateTimePicker } from "@/components/datetime-picker";
import { useToast } from "@/components/ui/use-toast";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="default" type="submit" disabled={pending}>
            Upravit událost
        </Button>
    );
}

export default function UpdateEventForm({
    event,
    children,
}: {
    event: Event;
    children?: React.ReactNode;
}) {
    const initialState: UpdateEventFormState = {
        event: {
            id: event.id,
            playId: event.play.id,
            hallId: event.hall.id,
            time: event.time,
        },
        message: "",
    };
    const [state, formAction] = useFormState(updateEvent, initialState);

    const { toast } = useToast();

    useEffect(() => {
        if (!!state.message) {
            toast({
                title: "Upravit událost",
                description: state.message,
            });
        }
    }, [state, toast]);

    const [time, setTime] = useState(event.time);

    return (
        <Card className="w-full max-w-2xl">
            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
                <div className="flex h-full flex-col">
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Upravit událost
                    </h2>
                    <p className="text-sm">
                        Upravte existující událost v systému
                    </p>
                </div>
                <DeleteEventForm eventId={event.id} />
            </div>
            <form action={formAction} className="flex flex-col gap-2 p-4">
                <Input type="hidden" name="id" value={event.id} />
                {children}
                <Label htmlFor="time">Čas</Label>
                <Input type="hidden" name="time" value={time.toISOString()} />
                <DateTimePicker
                    value={{
                        date: time,
                        hasTime: true,
                    }}
                    onChange={(date) => setTime(date.date)}
                />
                <SubmitButton />
            </form>
        </Card>
    );
}
