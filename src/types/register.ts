import { z } from "zod";

export const ZCredentials = z.object({
    email: z.string(),
    password: z.string()
});

export const ZRegisterUserFormObject = z.object({
    email: ZCredentials.shape.email,
    password: ZCredentials.shape.password,
});

export type RegisterUserFormState = {
    user?: RegisterUserFormState;
    message: string;
};

export type RegisterCredentials = z.infer<typeof ZCredentials>;
export type RegisterUserFormObject = z.infer<typeof ZRegisterUserFormObject>;