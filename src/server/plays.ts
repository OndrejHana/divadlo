"use server";

import { dbAddPlay, dbDeletePlay, dbUpdatePlay } from "@/db-handler/db-plays";
import { ZDeleteEventFormObject } from "@/types/event";
import {
    AddPlayFormState,
    DeletePlayFormState,
    UpdatePlayFormState,
    ZAddPlayFormObject,
    ZUpdatePlayFormObject,
} from "@/types/play";
import { revalidatePath } from "next/cache";

export async function addPlayAction(
    prevState: AddPlayFormState,
    formData: FormData,
): Promise<AddPlayFormState> {
    const data = ZAddPlayFormObject.safeParse({
        name: formData.get("name") as string,
        author: formData.get("author") as string,
        description: formData.get("description") as string,
        yearOfRelease: parseInt(formData.get("yearOfRelease") as string),
    });

    if (!data.success) {
        return {
            ...prevState,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const playFormData = data.data;
    const newPlay = await dbAddPlay(playFormData);

    revalidatePath("/admin/plays");

    return {
        play: newPlay,
        message: "Hra byla vytvořena",
    };
}

export async function updatePlayAction(
    prevState: UpdatePlayFormState,
    formData: FormData,
): Promise<UpdatePlayFormState> {
    const data = ZUpdatePlayFormObject.safeParse({
        id: parseInt(formData.get("id") as string),
        name: formData.get("name") as string,
        author: formData.get("author") as string,
        description: formData.get("description") as string,
        yearOfRelease: parseInt(formData.get("yearOfRelease") as string),
    });

    if (!data.success) {
        return {
            ...prevState,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const playFormData = data.data;
    const updatedPlay = await dbUpdatePlay(playFormData);

    revalidatePath("/admin/plays");

    return {
        play: updatedPlay,
        message: "Hra byla upravena",
    };
}

export async function deletePlayAction(
    prevState: DeletePlayFormState,
    formData: FormData,
): Promise<DeletePlayFormState> {
    const data = ZDeleteEventFormObject.safeParse({
        id: parseInt(formData.get("id") as string),
    });

    if (!data.success) {
        return {
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const { id } = data.data;
    await dbDeletePlay(id);

    revalidatePath("/admin/plays");

    return {
        message: "Hra byla smazána",
    };
}
