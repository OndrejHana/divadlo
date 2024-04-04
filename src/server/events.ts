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
        playId: formData.get("playId"),
        hallId: formData.get("hallId"),
        time: formData.get("time"),
    });

    if (!data.success) {
        return {
            ...prevState,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const parsedEvent = data.data;
    console.log(parsedEvent);

    try {
        await dbAddEvent(parsedEvent);
    } catch (e) {
        console.error(e);
        return {
            ...prevState,
            message: "Error adding event",
        };
    }

    revalidatePath("/admin/events");
    redirect("/admin/events");
}

export async function updateEvent(
    prevState: UpdateEventFormState,
    formData: FormData,
): Promise<UpdateEventFormState> {
    console.log(formData);
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
    console.log(event);
    console.log(
        event.time.toLocaleString("cs-CZ", { timeZone: "Europe/Prague" }),
    );

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
            message: "Event updated successfully",
        };
    } catch (e) {
        console.error(e);
        return {
            message: "Error updating event",
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
    } catch (e) {
        console.error(e);
        return {
            message: "Error deleting event",
        };
    }

    revalidatePath("/admin/events");
    redirect("/admin/events");
}
