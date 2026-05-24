
import {
  Booking,
} from "../types/booking.types";

export let mockBookings:
  Booking[] = [
  {
    id: 1,

    packageId: 2,

    packageTitle:
      "Istanbul Premium",

    travelers: 2,

    total: 240000,

    createdAt: "2026-05-20",

    departureDate:
      "2026-07-15",

    status: "CONFIRMED",
  },
];

export async function
getBookings() {
  return mockBookings;
}

type CreateBookingData = {
  packageId: number;

  packageTitle: string;

  travelers: number;

  total: number;

  departureDate: string;
};

export async function
createBooking(
  data: CreateBookingData
) {

  const booking: Booking = {
    id: Date.now(),

    packageId: data.packageId,

    packageTitle:
      data.packageTitle,

    travelers: data.travelers,

    total: data.total,

    departureDate:
      data.departureDate,

    createdAt:
      new Date().toISOString(),

    status: "CONFIRMED",
  };

  mockBookings.unshift(
    booking
  );

  return booking;
}

export async function
cancelBooking(id: number) {

  mockBookings =
    mockBookings.map(
      (booking) =>
        booking.id === id
          ? {
              ...booking,
              status:
                "CANCELLED",
            }
          : booking
    );

  return mockBookings;
}
