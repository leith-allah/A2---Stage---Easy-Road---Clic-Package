
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
  updateBookingSchema,
}
from "@/server/validations/booking/update-booking.validation";

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

  await requirePermission(
    "booking:view"
  );

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

  await requirePermission(
    "booking:update"
  );

  const { id } =
    await params;

  const body =
    await validateBody(
      request,
      updateBookingSchema
    );

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

  await requirePermission(
    "booking:delete"
  );

  const { id } =
    await params;

  await bookingService.deleteBooking(
    Number(id)
  );

  return Response.json({
    success: true,
  });

}
