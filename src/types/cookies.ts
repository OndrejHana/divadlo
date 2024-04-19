import { Session } from "@supabase/supabase-js";
import { Visitor } from "./visitor";

export type UserSessionData = {
    session: Session | null;
    visitor: Visitor | null;
    isLoggedIn: boolean;
};
