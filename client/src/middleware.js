import { NextResponse } from "next/server";
import axios from "axios";
export async function middleware(req) {
  const token = req.cookies.get("jwt");
  const { pathname } = req.nextUrl;
  // console.log(token);
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.startsWith("/auth")
  ) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  try {
    const res = await axios.get(`http://localhost:3001/api/auth/protected`, {
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
      validateStatus: (status) => status < 400,
    });

    if (res.status !== 200) {
      console.log(res.message);
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return NextResponse.redirect(new URL("/auth", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!/_next/|/static/|/auth).*)"],
};
