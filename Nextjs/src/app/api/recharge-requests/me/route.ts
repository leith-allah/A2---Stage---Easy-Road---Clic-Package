
import { NextResponse }
from "next/server";

import { rechargeRequestService }
from "@/server/services/recharge-request.service";


export async function GET() {

  const requests =

    await rechargeRequestService.getMyRequests();

  return NextResponse.json(
    requests
  );

}
