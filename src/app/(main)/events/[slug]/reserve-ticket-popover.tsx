import { Button } from "@/components/ui/button";
import { Ticket } from "@/types/ticket";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ReserveTicketForm from "./reserve-ticket-form";
import { getCookie } from "@/lib/cookies";

function FormSkeleton() {
    return <Skeleton />;
}

export default async function ReserveTicketPopover({
    ticket,
}: {
    ticket: Ticket;
}) {
    const session = await getCookie();

    if (!session || !session.visitor) {
        return (
            <div className="flex h-full w-full flex-col gap-4">
                <p>Pro rezervaci lístků se přihlaste</p>
                <Button variant="link" className="w-full" asChild>
                    <Link href="/login">Přihlásit se</Link>
                </Button>
            </div>
        );
    }
    return (
        <Suspense fallback={<FormSkeleton />}>
            <ReserveTicketForm ticket={ticket} visitor={session.visitor} />
        </Suspense>
    );
}
