import { AddHallFormObject, Hall, UpdateHallFormObject } from "@/types/hall";

export async function dbGetHalls(): Promise<Hall[]> {
    return [
        {
            id: 1,
            name: "Main Hall",
            numberOfSeats: 100,
        },
        {
            id: 2,
            name: "Small Hall",
            numberOfSeats: 50,
        },
        {
            id: 3,
            name: "VIP Hall",
            numberOfSeats: 20,
        },
    ];
}

export async function dbGetHall(id: number): Promise<Hall | undefined> {
    return {
        id: 1,
        name: "Main Hall",
        numberOfSeats: 100,
    };
}

export async function dbAddHall(addHallData: AddHallFormObject): Promise<Hall> {
    return {
        id: 1,
        name: addHallData.name,
        numberOfSeats: addHallData.numberOfSeats,
    };
}

export async function dbUpdateHall(
    updateHallData: UpdateHallFormObject,
): Promise<Hall> {
    return {
        id: updateHallData.id,
        name: updateHallData.name,
        numberOfSeats: updateHallData.numberOfSeats,
    };
}

export async function dbDeleteHall(id: number): Promise<void> {
    return;
}
