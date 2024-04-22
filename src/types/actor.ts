import { z } from "zod";
import { File } from "buffer";

export const ZAddress = z.object({
    id: z.number().positive(),
    city: z.string(),
    street: z.string(),
    houseNumber: z.number(),
    zipCode: z.string(),
});

export const ZPerson = z.object({
    id: z.number().positive(),
    firstName: z.string(),
    lastName: z.string(),
});

export const ZActor = z.object({
    id: z.number().positive(),
    description: z.string(),
    actorImage: z.string().url().nullable(),
    person: ZPerson,
});

export const ZAddActorFormObject = z.object({
    description: ZActor.shape.description,
    firstName: ZActor.shape.person.shape.firstName,
    lastName: ZActor.shape.person.shape.lastName,
    actorImage: z.instanceof(File).optional(),
});

export const ZDbAddActorObject = z.object({
    description: ZActor.shape.description,
    firstName: ZActor.shape.person.shape.firstName,
    lastName: ZActor.shape.person.shape.lastName,
    actorImage: ZActor.shape.actorImage
});

export const ZUpdateActorFormObject = z.object({
    id: ZActor.shape.id,
    description: ZActor.shape.description,
    firstName: ZActor.shape.person.shape.firstName,
    lastName: ZActor.shape.person.shape.lastName,
    actorImage: ZActor.shape.actorImage,
});

export const ZDeleteActorFormObject = z.object({
    id: ZActor.shape.id,
});

export type Address = z.infer<typeof ZAddress>;
export type Actor = z.infer<typeof ZActor>;
export type Person = z.infer<typeof ZPerson>;
export type AddActorFormObject = z.infer<typeof ZAddActorFormObject>;
export type DbAddActorObject = z.infer<typeof ZDbAddActorObject>;
export type DeleteActorFormObject = z.infer<typeof ZDeleteActorFormObject>;
export type UpdateActorFormObject = z.infer<typeof ZUpdateActorFormObject>;

export type AddActorFormState = {
    actor?: AddActorFormObject;
    message: string;
};

export type DeleteActorFormState = {
    actorId?: DeleteActorFormObject;
    message: string;
};

export type UpdateActorFormState = {
    actor?: UpdateActorFormObject;
    message: string;
};
