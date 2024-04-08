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
        description: formData.get("description") as string,
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
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
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
                firstName: actor.person.firstName,
                lastName: actor.person.lastName,
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
