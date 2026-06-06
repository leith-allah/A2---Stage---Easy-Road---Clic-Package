
import { NextRequest }
from "next/server";

import { hotelService }
from "@/server/services/hotel.service";

export async function GET() {

  const hotels =
    await hotelService.getAllHotels();

  return Response.json(
    hotels
  );

}

export async function POST(
  request: NextRequest
) {

  const body =
    await request.json();

  const hotel =
    await hotelService.createHotel({

      nom_hot:
        body.nom_hot,

      nb_etoiles_hot:
        body.nb_etoiles_hot,

      pays_hot:
        body.pays_hot,

      ville_hot:
        body.ville_hot,

      adresse_hot:
        body.adresse_hot,

    });

  return Response.json(
    hotel,
    {
      status: 201,
    }
  );

}
