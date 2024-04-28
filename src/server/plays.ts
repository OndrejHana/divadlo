"use server";

import { File } from "buffer";

import {
    dbAddPlay,
    dbDeletePlay,
    dbUpdatePlay,
    uploadPlayImage,
} from "@/db-handler/db-plays";
import { ZDeleteEventFormObject } from "@/types/event";
import {
    AddPlayFormState,
    DeletePlayFormState,
    UpdatePlayFormState,
    ZAddPlayFormObject,
    ZUpdatePlayFormObject,
} from "@/types/play";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addPlayAction(
    prevState: AddPlayFormState,
    formData: FormData,
): Promise<AddPlayFormState> {
    const obj: any = {
        name: formData.get("name") as string,
        author: formData.get("author") as string,
        description: formData.get("description") as string,
        yearOfRelease: parseInt(formData.get("yearOfRelease") as string),
        durationMinutes: parseInt(formData.get("durationMinutes") as string),
    };

    if (formData.get("hasImage") === "true") {
        const file: File = formData.get("playImage") as unknown as File;
        obj["playImage"] = file;
    }

    const data = ZAddPlayFormObject.safeParse(obj);

    if (!data.success) {
        return {
            ...prevState,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const playFormData = data.data;
    try {
        let imageUrl = null;
        if (playFormData.playImage) {
            imageUrl = await uploadPlayImage(
                `play-${playFormData.playImage.name}`,
                playFormData.playImage,
            );
        }

        const newPlay = await dbAddPlay({
            name: playFormData.name,
            author: playFormData.author,
            description: playFormData.description,
            yearOfRelease: playFormData.yearOfRelease,
            durationMinutes: playFormData.durationMinutes,
            playImage: imageUrl,
        });
        revalidatePath("/admin/plays");
    } catch (e) {
        console.error(e);
        return {
            ...prevState,
            message: "Hra nemohla být přidána",
        };
    }
    redirect("/admin/plays");
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
        durationMinutes: parseInt(formData.get("durationMinutes") as string),
        playImage: formData.get("playImage") as string ?? undefined,
    });

    if (!data.success) {
        return {
            ...prevState,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const playFormData = data.data;
    try {
        const updatedPlay = await dbUpdatePlay(playFormData);
        revalidatePath("/admin/plays");
        revalidatePath(`/admin/plays/${updatedPlay.id}`);

        return {
            play: {
                id: updatedPlay.id,
                name: updatedPlay.name,
                durationMinutes: updatedPlay.durationMinutes,
                playImage: updatedPlay.playImage ?? undefined,
                yearOfRelease: updatedPlay.yearOfRelease,
                description: updatedPlay.description,
                author: updatedPlay.author,
            },
            message: "Hra byla upravena",
        };
    } catch (e) {
        console.error(e);
        return {
            ...prevState,
            message: "Hra nemohla být upravena",
        };
    }
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
            play: prevState.play,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const { id } = data.data;
    try {
        await dbDeletePlay(id);

        revalidatePath("/admin/plays");
    } catch (e) {
        console.error(e);
        return {
            play: prevState.play,
            message:
                "Hra nemohla být smazána, protože je použita v nějaké události.",
        };
    }
    redirect("/admin/plays");
}
