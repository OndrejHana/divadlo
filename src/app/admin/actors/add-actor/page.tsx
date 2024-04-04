import { Card } from "@/components/ui/card";
import AddActorForm from "./add-actor-form";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
            <Card className="w-full max-w-2xl overflow-hidden">
                <div className="bg-primary p-4 text-primary-foreground">
                    <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight ">
                        Přidejte herce
                    </h1>
                    <p className="text-sm">Přidejte nového herce do systému</p>
                </div>
                <Suspense fallback={<Loading />}>
                    <AddActorForm />
                </Suspense>
            </Card>
        </div>
    );
}
