
import { cookies }
from "next/headers";

import {
  AUTH_COOKIE_NAME,
}
from "@/server/constants/auth.constants";

import {
  verifyToken,
}
from "@/server/auth/jwt";

export async function getCurrentUser() {

  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      AUTH_COOKIE_NAME
    )?.value;

  if (!token) {
    return null;
  }

  try {

    return verifyToken(
      token
    );

  } catch {

    return null;
  }
}
