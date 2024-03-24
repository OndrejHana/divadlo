"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateHallAction } from "@/server/halls";
import { Hall, UpdateHallFormState } from "@/types/hall";
import { useFormState } from "react-dom";
import DeleteHallForm from "./delete-hall-form";

const initialState: UpdateHallFormState = {
    hall: undefined,
    message: "",
};

export default function UpdataHallForm({ hall }: { hall: Hall }) {
    const [_, formAction] = useFormState(updateHallAction, initialState);

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
                <Input type="text" name="name" value={hall.name} />
                <Label htmlFor="numberOfSeats">Počet sedadel</Label>
                <Input
                    type="number"
                    name="numberOfSeats"
                    value={hall.numberOfSeats}
                />
                <Button type="submit" variant="default">
                    Upravit sál
                </Button>
            </form>
        </Card>
    );
}
