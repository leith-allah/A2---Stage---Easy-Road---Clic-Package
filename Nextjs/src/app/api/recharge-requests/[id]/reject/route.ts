
import { successResponse }
from "@/server/api/responses/success";

import { rechargeRequestService }
from "@/server/services/recharge-request.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";


type Params = {

  params: Promise<{
    id: string;
  }>;

};


export async function PATCH(
  _: Request,
  { params }: Params
) {

  await requirePermission(
    "recharge-request:reject"
  );

  const { id } =
    await params;

  const request =
    await rechargeRequestService.rejectRequest(
      Number(id)
    );

  return successResponse(
    request,
    200,
    "Recharge request rejected"
  );

}
