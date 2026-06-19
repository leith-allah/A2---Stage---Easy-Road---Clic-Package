
import { utiliseService }
from "@/server/services/utilise.service";

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
