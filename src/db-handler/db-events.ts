import { supabase } from "@/lib/supabase";
import {
    AddEventFormObject,
    Event,
    UpdateEventFormObject,
} from "@/types/event";

export async function dbGetEvents(): Promise<Event[]> {
    const { data, error } = await supabase.from("event").select(`
            id,
            time,
            play(id, name, author, description, year_of_release, duration_minutes, play_image),
            hall(id, name, number_of_seats)
        `);

    if (data === undefined) return [];
    if (error !== null) {
        throw new Error(error.message);
    }

    const events: Event[] = (
        data as unknown as {
            id: number;
            time: string;
            play: {
                id: number;
                name: string;
                author: string;
                description: string;
                year_of_release: number;
                duration_minutes: number;
                play_image: string;
            };
            hall: { id: number; name: string; number_of_seats: number };
        }[]
    ).map((event: any) => {
        const Event: Event = {
            id: event.id,
            time: new Date(event.time),
            play: {
                id: event.play.id,
                name: event.play.name,
                author: event.play.author,
                description: event.play.description,
                yearOfRelease: event.play.year_of_release,
                durationMinutes: event.play.duration_minutes,
                playImage: event.play.play_image,
            },
            hall: {
                id: event.hall.id,
                name: event.hall.name,
                numberOfSeats: event.hall.number_of_seats,
            },
        };
        return Event;
    });

    return events;
}

export async function dbGetFutureEvents(): Promise<Event[]> {
    const { data, error } = await supabase.from("future_events").select(`
            id,
            time,
            play(id, name, author, description, year_of_release, duration_minutes, play_image),
            hall(id, name, number_of_seats)
        `);

    if (data === undefined) return [];
    if (error !== null) {
        throw new Error(error.message);
    }

    const events: Event[] = (
        data as unknown as {
            id: number;
            time: string;
            play: {
                id: number;
                name: string;
                author: string;
                description: string;
                year_of_release: number;
                duration_minutes: number;
                play_image: string;
            };
            hall: { id: number; name: string; number_of_seats: number };
        }[]
    ).map((event: any) => {
        const Event: Event = {
            id: event.id,
            time: new Date(event.time),
            play: {
                id: event.play.id,
                name: event.play.name,
                author: event.play.author,
                description: event.play.description,
                yearOfRelease: event.play.year_of_release,
                durationMinutes: event.play.duration_minutes,
                playImage: event.play.play_image,
            },
            hall: {
                id: event.hall.id,
                name: event.hall.name,
                numberOfSeats: event.hall.number_of_seats,
            },
        };
        return Event;
    });

    return events;
}


export async function dbGetPreviousEvents(): Promise<Event[]> {
    const { data, error } = await supabase.from("previous_events").select(`
            id,
            time,
            play(id, name, author, description, year_of_release, duration_minutes, play_image),
            hall(id, name, number_of_seats)
        `);

    if (data === undefined) return [];
    if (error !== null) {
        throw new Error(error.message);
    }

    const events: Event[] = (
        data as unknown as {
            id: number;
            time: string;
            play: {
                id: number;
                name: string;
                author: string;
                description: string;
                year_of_release: number;
                duration_minutes: number;
                play_image: string;
            };
            hall: { id: number; name: string; number_of_seats: number };
        }[]
    ).map((event: any) => {
        const Event: Event = {
            id: event.id,
            time: new Date(event.time),
            play: {
                id: event.play.id,
                name: event.play.name,
                author: event.play.author,
                description: event.play.description,
                yearOfRelease: event.play.year_of_release,
                durationMinutes: event.play.duration_minutes,
                playImage: event.play.play_image,
            },
            hall: {
                id: event.hall.id,
                name: event.hall.name,
                numberOfSeats: event.hall.number_of_seats,
            },
        };
        return Event;
    });

    return events;
}

export async function dbGetEvent(id: number): Promise<Event | null> {
    const { data, error } = await supabase
        .from("event")
        .select(
            `
            id,
            time,
            play(id, name, author, description, year_of_release, duration_minutes, play_image),
            hall(id, name, number_of_seats)
        `,
        )
        .eq("id", id);

    if (data === undefined || data === null || data.length === 0) return null;
    if (error !== null) {
        throw new Error(error);
    }

    if (data === undefined) return null;
    if (error !== null) {
        throw new Error(error);
    }

    const event: any = data[0];

    const Event: Event = {
        id: event.id,
        time: new Date(event.time),
        play: {
            id: event.play.id,
            name: event.play.name,
            author: event.play.author,
            description: event.play.description,
            yearOfRelease: event.play.year_of_release,
            durationMinutes: event.play.duration_minutes,
            playImage: event.play.play_image,
        },
        hall: {
            id: event.hall.id,
            name: event.hall.name,
            numberOfSeats: event.hall.number_of_seats,
        },
    };

    return Event;
}

