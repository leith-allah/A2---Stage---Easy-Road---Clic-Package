
import { NextResponse }
from "next/server";

import {
  deleteAuthCookie,
}
from "@/server/auth/cookies";

export async function POST() {

  await deleteAuthCookie();

  return NextResponse.json({
    message:
      "Déconnexion réussie",
  });
}
