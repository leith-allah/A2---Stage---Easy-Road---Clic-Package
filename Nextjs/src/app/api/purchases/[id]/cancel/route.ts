
import { NextResponse }
from "next/server";

import { achatPackageController }
from "@/server/controllers/achat-package.controller";

export async function PATCH(
  _: Request,
  context: {

    params: Promise<{
      id: string;
    }>;

  }
) {

  const { id } =
    await context.params;

  const result =

    await achatPackageController.cancelPurchase(
      Number(id)
    );

  return NextResponse.json(
    result
  );

}
