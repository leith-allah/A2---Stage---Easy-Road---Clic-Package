
export type BookingStatus =
  | "CONFIRMED"
  | "PENDING"
  | "CANCELLED"
  | "REFUNDED";

export type Booking = {
  id: number;

  packageId: number;

  packageTitle: string;

  travelers: number;

  total: number;

  createdAt: string;

  departureDate: string;

  status: BookingStatus;
};
