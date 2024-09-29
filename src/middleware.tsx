import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { parse } from "cookie";
import { routing } from "./i18n/routing";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  let locale = pathname.startsWith("/ar")
    ? "ar"
    : pathname.startsWith("/en")
    ? "en"
    : "en";

  if (
    pathname.startsWith("/ar/Dashboard") ||
    pathname.startsWith("/en/Dashboard")
  ) {
    const cookieHeader = req.headers.get("cookie");
    const cookies = cookieHeader ? parse(cookieHeader) : {};

    if (!cookies.token) {
      const loginUrl = new URL(`/${locale}/clinic-website/login`, req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return createMiddleware(routing, { localeDetection: false })(req);
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
