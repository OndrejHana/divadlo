"use client";

import { Card } from "@/components/ui/card";
import { Play, UpdatePlayFormState } from "@/types/play";
import DeletePlayForm from "./delete-play-form";
import { useFormState } from "react-dom";
import { updatePlayAction } from "@/server/plays";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: UpdatePlayFormState = {
    play: undefined,
    message: "",
};

export default function UpdatePlayForm({ play }: { play: Play }) {
    const [_, formAction] = useFormState(updatePlayAction, initialState);

    return (
        <Card className="w-full max-w-2xl">
            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
                <div className="flex h-full flex-col">
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Upravit hru
                    </h2>
                    <p className="text-sm">Upravte existující hru v systému</p>
                </div>
                <DeletePlayForm playId={play.id} />
            </div>
            <form action={formAction} className="flex flex-col gap-2 p-4">
                <Input type="hidden" name="id" value={play.id} />
                <Label htmlFor="name">Název hry</Label>
                <Input type="text" name="name" value={play.name} />
                <Label htmlFor="author">Autor hry</Label>
                <Input type="text" name="author" value={play.author} />
                <Label htmlFor="description">Popis hry</Label>
                <Input
                    type="text"
                    name="description"
                    value={play.description}
                />
                <Label htmlFor="yearOfRelease">Rok vydání</Label>
                <Input
                    type="number"
                    name="yearOfRelease"
                    value={play.yearOfRelease}
                />
                <button
                    type="submit"
                    className="rounded-md bg-primary p-2 text-primary-foreground"
                >
                    Upravit hru
                </button>
            </form>
        </Card>
    );
}
