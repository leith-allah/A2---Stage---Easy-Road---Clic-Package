
import { NextRequest }
from "next/server";

import { walletService }
from "@/server/services/wallet.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

export async function POST(
  request: NextRequest
) {

  await requirePermission(
    "wallet:transfer"
  );

  const body =
    await request.json();

  const result =
    await walletService.transfer(
      body.recipientId,
      body.amount
    );

  return Response.json(
    result
  );
}
