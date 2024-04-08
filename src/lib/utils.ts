import { type ClassValue, clsx } from "clsx";
import { SessionOptions } from "iron-session";
import { twMerge } from "tailwind-merge";

const secretAuthCookiePassword =
    process.env.NEXT_PUBLIC_SECRET_AUTH_COOKIE_PASSWORD;
const authCookieName = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME;

if (!secretAuthCookiePassword || !authCookieName) {
    throw new Error("Secret cookie password or name is missing.");
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const AuthSessionOptions: SessionOptions = {
    cookieName: authCookieName,
    password: secretAuthCookiePassword,
};
