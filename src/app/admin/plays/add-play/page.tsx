import { Skeleton } from "@/components/ui/skeleton";
import AddPlayForm from "./add-play-form";
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
        <div className="flex h-full w-full justify-center ">
            <Suspense fallback={<Loading />}>
                <AddPlayForm />
            </Suspense>
        </div>
    );
}
