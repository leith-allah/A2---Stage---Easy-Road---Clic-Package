
import { successResponse }
from "@/server/api/responses/success";

import { walletService }
from "@/server/services/wallet.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";


export async function GET() {

  await requirePermission(
    "wallet:view"
  );

  const wallet =
    await walletService.getMyWallet();

  return successResponse(
    wallet
  );

}
