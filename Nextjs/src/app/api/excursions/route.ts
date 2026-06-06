
import { NextRequest }
from "next/server";

import { excursionService }
from "@/server/services/excursion.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { createExcursionSchema }
from "@/server/validations/excursion/create-excursion.validation";


export async function GET() {

  await requirePermission(
    "excursion:view"
  );

  const excursions =
    await excursionService.getAllExcursions();

  return Response.json(
    excursions
  );
}

export async function POST(
  request: NextRequest
) {

  await requirePermission(
    "excursion:create"
  );

  const body =
    await request.json();

  const data =
    createExcursionSchema.parse(
      body
    );

  const excursion =
    await excursionService.createExcursion(
      data
    );

  return Response.json(
    excursion,
    {
      status: 201,
    }
  );
}
