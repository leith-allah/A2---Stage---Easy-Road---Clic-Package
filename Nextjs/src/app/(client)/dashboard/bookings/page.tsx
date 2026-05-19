
"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import SearchBar from "@/src/components/ui/SearchBar";
import FilterBar from "@/src/components/ui/FilterBar";

export default function BookingsPage() {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("recent");

  const bookings = [
    {
      id: "RES-2026-001",
      packageName: "Dubai Luxury",
      destination: "Dubai",
      travelers: 2,
      total: 780000,
      departureDate: "15 Juin 2026",
      status: "Confirmée",
      paymentStatus: "Payé",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    },

    {
      id: "RES-2026-002",
      packageName: "Maldives Escape",
      destination: "Maldives",
      travelers: 4,
      total: 1450000,
      departureDate: "04 Juillet 2026",
      status: "En attente",
      paymentStatus: "En attente",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },

    {
      id: "RES-2026-003",
      packageName: "Istanbul Premium",
      destination: "Turquie",
      travelers: 1,
      total: 210000,
      departureDate: "21 Mai 2026",
      status: "Terminée",
      paymentStatus: "Payé",
      image:
        "https://images.unsplash.com/photo-1527838832700-5059252407fa",
    },
  ];

  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    // Recherche
    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((booking) => {
        return (
          booking.packageName
            .toLowerCase()
            .includes(keyword) ||
          booking.destination
            .toLowerCase()
            .includes(keyword) ||
          booking.status
            .toLowerCase()
            .includes(keyword) ||
          booking.paymentStatus
            .toLowerCase()
            .includes(keyword)
        );
      });
    }

    // Filtres
    switch (filter) {
      case "price-desc":
        result.sort((a, b) => b.total - a.total);
        break;

      case "price-asc":
        result.sort((a, b) => a.total - b.total);
        break;

      default:
        break;
    }

    return result;
  }, [search, filter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmée":
        return "bg-green-100 text-green-700";

      case "En attente":
        return "bg-orange-100 text-orange-700";

      case "Terminée":
        return "bg-blue-100 text-blue-700";

      case "Annulée":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-10">

          <div>
            <h1 className="text-5xl font-bold text-blue-600">
              Mes Réservations
            </h1>

            <p className="text-gray-600 mt-3 text-lg">
              Gérez tous vos voyages et réservations.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">

            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Rechercher une réservation..."
            />

            <FilterBar
              value={filter}
              onChange={setFilter}
              options={[
                {
                  label: "Plus récent",
                  value: "recent",
                },

                {
                  label: "Prix croissant",
                  value: "price-asc",
                },

                {
                  label: "Prix décroissant",
                  value: "price-desc",
                },
              ]}
            />
          </div>
        </div>

        {/* LISTE */}
        <div className="space-y-8">

          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="
                bg-white
                rounded-3xl
                shadow-lg
                overflow-hidden
                flex
                flex-col
                xl:flex-row
              "
            >

              {/* IMAGE */}
              <div className="xl:w-[340px] h-[250px]">
                <img
                  src={booking.image}
                  alt={booking.packageName}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />
              </div>

              {/* CONTENT */}
              <div
                className="
                  flex-1
                  p-8
                  flex
                  flex-col
                  justify-between
                  gap-8
                "
              >

                {/* TOP */}
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">

                  {/* INFOS */}
                  <div className="space-y-3">

                    <div>
                      <p className="text-sm text-gray-400">
                        {booking.id}
                      </p>

                      <h2 className="text-3xl font-bold">
                        {booking.packageName}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        {booking.destination}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">

                      <div
                        className={`
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          font-semibold
                          ${getStatusColor(booking.status)}
                        `}
                      >
                        {booking.status}
                      </div>

                      <div
                        className={`
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          font-semibold
                          ${getStatusColor(
                            booking.paymentStatus
                          )}
                        `}
                      >
                        {booking.paymentStatus}
                      </div>

                    </div>
                  </div>

                  {/* PRIX */}
                  <div className="text-left xl:text-right">

                    <p className="text-gray-500 text-sm">
                      Total
                    </p>

                    <h3 className="text-4xl font-bold text-blue-600">
                      {booking.total.toLocaleString()} DZD
                    </h3>
                  </div>
                </div>

                {/* BOTTOM */}
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                  {/* DETAILS */}
                  <div className="flex flex-wrap gap-8">

                    <div>
                      <p className="text-gray-500 text-sm">
                        Voyageurs
                      </p>

                      <p className="font-semibold">
                        {booking.travelers}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Départ
                      </p>

                      <p className="font-semibold">
                        {booking.departureDate}
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap gap-4">

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

                    <button
                      className="
                        border
                        border-gray-300
                        hover:bg-gray-100
                        transition
                        px-6
                        py-3
                        rounded-full
                        font-semibold
                      "
                    >
                      Facture
                    </button>

                    <button
                      className="
                        border
                        border-red-300
                        text-red-500
                        hover:bg-red-50
                        transition
                        px-6
                        py-3
                        rounded-full
                        font-semibold
                      "
                    >
                      Annuler
                    </button>

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* VIDE */}
        {filteredBookings.length === 0 && (
          <div
            className="
              bg-white
              rounded-3xl
              shadow-md
              p-16
              text-center
              mt-10
            "
          >
            <h3 className="text-3xl font-bold mb-4">
              Aucune réservation
            </h3>

            <p className="text-gray-600">
              Aucune réservation ne correspond
              à votre recherche.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
