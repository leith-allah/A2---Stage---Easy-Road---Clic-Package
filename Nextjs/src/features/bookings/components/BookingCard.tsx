
import Link from "next/link";

import { Booking }
from "@/types/booking.types";

import BookingStatusBadge
from "./BookingStatusBadge";

type Props = {
  booking: Booking;
};

export default function BookingCard({
  booking,
}: Props) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        transition
      "
    >
      {/* IMAGE */}
      <div className="h-60">
        <img
          src={booking.image}
          alt={booking.packageTitle}
          className="
            w-full
            h-full
            object-cover
          "
        />
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-5">

        <div className="flex justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              {booking.packageTitle}
            </h2>

            <p className="text-gray-500">
              {booking.destination}
            </p>
          </div>

          <BookingStatusBadge
            status={booking.status}
          />
        </div>

        <div className="space-y-2 text-gray-700">

          <p>
            🎫 Réservation :
            {" "}
            {booking.bookingNumber}
          </p>

          <p>
            👥 Voyageurs :
            {" "}
            {booking.travelers}
          </p>

          <p>
            📅 Départ :
            {" "}
            {booking.departureDate}
          </p>

          <p>
            📅 Retour :
            {" "}
            {booking.returnDate}
          </p>
        </div>

        <div
          className="
            flex
            justify-between
            items-center
            pt-4
          "
        >
          <div>
            <p className="text-gray-500 text-sm">
              Total
            </p>

            <p
              className="
                text-2xl
                font-bold
                text-blue-600
              "
            >
              {booking.totalPrice.toLocaleString()}
              {" "}
              DZD
            </p>
          </div>

          <Link
            href={`/dashboard/bookings/${booking.id}`}
            className="
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              px-6
              py-3
              rounded-full
              font-semibold
            "
          >
            Voir
          </Link>
        </div>
      </div>
    </div>
  );
}
