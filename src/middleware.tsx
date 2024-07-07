import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const cookies = cookieHeader
    ? Object.fromEntries(new URLSearchParams(cookieHeader.replace(/; /g, "&")))
    : {};
  const token = cookies.token;
  const path = request.nextUrl.pathname;
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store, max-age=0");
  const publicPaths = [
    "/home",
    "/services",
    "/medical-specialties",
    "/our-articles",
    "/contact",
  ];
  const authPaths = ["/login", "/register"];
  const dashboardPath = "/Dashboard";
  if (path === "/") {
    if (token) {
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    } else {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
  if (publicPaths.some((publicPath) => path.startsWith(publicPath))) {
    if (token) {
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }
  }

  if (authPaths.some((authPath) => path.startsWith(authPath))) {
    if (token) {
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }
  }
  if (path.startsWith(dashboardPath)) {
    if (!token) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  return response;
}
