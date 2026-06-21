
import { NextResponse }
from "next/server";

import { achatPackageController }
from "@/server/controllers/achat-package.controller";

import { createAchatPackageSchema }
from "@/server/validations/achat-package/create-achat-package.validation";

import { requireRole }
from "@/server/auth/authorization";


export async function GET() {

    await requireRole([
      "OWNER",
      "SUPER_ADMIN",
      "ADMIN"
    ]);

  const purchases =
    await achatPackageController.getAllPurchases();

  return NextResponse.json(
    purchases
  );
}


export async function POST(
  request: Request
) {

  const body =
    await request.json();

  const dto =
    createAchatPackageSchema.parse(
      body
    );

  const purchase =
    await achatPackageController.createPurchase(
      dto
    );

  return NextResponse.json(
    purchase,
    {
      status: 201,
    }
  );
}
