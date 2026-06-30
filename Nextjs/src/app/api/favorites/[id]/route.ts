
import { favoriteService } from "@/server/services/favorite.service";

export async function DELETE(

  _: Request,

  { params }: {

    params: Promise<{ id: string }>;

  }

) {

  const { id } = await params;

  const result =
    await favoriteService.remove(Number(id));

  return Response.json(result);

}
