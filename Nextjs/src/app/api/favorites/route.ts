
import { favoriteService } from "@/server/services/favorite.service";

export async function GET() {

  const favorites =
    await favoriteService.getMyFavorites();

  return Response.json(favorites);

}

export async function POST(request: Request) {

  const body = await request.json();

  const result =
    await favoriteService.add(body.packageId);

  return Response.json(result);

}
