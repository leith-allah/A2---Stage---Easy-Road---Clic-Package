
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

export async function POST(
  request: NextRequest
) {

  await requirePermission(
    "package:update"
  );

  const body =
    await request.json();

  const data =
    createUtiliseSchema.parse(
      body
    );

  return Response.json(

    await utiliseService.create(
      data.id_pack,
      data.id_transp
    ),

    {
      status: 201,
    }

  );

}
