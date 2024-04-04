import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex h-full items-center justify-center p-2">
            <Skeleton className="h-96 w-full max-w-2xl" />
        </div>
    );
}
