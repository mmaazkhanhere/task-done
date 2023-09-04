import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./lib/auth";

const authPages = ["/"]; // authentication related pages including /panel
const isAuthPage = (url: string) => authPages.includes(url);
/* checks if the page requires authentication 
returns true if it requires authentication */

export async function middleware(request: any) {
    const { nextUrl, cookies } = request; // extract nextUrl and cookies from the request
    const { value: token } = cookies.get("authenticatedToken") ?? { value: null }; // access the token from cookies

    const hasVerifiedToken = token && await verifyJwtToken(token);
    const isAuthPageRequest = isAuthPage(nextUrl.pathname);

    if (isAuthPageRequest) {
        if (!hasVerifiedToken) {
            const loginUrl = new URL("/login", nextUrl.origin); // Construct absolute URL
            return NextResponse.redirect(loginUrl.href);
        }
    }

    return NextResponse.next();
}

export const config = { matcher: ["/login"] };