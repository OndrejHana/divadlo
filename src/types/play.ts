import { z } from "zod";
import { File } from "buffer";

export const ZPlay = z.object({
    id: z.number().positive(),
    name: z.string(),
    author: z.string(),
    description: z.string(),
    yearOfRelease: z.number().positive(),
    durationMinutes: z.number().positive(),
    playImage: z.string().url().nullable(),
});

export const ZAddPlayFormObject = z.object({
    name: ZPlay.shape.name,
    author: ZPlay.shape.author,
    description: ZPlay.shape.description,
    yearOfRelease: ZPlay.shape.yearOfRelease,
    durationMinutes: ZPlay.shape.durationMinutes,
    playImage: z.instanceof(File).optional(),
});

export const ZUpdatePlayFormObject = z.object({
    id: ZPlay.shape.id,
    name: ZPlay.shape.name,
    author: ZPlay.shape.author,
    description: ZPlay.shape.description,
    yearOfRelease: ZPlay.shape.yearOfRelease,
    durationMinutes: ZPlay.shape.durationMinutes,
    playImage: z.string().url().optional(),
});

export const ZDbAddPlayFormObject = z.object({
    name: ZPlay.shape.name,
    author: ZPlay.shape.author,
    description: ZPlay.shape.description,
    yearOfRelease: ZPlay.shape.yearOfRelease,
    durationMinutes: ZPlay.shape.durationMinutes,
    playImage: ZPlay.shape.playImage,
});

export const ZDeletePlayFormObject = z.object({
    id: ZPlay.shape.id,
});

export type Play = z.infer<typeof ZPlay>;
export type AddPlayFormObject = z.infer<typeof ZAddPlayFormObject>;
export type DbAddPlayFormObject = z.infer<typeof ZDbAddPlayFormObject>;
export type UpdatePlayFormObject = z.infer<typeof ZUpdatePlayFormObject>;
export type DeletePlayFormObject = z.infer<typeof ZDeletePlayFormObject>;

export type AddPlayFormState = {
    play?: AddPlayFormObject;
    message: string;
};

export type UpdatePlayFormState = {
    play?: UpdatePlayFormObject;
    message: string;
};

export type DeletePlayFormState = {
    play: DeletePlayFormObject;
    message: string;
};
