import { z } from "zod";
import { ZAddress } from "./actor";

export const ZVisitor = z.object({
    id: z.number().positive(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.string(),
    phone: z.string().nullable(),
    user_id: z.string(),
    address: ZAddress.nullable(),
});

export const ZVisitorRegister = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string(),
    user_id: z.string(),
});

export type Visitor = z.infer<typeof ZVisitor>;
export type RegisterVisitor = z.infer<typeof ZVisitorRegister>;