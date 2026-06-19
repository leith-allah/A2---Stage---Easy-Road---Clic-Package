
import { NextRequest }
from "next/server";

import { hebergeService }
from "@/server/services/heberge.service";

import { createHebergeSchema }
from "@/server/validations/heberge/create-heberge.validation";

export async function GET() {

  return Response.json(
    await hebergeService.getAll()
  );

}

export async function POST(
  request: NextRequest
) {

  const body =
    await request.json();

  const data =
    createHebergeSchema.parse(
      body
    );

  return Response.json(

    await hebergeService.create(
      data.id_pack,
      data.id_hot
    ),

    {
      status: 201,
    }

  );

}
