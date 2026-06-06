
import {
  hotelService,
}
from "@/server/services/hotel.service";

type Params = {

  params: Promise<{
    id: string;
  }>;

};

export async function GET(
  _: Request,
  { params }: Params
) {

  const { id } =
    await params;

  const hotel =
    await hotelService.getHotelById(
      Number(id)
    );

  return Response.json(
    hotel
  );

}

export async function PATCH(
  request: Request,
  { params }: Params
) {

  const { id } =
    await params;

  const body =
    await request.json();

  const hotel =
    await hotelService.updateHotel(
      Number(id),
      body
    );

  return Response.json(
    hotel
  );

}

export async function DELETE(
  _: Request,
  { params }: Params
) {

  const { id } =
    await params;

  await hotelService.deleteHotel(
    Number(id)
  );

  return Response.json({

    success: true,

  });

}
