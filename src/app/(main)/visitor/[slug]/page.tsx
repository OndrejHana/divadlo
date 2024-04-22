import LogoutButton from "@/app/logout-button";
import { dbGetTicketsByVisitorId } from "@/db-handler/db-tickets";
import { getCookie } from "@/lib/cookies";
import { format, formatISO } from "date-fns";
import { redirect } from "next/navigation";


export default async function Page({ params }: { params: { slug: string } }) {
    const cookie = await getCookie();
    const paramsId = parseInt(params.slug);

    if (
        !cookie.session ||
        !cookie.isLoggedIn ||
        !cookie.visitor ||
        cookie.visitor.id !== paramsId
    ) {
        redirect("/");
    }

    const tickets = await dbGetTicketsByVisitorId(paramsId);

    return (
        <div className="flex h-full w-full flex-col gap-8 p-8">
            <h1 className="text-4xl font-bold text-primary xl:text-6xl">
                Můj účet
            </h1>
            <div>
                <h2 className="text-2xl font-bold xl:text-4xl">
                    Moje rezervace
                </h2>
                <div className="flex flex-col gap-2 overflow-x-auto">
                    {tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="flex justify-between gap-4 border-y border-y-primary bg-muted p-4"
                        >
                            <div className="flex flex-col gap-2">
                                <p className="font-bold">
                                    {ticket.event.play.name}
                                </p>
                                <p>
                                    {format(ticket.event.time, "d. MMMM yyyy HH:mm")}
                                </p>
                            </div>
                            <div className="flex gap-2 text-sm text-muted-foreground">
                                <p className="">{ticket.event.hall.name}</p>
                                <p>{ticket.seat}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <LogoutButton />
        </div>
    );
}
