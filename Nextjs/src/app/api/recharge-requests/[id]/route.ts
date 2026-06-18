
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


export async function GET(
  _: Request,
  { params }: Params
) {

  await requirePermission(
    "recharge-request:view"
  );

  const { id } =
    await params;

  const request =
    await rechargeRequestService.getRequestById(
      Number(id)
    );

  return successResponse(
    request
  );

}
