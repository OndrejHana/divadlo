import Link from "next/link";
import { Button } from "@/components/ui/button";
import AddEventForm from "./add-event-form";
import { Label } from "@/components/ui/label";
import { HallInput, PlayInput } from "../form-buttons";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import CastingForm from "./castings/casting-form";
import { PlusSquare } from "lucide-react";

function PlaySkeleton() {
    return (
        <div className="flex w-full justify-between">
            <Skeleton className="h-8 w-1/2" />
            <Button variant="default" disabled>
                Přidat hru
            </Button>
        </div>
    );
}

function HallSkeleton() {
    return (
        <div className="flex w-full justify-between">
            <Skeleton className="h-8 w-1/2" />
            <Button variant="default" disabled>
                Přidat sál
            </Button>
        </div>
    );
}

function CastingSkeleton() {
    return (
        <div className="flex w-full justify-between ">
            <Skeleton className="h-8 w-1/2" />
            <Button variant="default" disabled>
                <PlusSquare />
            </Button>
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
                <AddEventForm>
                    <Suspense fallback={<PlaySkeleton />}>
                        <Label htmlFor="playId">Hra</Label>
                        <div className="flex w-full gap-2">
                            <PlayInput />
                            <Button asChild>
                                <Link href="/admin/plays/add-play">
                                    Přidat hru
                                </Link>
                            </Button>
                        </div>
                    </Suspense>
                    <Suspense fallback={<HallSkeleton />}>
                        <Label htmlFor="hallId">Sál</Label>
                        <div className="flex w-full gap-2">
                            <HallInput />
                            <Button asChild>
                                <Link href="/admin/halls/add-hall">
                                    Přidat sál
                                </Link>
                            </Button>
                        </div>
                    </Suspense>
                    <Suspense fallback={<CastingSkeleton />}>
                        <CastingForm />
                    </Suspense>
                </AddEventForm>
            </Card>
        </div>
    );
}
