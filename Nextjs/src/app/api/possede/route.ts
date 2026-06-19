
import { NextRequest }
from "next/server";

import { possedeService }
from "@/server/services/possede.service";

import { createPossedeSchema }
from "@/server/validations/possede/create-possede.validation";

export async function GET() {

  return Response.json(
    await possedeService.getAll()
  );

}

export async function POST(
  request: NextRequest
) {

  const body =
    await request.json();

  const data =
    createPossedeSchema.parse(
      body
    );

  return Response.json(

    await possedeService.create(
      data.id_pack,
      data.id_vol
    ),

    {
      status: 201,
    }

  );

}
