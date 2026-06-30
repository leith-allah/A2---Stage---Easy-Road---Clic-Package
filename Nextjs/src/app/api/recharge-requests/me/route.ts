
import { NextResponse }
from "next/server";

import { rechargeRequestService }
from "@/server/services/recharge-request.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";


export async function GET() {

  await requirePermission(
    "recharge-request:view"
  );

  const requests =

    await rechargeRequestService.getMyRequests();

  return NextResponse.json(

    JSON.parse(

      JSON.stringify(
        requests,

        (_, value) =>

          typeof value === "bigint"
            ? Number(value)
            : value
      )
    )
  );

}
