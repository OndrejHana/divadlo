"use server";

import { dbAddHall, dbDeleteHall } from "@/db-handler/db-halls";
import {
    AddHallFormState,
    DeleteHallFormState,
    ZAddHallFormObject,
    ZDeleteHallFormObject,
} from "@/types/hall";
import { revalidatePath } from "next/cache";

export async function addHallAction(
    prevState: AddHallFormState,
    formData: FormData,
): Promise<AddHallFormState> {
    const data = ZAddHallFormObject.safeParse({
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
    const newHall = await dbAddHall(hallFormData);

    return {
        hall: newHall,
        message: "Hala byla vytvořena",
    };
}

export async function deleteHallAction(
    prevState: DeleteHallFormState,
    formData: FormData,
): Promise<AddHallFormState> {
    const data = ZDeleteHallFormObject.safeParse({
        id: parseInt(formData.get("id") as string),
    });

    if (!data.success) {
        return {
            ...prevState,
            message: data.error.errors.map((e) => e.message).join(", "),
        };
    }

    const hallFormData = data.data;
    await dbDeleteHall(hallFormData.id);

    revalidatePath("/admin/halls");

    return {
        message: "Hala byla smazána",
    };
}

export async function updateHallAction(
    prevState: AddHallFormState,
    formData: FormData,
): Promise<AddHallFormState> {
    const data = ZAddHallFormObject.safeParse({
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
    const newHall = await dbAddHall(hallFormData);

    revalidatePath("/admin/halls");

    return {
        hall: newHall,
        message: "Hala byla vytvořena",
    };
}
