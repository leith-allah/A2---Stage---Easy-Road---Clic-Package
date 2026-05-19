
"use client";

import Link from "next/link";

export default function BookingDetailsPage() {
  const booking = {
    id: "RES-2026-001",

    status: "Confirmée",

    paymentStatus: "Payé",

    packageName: "Dubai Luxury Experience",

    destination: "Dubai, Émirats Arabes Unis",

    travelers: 2,

    departureDate: "15 Juin 2026",

    returnDate: "22 Juin 2026",

    airline: "Emirates",

    flightNumber: "EK204",

    departureAirport: "Aéroport d'Alger",

    departureTime: "09:45",

    arrivalTime: "18:20",

    returnDepartureTime: "11:15",

    returnArrivalTime: "16:40",

    flightClass: "Business",

    hotel: "Atlantis The Palm",

    stars: 5,

    roomType: "Suite Deluxe",

    pension: "All Inclusive",

    address:
      "Crescent Rd - Palm Jumeirah - Dubai",

    transport:
      "Aéroport → Hôtel → Aéroport",

    transportCompany: "Dubai Luxury Transport",

    excursion: "Safari Premium Désert",

    excursionLocation: "Dubai Desert",

    excursionDescription:
      "Safari VIP avec dîner gastronomique et spectacle.",

    subtotal: 680000,

    discount: 50000,

    total: 630000,

    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
  };

  const statusColor =
    booking.status === "Confirmée"
      ? "bg-green-100 text-green-700"
      : "bg-orange-100 text-orange-700";

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div
          className="
            bg-white
            rounded-3xl
            shadow-lg
            overflow-hidden
          "
        >

          <div className="relative h-[350px]">

            <img
              src={booking.image}
              alt={booking.packageName}
              className="
                w-full
                h-full
                object-cover
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-black/40
              "
            />

            <div
              className="
                absolute
                bottom-0
                left-0
                p-10
                text-white
              "
            >

              <p className="text-sm opacity-80">
                {booking.id}
              </p>

              <h1 className="text-5xl font-bold mt-2">
                {booking.packageName}
              </h1>

              <p className="mt-3 text-xl opacity-90">
                {booking.destination}
              </p>

              <div className="flex gap-4 mt-6">

                <div
                  className={`
                    px-5
                    py-2
                    rounded-full
                    font-semibold
                    ${statusColor}
                  `}
                >
                  {booking.status}
                </div>

                <div
                  className="
                    bg-blue-100
                    text-blue-700
                    px-5
                    py-2
                    rounded-full
                    font-semibold
                  "
                >
                  {booking.paymentStatus}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid xl:grid-cols-3 gap-8 items-start">

          {/* LEFT */}
          <div className="xl:col-span-2 space-y-8">

            {/* VOYAGE */}
            <div className="bg-white rounded-3xl shadow-md p-8">

              <h2 className="text-3xl font-bold mb-8">
                Informations Voyage
              </h2>

              <div className="grid md:grid-cols-2 gap-8">

                <Info
                  label="Date Départ"
                  value={booking.departureDate}
                />

                <Info
                  label="Date Retour"
                  value={booking.returnDate}
                />

                <Info
                  label="Voyageurs"
                  value={booking.travelers}
                />

                <Info
                  label="Destination"
                  value={booking.destination}
                />

              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            {/* PAYMENT */}
            <div
              className="
                bg-white
                rounded-3xl
                shadow-lg
                p-8
                sticky
                top-8
              "
            >

              <h2 className="text-3xl font-bold mb-8">
                Paiement
              </h2>

              <div className="space-y-5">

                <Price
                  label="Sous-total"
                  value={booking.subtotal}
                />

                <Price
                  label="Remise"
                  value={-booking.discount}
                />

                <div className="border-t pt-5">

                  <div className="flex justify-between items-center">

                    <span className="text-lg font-semibold">
                      Total Final
                    </span>

                    <span
                      className="
                        text-3xl
                        font-bold
                        text-blue-600
                      "
                    >
                      {booking.total.toLocaleString()} DZD
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="space-y-4 mt-10">

                <button
                  className="
                    w-full
                    bg-blue-600
                    hover:bg-blue-700
                    transition
                    text-white
                    py-4
                    rounded-full
                    font-semibold
                  "
                >
                  Télécharger Facture
                </button>

                <button
                  className="
                    w-full
                    border
                    border-gray-300
                    hover:bg-gray-100
                    transition
                    py-4
                    rounded-full
                    font-semibold
                  "
                >
                  Imprimer
                </button>

                <button
                  className="
                    w-full
                    border
                    border-red-300
                    text-red-500
                    hover:bg-red-50
                    transition
                    py-4
                    rounded-full
                    font-semibold
                  "
                >
                  Annuler Réservation
                </button>

              </div>
            </div>
          </div>
        </div>


        {/* Down */}
        <div className="grid md:grid-cols-2 gap-8 items-start mt-8">

            {/* FLIGHT */}
            <div className="bg-white rounded-3xl shadow-md p-8">

              <h2 className="text-3xl font-bold mb-8">
                Vol
              </h2>

              <div className="grid md:grid-cols-2 gap-8">

                <Info
                  label="Compagnie"
                  value={booking.airline}
                />

                <Info
                  label="Numéro Vol"
                  value={booking.flightNumber}
                />

                <Info
                  label="Départ"
                  value={booking.departureTime}
                />

                <Info
                  label="Arrivée"
                  value={booking.arrivalTime}
                />

                <Info
                  label="Retour Départ"
                  value={booking.returnDepartureTime}
                />

                <Info
                  label="Retour Arrivée"
                  value={booking.returnArrivalTime}
                />

                <Info
                  label="Classe"
                  value={booking.flightClass}
                />

                <Info
                  label="Aéroport"
                  value={booking.departureAirport}
                />

              </div>
            </div>

            {/* HOTEL */}
            <div className="bg-white rounded-3xl shadow-md p-8">

              <h2 className="text-3xl font-bold mb-8">
                Hôtel
              </h2>

              <div className="grid md:grid-cols-2 gap-8">

                <Info
                  label="Nom Hôtel"
                  value={booking.hotel}
                />

                <Info
                  label="Étoiles"
                  value={`${booking.stars} ★`}
                />

                <Info
                  label="Chambre"
                  value={booking.roomType}
                />

                <Info
                  label="Pension"
                  value={booking.pension}
                />

                <Info
                  label="Adresse"
                  value={booking.address}
                />

              </div>
            </div>
          
            {/* TRANSPORT */}
            <div className="bg-white rounded-3xl shadow-md p-8">

              <h2 className="text-3xl font-bold mb-8">
                Transport
              </h2>

              <div className="grid md:grid-cols-2 gap-8">

                <Info
                  label="Société"
                  value={booking.transportCompany}
                />

                <Info
                  label="Trajet"
                  value={booking.transport}
                />

              </div>
            </div>

            {/* EXCURSION */}
            <div className="bg-white rounded-3xl shadow-md p-8">

              <h2 className="text-3xl font-bold mb-8">
                Excursion
              </h2>

              <div className="space-y-6">

                <Info
                  label="Nom"
                  value={booking.excursion}
                />

                <Info
                  label="Lieu"
                  value={booking.excursionLocation}
                />

                <div>
                  <p className="text-gray-500 text-sm">
                    Description
                  </p>

                  <p className="font-semibold mt-2">
                    {booking.excursionDescription}
                  </p>
                </div>

              </div>
            </div>
        </div>


        {/* BACK */}
        <Link
          href="/dashboard/bookings"
          className="
            inline-flex
            items-center
            gap-2
            text-blue-600
            hover:underline
            font-semibold
          "
        >
          ← Retour aux réservations
        </Link>

      </div>
    </section>
  );
}

/* INFO */
function Info({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-gray-500 text-sm">
        {label}
      </p>

      <p className="font-semibold text-lg mt-1">
        {value}
      </p>
    </div>
  );
}

/* PRICE */
function Price({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex justify-between items-center">

      <span className="text-gray-600">
        {label}
      </span>

      <span className="font-semibold">
        {value.toLocaleString()} DZD
      </span>

    </div>
  );
}
