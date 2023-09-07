import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./app/lib/auth";

const authPages = ["/login"]; // List of authentication-related pages
const isAuthPage = (url: any) => authPages.includes(url);

export async function middleware(request: any) {
    const { nextUrl, cookies } = request;
    const { value: token } = cookies.get("authenticatedToken") ?? { value: null };

    const hasVerifiedToken = token && await verifyJwtToken(token);
    const isAuthPageRequest = isAuthPage(nextUrl.pathname);

    if (!isAuthPageRequest) {
        // Redirect unauthenticated users to the login page
        if (!hasVerifiedToken) {
            const loginUrl = new URL("/login", nextUrl.origin);
            return NextResponse.redirect(loginUrl.href);
        }
    }

    return NextResponse.next();
}

export const config = { matcher: ["/"] }; // Exclude the /login page