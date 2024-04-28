"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Actor } from "@/types/actor";
import { ChevronDown, PlusSquare } from "lucide-react";
import { ReactNode, useState } from "react";

function CastingRow({ actors }: { actors: Actor[] }) {
    const [character, setCharacter] = useState<string>("");
    const [actorId, setActorId] = useState<number>(actors[0].id);

    return (
        <div className="flex w-full gap-2">
            <Input type="hidden" name="castings" value={JSON.stringify({ character, actorId })} /> 
            <Input
                type="text"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
            />
            <div className="flex h-10 w-full overflow-hidden rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <select
                    className="h-full w-full appearance-none bg-background px-3 py-2 "
                    value={actorId}
                    onChange={(e) => setActorId(parseInt(e.target.value))}
                >
                    {actors.map((actor) => (
                        <option key={actor.id} value={actor.id}>
                            {actor.person.firstName} {actor.person.lastName}
                        </option>
                    ))}
                </select>
                <ChevronDown className="h-full pr-1 text-muted-foreground" />
            </div>
        </div>
    );
}

export default function CastingList({ actors }: { actors: Actor[] }) {
    const [rows, setRows] = useState<ReactNode[]>([]);

    function addRow() {
        setRows(rows.concat(<CastingRow actors={actors} />));
    }

    return (
        <>
            <div className="flex w-full items-center justify-between">
                <p className="font">Obsazení</p>
                <Button
                    variant="default"
                    type="button"
                    className="w-fit"
                    onClick={addRow}
                >
                    <PlusSquare />
                </Button>
            </div>
            {rows.map((row, index) => (
                <div className="flex w-full gap-2" key={index}>
                    {row}
                </div>
            ))}
        </>
    );
}
/* "use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Actor } from "@/types/actor";
import { AddCasting } from "@/types/casting";
import { ChevronDown, MinusSquare, PlusSquare } from "lucide-react";
import { useEffect, useState } from "react";

function CastingRow({
    index,
    actors,
    casting,
    setCasting,
}: {
    index: number;
    actors: Actor[];
    casting: AddCasting;
    setCasting: (casting: AddCasting) => void;
}) {
    return (
        <div className="flex w-full items-center justify-between gap-2">
            <Input
                id={`character-${index}`}
                type="text"
                value={casting.character}
                onChange={(e) =>
                    setCasting({ ...casting, character: e.target.value })
                }
            />
            <div className="flex h-10 w-full overflow-hidden rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <select
                    id={`actorId-${index}`}
                    className="h-full w-full appearance-none bg-background px-3 py-2 "
                    defaultValue={casting.actorId}
                    onChange={(e) =>
                        setCasting({
                            ...casting,
                            actorId: parseInt(e.target.value),
                        })
                    }
                >
                    {actors.map((actor) => (
                        <option key={actor.id} value={actor.id}>
                            {actor.person.firstName} {actor.person.lastName}
                        </option>
                    ))}
                </select>
                <ChevronDown className="h-full pr-1 text-muted-foreground" />
            </div>
        </div>
    );
}

export default function CastingList({ actors }: { actors: Actor[] }) {
    const [castings, setCastings] = useState<AddCasting[]>([]);

    return (
        <>
            <div className="flex w-full items-center justify-between">
                <Label htmlFor="castings">Obsazení</Label>
                <Input
                    type="hidden"
                    name="castings"
                    value={JSON.stringify(castings)}
                />
                <Button
                    variant="default"
                    type="button"
                    className="w-fit"
                    onClick={() =>
                        setCastings([
                            ...castings,
                            {
                                character: "",
                                actorId: actors[0].id,
                            },
                        ])
                    }
                >
                    <PlusSquare />
                </Button>
            </div>
            {castings.map((casting, index) => (
                <div className="flex w-full gap-2" key={index}>
                    <CastingRow
                        index={index}
                        actors={actors}
                        casting={casting}
                        setCasting={(newCasting) => {
                            const newCastings = [...castings];
                            newCastings[index] = newCasting;
                            setCastings(newCastings);
                        }}
                    />
                    <Button
                        variant="destructive"
                        type="button"
                        onClick={() => {
                            const newCastings = castings.filter(
                                (_, i) => i !== index,
                            );
                            setCastings(newCastings);
                        }}
                    >
                        <MinusSquare />
                    </Button>
                </div>
            ))}
        </>
    );
} */
