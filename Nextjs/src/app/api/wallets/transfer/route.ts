
import {
  successResponse,
} from "@/server/api/responses/success";

import {
  validateBody,
} from "@/server/validations/validate-request";

import {
  transferSchema,
} from "@/server/validations/wallet/transfer.validation";

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
    "wallet:transfer"
  );

  const data =
    await validateBody(
      request,
      transferSchema
    );

  const result =
    await walletService.transfer(
      data.recipientId,
      data.amount
    );

  return successResponse(
    result,
    200,
    "Transfert effectué"
  );

}
