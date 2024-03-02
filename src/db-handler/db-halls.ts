import { Hall } from "@/types/hall";

export async function getHalls(): Promise<Hall[]> {
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
