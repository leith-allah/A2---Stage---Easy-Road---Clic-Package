
import { possedeService }
from "@/server/services/possede.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";


type Params = {

  params: Promise<{

    idPack: string;

    idVol: string;

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
    idVol
  } = await params;

  await possedeService.delete(

    Number(idPack),

    Number(idVol)

  );

  return Response.json({

    success: true,

  });

}
