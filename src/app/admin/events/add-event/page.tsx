import Link from "next/link";
import { Button } from "@/components/ui/button";
import AddEventForm from "./add-event-form";
import { Label } from "@/components/ui/label";
import { HallInput, PlayInput } from "../form-buttons";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";

function Loading() {
    return (
        <div className="flex flex-col gap-4 p-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
        </div>
    );
}

export default function Page() {
    return (
        <div className="flex h-full w-full justify-center">
            <Card className="flex w-full max-w-2xl flex-col gap-2 overflow-hidden rounded-none">
                <div className="bg-primary p-4">
                    <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight text-primary-foreground">
                        Přidejte divadelní akci
                    </h1>
                    <p className="text-primary-foreground">
                        Přidejte novou divadelní akci do systému
                    </p>
                </div>
                <Suspense fallback={<Loading />}>
                    <AddEventForm>
                        <Label htmlFor="play">Hra</Label>
                        <div className="flex w-full gap-2">
                            <PlayInput />
                            <Button asChild>
                                <Link href="/admin/plays/add-play">
                                    Přidat hru
                                </Link>
                            </Button>
                        </div>
                        <Label htmlFor="hall">Sál</Label>
                        <div className="flex w-full gap-2">
                            <HallInput />
                            <Button asChild>
                                <Link href="/admin/halls/add-hall">
                                    Přidat sál
                                </Link>
                            </Button>
                        </div>
                    </AddEventForm>
                </Suspense>
            </Card>
        </div>
    );
}
