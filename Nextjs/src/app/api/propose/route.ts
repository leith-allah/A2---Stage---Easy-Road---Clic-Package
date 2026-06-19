
import { NextRequest }
from "next/server";

import { proposeService }
from "@/server/services/propose.service";

import { createProposeSchema }
from "@/server/validations/propose/create-propose.validation";

export async function GET() {

  return Response.json(
    await proposeService.getAll()
  );

}

export async function POST(
  request: NextRequest
) {

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
