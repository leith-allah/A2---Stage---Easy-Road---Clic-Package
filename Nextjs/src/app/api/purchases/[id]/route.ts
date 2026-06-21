
import { NextResponse }
from "next/server";

import { achatPackageController }
from "@/server/controllers/achat-package.controller";


export async function GET(
  _: Request,
  context: {

    params: Promise<{
      id: string;
    }>;

  }
) {

  const { id } =
    await context.params;

  const purchase =
    await achatPackageController.getPurchaseById(
      Number(id)
    );

  return NextResponse.json(
    purchase
  );
}
