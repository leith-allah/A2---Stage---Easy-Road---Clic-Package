
import { NextRequest }
from "next/server";

import { bookingService }
from "@/server/services/booking.service";

import { UpdateBookingDto }
from "@/server/dto/booking/update-booking.dto";


export async function GET(
  request: NextRequest,

  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  const { id } =
    await params;

  const booking =
    await bookingService.getBookingById(
      Number(id)
    );

  return Response.json(
    booking
  );
}


export async function PATCH(
  request: NextRequest,

  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  const { id } =
    await params;

  const body:
    UpdateBookingDto =
      await request.json();

  const booking =
    await bookingService.updateBooking(
      Number(id),
      body
    );

  return Response.json(
    booking
  );
}


export async function DELETE(
  request: NextRequest,

  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  const { id } =
    await params;

  await bookingService.deleteBooking(
    Number(id)
  );

  return Response.json({
    success: true,
  });
}
