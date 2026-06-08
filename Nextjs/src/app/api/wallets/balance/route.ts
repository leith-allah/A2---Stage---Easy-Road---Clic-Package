
import {
  successResponse,
} from "@/server/api/responses/success";

import {
  walletService,
} from "@/server/services/wallet.service";

import {
  requirePermission,
} from "@/server/middlewares/permission.middleware";


export async function GET() {

  await requirePermission(
    "wallet:balance"
  );

  const balance =
    await walletService.getBalance();

  return successResponse(
    balance
  );

}
