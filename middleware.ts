// middleware.ts
// Place this file in your PROJECT ROOT (same level as package.json)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Better Auth session cookie name
  const sessionCookie = request.cookies.get("better-auth.session_token");
  
  // Debug logging (remove in production)
  console.log(`[Middleware] Path: ${pathname}, Has Session: ${!!sessionCookie}`);

  // Protected routes - require authentication
  const protectedRoutes = ["/dashboard", "/profile"];
  
  // Auth routes - only for non-authenticated users
  const authRoutes = ["/login", "/signup"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  
  const isAuthRoute = authRoutes.some((route) => 
    pathname.startsWith(route)
  );

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !sessionCookie) {
    console.log(`[Middleware] No session, redirecting to /login`);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if accessing auth routes with session
  if (isAuthRoute && sessionCookie) {
    console.log(`[Middleware] Has session, redirecting to /dashboard`);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/login",
    "/signup",
  ],
};