
import { Booking }
from "../types/booking.types";

export const mockBookings: Booking[] =
  [
    {
      id: 1,

      bookingNumber:
        "BK-2026-0001",

      packageTitle:
        "Dubai Luxury",

      destination:
        "Dubai, UAE",

      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",

      travelers: 2,

      totalPrice: 780000,

      departureDate:
        "2026-07-12",

      returnDate:
        "2026-07-19",

      createdAt:
        "2026-05-21",

      status:
        "CONFIRMED",
    },

    {
      id: 2,

      bookingNumber:
        "BK-2026-0002",

      packageTitle:
        "Istanbul Premium",

      destination:
        "Istanbul, Turquie",

      image:
        "https://images.unsplash.com/photo-1527838832700-5059252407fa",

      travelers: 1,

      totalPrice: 210000,

      departureDate:
        "2026-08-02",

      returnDate:
        "2026-08-07",

      createdAt:
        "2026-05-20",

      status:
        "PENDING",
    },
  ];
  