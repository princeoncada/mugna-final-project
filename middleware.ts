import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { triggerLogout } from "./lib/authhandler";

export const runtime = "experimental-edge";

function redirect(url: string) {
    triggerLogout();
    return NextResponse.redirect(url);
}

export function middleware(req: NextRequest) {
    const cookies = req.headers.get("cookie") ?? "";
    const accessTokenMatch = /access_token=([^;]*)/.exec(cookies);
    const access_token = accessTokenMatch ? accessTokenMatch[1] : null;
    const refreshTokenMatch = /refresh_token=([^;]*)/.exec(cookies);
    const refresh_token = refreshTokenMatch ? refreshTokenMatch[1] : null;
    const isLoginPage = req.nextUrl.pathname === "/login";
    const baseUrl = req.nextUrl.origin;

    // Redirect to login if no access token and not on login page
    if (!access_token && !refresh_token && !isLoginPage) {
        return redirect(`${baseUrl}/login`);
    }

    // Redirect to home page if access token and on login page
    if (access_token && isLoginPage) {
        return redirect(`${baseUrl}/`)
    }

    return NextResponse.next();
}

export const config = {
    // Only run middleware for these paths
    matcher: ["/login", "/", "/todos/:path*"],
};
