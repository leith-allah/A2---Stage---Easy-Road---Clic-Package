
import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { agencyOfficeService }
from "@/server/services/agency-office.service";

import {
  createAgencyOfficeSchema,
}
from "@/server/validations/agency-office/create-agency-office.validation";

export async function GET() {

  await requirePermission(
    "agency-office:view"
  );

  const offices =
    await agencyOfficeService.getAllAgencyOffices();

  return Response.json(
    offices
  );

}

export async function POST(
  request: Request
) {

  await requirePermission(
    "agency-office:create"
  );

  const body =
    await request.json();

  const data =
    createAgencyOfficeSchema.parse(
      body
    );

  const office =
    await agencyOfficeService.createAgencyOffice(
      data
    );

  return Response.json(
    office,
    {
      status: 201,
    }
  );

}
