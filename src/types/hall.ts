import { z } from "zod";

export const zHall = z.object({
    id: z.number().positive(),
    name: z.string(),
    numberOfSeats: z.number().positive(),
});

export type Hall = z.infer<typeof zHall>;
