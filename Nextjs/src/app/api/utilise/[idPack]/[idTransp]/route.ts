
import { utiliseService }
from "@/server/services/utilise.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";


type Params = {

  params: Promise<{

    idPack: string;

    idTransp: string;

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
    idTransp
  } = await params;

  await utiliseService.delete(

    Number(idPack),

    Number(idTransp)

  );

  return Response.json({

    success: true,

  });

}
