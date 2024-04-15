"use server";

import { dbReserveTicker } from "@/db-handler/db-tickets";
import {
    ReserveTickerFormState,
    ReserveTicket,
    ZReserveTicket,
} from "@/types/ticket";

export async function reserveTicketAction(
    prevState: ReserveTickerFormState,
    formData: FormData,
): Promise<ReserveTickerFormState> {
    const formdata = ZReserveTicket.safeParse({
        ticket_id: parseInt(formData.get("ticket_id") as string),
        visitor_id: formData.get("visitor_id") as string,
    });

    if (!formdata.success) {
        console.error(formdata.error.errors.map((e) => e.message).join(", "));
        return {
            ...prevState,
            message: "Nesprávná data",
        };
    }

    const reserveTicket = formdata.data as ReserveTicket;
    console.log(reserveTicket);

    try {
        await dbReserveTicker(reserveTicket);
        return {
            data: reserveTicket,
            message: "Rezervace proběhla úspěšně",
        };
    } catch (e) {
        console.log("rip bozo", e);
        return {
            data: reserveTicket,
            message: "Rezervace selhala",
        };
    }
}
