
import {
  successResponse,
} from "@/server/api/responses/success";

import {
  validateBody,
} from "@/server/validations/validate-request";

import {
  createWalletSchema,
} from "@/server/validations/wallet/create-wallet.validation";

import {
  walletService,
} from "@/server/services/wallet.service";

import {
  requirePermission,
} from "@/server/middlewares/permission.middleware";


export async function GET() {

  await requirePermission(
    "wallet:view"
  );

  const wallets =
    await walletService.getAllWallets();

  return successResponse(
    wallets
  );

}

export async function POST(
  request: Request
) {

  await requirePermission(
    "wallet:create"
  );

  const data =
    await validateBody(
      request,
      createWalletSchema
    );

  const wallet =
    await walletService.createWallet(
      data.userId
    );

  return successResponse(
    wallet,
    201,
    "Portefeuille créé"
  );

}
