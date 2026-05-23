
"use client";

import { useParams } from "next/navigation";

import Link from "next/link";

import QRCode from "react-qr-code";

import InvoicePDF from
"@/src/features/reservations/components/InvoicePDF";

import {
  Plane,
  Hotel,
  MapPin,
  Calendar,
  Users,
  CreditCard,
} from "lucide-react";

import { mockBookings }
from "@/src/features/reservations/data/mockBookings";

import BookingStatusBadge
from "@/src/features/reservations/components/BookingStatusBadge";

export default function
BookingDetailsPage() {

  const params = useParams();

  const booking = mockBookings.find(
    (booking) =>
      booking.id === Number(params.id)
  );

  if (!booking) {
    return (
      <section className="p-10">
        <h1 className="text-3xl font-bold">
          Réservation introuvable
        </h1>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* TOP */}
        <div
          className="
            flex
            flex-col
            xl:flex-row
            justify-between
            gap-6
          "
        >

          {/* LEFT */}
          <div>

            <div className="flex gap-4 items-center">

              <h1
                className="
                  text-5xl
                  font-bold
                  text-blue-600
                "
              >
                {booking.packageTitle}
              </h1>

              <BookingStatusBadge
                status={booking.status}
              />
            </div>

            <p
              className="
                text-gray-600
                mt-3
                text-lg
              "
            >
              {booking.destination}
            </p>

            <p
              className="
                text-gray-500
                mt-2
              "
            >
              🎫 {booking.bookingNumber}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4">

            <button
              className="
                bg-red-100
                text-red-600
                hover:bg-red-200
                transition
                px-6
                py-3
                rounded-full
                font-semibold
              "
            >
              Annuler
            </button>

            <InvoicePDF booking={booking} />
          </div>
        </div>

        {/* MAIN */}
        <div
          className="
            grid
            xl:grid-cols-[1fr_350px]
            gap-8
            items-start
          "
        >

          {/* LEFT */}
          <div className="space-y-8">

            {/* IMAGE */}
            <div
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-lg
              "
            >
              <img
                src={booking.image}
                alt={booking.packageTitle}
                className="
                  w-full
                  h-[450px]
                  object-cover
                "
              />
            </div>

            {/* TRAVEL INFO */}
            <div
              className="
                bg-white
                rounded-3xl
                shadow-lg
                p-8
              "
            >
              <h2
                className="
                  text-3xl
                  font-bold
                  mb-8
                "
              >
                Informations Voyage
              </h2>

              <div
                className="
                  grid
                  md:grid-cols-2
                  gap-6
                "
              >

                <div
                  className="
                    bg-gray-50
                    rounded-2xl
                    p-5
                  "
                >
                  <Plane
                    className="mb-4"
                  />

                  <p className="text-gray-500">
                    Compagnie
                  </p>

                  <h3 className="font-bold text-lg">
                    Emirates
                  </h3>
                </div>

                <div
                  className="
                    bg-gray-50
                    rounded-2xl
                    p-5
                  "
                >
                  <Hotel
                    className="mb-4"
                  />

                  <p className="text-gray-500">
                    Hôtel
                  </p>

                  <h3 className="font-bold text-lg">
                    Atlantis The Palm
                  </h3>
                </div>

                <div
                  className="
                    bg-gray-50
                    rounded-2xl
                    p-5
                  "
                >
                  <Calendar
                    className="mb-4"
                  />

                  <p className="text-gray-500">
                    Départ
                  </p>

                  <h3 className="font-bold text-lg">
                    {
                      booking.departureDate
                    }
                  </h3>
                </div>

                <div
                  className="
                    bg-gray-50
                    rounded-2xl
                    p-5
                  "
                >
                  <Calendar
                    className="mb-4"
                  />

                  <p className="text-gray-500">
                    Retour
                  </p>

                  <h3 className="font-bold text-lg">
                    {booking.returnDate}
                  </h3>
                </div>

                <div
                  className="
                    bg-gray-50
                    rounded-2xl
                    p-5
                  "
                >
                  <Users
                    className="mb-4"
                  />

                  <p className="text-gray-500">
                    Voyageurs
                  </p>

                  <h3 className="font-bold text-lg">
                    {booking.travelers}
                  </h3>
                </div>

                <div
                  className="
                    bg-gray-50
                    rounded-2xl
                    p-5
                  "
                >
                  <MapPin
                    className="mb-4"
                  />

                  <p className="text-gray-500">
                    Destination
                  </p>

                  <h3 className="font-bold text-lg">
                    {booking.destination}
                  </h3>
                </div>

              </div>
            </div>

            {/* PAYMENT */}
            <div
              className="
                bg-white
                rounded-3xl
                shadow-lg
                p-8
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-4
                  mb-8
                "
              >
                <CreditCard />

                <h2
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  Paiement
                </h2>
              </div>

              <div
                className="
                  flex
                  justify-between
                  items-center
                "
              >
                <div>
                  <p className="text-gray-500">
                    Montant payé
                  </p>

                  <h3
                    className="
                      text-4xl
                      font-bold
                      text-blue-600
                    "
                  >
                    {
                      booking.totalPrice
                        .toLocaleString()
                    }
                    {" "}
                    DZD
                  </h3>
                </div>

                <div
                  className="
                    bg-green-100
                    text-green-700
                    px-5
                    py-3
                    rounded-full
                    font-semibold
                  "
                >
                  PAYÉ
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            {/* QR */}
            <div
              className="
                bg-white
                rounded-3xl
                shadow-lg
                p-8
                text-center
              "
            >
              <h2
                className="
                  text-2xl
                  font-bold
                  mb-6
                "
              >
                QR Ticket
              </h2>

              <div
                className="
                  bg-white
                  p-5
                  rounded-2xl
                  inline-block
                "
              >
                <QRCode
                  value={booking.bookingNumber}
                  size={220}
                />
              </div>

              <p
                className="
                  text-gray-500
                  mt-5
                "
              >
                Présentez ce QR code
                lors du check-in.
              </p>
            </div>

            {/* TIMELINE */}
            <div
              className="
                bg-white
                rounded-3xl
                shadow-lg
                p-8
              "
            >
              <h2
                className="
                  text-2xl
                  font-bold
                  mb-8
                "
              >
                Historique
              </h2>

              <div className="space-y-6">

                <div className="flex gap-4">
                  <div
                    className="
                      w-4
                      h-4
                      rounded-full
                      bg-green-500
                      mt-1
                    "
                  />

                  <div>
                    <h3 className="font-bold">
                      Réservation confirmée
                    </h3>

                    <p className="text-gray-500 text-sm">
                      21 Mai 2026
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div
                    className="
                      w-4
                      h-4
                      rounded-full
                      bg-blue-500
                      mt-1
                    "
                  />

                  <div>
                    <h3 className="font-bold">
                      Paiement reçu
                    </h3>

                    <p className="text-gray-500 text-sm">
                      21 Mai 2026
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div
                    className="
                      w-4
                      h-4
                      rounded-full
                      bg-yellow-500
                      mt-1
                    "
                  />

                  <div>
                    <h3 className="font-bold">
                      Ticket généré
                    </h3>

                    <p className="text-gray-500 text-sm">
                      22 Mai 2026
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* BACK */}
            <Link
              href="/dashboard/bookings"
              className="
                block
                bg-gray-200
                hover:bg-gray-300
                transition
                text-center
                py-4
                rounded-full
                font-semibold
              "
            >
              Retour Réservations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
