import { z } from "zod";
import { ZActor } from "./actor";
import { ZEvent } from "./event";

export const ZCasting = z.object({
    id: z.number().positive(),
    character: z.string(),
    actor: ZActor,
    event: ZEvent,
});

export type Casting = z.infer<typeof ZCasting>;
