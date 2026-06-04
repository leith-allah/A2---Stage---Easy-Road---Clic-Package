
import { Booking } from "@/server/entities/booking.entity";

export const bookings: Booking[] = [
  {
    id: 1,

    reference: "BOOK-001",

    travelers: 2,

    flightClass: "ECONOMY",

    roomType: "DOUBLE",

    pension: "HALF_BOARD",

    purchasePrice: 2400,

    discount: 0,

    totalPrice: 2400,

    bookingDate: new Date(),

    status: "CONFIRMED",

    packageId: 1,

    userId: 2,
  },
];
