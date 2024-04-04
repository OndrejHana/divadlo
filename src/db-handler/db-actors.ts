import {
    Actor,
    AddActorFormObject,
    Address,
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
            person(first_name, last_name, email, phone,
                address(city, street, house_number, zip_code)
            )
        `);

    console.log(data);
    console.log(error);
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
                email: actor.person.email,
                phone: actor.person.phone,
                address: {
                    id: actor.person.address.id,
                    city: actor.person.address.city,
                    street: actor.person.address.street,
                    houseNumber: actor.person.address.house_number,
                    zipCode: actor.person.address.zip_code,
                },
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
            person(id, first_name, last_name, email, phone,
                address(id, city, street, house_number, zip_code)
            )
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

    const actor = data[0];
    const person = actor.person[0];
    const address = person.address[0];

    const Actor: Actor = {
        id: actor.id,
        description: actor.description,
        person: {
            id: person.id,
            firstName: person.first_name,
            lastName: person.last_name,
            email: person.email,
            phone: person.phone,
            address: {
                id: address.id,
                city: address.city,
                street: address.street,
                houseNumber: address.house_number,
                zipCode: address.zip_code,
            },
        },
    };
    return Actor;
}

export async function dbAddActor(
    addActorData: AddActorFormObject,
): Promise<Actor> {
    const { data: addressData, error: addressError } = await supabase
        .from("address")
        .insert([
            {
                city: addActorData.city,
                street: addActorData.street,
                house_number: addActorData.houseNumber,
                zip_code: addActorData.zipCode,
            },
        ])
        .select();

    if (addressError !== null || addressData === null) {
        throw new Error("Actor address not added");
    }

    const address = addressData[0];

    const { data: personData, error: personError } = await supabase
        .from("person")
        .insert([
            {
                first_name: addActorData.firstName,
                last_name: addActorData.lastName,
                email: addActorData.email,
                phone: addActorData.phone,
                address_id: addressData[0].id,
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
            email: person.email,
            phone: person.phone,
            address: {
                id: address.id,
                city: address.city,
                street: address.street,
                houseNumber: address.house_number,
                zipCode: address.zip_code,
            },
        },
    };
}

export async function dbUpdateActor(
    updateFormData: UpdateActorFormObject,
): Promise<Actor> {
    const { data: addressData, error: addressError } = await supabase
        .from("address")
        .update({
            city: updateFormData.city,
            street: updateFormData.street,
            house_number: updateFormData.houseNumber,
            zip_code: updateFormData.zipCode,
        })
        .eq("id", updateFormData.addressId)
        .select();

    if (addressError !== null || addressData === null) {
        throw new Error(addressError.message);
    }

    const address = addressData[0];

    const { data: personData, error: personError } = await supabase
        .from("person")
        .update({
            first_name: updateFormData.firstName,
            last_name: updateFormData.lastName,
            email: updateFormData.email,
            phone: updateFormData.phone,
        })
        .eq("id", updateFormData.personId)
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
            email: person.email,
            phone: person.phone,
            address: {
                id: address.id,
                city: address.city,
                street: address.street,
                houseNumber: address.house_number,
                zipCode: address.zip_code,
            },
        },
    };
}

export async function dbDeleteActor(id: number): Promise<void> {
    const { data, error } = await supabase.from("actor").delete().eq("id", id);
    if (error !== null) {
        throw new Error(error.message);
    }
    return;
}
