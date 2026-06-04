
import { NextRequest }
from "next/server";

import { bookingService }
from "@/server/services/booking.service";

import { CreateBookingDto }
from "@/server/dto/booking/create-booking.dto";


export async function GET() {

  const bookings =
    await bookingService.getBookings();

  return Response.json(
    bookings
  );
}


export async function POST(
  request: NextRequest
) {

  const body:
    CreateBookingDto =
      await request.json();

  const booking =
    await bookingService.createBooking(
      body
    );

  return Response.json(
    booking
  );
}
