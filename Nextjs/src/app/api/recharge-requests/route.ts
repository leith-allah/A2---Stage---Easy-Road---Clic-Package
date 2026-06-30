
import {
  successResponse,
}
from "@/server/api/responses/success";

import {
  rechargeRequestService,
}
from "@/server/services/recharge-request.service";

import {
  validateBody,
}
from "@/server/validations/validate-request";

import {
  createRechargeRequestSchema,
}
from "@/server/validations/recharge-request/create-recharge-request.validation";

import {
  getCurrentUserId,
}
from "@/server/auth/session";

import {
  requirePermission,
}
from "@/server/middlewares/permission.middleware";


export async function GET() {

  await requirePermission(
    "recharge-request:view"
  );

  const requests =
    await rechargeRequestService.getAllRequests();

  const safeRequests =

    JSON.parse(

      JSON.stringify(

        requests,

        (_, value) =>

          typeof value === "bigint"
            ? Number(value)
            : value

      )

    );

  return successResponse(
    safeRequests
  );

}


export async function POST(
  request: Request
) {

  await requirePermission(
    "recharge-request:create"
  );

  const body =
    await validateBody(
      request,
      createRechargeRequestSchema
    );

  const userId =
    await getCurrentUserId();

  const rechargeRequest =
    await rechargeRequestService.createRequest({

      userId,

      amount:
        body.amount,

      comment:
        body.comment,

    });

  return successResponse(
    rechargeRequest,
    201,
    "Recharge request created"
  );

}
