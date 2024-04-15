import { Button } from "@/components/ui/button";
import { AuthSessionOptions } from "@/lib/utils";
import { UserSessionData } from "@/types/register";
import { Ticket } from "@/types/ticket";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ReserveTicketForm from "./reserve-ticket-form";

function FormSkeleton() {
    return <Skeleton />;
}

export default async function ReserveTicketPopover({
    ticket,
}: {
    ticket: Ticket;
}) {
    const session = await getIronSession<UserSessionData>(
        cookies(),
        AuthSessionOptions,
    );

    if (!session || !session.session?.user) {
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
            <ReserveTicketForm ticket={ticket} user={session.session.user} />
        </Suspense>
    );
}
