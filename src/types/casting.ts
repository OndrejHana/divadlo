import { z } from "zod";
import { ZActor } from "./actor";
import { ZEvent } from "./event";

export const ZCasting = z.object({
    id: z.number().positive(),
    character: z.string(),
    actor: ZActor,
    event: ZEvent,
});

export const ZAddCasting = z.object({
    character: ZCasting.shape.character,
    actorId: ZActor.shape.id,
});

export const ZDbAddCasting = z.object({
    character: ZCasting.shape.character,
    actor_id: ZActor.shape.id,
    event_id: ZEvent.shape.id,
});

export type Casting = z.infer<typeof ZCasting>;
export type AddCasting = z.infer<typeof ZAddCasting>;
export type DbAddCasting = z.infer<typeof ZDbAddCasting>;
