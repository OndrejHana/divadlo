"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updateEvent } from "@/server/events";
import { Event, UpdateEventFormState } from "@/types/event";
import { useFormState } from "react-dom";
import DeleteEventForm from "./delete-event-form";
import { Label } from "@/components/ui/label";

const initialState: UpdateEventFormState = {
    event: undefined,
    message: "",
};

export default function UpdateEventForm({
    event,
    children,
}: {
    event: Event;
    children?: React.ReactNode;
}) {
    const [_, formAction] = useFormState(updateEvent, initialState);

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
                <Input type="date" name="time" />
                <Button
                    variant="default"
                    type="submit"
                    className="rounded-md bg-primary p-2 text-primary-foreground"
                >
                    Upravit událost
                </Button>
            </form>
        </Card>
    );

    // <Card className="w-full max-w-2xl">
    //     <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
    //         <div className="flex h-full flex-col">
    //             <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
    //                 Upravit hru
    //             </h2>
    //             <p className="text-sm">Upravte existující hru v systému</p>
    //         </div>
    //         <DeletePlayForm playId={play.id} />
    //     </div>
    //     <form action={formAction} className="flex flex-col gap-2 p-4">
    //         <Input type="hidden" name="id" value={play.id} />
    //         <Label htmlFor="name">Název hry</Label>
    //         <Input type="text" name="name" value={play.name} />
    //         <Label htmlFor="author">Autor hry</Label>
    //         <Input type="text" name="author" value={play.author} />
    //         <Label htmlFor="description">Popis hry</Label>
    //         <Input
    //             type="text"
    //             name="description"
    //             value={play.description}
    //         />
    //         <Label htmlFor="yearOfRelease">Rok vydání</Label>
    //         <Input
    //             type="number"
    //             name="yearOfRelease"
    //             value={play.yearOfRelease}
    //         />
    //         <button
    //             type="submit"
    //             className="rounded-md bg-primary p-2 text-primary-foreground"
    //         >
    //             Upravit hru
    //         </button>
    //     </form>
    // </Card>
}
