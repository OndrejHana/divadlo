import { Casting } from "@/types/casting";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or key is missing.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

function dataToCasting(data: any): Casting {
    return {
        id: data.id,
        character: data.character,
        actor: {
            id: data.actor.id,
            description: data.actor.description,
            person: {
                id: data.actor.person.id,
                firstName: data.actor.person.first_name,
                lastName: data.actor.person.last_name,
                email: data.actor.person.email,
                phone: data.actor.person.phone,
                address: {
                    id: data.actor.person.address.id,
                    city: data.actor.person.address.city,
                    street: data.actor.person.address.street,
                    houseNumber: data.actor.person.address.house_number,
                    zipCode: data.actor.person.address.zip_code,
                },
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
            actor(id, description, 
                person(id, first_name, last_name, email, phone, 
                    address(id, city, street, house_number, zip_code)
                )   
            ),
            event(id, time, 
                play(id, name, author, description, year_of_release),
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
                person(id, first_name, last_name, email, phone, 
                    address(id, city, street, house_number, zip_code)
                )   
            ),
            event(id, time, 
                play(id, name, author, description, year_of_release),
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
