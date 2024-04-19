import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./lib/cookies";

export async function middleware(request: NextRequest) {
    const session = await getCookie();

    if (!session.isLoggedIn) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session.visitor?.role !== "Admin") {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/admin"],
};
