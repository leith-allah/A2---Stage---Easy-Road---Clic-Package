
import { proposeService }
from "@/server/services/propose.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";


type Params = {

  params: Promise<{

    idPack: string;

    idExc: string;

  }>;

};

export async function DELETE(

  _: Request,

  { params }: Params

) {

  await requirePermission(
    "package:update"
  );

  const {
    idPack,
    idExc
  } = await params;

  await proposeService.delete(

    Number(idPack),

    Number(idExc)

  );

  return Response.json({

    success: true,

  });

}
