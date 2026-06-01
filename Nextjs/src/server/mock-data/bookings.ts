
import { Booking } from "@/server/entities/booking.entity";

export const bookings: Booking[] = [
  {
    id: 1,
    userId: 2,
    packageId: 1,
    travelers: 2,
    totalPrice: 2400,
    status: "CONFIRMED",
    createdAt: new Date(),
  },
];
