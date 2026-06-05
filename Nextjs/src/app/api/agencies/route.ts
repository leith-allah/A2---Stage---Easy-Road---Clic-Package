
import { agencyService }
from "@/server/services/agency.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";


export async function GET() {

  const agencies =
    await agencyService.getAllAgencies();
    await requirePermission("agency:view");

  return Response.json(
    agencies
  );

}

export async function POST(
  request: Request
) {

  const body =
    await request.json();

  const agency =
    await agencyService.createAgency(body);
    await requirePermission("agency:create");

  return Response.json(
    agency,
    {
      status: 201,
    }
  );

}
