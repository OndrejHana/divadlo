import { Skeleton } from "@/components/ui/skeleton";
import AddHallForm from "./add-hall-form";
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
export default async function Page() {
    return (
        <div className="flex h-full w-full items-start justify-center">
            <Card className="flex w-full max-w-2xl flex-col overflow-hidden">
                <div className="bg-primary p-4 text-primary-foreground">
                    <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Přidat sál
                    </h1>
                    <p className="text-sm">Přidejte nový sál do systému</p>
                </div>

                <Suspense fallback={<Loading />}>
                    <AddHallForm />
                </Suspense>
            </Card>
        </div>
    );
}