export async function dbAddEvent(
    addEventData: AddEventFormObject,
): Promise<Event> {
    const { data, error } = await supabase.from("event").insert([
        {
            time: addEventData.time,
            play_id: addEventData.playId,
            hall_id: addEventData.hallId,
        },
    ]).select(`
            id,
            time,
            play(id, name, author, description, year_of_release, duration_minutes, play_image),
            hall(id, name, number_of_seats)
        `);

    if (data === undefined) {
        throw new Error("Error adding event");
    }
    if (error !== null) {
        throw new Error(error.message);
    }

    const event: any = data[0];

    const Event: Event = {
        id: event.id,
        time: new Date(event.time),
        play: {
            id: event.play.id,
            name: event.play.name,
            yearOfRelease: event.play.year_of_release,
            description: event.play.description,
            author: event.play.author,
            durationMinutes: event.play.duration_minutes,
            playImage: event.play.play_image,
        },
        hall: {
            id: event.hall.id,
            name: event.hall.name,
            numberOfSeats: event.hall.number_of_seats,
        },
    };

    return Event;
}

export async function dbUpdateEvent(
    updateEventData: UpdateEventFormObject,
): Promise<Event> {
    const { data, error } = await supabase
        .from("event")
        .update({
            time: updateEventData.time,
            play_id: updateEventData.playId,
            hall_id: updateEventData.hallId,
        })
        .eq("id", updateEventData.id).select(`
            id,
            time,
            play(id, name, author, description, year_of_release, duration_minutes, play_image),
            hall(id, name, number_of_seats)
        `);

    if (data === undefined) {
        throw new Error("Error updating event");
    }
    if (error !== null) {
        throw new Error(error.message);
    }

    const event: any = data[0];

    const Event: Event = {
        id: event.id,
        time: new Date(event.time),
        play: {
            id: event.play.id,
            name: event.play.name,
            author: event.play.author,
            yearOfRelease: event.play.year_of_release,
            description: event.play.description,
            durationMinutes: event.play.duration_minutes,
            playImage: event.play.play_image,
        },
        hall: {
            id: event.hall.id,
            name: event.hall.name,
            numberOfSeats: event.hall.number_of_seats,
        },
    };

    return Event;
}

export async function dbDeleteEvent(id: number): Promise<void> {
    const { error: ticketsError } = await supabase
        .from("ticket")
        .delete()
        .eq("event_id", id);

    if (ticketsError !== null) {
        console.error(ticketsError);
        throw new Error(ticketsError.message);
    }

    const { error: castingsError } = await supabase
        .from("casting")
        .delete()
        .eq("event_id", id);

    if (castingsError !== null) {
        console.error(castingsError);
        throw new Error(castingsError.message);
    }

    const { error: eventsError } = await supabase
        .from("event")
        .delete()
        .eq("id", id);

    if (eventsError !== null) {
        console.error(eventsError);
        throw new Error(eventsError.message);
    }
}

export async function dbGetEventsByPlayId(playId: number): Promise<Event[]> {
    const { data, error } = await supabase
        .from("event")
        .select(
            `
            id,
            time,
            play(id, name, author, description, year_of_release, duration_minutes, play_image),
            hall(id, name, number_of_seats)
        `,
        )
        .eq("play_id", playId);

    if (error !== null) {
        throw new Error(error.message);
    }

    if (data === undefined || data === null || data.length === 0) {
        return [];
    }

    const events: Event[] = (
        data as unknown as {
            id: number;
            time: string;
            play: {
                id: number;
                name: string;
                author: string;
                description: string;
                year_of_release: number;
                duration_minutes: number;
                play_image: string;
            };
            hall: { id: number; name: string; number_of_seats: number };
        }[]
    ).map((event: any) => {
        const Event: Event = {
            id: event.id,
            time: new Date(event.time),
            play: {
                id: event.play.id,
                name: event.play.name,
                author: event.play.author,
                description: event.play.description,
                yearOfRelease: event.play.year_of_release,
                durationMinutes: event.play.duration_minutes,
                playImage: event.play.play_image,
            },
            hall: {
                id: event.hall.id,
                name: event.hall.name,
                numberOfSeats: event.hall.number_of_seats,
            },
        };
        return Event;
    });

    return events;
}
