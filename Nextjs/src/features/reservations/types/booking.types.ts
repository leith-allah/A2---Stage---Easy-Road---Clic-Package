
export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "REFUNDED";

export type Booking = {
  id: number;

  bookingNumber: string;

  packageTitle: string;

  destination: string;

  image: string;

  travelers: number;

  totalPrice: number;

  departureDate: string;

  returnDate: string;

  createdAt: string;

  status: BookingStatus;
};
