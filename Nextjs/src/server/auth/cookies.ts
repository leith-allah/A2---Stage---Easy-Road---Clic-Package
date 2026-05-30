
import { cookies }
from "next/headers";

import {
  AUTH_COOKIE_NAME,
}
from "@/server/constants/auth.constants";

export async function setAuthCookie(
  token: string
) {
  const cookieStore =
    await cookies();

  cookieStore.set(
    AUTH_COOKIE_NAME,
    token,
    {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite: "lax",

      path: "/",

      maxAge:
        60 *
        60 *
        24 *
        7,
    }
  );
}

export async function deleteAuthCookie() {

  const cookieStore =
    await cookies();

  cookieStore.delete(
    AUTH_COOKIE_NAME
  );
}
