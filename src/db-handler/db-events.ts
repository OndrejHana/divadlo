import {
    AddEventFormObject,
    Event,
    UpdateEventFormObject,
} from "@/types/event";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) { throw new Error('Supabase URL or key is missing.');}
const supabase = createClient(supabaseUrl, supabaseKey);

export async function dbGetEvents(): Promise<Event[]> {
    const { data, error } = await supabase
        .from('event')
        .select(`
            id,
            time,
            play(id, name, author, description, year_of_release),
            hall(id, name, number_of_seats)
        `);

    if(data === undefined) return [];
    if(error !== null) { throw new Error(error.message); }

    const events: Event[] = (data as unknown as { id: number; time: string; play: { id: number; name: string; author: string; description: string; year_of_release: number; }; hall: { id: number; name: string; number_of_seats: number; }; }[]).map((event: any) => {
        const Event: Event = {
            id: event.id,
            time: new Date(event.time),
            play: {
                id: event.play.id,
                name: event.play.name,
                author: event.play.author,
                description: event.play.description,
                yearOfRelease: event.play.year_of_release
            },
            hall: {
                id: event.hall.id,
                name: event.hall.name,
                numberOfSeats: event.hall.number_of_seats
            }
        };
        return Event;
    });

    return events;
}

export async function dbGetEvent(id: number): Promise<Event | null> {
    const { data, error } = await supabase
        .from('event')
        .select(`
            id,
            time,
            play(id, name, author, description, year_of_release),
            hall(id, name, number_of_seats)
        `)
        .eq('id', id);
    
    if(data === undefined || data === null || data.length === 0) return null;
    if(error !== null) { throw new Error(error.message); }

    const event  = data[0];

    const Event: Event = {
        id: event.id,
        time: new Date(event.time),
        play: {
            id: event.play.id,
            name: event.play.name,
            author: event.play.author,
            description: event.play.description,
            yearOfRelease: event.play.year_of_release
        },
        hall: {
            id: event.hall.id,
            name: event.hall.name,
            numberOfSeats: event.hall.number_of_seats
        }
    };

    return Event;
}

export async function dbAddEvent(
    addEventData: AddEventFormObject,
): Promise<Event> {
    const { data, error } = await supabase
        .from('event')
        .insert([
            {
                time: addEventData.time,
                play_id: addEventData.playId,
                hall_id: addEventData.hallId,
            }
        ])
        .select(`
            id,
            time,
            play(id, name, author, description, year_of_release),
            hall(id, name, number_of_seats)
        `);

    if(data === undefined) { throw new Error("Error adding event"); }
    if(error !== null) { throw new Error(error.message); }

    const event = data[0];

    const Event: Event = {
        id: event.id,
        time: new Date(event.time),
        play: {
            id: event.play_id,
            name: event.play.name,
            author: event.play.author,
            description: event.play.description,
            yearOfRelease: event.play.year_of_release
        },
        hall: {
            id: event.hall_id,
            name: event.hall.name,
            numberOfSeats: event.hall.number_of_seats
        }
    };

    return Event;
}

export async function dbUpdateEvent(
    updateEventData: UpdateEventFormObject,
): Promise<Event> {
    const { data, error } = await supabase
        .from('event')
        .update({
            time: updateEventData.time,
            play_id: updateEventData.playId,
            hall_id: updateEventData.hallId,
        })
        .eq('id', updateEventData.id)
        .select(`
            id,
            time,
            play(id, name, author, description, year_of_release),
            hall(id, name, number_of_seats)
        `)

    if(data === undefined) { throw new Error("Error updating event"); }
    if(error !== null) { throw new Error(error.message); }

    const event = data[0];

    const Event: Event = {
        id: event.id,
        time: new Date(event.time),
        play: {
            id: event.play_id,
            name: event.play.name,
            author: event.play.author,
            description: event.play.description,
            yearOfRelease: event.play.year_of_release
        },
        hall: {
            id: event.hall_id,
            name: event.hall.name,
            numberOfSeats: event.hall.number_of_seats
        }
    };

    return Event;
}

export async function dbDeleteEvent(id: number): Promise<void> {
    const { error } = await supabase
        .from('event')
        .delete()
        .eq('id', id);

    if(error !== null) { throw new Error(error.message); }
}
