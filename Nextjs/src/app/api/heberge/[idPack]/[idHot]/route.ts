
import { hebergeService }
from "@/server/services/heberge.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";


type Params = {

  params: Promise<{

    idPack: string;

    idHot: string;

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
    idHot
  } = await params;

  await hebergeService.delete(

    Number(idPack),

    Number(idHot)

  );

  return Response.json({

    success: true,

  });

}
