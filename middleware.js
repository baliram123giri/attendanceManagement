export { default } from "next-auth/middleware";

import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server'


// This function can be marked `async` if using `await` inside
export async function middleware(request) {

    const accessToken = request.cookies.get("access_token")?.value
    function checkPath(path = []) {
        return path.includes(request.nextUrl.pathname) && accessToken
    }

    const authRoute = request.nextUrl.pathname === "/login"
    const session = await getToken({ req: request, secret: process.env.COOKIE_SECRET });
    const isAdmin = session?.data?.role === "admin"

    if (authRoute) {
        if (accessToken) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    } else if (!accessToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    } else if (!isAdmin && checkPath(["/meeting", "/students"])) {
        //if its not not admin dont access
        return NextResponse.redirect(new URL('/', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/login", "/", "/meeting", "/attendance", "/classes", "/assignments", "/students"],
}

