"use server";

import { UserSessionData } from "@/types/cookies";
import { SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";

const secretAuthCookiePassword =
    process.env.NEXT_PUBLIC_SECRET_AUTH_COOKIE_PASSWORD;
const authCookieName = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME;

if (!secretAuthCookiePassword || !authCookieName) {
    throw new Error("Secret cookie password or name is missing.");
}

const AuthSessionOptions: SessionOptions = {
    cookieName: authCookieName,
    password: secretAuthCookiePassword,
};

export async function getCookie() {
    return getIronSession<UserSessionData>(cookies(), AuthSessionOptions);
}
