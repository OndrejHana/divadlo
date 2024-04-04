"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateHallAction } from "@/server/halls";
import { Hall } from "@/types/hall";
import { useFormState, useFormStatus } from "react-dom";
import DeleteHallForm from "./delete-hall-form";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="default" type="submit" disabled={pending}>
            Upravit sál
        </Button>
    );
}

export default function UpdataHallForm({ hall }: { hall: Hall }) {
    const [state, formAction] = useFormState(updateHallAction, {
        hall: {
            id: hall.id,
            name: hall.name,
            numberOfSeats: hall.numberOfSeats,
        },
        message: "",
    });

    const { toast } = useToast();

    useEffect(() => {
        if (!!state.message) {
            toast({
                title: "Upravit sál",
                description: state.message,
            });
        }
    }, [state, toast]);

    const [hallName, setHallName] = useState(hall.name);
    const [numberOfSeats, setNumberOfSeats] = useState(hall.numberOfSeats);

    return (
        <Card className="w-full max-w-2xl">
            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
                <div className="flex h-full flex-col">
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Upravit sál
                    </h2>
                    <p className="text-sm">Upravte existující sály v systému</p>
                </div>
                <DeleteHallForm hallId={hall.id} />
            </div>
            <form action={formAction} className="flex flex-col gap-2 p-4">
                <Input type="hidden" name="id" value={hall.id} />
                <Label htmlFor="name">Název sálu</Label>
                <Input
                    type="text"
                    name="name"
                    value={hallName}
                    onChange={(e) => setHallName(e.target.value)}
                />
                <Label htmlFor="numberOfSeats">Počet sedadel</Label>
                <Input
                    type="number"
                    name="numberOfSeats"
                    value={numberOfSeats}
                    onChange={(e) => setNumberOfSeats(parseInt(e.target.value))}
                />
                <SubmitButton />
            </form>
        </Card>
    );
}
