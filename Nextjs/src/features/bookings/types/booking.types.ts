
export type BookingStatus =
  | "CONFIRME"
  | "ANNULE"
  | "REMBOURSE";

export type Booking = {
  id: number;

  bookingNumber: string;

  packageId: number;

  packageTitle: string;

  travelers: number;

  total: number;

  departureDate: string;

  createdAt: string;

  status: BookingStatus;
};
