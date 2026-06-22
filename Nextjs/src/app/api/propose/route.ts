
import { NextRequest }
from "next/server";

import { proposeService }
from "@/server/services/propose.service";

import { createProposeSchema }
from "@/server/validations/propose/create-propose.validation";

import { requirePermission }
from "@/server/middlewares/permission.middleware";


export async function GET() {

  await requirePermission(
    "package:view"
  );

  return Response.json(
    await proposeService.getAll()
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
    createProposeSchema.parse(
      body
    );

  return Response.json(

    await proposeService.create(
      data.id_pack,
      data.id_exc
    ),

    {
      status: 201,
    }

  );

}
