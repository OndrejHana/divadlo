import { z } from "zod";
import { ZEvent } from "./event";
import { ZVisitor } from "./visitor";

export const ZTicket = z.object({
    id: z.number().positive(),
    event: ZEvent,
    visitor: ZVisitor,
    seat: z.number(),
    price: z.number(),
});

export const ZReserveTicket = z.object({
    ticket_id: z.number().positive(),
    visitor_id: z.number().positive(),
});

export type Ticket = z.infer<typeof ZTicket>;
export type ReserveTicket = z.infer<typeof ZReserveTicket>;

export type ReserveTickerFormState = {
    data: ReserveTicket;
    message: string;
};
