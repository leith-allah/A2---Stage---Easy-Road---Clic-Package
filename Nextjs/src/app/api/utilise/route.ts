
import { NextRequest }
from "next/server";

import { utiliseService }
from "@/server/services/utilise.service";

import { createUtiliseSchema }
from "@/server/validations/utilise/create-utilise.validation";

import { requirePermission }
from "@/server/middlewares/permission.middleware";


export async function GET() {

  await requirePermission(
    "package:view"
  );

  return Response.json(
    await utiliseService.getAll()
  );

}

export async function POST(request: NextRequest) {

    const body = await request.json();

    console.log("======== UTILISE ========");
    console.log(body);
    console.log(typeof body.id_pack);
    console.log(typeof body.id_transp);
    console.log("=========================");

    return Response.json(body);
}
