
import {
  successResponse,
} from "@/server/api/responses/success";

import {
  validateBody,
} from "@/server/validations/validate-request";

import {
  topupSchema,
} from "@/server/validations/wallet/topup.validation";

import {
  walletService,
} from "@/server/services/wallet.service";

import {
  requirePermission,
} from "@/server/middlewares/permission.middleware";


export async function POST(
  request: Request
) {

  await requirePermission(
    "wallet:topup"
  );

  const data =
    await validateBody(
      request,
      topupSchema
    );

  const result =
    await walletService.topup(
      data.amount
    );

  return successResponse(
    result,
    200,
    "Rechargement effectué"
  );

}
