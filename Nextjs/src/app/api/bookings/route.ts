
import { NextRequest }
from "next/server";

import {
  bookingService,
}
from "@/server/services/booking.service";

import {
  requirePermission,
}
from "@/server/middlewares/permission.middleware";

import {
  validateBody,
}
from "@/server/validations/wallet/validate-request";

import {
  createBookingSchema,
}
from "@/server/validations/booking/create-booking.validation";

export async function GET() {

  await requirePermission(
    "booking:view"
  );

  const bookings =
    await bookingService.getBookings();

  return Response.json(
    bookings
  );

}

export async function POST(
  request: NextRequest
) {

  await requirePermission(
    "booking:create"
  );

  const body =
    await validateBody(
      request,
      createBookingSchema
    );

  const booking =
    await bookingService.createBooking(
      body
    );

  return Response.json(
    booking,
    {
      status: 201,
    }
  );

}
