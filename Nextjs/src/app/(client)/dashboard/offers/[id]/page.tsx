
"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import FavoriteButton from "@/features/favorites/components/FavoriteButton";

import ReserveButton from "@/features/offers/components/ReserveButton";

export default function PackageDetailsPage() {
  const packageData = {
    id: 1,

    name: "Package Dubai Luxury",

    country: "Émirats Arabes Unis",

    destination: "Dubai",

    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",

    description:
      "Découvrez une expérience luxueuse à Dubai avec hôtel 5 étoiles, excursions premium, transferts privés et vols internationaux inclus.",

    departureDate: "12 Juin 2026",

    returnDate: "19 Juin 2026",

    basePrice: 350000,

    stock: 14,

    airline: "Emirates",

    departureLocation: "Aéroport d'Alger",

    departureTimeOutbound: "09:30",

    arrivalTimeOutbound: "18:45",

    departureTimeReturn: "21:15",

    arrivalTimeReturn: "05:50",

    flightNumber: "EK 758",

    hotelName: "Atlantis The Palm",

    hotelStars: 5,

    hotelAddress:
      "Crescent Rd - The Palm Jumeirah - Dubai",

    transportRoute:
      "Aéroport Dubai → Hôtel → Aéroport Dubai",

    transportCompany: "Dubai Luxury Transport",

    excursionName: "Safari Désert VIP",

    excursionLocation: "Dubai Desert",

    excursionDescription:
      "Excursion complète avec dîner gastronomique et activités premium.",

    availableSeats: 14,
  };

  const [travelers, setTravelers] = useState(1);

  const [flightClass, setFlightClass] =
    useState("economy");

  const [roomType, setRoomType] =
    useState("double");

  const [pension, setPension] =
    useState("breakfast");

  // Prix dynamiques
  const totalPrice = useMemo(() => {
    let price = packageData.basePrice;

    // Classe Vol
    if (flightClass === "business") {
      price += 120000;
    }

    if (flightClass === "first") {
      price += 250000;
    }

    // Chambre
    if (roomType === "single") {
      price += 50000;
    }

    if (roomType === "suite") {
      price += 180000;
    }

    // Pension
    if (pension === "half") {
      price += 30000;
    }

    if (pension === "full") {
      price += 70000;
    }

    return price * travelers;
  }, [
    travelers,
    flightClass,
    roomType,
    pension,
  ]);

  const discount = useMemo(() => {
    if (travelers >= 4) {
      return 50000;
    }

    return 0;
  }, [travelers]);

  const finalPrice = totalPrice - discount;

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col xl:flex-row gap-10">

          {/* LEFT */}
          <div className="flex-1 space-y-8">

            {/* Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <img
                src={packageData.image}
                alt={packageData.name}
                className="
                  w-full
                  h-[450px]
                  object-cover
                "
              />

              <div className="absolute top-6 right-6">
                <FavoriteButton initialFavorite={false} />
              </div>

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  bg-white/90
                  backdrop-blur-md
                  px-5
                  py-3
                  rounded-2xl
                "
              >
                <p className="text-sm text-gray-500">
                  Places restantes
                </p>

                <p className="text-2xl font-bold text-blue-600">
                  {packageData.availableSeats}
                </p>
              </div>
            </div>

            {/* Infos principales */}
            <div className="bg-white rounded-3xl shadow-md p-8">
              <div className="flex items-start justify-between gap-6">

                <div>
                  <p className="text-blue-600 font-semibold">
                    {packageData.country}
                  </p>

                  <h1 className="text-5xl font-bold mt-2">
                    {packageData.name}
                  </h1>

                  <p className="text-gray-500 mt-3 text-lg">
                    {packageData.destination}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-gray-500">
                    Prix de base
                  </p>

                  <h2
                    className="
                      text-4xl
                      font-bold
                      text-blue-600
                    "
                  >
                    {packageData.basePrice.toLocaleString()}{" "}
                    DZD
                  </h2>
                </div>
              </div>

              <p
                className="
                  mt-8
                  text-gray-700
                  leading-8
                "
              >
                {packageData.description}
              </p>
            </div>

            {/* Vol */}
            <div className="bg-white rounded-3xl shadow-md p-8">
              <h2 className="text-3xl font-bold mb-8">
                Informations Vol
              </h2>

              <div className="grid md:grid-cols-2 gap-8">

                <div className="space-y-5">
                  <Info
                    label="Compagnie"
                    value={packageData.airline}
                  />

                  <Info
                    label="Numéro Vol"
                    value={packageData.flightNumber}
                  />

                  <Info
                    label="Lieu Départ"
                    value={
                      packageData.departureLocation
                    }
                  />
                </div>

                <div className="space-y-5">
                  <Info
                    label="Aller"
                    value={`${packageData.departureTimeOutbound} → ${packageData.arrivalTimeOutbound}`}
                  />

                  <Info
                    label="Retour"
                    value={`${packageData.departureTimeReturn} → ${packageData.arrivalTimeReturn}`}
                  />

                  <Info
                    label="Dates"
                    value={`${packageData.departureDate} → ${packageData.returnDate}`}
                  />
                </div>
              </div>
            </div>

            {/* Hôtel */}
            <div className="bg-white rounded-3xl shadow-md p-8">
              <h2 className="text-3xl font-bold mb-8">
                Hôtel
              </h2>

              <div className="space-y-5">
                <Info
                  label="Nom Hôtel"
                  value={packageData.hotelName}
                />

                <Info
                  label="Étoiles"
                  value={"⭐".repeat(
                    packageData.hotelStars
                  )}
                />

                <Info
                  label="Adresse"
                  value={packageData.hotelAddress}
                />
              </div>
            </div>

            {/* Transport */}
            <div className="bg-white rounded-3xl shadow-md p-8">
              <h2 className="text-3xl font-bold mb-8">
                Transport
              </h2>

              <div className="space-y-5">
                <Info
                  label="Société"
                  value={
                    packageData.transportCompany
                  }
                />

                <Info
                  label="Trajet"
                  value={
                    packageData.transportRoute
                  }
                />
              </div>
            </div>

            {/* Excursion */}
            <div className="bg-white rounded-3xl shadow-md p-8">
              <h2 className="text-3xl font-bold mb-8">
                Excursion Incluse
              </h2>

              <div className="space-y-5">
                <Info
                  label="Nom"
                  value={
                    packageData.excursionName
                  }
                />

                <Info
                  label="Lieu"
                  value={
                    packageData.excursionLocation
                  }
                />

                <Info
                  label="Description"
                  value={
                    packageData.excursionDescription
                  }
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full xl:w-[420px]">

            <div
              className="
                sticky
                top-8
                bg-white
                rounded-3xl
                shadow-xl
                p-8
              "
            >
              <h2 className="text-3xl font-bold mb-8">
                Réservation
              </h2>

              <div className="space-y-6">

                {/* Voyageurs */}
                <div>
                  <label className="font-semibold">
                    Nombre Voyageurs
                  </label>

                  <select
                    value={travelers}
                    onChange={(e) =>
                      setTravelers(
                        Number(e.target.value)
                      )
                    }
                    className="
                      w-full
                      mt-2
                      border
                      rounded-2xl
                      px-4
                      py-4
                    "
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option
                        key={n}
                        value={n}
                      >
                        {n} Voyageur{n > 1 && "s"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Classe */}
                <div>
                  <label className="font-semibold">
                    Classe Vol
                  </label>

                  <select
                    value={flightClass}
                    onChange={(e) =>
                      setFlightClass(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      mt-2
                      border
                      rounded-2xl
                      px-4
                      py-4
                    "
                  >
                    <option value="economy">
                      Économique
                    </option>

                    <option value="business">
                      Business
                    </option>

                    <option value="first">
                      First Class
                    </option>
                  </select>
                </div>

                {/* Chambre */}
                <div>
                  <label className="font-semibold">
                    Type Chambre
                  </label>

                  <select
                    value={roomType}
                    onChange={(e) =>
                      setRoomType(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      mt-2
                      border
                      rounded-2xl
                      px-4
                      py-4
                    "
                  >
                    <option value="double">
                      Double
                    </option>

                    <option value="single">
                      Single
                    </option>

                    <option value="suite">
                      Suite
                    </option>
                  </select>
                </div>

                {/* Pension */}
                <div>
                  <label className="font-semibold">
                    Pension
                  </label>

                  <select
                    value={pension}
                    onChange={(e) =>
                      setPension(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      mt-2
                      border
                      rounded-2xl
                      px-4
                      py-4
                    "
                  >
                    <option value="breakfast">
                      Petit Déjeuner
                    </option>

                    <option value="half">
                      Demi Pension
                    </option>

                    <option value="full">
                      Pension Complète
                    </option>
                  </select>
                </div>
              </div>

              {/* Pricing */}
              <div
                className="
                  mt-10
                  pt-8
                  border-t
                  space-y-4
                "
              >
                <PriceRow
                  label="Prix Achat"
                  value={`${totalPrice.toLocaleString()} DZD`}
                />

                <PriceRow
                  label="Remise"
                  value={`-${discount.toLocaleString()} DZD`}
                  green
                />

                <div
                  className="
                    flex
                    justify-between
                    items-center
                    pt-4
                  "
                >
                  <p className="text-xl font-bold">
                    Total Final
                  </p>

                  <p
                    className="
                      text-3xl
                      font-bold
                      text-blue-600
                    "
                  >
                    {finalPrice.toLocaleString()} DZD
                  </p>
                </div>
              </div>

              {/* CTA */}
              <ReserveButton
                total={finalPrice}
              />

              <Link
                href="/dashboard/offers"
                className="
                  block
                  text-center
                  mt-5
                  text-gray-500
                  hover:text-black
                "
              >
                Retour aux Offres
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-2
        border-b
        pb-4
      "
    >
      <p className="text-gray-500 font-medium">
        {label}
      </p>

      <p className="font-semibold text-right">
        {value}
      </p>
    </div>
  );
}

function PriceRow({
  label,
  value,
  green,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-gray-500">{label}</p>

      <p
        className={`font-semibold ${
          green ? "text-green-600" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
