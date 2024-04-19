import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { dbGetEvent } from "@/db-handler/db-events";
import { dbGetTicketsByEventId } from "@/db-handler/db-tickets";
import image from "@/public/main.jpg";
import { Ticket } from "@/types/ticket";
import Image from "next/image";
import ReserveTicketPopover from "./reserve-ticket-popover";

function Seat({ ticket }: { ticket: Ticket }) {
    if (ticket.visitor) {
        return (
            <div className="h-full w-full cursor-pointer rounded-sm bg-primary p-1 text-center text-primary-foreground">
                {ticket.seat}
            </div>
        );
    }
    return (
        <Popover>
            <PopoverTrigger className="h-full w-full cursor-pointer rounded-sm bg-muted p-1 text-muted-foreground hover:bg-gray-300">
                <p>{ticket.seat}</p>
            </PopoverTrigger>
            <PopoverContent className="flex w-fit flex-col gap-4">
                <p className="font-bold">Rezervovat sedadlo {ticket.seat}</p>
                <ReserveTicketPopover ticket={ticket} />
            </PopoverContent>
        </Popover>
    );
}

function SeatView({ tickets }: { tickets: Ticket[] }) {
    return (
        <Popover>
            <div className="flex h-full w-full justify-center py-8">
                <div className="custom-grid-rows grid max-w-4xl gap-1">
                    {tickets.map((ticket) => (
                        <Seat ticket={ticket} key={ticket.id} />
                    ))}
                </div>
            </div>
        </Popover>
    );
}

export default async function Page({ params }: { params: { slug: string } }) {
    const eventId = parseInt(params.slug);
    const event = await dbGetEvent(eventId);
    const tickets = await dbGetTicketsByEventId(eventId);

    return (
        <div className="flex h-full w-full flex-col">
            <AspectRatio ratio={4 / 1}>
                <div className="absolute z-10 flex h-full w-full items-end p-16">
                    {event?.play && (
                        <h1 className="h-fit text-4xl font-bold text-primary-foreground xl:text-6xl">
                            {event.play.name}
                        </h1>
                    )}
                </div>
                <Image
                    src={image}
                    layout="fill"
                    objectFit="cover"
                    alt="Theater"
                />
            </AspectRatio>
            <SeatView tickets={tickets} />
        </div>
    );
}
