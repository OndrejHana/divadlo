"use server";

import {
    dbAddEvent,
    dbDeleteEvent,
    dbGetEvent,
    dbGetEvents,
} from "@/db-handler/db-events";
import {
    AddEventFormState,
    DeleteEventFormState,
    Event,
    ZAddEventFormObject,
    ZDeleteEventFormObject,
} from "@/types/event";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getEvents(): Promise<Event[]> {
    return await dbGetEvents();
}

export async function addEvent(
    prevState: AddEventFormState,
    formData: FormData,
): Promise<AddEventFormState> {
    const event = ZAddEventFormObject.safeParse({
        playId: parseInt(formData.get("playId") as string),
        hallId: parseInt(formData.get("hallId") as string),
        time: new Date(formData.get("time") as string),
    });

    if (!event.success) {
        console.log(event.error.errors);
        return {
            ...prevState,
            message: event.error.errors.map((e) => e.message).join(", "),
        };
    }

    const parsedEvent = event.data;
    await dbAddEvent(parsedEvent);

    revalidatePath("/");
    redirect("/admin");
}

export async function getEvent(id: number): Promise<Event | null> {
    return dbGetEvent(id);
}

export async function deleteEvent(
    formData: FormData,
): Promise<DeleteEventFormState> {
    const obj = ZDeleteEventFormObject.safeParse({
        id: parseInt(formData.get("id") as string),
    });

    if (!obj.success) {
        console.log(obj.error.errors);
        return {
            message: obj.error.errors.map((e) => e.message).join(", "),
        };
    }

    const { id } = obj.data;
    await dbDeleteEvent(id);

    revalidatePath("/");
    return {
        message: "Event deleted",
    };
}
