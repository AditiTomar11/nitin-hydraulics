import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // Next.js 16 / Auth.js v5 uses different cookie names
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token";

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName,
  });

  // Debug — remove after fixing
  console.log("COOKIE NAME TRIED:", cookieName);
  console.log("ALL COOKIES:", req.cookies.getAll().map(c => c.name));
  console.log("TOKEN:", token);

  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login" &&
    !token
  ) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};