import { Session, User } from "@supabase/supabase-js";
import { z } from "zod";
import { Visitor } from "./visitor";

export const ZCredentials = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string(),
    password: z.string(),
});

export const ZRegisterUserFormObject = z.object({
    firstname: ZCredentials.shape.firstname,
    lastname: ZCredentials.shape.lastname,
    email: ZCredentials.shape.email,
    password: ZCredentials.shape.password,
});

export type RegisterUserFormState = {
    user?: RegisterUserFormState;
    message: string;
};

export type RegisterCredentials = z.infer<typeof ZCredentials>;
export type RegisterUserFormObject = z.infer<typeof ZRegisterUserFormObject>;

export type AuthResponse = {
    user: User;
    visitor: Visitor;
    session: Session;
};
