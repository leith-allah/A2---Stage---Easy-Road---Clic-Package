
"use client";

import { useEffect, useState } from "react";

import BookingCard from
"@/features/bookings/components/BookingCard";

import { getMyBookings }
from "@/features/bookings/services/booking.service";


export default function BookingsPage() {

  const [bookings, setBookings] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadBookings() {

      try {

        const data =
          await getMyBookings();

        setBookings(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadBookings();

  }, []);

  if (loading) {

    return (

      <section className="p-10">

        <h1 className="text-3xl font-bold">
          Chargement...
        </h1>

      </section>

    );

  }

  return (
    <section className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-blue-600">
            Mes Réservations
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Consultez toutes vos réservations.
          </p>

        </div>

        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >

          {bookings.length === 0 ? (

            <div
              className="
                col-span-full
                bg-white
                rounded-2xl
                p-10
                text-center
              "
            >
              <h2 className="text-2xl font-bold mb-2">
                Aucune réservation
              </h2>

              <p className="text-gray-500">
                Vous n'avez encore effectué aucun achat.
              </p>

            </div>

          ) : (

            bookings.map((booking) => (

              <BookingCard
                key={booking.id}
                booking={booking}
              />

            ))

          )}

        </div>

      </div>

    </section>
  );

}
