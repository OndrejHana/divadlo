import { z } from "zod";

export const zPlay = z.object({
    id: z.number().positive(),
    name: z.string(),
    author: z.string(),
    description: z.string(),
    yearOfRelease: z.number().positive(),
});

export type Play = z.infer<typeof zPlay>;
