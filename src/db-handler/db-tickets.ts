import { ReserveTicket, Ticket } from "@/types/ticket";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or key is missing.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function dbGetTicketsByEventId(
    eventId: number,
): Promise<Ticket[]> {
    const { data, error } = await supabase
        .from("ticket")
        .select(
            `id,
            event(
                id,
                time,
                play(id, name, author, description, year_of_release),
                hall(id, name, number_of_seats)
            ),
            visitor(id, email, phone, user_id, role, address_id),
            seat,
            price`,
        )
        .eq("event_id", eventId)
        .order("seat", { ascending: true });

    if (data === undefined) {
        throw new Error("Error getting tickets");
    }
    if (error !== null) {
        throw new Error(error.message);
    }

    const tickets: Ticket[] = data.map((ticket: any) => {
        return {
            id: ticket.id,
            event: ticket.event,
            visitor: ticket.visitor,
            seat: ticket.seat,
            price: ticket.price,
        };
    });

    return tickets;
}

export async function dbGetTicket(id: number): Promise<Ticket | undefined> {
    const { data, error } = await supabase
        .from("ticket")
        .select("*")
        .eq("id", id);

    if (data === undefined || data?.length === 0) {
        return undefined;
    }
    if (error !== null) {
        throw new Error(error.message);
    }

    const ticket: Ticket = {
        id: data[0].id,
        event: data[0].event,
        visitor: data[0].visitor,
        seat: data[0].seat,
        price: data[0].price,
    };

    return ticket;
}

export async function dbReserveTicker(data: ReserveTicket): Promise<void> {
    await supabase
        .from("ticket")
        .update({
            visitor_id: data.visitor_id,
        })
        .eq("id", data.ticket_id);
}
