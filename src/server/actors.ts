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

export async function addActorAction(
    prevState: AddActorFormState,
    formData: FormData,
): Promise<AddActorFormState> {
    const data = ZAddActorFormObject.safeParse({
        name: formData.get("name") as string,
        surname: formData.get("surname") as string,
        birth: new Date(formData.get("birth") as string),
    });

    if (!data.success) {
        return {
            ...prevState,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const actorFormData = data.data;
    await dbAddActor(actorFormData);

    revalidatePath("/admin/actors");

    return {
        actor: undefined,
        message: "Herec byl vytvořen",
    };
}

export async function updateActorAction(
    prevState: UpdateActorFormState,
    formData: FormData,
): Promise<UpdateActorFormState> {
    const data = ZUpdateActorFormObject.safeParse({
        id: parseInt(formData.get("id") as string),
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        description: formData.get("description") as string,
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
    await dbUpdateActor(actorFormData);

    revalidatePath("/admin/actors");

    return {
        message: "Herec byl upraven",
    };
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
    await dbDeleteActor(actorFormData.id);

    revalidatePath("/admin/actors");

    return {
        message: "Herec byl smazán",
    };
}
