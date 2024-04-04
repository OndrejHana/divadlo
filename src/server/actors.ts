"use server";

import {
    dbAddActor,
    dbDeleteActor,
    dbUpdateActor,
} from "@/db-handler/db-actors";
import {
    AddActorFormState,
    DeleteActorFormState,
    UpdateActorFormState,
    ZAddActorFormObject,
    ZDeleteActorFormObject,
    ZUpdateActorFormObject,
} from "@/types/actor";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addActorAction(
    prevState: AddActorFormState,
    formData: FormData,
): Promise<AddActorFormState> {
    const data = ZAddActorFormObject.safeParse({
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        description: formData.get("description") as string,
        city: formData.get("city") as string,
        street: formData.get("street") as string,
        houseNumber: parseInt(formData.get("houseNumber") as string),
        zipCode: formData.get("zipCode") as string,
    });

    if (!data.success) {
        return {
            ...prevState,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const actorFormData = data.data;
    try {
        await dbAddActor(actorFormData);
    } catch (error) {
        console.log(error);
        return {
            message: "Nepodařilo se přidat herce",
        };
    }

    revalidatePath("/admin/actors");
    redirect("/admin/actors");
}

export async function updateActorAction(
    prevState: UpdateActorFormState,
    formData: FormData,
): Promise<UpdateActorFormState> {
    const data = ZUpdateActorFormObject.safeParse({
        id: parseInt(formData.get("id") as string),
        description: formData.get("description") as string,
        personId: parseInt(formData.get("personId") as string),
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        addressId: parseInt(formData.get("addressId") as string),
        city: formData.get("city") as string,
        street: formData.get("street") as string,
        houseNumber: parseInt(formData.get("houseNumber") as string),
        zipCode: formData.get("zipCode") as string,
    });

    if (!data.success) {
        return {
            ...prevState,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const actorFormData = data.data;
    try {
        const actor = await dbUpdateActor(actorFormData);

        revalidatePath("/admin/actors");
        revalidatePath(`/admin/actors/${actorFormData.id}`);

        return {
            actor: {
                id: actor.id,
                description: actor.description,
                personId: actor.person.id,
                firstName: actor.person.firstName,
                lastName: actor.person.lastName,
                email: actor.person.email,
                phone: actor.person.phone,
                addressId: actor.person.address.id,
                city: actor.person.address.city,
                street: actor.person.address.street,
                houseNumber: actor.person.address.houseNumber,
                zipCode: actor.person.address.zipCode,
            },
            message: "Herec byl upraven",
        };
    } catch (error) {
        console.log(error);
        return {
            message: "Nepodařilo se upravit herce",
        };
    }
}

export async function deleteActorAction(
    prevState: DeleteActorFormState,
    formData: FormData,
): Promise<DeleteActorFormState> {
    const data = ZDeleteActorFormObject.safeParse({
        id: parseInt(formData.get("id") as string),
    });

    if (!data.success) {
        return {
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const actorFormData = data.data;
    try {
        await dbDeleteActor(actorFormData.id);
        revalidatePath("/admin/actors");
    } catch (error) {
        console.log(error);
        return {
            message: "Nepodařilo se smazat herce, na herce se odkazuje",
        };
    }
    redirect("/admin/actors");
}
