import { NextResponse } from "next/server";
import { backendURL } from "./lib/secret";

const AUTH_ROUTE = "/auth";
const BACKEND_URL = `${backendURL}/api/auth/protected`;
const SESSION_COOKIE = "connect.sid";

export async function middleware(reqest) {
  const { pathname } = reqest.nextUrl;
  const url = reqest.url;
  const sessionCookie = reqest.cookies.get(SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    if (pathname === "/auth") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(AUTH_ROUTE, url));
  }

  try {
    const response = await fetch(BACKEND_URL, {
      method: "GET",
      headers: { Cookie: `${SESSION_COOKIE}=${sessionCookie}` },
      credentials: "include",
    });
    if (response.status !== 200) {
      if (pathname === "/auth") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL(AUTH_ROUTE, url));
    }

    if (pathname === AUTH_ROUTE) {
      return NextResponse.redirect(new URL("/", url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL(AUTH_ROUTE, url));
  }
}

export const config = {
  matcher: ["/((?!_next|public|logout|favicon\\.ico|robots\\.txt|api).*)"],
};
