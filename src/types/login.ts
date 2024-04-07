import { z } from "zod";

export const ZCredentials = z.object({
    email: z.string(),
    password: z.string()
});

export const ZLoginFormObject = z.object({
    email: ZCredentials.shape.email,
    password: ZCredentials.shape.password,
});

export type LoginUserFormState = {
    user?: LoginUserFormObject;
    message: string;
};

export type LoginUserFormObject = z.infer<typeof ZLoginFormObject>;
export type Credentials = z.infer<typeof ZCredentials>;
export type LoginFormObject = z.infer<typeof ZLoginFormObject>;