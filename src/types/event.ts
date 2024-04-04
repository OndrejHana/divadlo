import { z } from "zod";
import { ZPlay } from "./play";
import { ZHall } from "./hall";

export const ZEvent = z.object({
    id: z.number().positive(),
    play: ZPlay,
    hall: ZHall,
    time: z.date(),
});

export const ZAddEventFormObject = z.object({
    playId: ZEvent.shape.play.shape.id,
    hallId: ZEvent.shape.hall.shape.id,
    time: ZEvent.shape.time,
});

export const ZUpdateEventFormObject = z.object({
    id: ZEvent.shape.id,
    playId: ZEvent.shape.play.shape.id,
    hallId: ZEvent.shape.hall.shape.id,
    time: ZEvent.shape.time,
});

export const ZDeleteEventFormObject = z.object({
    id: ZEvent.shape.id,
});

export type Event = z.infer<typeof ZEvent>;
export type AddEventFormObject = z.infer<typeof ZAddEventFormObject>;
export type UpdateEventFormObject = z.infer<typeof ZUpdateEventFormObject>;
export type DeleteEventFormObject = z.infer<typeof ZDeleteEventFormObject>;

export type AddEventFormState = {
    event?: AddEventFormObject;
    message: string;
};

export type UpdateEventFormState = {
    event?: UpdateEventFormObject;
    message: string;
};

export type DeleteEventFormState = {
    event?: DeleteEventFormObject;
    message: string;
};
