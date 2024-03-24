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
    await dbAddEvent(parsedEvent);

    revalidatePath("/admin/events");

    return {
        event: undefined,
        message: "Event byl vytvořen",
    };
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

    const parsedEvent = data.data;
    const updatedEvent = await dbUpdateEvent(parsedEvent);

    revalidatePath("/admin/events");

    return {
        event: {
            id: updatedEvent.id,
            playId: updatedEvent.play.id,
            hallId: updatedEvent.hall.id,
            time: updatedEvent.time,
        },
        message: "Event byl upraven",
    };
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
    await dbDeleteEvent(id);

    revalidatePath("/admin/events");

    return {
        message: "Event byl smazán",
    };
}
