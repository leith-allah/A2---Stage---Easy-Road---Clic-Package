
import { agencyService }
from "@/server/services/agency.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

import {
  createAgencySchema,
}
from "@/server/validations/agency/create-agency.validation";

export async function GET() {

  await requirePermission(
    "agency:view"
  );

  const agencies =
    await agencyService.getAllAgencies();

  return Response.json(
    agencies
  );

}

export async function POST(
  request: Request
) {

  await requirePermission(
    "agency:create"
  );

  const body =
    await request.json();

  const data =
    createAgencySchema.parse(
      body
    );

  const agency =
    await agencyService.createAgency(
      data
    );

  return Response.json(
    agency,
    {
      status: 201,
    }
  );

}
