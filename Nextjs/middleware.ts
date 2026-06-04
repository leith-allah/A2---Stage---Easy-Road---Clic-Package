
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { verifyToken } from "@/server/auth/jwt";

import { AUTH_COOKIE_NAME } from "@/server/constants/auth.constants";

export function middleware(
  request: NextRequest
) {

  const token =
    request.cookies.get(
      AUTH_COOKIE_NAME
    )?.value;

  const pathname =
    request.nextUrl.pathname;

  // Routes publiques
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/about-us",
    "/contact",
    "/unauthorized",
    "/forbidden",
  ];

  if (
    publicRoutes.includes(
      pathname
    )
  ) {
    return NextResponse.next();
  }

  if (!token) {

    return NextResponse.redirect(
      new URL(
        "/unauthorized",
        request.url
      )
    );
  }

  try {

    const user =
      verifyToken(token);

    // ADMIN ONLY
    if (
      pathname.startsWith(
        "/dashboard/packages/create"
      ) &&
      user.role !== "ADMIN"
    ) {

      return NextResponse.redirect(
        new URL(
          "/forbidden",
          request.url
        )
      );
    }

    return NextResponse.next();

  } catch {

    return NextResponse.redirect(
      new URL(
        "/unauthorized",
        request.url
      )
    );
  }
}

export const config = {

  matcher: [
    "/dashboard/:path*",
  ],
};
