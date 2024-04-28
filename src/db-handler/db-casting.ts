import { supabase } from "@/lib/supabase";
import { AddCasting, Casting, DbAddCasting } from "@/types/casting";

function dataToCasting(data: any): Casting {
    return {
        id: data.id,
        character: data.character,
        actor: {
            id: data.actor.id,
            description: data.actor.description,
            actorImage: data.actor.actor_image,
            person: {
                id: data.actor.person.id,
                firstName: data.actor.person.first_name,
                lastName: data.actor.person.last_name,
            },
        },
        event: {
            id: data.event.id,
            time: new Date(data.event.time),
            play: {
                id: data.event.play.id,
                name: data.event.play.name,
                author: data.event.play.author,
                description: data.event.play.description,
                yearOfRelease: data.event.play.year_of_release,
                durationMinutes: data.event.play.duration_minutes,
                playImage: data.event.play.play_image,
            },
            hall: {
                id: data.event.hall.id,
                name: data.event.hall.name,
                numberOfSeats: data.event.hall.number_of_seats,
            },
        },
    };
}

export async function dbGetCastings(): Promise<Casting[]> {
    const { data, error } = await supabase.from("casting").select(`
            id,
            actor(id, description, actor_image,
                person(id, first_name, last_name)   
            ),
            event(id, time, 
                play(id, name, author, description, year_of_release, duration_minutes, play_image),
                hall(id, name, number_of_seats)
            )
        `);

    if (data === undefined) return [];
    if (error !== null) {
        throw new Error(error.message);
    }

    return data.map(dataToCasting);
}

export async function dbGetCastingsForActor(
    actorId: number,
): Promise<Casting[]> {
    const { data, error } = await supabase
        .from("casting")
        .select(
            `
            character,
            actor(id, description, 
                person(id, first_name, last_name)   
            ),
            event(id, time, 
                play(id, name, author, description, year_of_release, duration_minutes, play_image),
                hall(id, name, number_of_seats)
            )
        `,
        )
        .eq("actor_id", actorId);

    if (data === undefined) return [];
    if (error !== null) {
        throw new Error(error.message);
    }

    return data.map(dataToCasting);
}

export async function dbAddCastings(
    addCastings: DbAddCasting[],
): Promise<void> {
    const { error } = await supabase.from("casting").insert(addCastings);

    if (error !== null) {
        console.error("add casting error", error);
        throw new Error(error.message);
    }
}
