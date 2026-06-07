
import {
  hotelService,
} from "@/server/services/hotel.service";

import {
  updateHotelSchema,
} from "@/server/validations/hotel/hotel.validation";

import {
  requirePermission,
} from "@/server/middlewares/permission.middleware";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _: Request,
  { params }: Params
) {
  await requirePermission("hotel:view");

  const { id } =
    await params;

  const hotel =
    await hotelService.getHotelById(
      Number(id)
    );

  return Response.json(hotel);
}

export async function PATCH(
  request: Request,
  { params }: Params
) {
  await requirePermission("hotel:update");

  const { id } =
    await params;

  const body =
    await request.json();

  const data =
    updateHotelSchema.parse(body);

  const hotel =
    await hotelService.updateHotel(
      Number(id),
      data
    );

  return Response.json(hotel);
}

export async function DELETE(
  _: Request,
  { params }: Params
) {
  await requirePermission("hotel:delete");

  const { id } =
    await params;

  await hotelService.deleteHotel(
    Number(id)
  );

  return Response.json({
    success: true,
  });
}
