
import { possedeService }
from "@/server/services/possede.service";

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
