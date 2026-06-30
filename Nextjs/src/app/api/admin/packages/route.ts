
import { packageAdminService } from "@/server/services/packageAdmin.service";

export async function POST(

  request: Request

) {

  const body = await request.json();

  const result = await packageAdminService.create(

    body

  );

  return Response.json(result);

}
