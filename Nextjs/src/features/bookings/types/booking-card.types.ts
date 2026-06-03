
import { BookingStatus }
from "./booking.types";

export type BookingCardData = {
  id: number;

  bookingNumber: string;

  packageId: number;

  packageTitle: string;

  destination: string;

  image: string;

  travelers: number;

  total: number;

  departureDate: string;

  returnDate: string;

  createdAt: string;

  status: BookingStatus;
};
