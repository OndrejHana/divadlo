"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { reserveTicketAction } from "@/server/tickets";
import { ReserveTickerFormState, Ticket } from "@/types/ticket";
import { Visitor } from "@/types/visitor";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            variant="default"
            type="submit"
            disabled={pending}
            className="w-full"
        >
            Rezervovat
        </Button>
    );
}

export default function ReserveTicketForm({
    ticket,
    visitor,
}: {
    ticket: Ticket;
    visitor: Visitor;
}) {
    const initialState: ReserveTickerFormState = {
        data: {
            visitor_id: visitor.id,
            ticket_id: ticket.id,
        },
        message: "",
    };
    const [state, action] = useFormState(reserveTicketAction, initialState);

    const { toast } = useToast();

    useEffect(() => {
        if (!!state.message) {
            toast({
                title: "Rezervace lístku",
                description: state.message,
            });
        }
    }, [state, toast]);

    return (
        <form action={action}>
            <Input type="hidden" name="ticket_id" value={ticket.id} />
            <Input type="hidden" name="visitor_id" value={visitor.id} />
            <SubmitButton />
        </form>
    );
}
