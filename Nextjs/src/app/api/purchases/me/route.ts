
import { NextResponse }
from "next/server";

import { achatPackageController }
from "@/server/controllers/achat-package.controller";

import { getCurrentUser }
from "@/server/middlewares/auth.middleware";


export async function GET() {

  const user =
    await getCurrentUser();

  if (!user) {

    throw new Error(
      "Non authentifié"
    );

  }

  const purchases =
    await achatPackageController.getMyPurchases();

  return NextResponse.json(
    purchases
  );
}
