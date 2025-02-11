import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { reauthenticate } from "./lib/services/authService";

export function middleware(req: NextRequest) {
    const access_token = req.cookies.get("access_token")?.value;
    const refresh_token = req.cookies.get("refresh_token")?.value;
    const isLoginPage = req.nextUrl.pathname === "/login";
    const baseUrl = req.nextUrl.origin;

    // Handle refresh token logic
    if (!access_token && refresh_token) {
        // Refresh token logic here
        reauthenticate().then((success) => {
            if (!success) {
                return NextResponse.redirect(`${baseUrl}/login`);
            }
        });
    }

    // Redirect to login page if no access token and not on login page
    if (!access_token && !refresh_token && !isLoginPage) {
        return NextResponse.redirect(`${baseUrl}/login`);
    }

    // Redirect to home page if access token and on login page
    if (access_token && isLoginPage) {
        return NextResponse.redirect(`${baseUrl}/`);
    }

    return NextResponse.next();
}

export const config = {
    // Only run middleware for these paths
    matcher: ["/login", "/", "/todos/:path*"],
}