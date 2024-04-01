import {
    Actor,
    AddActorFormObject,
    UpdateActorFormObject,
} from "@/types/actor";

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function dbGetActors(): Promise<Actor[]> {
    const { data, error } = await supabase
        .from('actor')
        .select(`
            id, 
            description,
            person(first_name, last_name, email, phone,
                address(city, street, house_number, zip_code)
            )
        `);

    console.log(data);
    console.log(error);
    if(error !== null) { throw new Error(error);}
    if(data === null || data === undefined) { throw new Error("Error getting actors");}

    const actors: Actor[] = data?.map((actor: any) => {
        const Actor: Actor = {
            id: actor.id,
            firstName: actor.person.first_name,
            lastName: actor.person.last_name,
            description: actor.description,
            email: actor.person.email,
            phone: actor.person.phone,
            address: {
                id: actor.person.address.id,
                city: actor.person.address.city,
                street: actor.person.address.street,
                houseNumber: actor.person.address.house_number,
                zipCode: actor.person.address.zip_code,
            }
        }
        return Actor
    }) 
    return actors
}


export async function dbGetActor(id: number): Promise<Actor | undefined> {
    const { data, error } = await supabase
        .from('actor')
        .select(`
            id, 
            description,
            person(first_name, last_name, email, phone,
                address(city, street, house_number, zip_code)
            )
        `)
        .eq('id', id)
        .limit(1);
            
    if(data === null || data.length != 1) { return undefined;}
    if(error !== null) { throw new Error("Error getting actor");}

    const actor = data[0];
    return {
        id: actor.id,
        firstName: actor.person.first_name,
        lastName: actor.person.last_name,
        description: actor.description,
        email: actor.person.email,
        phone: actor.person.phone,
        address: {
            id: actor.person.address.id,
            city: actor.person.address.city,
            street: actor.person.address.street,
            houseNumber: actor.person.address.house_number,
            zipCode: actor.person.address.zip_code,
        }
    };
}

export async function dbAddActor(
    addActorData: AddActorFormObject,
): Promise<Actor> {
    const { data, error } = await supabase
        .from('actor')
        .insert([
            {
                description: addActorData.description,
                person: {
                    first_name: addActorData.firstName,
                    last_name: addActorData.lastName,
                    email: addActorData.email,
                    phone: addActorData.phone,
                    address: {
                        city: addActorData.city,
                        street: addActorData.street,
                        house_number: addActorData.houseNumber,
                        zip_code: addActorData.zipCode,
                    }
                }
            }
        ])
        .select();

    if(error !== null || data === null) { throw new Error("Actor not added");}

    const actor = data[0];
    return {
        id: actor.id,
        firstName: actor.person.first_name,
        lastName: actor.person.last_name,
        description: actor.description,
        email: actor.person.email,
        phone: actor.person.phone,
        address: {
            id: actor.person.address.id,
            city: actor.person.address.city,
            street: actor.person.address.street,
            houseNumber: actor.person.address.house_number,
            zipCode: actor.person.address.zip_code,
        }
    };
}

export async function dbUpdateActor(
    updateFormData: UpdateActorFormObject,
): Promise<Actor> {
    const { data, error } = await supabase
        .from('actor')
        .update({
            description: updateFormData.description,
            person: {
                first_name: updateFormData.firstName,
                last_name: updateFormData.lastName,
                email: updateFormData.email,
                phone: updateFormData.phone,
                address: {
                    city: updateFormData.city,
                    street: updateFormData.street,
                    house_number: updateFormData.houseNumber,
                    zip_code: updateFormData.zipCode,
                }
            }
        })
        .eq('id', updateFormData.id)
        .select();

    if(error !== null || data === null) { throw new Error("Actor not updated");}

    const actor = data[0];
    return {
        id: actor.id,
        firstName: actor.person.first_name,
        lastName: actor.person.last_name,
        description: actor.description,
        email: actor.person.email,
        phone: actor.person.phone,
        address: {
            id: actor.person.address.id,
            city: actor.person.address.city,
            street: actor.person.address.street,
            houseNumber: actor.person.address.house_number,
            zipCode: actor.person.address.zip_code,
        }
    };
}

export async function dbDeleteActor(id: number): Promise<void> {
    const { data, error } = await supabase
        .from('actor')
        .delete()
        .eq('id', id)
        .select();

    if(error !== null || data === null) { throw new Error("Actor not deleted");}
    return;
}
