export { default } from "next-auth/middleware";

import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {

    const accessToken = request.cookies.get("next-auth.session-token")?.value

    const authRoute = request.nextUrl.pathname === "/login"

    if (authRoute) {
        if (accessToken) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    } else {
        if (!accessToken) return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/login", "/", "/meeting", "/attendance", "/classes", "/assignments"],
}
