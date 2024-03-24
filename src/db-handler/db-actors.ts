import {
    Actor,
    AddActorFormObject,
    UpdateActorFormObject,
} from "@/types/actor";

export async function dbGetActors(): Promise<Actor[]> {
    return [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            description: "Actor",
            email: "johndoe@actor.com",
            phone: "123456789",
            address: {
                id: 1,
                city: "Los Angeles",
                street: "Hollywood",
                houseNumber: 1,
                zipCode: "12345",
            },
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Doe",
            description: "Actress",
            email: "janedoe@actor.com",
            phone: "987654321",
            address: {
                id: 2,
                city: "Los Angeles",
                street: "Hollywood",
                houseNumber: 2,
                zipCode: "12345",
            },
        },
    ];
}

export async function dbGetActor(id: number): Promise<Actor | undefined> {
    return {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        description: "Actor",
        email: "johndoe@gmail.com",
        phone: "123456789",
        address: {
            id: 1,
            city: "Los Angeles",
            street: "Hollywood",
            houseNumber: 1,
            zipCode: "12345",
        },
    };
}

export async function dbAddActor(
    addActorData: AddActorFormObject,
): Promise<Actor> {
    return {
        id: 1,
        firstName: addActorData.firstName,
        lastName: addActorData.lastName,
        description: addActorData.description,
        email: addActorData.email,
        phone: addActorData.phone,
        address: {
            id: 1,
            city: addActorData.city,
            street: addActorData.street,
            houseNumber: addActorData.houseNumber,
            zipCode: addActorData.zipCode,
        },
    };
}

export async function dbUpdateActor(
    updateFormData: UpdateActorFormObject,
): Promise<Actor> {
    return {
        id: updateFormData.id,
        firstName: updateFormData.firstName,
        lastName: updateFormData.lastName,
        description: updateFormData.description,
        email: updateFormData.email,
        phone: updateFormData.phone,
        address: {
            id: updateFormData.addressId,
            city: updateFormData.city,
            street: updateFormData.street,
            houseNumber: updateFormData.houseNumber,
            zipCode: updateFormData.zipCode,
        },
    };
}

export async function dbDeleteActor(id: number): Promise<void> {
    return;
}
