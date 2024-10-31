import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { LOGIN, PUBLIC_ROUTES, ROOT } from "./lib/routes";
import { NextResponse } from "next/server";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.find(
    (route) => nextUrl.pathname.startsWith(route) || nextUrl.pathname == ROOT
  );

  console.log("isAuthenticated,", isAuthenticated);
  console.log("isPublicRoute,", isPublicRoute);
  

  if (!isPublicRoute && !isAuthenticated) {
    // NextResponse.redirect(new URL(LOGIN, nextUrl))
    return Response.redirect(new URL(LOGIN, nextUrl));
  }
  if (isAuthenticated && nextUrl.pathname === "/login") {
    // Redirect authenticated users trying to access the login page to the courses page
    return Response.redirect(new URL("/courses", nextUrl));
  }
});
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
