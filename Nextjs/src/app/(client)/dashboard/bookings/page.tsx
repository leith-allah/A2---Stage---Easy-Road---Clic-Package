
"use client";

import BookingCard from
"@/features/bookings/components/BookingCard";

import { mockBookings }
from "@/features/bookings/data/mockBookings";

export default function BookingsPage() {
  return (
    <section className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-blue-600">
            Mes Réservations
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Consultez toutes vos réservations.
          </p>
        </div>

        {/* GRID */}
        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >
          {mockBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
