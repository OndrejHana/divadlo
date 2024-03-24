import { z } from "zod";

export const ZAddress = z.object({
    id: z.number().positive(),
    city: z.string(),
    street: z.string(),
    houseNumber: z.number(),
    zipCode: z.string(),
});

export const ZActor = z.object({
    id: z.number().positive(),
    firstName: z.string(),
    lastName: z.string(),
    description: z.string(),
    email: z.string().email(),
    phone: z.string().length(9),
    address: ZAddress,
});

export const ZAddActorFormObject = z.object({
    firstName: ZActor.shape.firstName,
    lastName: ZActor.shape.lastName,
    description: ZActor.shape.description,
    email: ZActor.shape.email,
    phone: ZActor.shape.phone,
    city: ZAddress.shape.city,
    street: ZAddress.shape.street,
    houseNumber: ZAddress.shape.houseNumber,
    zipCode: ZAddress.shape.zipCode,
});

export const ZUpdateActorFormObject = z.object({
    id: ZActor.shape.id,
    firstName: ZActor.shape.firstName,
    lastName: ZActor.shape.lastName,
    description: ZActor.shape.description,
    email: ZActor.shape.email,
    phone: ZActor.shape.phone,
    addressId: ZAddress.shape.id,
    city: ZAddress.shape.city,
    street: ZAddress.shape.street,
    houseNumber: ZAddress.shape.houseNumber,
    zipCode: ZAddress.shape.zipCode,
});

export const ZDeleteActorFormObject = z.object({
    id: ZActor.shape.id,
});

export type Address = z.infer<typeof ZAddress>;
export type Actor = z.infer<typeof ZActor>;
export type AddActorFormObject = z.infer<typeof ZAddActorFormObject>;
export type DeleteActorFormObject = z.infer<typeof ZDeleteActorFormObject>;
export type UpdateActorFormObject = z.infer<typeof ZUpdateActorFormObject>;

export type AddActorFormState = {
    actor?: AddActorFormObject;
    message: string;
};

export type DeleteActorFormState = {
    message: string;
};

export type UpdateActorFormState = {
    actor?: UpdateActorFormObject;
    message: string;
};
