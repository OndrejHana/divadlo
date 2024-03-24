import { z } from "zod";

export const ZPlay = z.object({
    id: z.number().positive(),
    name: z.string(),
    author: z.string(),
    description: z.string(),
    yearOfRelease: z.number().positive(),
});

export const ZAddPlayFormObject = z.object({
    name: ZPlay.shape.name,
    author: ZPlay.shape.author,
    description: ZPlay.shape.description,
    yearOfRelease: ZPlay.shape.yearOfRelease,
});

export const ZUpdatePlayFormObject = z.object({
    id: ZPlay.shape.id,
    name: ZPlay.shape.name,
    author: ZPlay.shape.author,
    description: ZPlay.shape.description,
    yearOfRelease: ZPlay.shape.yearOfRelease,
});

export const ZDeletePlayFormObject = z.object({
    id: ZPlay.shape.id,
});

export type Play = z.infer<typeof ZPlay>;
export type AddPlayFormObject = z.infer<typeof ZAddPlayFormObject>;
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
    message: string;
};
