
import { proposeService }
from "@/server/services/propose.service";

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
