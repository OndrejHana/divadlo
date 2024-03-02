import { z } from "zod";
import { zPlay } from "./play";
import { zHall } from "./hall";

export const ZEvent = z.object({
    id: z.number().positive(),
    play: zPlay,
    hall: zHall,
    time: z.date(),
});

export const ZAddEventFormObject = z.object({
    playId: z.number().positive(),
    hallId: z.number().positive(),
    time: z.date(),
});

export const ZDeleteEventFormObject = z.object({
    id: z.number().positive(),
});

export type Event = z.infer<typeof ZEvent>;
export type AddEventFormObject = z.infer<typeof ZAddEventFormObject>;
export type DeleteEventFormObject = z.infer<typeof ZDeleteEventFormObject>;

export type AddEventFormState = {
    event?: AddEventFormObject;
    message: string;
};

export type DeleteEventFormState = {
    message: string;
};
