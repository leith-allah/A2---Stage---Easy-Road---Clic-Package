
import { BookingStatus }
from "@/features/bookings/types/booking.types";

type Props = {
  status: BookingStatus;
};

export default function
BookingStatusBadge({
  status,
}: Props) {
  return (
    <div
      className={`
        px-4
        py-2
        rounded-full
        text-sm
        font-semibold
        w-fit

        ${
          status === "CONFIRMED"
            ? `
              bg-green-100
              text-green-700
            `
            : status === "PENDING"
            ? `
              bg-yellow-100
              text-yellow-700
            `
            : status === "REFUNDED"
            ? `
              bg-blue-100
              text-blue-700
            `
            : `
              bg-red-100
              text-red-700
            `
        }
      `}
    >
      {status}
    </div>
  );
}
