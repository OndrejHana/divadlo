import { z } from "zod";

export const ZHall = z.object({
    id: z.number().positive(),
    name: z.string(),
    numberOfSeats: z.number().positive(),
});

export const ZAddHallFormObject = z.object({
    name: ZHall.shape.name,
    numberOfSeats: ZHall.shape.numberOfSeats,
});

export const ZDeleteHallFormObject = z.object({
    id: ZHall.shape.id,
});

export const ZUpdateHallFormObject = z.object({
    id: ZHall.shape.id,
    name: ZHall.shape.name,
    numberOfSeats: ZHall.shape.numberOfSeats,
});

export type Hall = z.infer<typeof ZHall>;
export type AddHallFormObject = z.infer<typeof ZAddHallFormObject>;
export type DeleteHallFormObject = z.infer<typeof ZDeleteHallFormObject>;
export type UpdateHallFormObject = z.infer<typeof ZUpdateHallFormObject>;

export type AddHallFormState = {
    hall?: AddHallFormObject;
    message: string;
};

export type DeleteHallFormState = {
    hall?: DeleteHallFormObject;
    message: string;
};

export type UpdateHallFormState = {
    hall?: UpdateHallFormObject;
    message: string;
};
