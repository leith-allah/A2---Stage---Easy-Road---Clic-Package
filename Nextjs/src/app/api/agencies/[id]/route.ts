
import { agencyService }
from "@/server/services/agency.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware"; 


type Params = {

  params: Promise<{
    id: string;
  }>;

};

export async function GET(
  _: Request,
  { params }: Params
) {

  const { id } =
    await params;

  const agency =
    await agencyService.getAgencyById(
      Number(id)
    );

  return Response.json(
    agency
  );

}

export async function PATCH(
  request: Request,
  { params }: Params
) {

  const { id } =
    await params;

  const body =
    await request.json();

  const agency =
    await agencyService.updateAgency(
      Number(id),
      body
    );
    await requirePermission("agency:update");

  return Response.json(
    agency
  );

}

export async function DELETE(
  _: Request,
  { params }: Params
) {

  const { id } =
    await params;
    await agencyService.deleteAgency(Number(id));
    await requirePermission("agency:delete");

  return Response.json({

    success: true,

  });

}
