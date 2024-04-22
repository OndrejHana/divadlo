"use client";

import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Play, UpdatePlayFormState } from "@/types/play";
import DeletePlayForm from "./delete-play-form";
import { useFormState, useFormStatus } from "react-dom";
import { updatePlayAction } from "@/server/plays";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="default" type="submit" disabled={pending}>
            Upravit hru
        </Button>
    );
}

export default function UpdatePlayForm({ play }: { play: Play }) {
    console.log(play);
    const initialState: UpdatePlayFormState = {
        play: {
            id: play.id,
            name: play.name,
            author: play.author,
            description: play.description,
            yearOfRelease: play.yearOfRelease,
            durationMinutes: play.durationMinutes,
            playImage: play.playImage ?? undefined,
        },
        message: "",
    };
    const [state, formAction] = useFormState(updatePlayAction, initialState);

    const { toast } = useToast();

    useEffect(() => {
        if (!!state.message) {
            toast({
                title: "Upravit divadelní hru",
                description: state.message,
            });
        }
    }, [state, toast]);

    const [name, setName] = useState(play.name);
    const [author, setAuthor] = useState(play.author);
    const [description, setDescription] = useState(play.description);
    const [yearOfRelease, setYearOfRelease] = useState(play.yearOfRelease);
    const [durationMinutes, setDurationMinutes] = useState(
        play.durationMinutes,
    );
    const [playImage, setPlayImage] = useState(play.playImage);

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
                <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Label htmlFor="author">Autor hry</Label>
                <Input
                    type="text"
                    name="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <Label htmlFor="description">Popis hry</Label>
                <Input
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Label htmlFor="yearOfRelease">Rok vydání</Label>
                <Input
                    type="number"
                    name="yearOfRelease"
                    value={yearOfRelease}
                    onChange={(e) => setYearOfRelease(parseInt(e.target.value))}
                />
                <Label htmlFor="durationMinutes">Délka hry</Label>
                <Input
                    type="number"
                    name="durationMinutes"
                    value={durationMinutes}
                    onChange={(e) =>
                        setDurationMinutes(parseInt(e.target.value))
                    }
                />
                {playImage ? (
                    <Image
                        src={playImage}
                        alt="obrázek hry"
                        width={240}
                        height={240}
                    />
                ) : (
                    <p className="text-sm">Obrázek hry není k dispozici</p>
                )}

                <SubmitButton />
            </form>
        </Card>
    );
}
