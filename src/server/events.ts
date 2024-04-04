"use server";

import {
    dbAddEvent,
    dbDeleteEvent,
    dbUpdateEvent,
} from "@/db-handler/db-events";
import {
    AddEventFormState,
    DeleteEventFormState,
    UpdateEventFormState,
    ZAddEventFormObject,
    ZDeleteEventFormObject,
    ZUpdateEventFormObject,
} from "@/types/event";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addEventAction(
    prevState: AddEventFormState,
    formData: FormData,
): Promise<AddEventFormState> {
    const data = ZAddEventFormObject.safeParse({
        playId: parseInt(formData.get("playId") as string),
        hallId: parseInt(formData.get("hallId") as string),
        time: new Date(formData.get("time") as string),
    });

    if (!data.success) {
        return {
            ...prevState,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const parsedEvent = data.data;
    try {
        await dbAddEvent(parsedEvent);
        revalidatePath("/admin/events");
    } catch (e) {
        console.error(e);
        return {
            ...prevState,
            message: "Událost nemohla být přidána",
        };
    }

    redirect("/admin/events");
}

export async function updateEvent(
    prevState: UpdateEventFormState,
    formData: FormData,
): Promise<UpdateEventFormState> {
    const data = ZUpdateEventFormObject.safeParse({
        id: parseInt(formData.get("id") as string),
        playId: parseInt(formData.get("playId") as string),
        hallId: parseInt(formData.get("hallId") as string),
        time: new Date(formData.get("time") as string),
    });

    if (!data.success) {
        return {
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const event = data.data;

    try {
        const newEvent = await dbUpdateEvent(event);
        revalidatePath("/admin/events");
        revalidatePath("/admin/events/[slug]", "page");

        return {
            event: {
                id: newEvent.id,
                playId: newEvent.play.id,
                hallId: newEvent.hall.id,
                time: newEvent.time,
            },
            message: "Událost byla upravena",
        };
    } catch (e) {
        console.error(e);
        return {
            message: "Událost nemohla být upravena",
        };
    }
}

export async function deleteEvent(
    prevState: DeleteEventFormState,
    formData: FormData,
): Promise<DeleteEventFormState> {
    const data = ZDeleteEventFormObject.safeParse({
        id: parseInt(formData.get("id") as string),
    });

    if (!data.success) {
        return {
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const { id } = data.data;
    try {
        await dbDeleteEvent(id);
        revalidatePath("/admin/events");
    } catch (e) {
        console.error(e);
        return {
            message: "Událost nemohla být smazána",
        };
    }

    redirect("/admin/events");
}
