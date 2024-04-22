"use server";

import {
    dbAddActor,
    dbDeleteActor,
    dbUpdateActor,
    uploadActorImage,
} from "@/db-handler/db-actors";
import { getCookie } from "@/lib/cookies";
import {
    AddActorFormState,
    DeleteActorFormState,
    UpdateActorFormState,
    ZAddActorFormObject,
    ZDeleteActorFormObject,
    ZUpdateActorFormObject,
} from "@/types/actor";
import { redirect } from "next/navigation";

export async function addActorAction(
    prevState: AddActorFormState,
    formData: FormData,
): Promise<AddActorFormState> {
    const session = await getCookie();

    if (
        !session.session ||
        !session.isLoggedIn ||
        !session.visitor ||
        session.visitor.role !== "Admin"
    ) {
        return {
            message: "Nemáte oprávnění přidat herce",
        };
    }

    const obj: any = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        description: formData.get("description") as string,
    };

    if (formData.get("hasImage") === "true") {
        const file: File = formData.get("actorImage") as File;
        obj["actorImage"] = file;
    }

    const data = ZAddActorFormObject.safeParse(obj);
    if (!data.success) {
        return {
            ...prevState,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const actorFormData = data.data;

    try {
        let imageUrl = null;
        if (actorFormData.actorImage) {
            imageUrl = await uploadActorImage(
                `actor-${actorFormData.firstName}-${actorFormData.lastName}`,
                actorFormData.actorImage,
            );
        }
        await dbAddActor(session.session, {
            firstName: actorFormData.firstName,
            lastName: actorFormData.lastName,
            description: actorFormData.description,
            actorImage: imageUrl,
        });
    } catch (error) {
        console.error(error);
        return {
            message: "Nepodařilo se přidat herce",
        };
    }

    redirect("/admin/actors");
}

export async function updateActorAction(
    prevState: UpdateActorFormState,
    formData: FormData,
): Promise<UpdateActorFormState> {
    const session = await getCookie();

    if (
        !session.session ||
        !session.isLoggedIn ||
        !session.visitor ||
        session.visitor.role !== "Admin"
    ) {
        return {
            message: "Nemáte oprávnění přidat herce",
        };
    }

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
        const actor = await dbUpdateActor(session.session, actorFormData);

        return {
            actor: {
                id: actor.id,
                description: actor.description,
                actorImage: actor.actorImage,
                firstName: actor.person.firstName,
                lastName: actor.person.lastName,
            },
            message: "Herec byl upraven",
        };
    } catch (error) {
        console.error(error);
        return {
            message: "Nepodařilo se upravit herce",
        };
    }
}

export async function deleteActorAction(
    _prevState: DeleteActorFormState,
    formData: FormData,
): Promise<DeleteActorFormState> {
    const session = await getCookie();

    if (
        !session.session ||
        !session.isLoggedIn ||
        !session.visitor ||
        session.visitor.role !== "Admin"
    ) {
        return {
            message: "Nemáte oprávnění přidat herce",
        };
    }

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
        await dbDeleteActor(session.session, actorFormData.id);
    } catch (error) {
        console.error(error);
        return {
            message: "Nepodařilo se smazat herce, na herce se odkazuje",
        };
    }
    redirect("/admin/actors");
}
