"use server";

import { dbAddHall, dbDeleteHall, dbUpdateHall } from "@/db-handler/db-halls";
import {
    AddHallFormState,
    DeleteHallFormState,
    UpdateHallFormState,
    ZAddHallFormObject,
    ZDeleteHallFormObject,
    ZUpdateHallFormObject,
} from "@/types/hall";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addHallAction(
    prevState: AddHallFormState,
    formData: FormData,
): Promise<AddHallFormState> {
    const data = ZAddHallFormObject.safeParse({
        name: formData.get("hallName") as string,
        numberOfSeats: parseInt(formData.get("numberOfSeats") as string),
    });

    if (!data.success) {
        return {
            ...prevState,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const hallFormData = data.data;

    try {
        const newHall = await dbAddHall(hallFormData);
    } catch (e) {
        console.error(e);
        return {
            ...prevState,
            message: "Sál nemohl být přidán",
        };
    }

    revalidatePath("/admin/halls");
    redirect("/admin/halls");
}

export async function updateHallAction(
    prevState: UpdateHallFormState,
    formData: FormData,
): Promise<UpdateHallFormState> {
    const data = ZUpdateHallFormObject.safeParse({
        id: parseInt(formData.get("id") as string),
        name: formData.get("name") as string,
        numberOfSeats: parseInt(formData.get("numberOfSeats") as string),
    });

    if (!data.success) {
        return {
            ...prevState,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const hallFormData = data.data;
    const updatedHall = await dbUpdateHall(hallFormData);

    revalidatePath("/admin/halls");
    revalidatePath("/admin/events");
    revalidatePath(`/admin/halls/${updatedHall.id}`);

    return {
        hall: {
            id: updatedHall.id,
            name: updatedHall.name,
            numberOfSeats: updatedHall.numberOfSeats,
        },
        message: "Sál byl upraven",
    };
}

export async function deleteHallAction(
    prevState: DeleteHallFormState,
    formData: FormData,
): Promise<DeleteHallFormState> {
    const data = ZDeleteHallFormObject.safeParse({
        id: parseInt(formData.get("id") as string),
    });

    if (!data.success) {
        return {
            ...prevState.hall,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const hallFormData = data.data;
    try {
        await dbDeleteHall(hallFormData.id);

        revalidatePath("/admin/halls");
    } catch (error) {
        console.error(error);
        return {
            hall: prevState.hall,
            message:
                "Sál nemohl být smazán, protože je používán v některém z představení.",
        };
    }
    redirect("/admin/halls");
}
