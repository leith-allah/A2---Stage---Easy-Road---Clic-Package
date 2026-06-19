
import { hebergeService }
from "@/server/services/heberge.service";

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
