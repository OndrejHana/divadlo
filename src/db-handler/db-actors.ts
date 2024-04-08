import {
    Actor,
    AddActorFormObject,
    UpdateActorFormObject,
} from "@/types/actor";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function dbGetActors(): Promise<Actor[]> {
    const { data, error } = await supabase.from("actor").select(`
        id,
        description,
        person(id, first_name, last_name)`);

    if (error !== null) {
        throw new Error(error.message);
    }
    if (data === null || data === undefined) {
        throw new Error("Error getting actors");
    }

    const actors: Actor[] = data?.map((actor: any) => {
        const Actor: Actor = {
            id: actor.id,
            description: actor.description,
            person: {
                id: actor.person.id,
                firstName: actor.person.first_name,
                lastName: actor.person.last_name,
            },
        };
        return Actor;
    });
    return actors;
}

export async function dbGetActor(id: number): Promise<Actor | undefined> {
    const { data, error } = await supabase
        .from("actor")
        .select(
            `
            id, 
            description,
            person(id, first_name, last_name)
        `,
        )
        .eq("id", id)
        .limit(1);

    if (data === undefined) {
        return undefined;
    }
    if (data === null || data.length != 1) {
        return undefined;
    }
    if (error !== null) {
        throw new Error(error);
    }

    const actor: any = data[0];
    const Actor: Actor = {
        id: actor.id,
        description: actor.description,
        person: {
            id: actor.person.id,
            firstName: actor.person.first_name,
            lastName: actor.person.last_name,
        },
    };

    return Actor;
}

export async function dbAddActor(
    addActorData: AddActorFormObject,
): Promise<Actor> {
    const { data: personData, error: personError } = await supabase
        .from("person")
        .insert([
            {
                first_name: addActorData.firstName,
                last_name: addActorData.lastName,
            },
        ])
        .select();

    if (personError !== null || personData === null) {
        throw new Error("Actor person not added");
    }

    const person = personData[0];

    const { data, error } = await supabase
        .from("actor")
        .insert([
            {
                description: addActorData.description,
                person_id: person.id,
            },
        ])
        .select();

    if (error !== null || data === null) {
        throw new Error("Actor not added");
    }

    const actor = data[0];

    return {
        id: actor.id,
        description: actor.description,
        person: {
            id: person.id,
            firstName: person.first_name,
            lastName: person.last_name,
        },
    };
}

export async function dbUpdateActor(
    updateFormData: UpdateActorFormObject,
): Promise<Actor> {
    const { data: personData, error: personError } = await supabase
        .from("person")
        .update({
            first_name: updateFormData.firstName,
            last_name: updateFormData.lastName,
        })
        .eq("id", updateFormData.id)
        .select();

    if (personError !== null || personData === null) {
        throw new Error(personError.message);
    }

    const person = personData[0];

    const { data, error } = await supabase
        .from("actor")
        .update({
            description: updateFormData.description,
        })
        .eq("id", updateFormData.id)
        .select();

    if (error !== null || data === null) {
        throw new Error(error.message);
    }

    const actor = data[0];

    return {
        id: actor.id,
        description: actor.description,
        person: {
            id: person.id,
            firstName: person.first_name,
            lastName: person.last_name,
        },
    };
}

export async function dbDeleteActor(id: number): Promise<void> {
    const { data, error } = await supabase
        .from("actor")
        .delete()
        .eq("id", id)
        .select();
    if (error !== null) {
        throw new Error(error.message);
    }

    const actor = data[0];

    const { data: personData, error: personError } = await supabase
        .from("person")
        .delete()
        .eq("id", actor.person_id)
        .select();

    if (personError !== null || personData === null) {
        throw new Error(personError.message);
    }

    const person = personData[0];

    const { data: addressData, error: addressError } = await supabase
        .from("address")
        .delete()
        .eq("id", person.address_id)
        .select();

    if (addressError !== null || addressData === null) {
        throw new Error(addressError.message);
    }

    return;
}
