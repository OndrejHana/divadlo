import { AuthSessionOptions } from "@/lib/utils";
import { UserSessionData } from "@/types/register";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const session = await getIronSession<UserSessionData>(
        cookies(),
        AuthSessionOptions,
    );
}
