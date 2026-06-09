
import { NextResponse }
from "next/server";

import { deleteAuthCookie } from "@/server/auth/cookies";

import { deleteRefreshCookie } from "@/server/auth/cookies";


export async function POST() {

  await deleteAuthCookie();
  
  await deleteRefreshCookie();

  return NextResponse.json({
    message:
      "Déconnexion réussie",
  });
}
