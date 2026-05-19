
"use client";

import { useState } from "react";

import Link from "next/link";

import FavoriteButton from "@/src/features/favorites/components/FavoriteButton";

import { PackageType } from "../../types/package.types";

type Props = {
  packageItem: PackageType;
};

export default function PackageCard({
  packageItem,
}: Props) {
  const [expanded, setExpanded] =
    useState(false);

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
      {/* Image */}
      <div className="relative h-60">
        <img
          src={packageItem.image}
          alt={packageItem.title}
          className="
            w-full
            h-full
            object-cover
          "
        />

        <div className="absolute top-4 right-4">
          <FavoriteButton />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-2xl font-bold">
              {packageItem.title}
            </h2>

            <div
              className="
                bg-blue-100
                text-blue-700
                px-3
                py-1
                rounded-full
                text-sm
                font-semibold
                whitespace-nowrap
              "
            >
              {packageItem.remainingTickets} places
            </div>
          </div>

          <p className="text-gray-500 mt-1">
            {packageItem.city},{" "}
            {packageItem.country}
          </p>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p>
            ✈️ {packageItem.airline}
          </p>

          <p>
            🏨 {packageItem.hotel}
          </p>

          <p>
            🎯 {packageItem.excursion}
          </p>

          <p>
            📅 {packageItem.duration} nuits
          </p>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div
            className="
              bg-gray-50
              rounded-2xl
              p-4
              space-y-2
              text-sm
              text-gray-700
            "
          >
            <p>
              🛫 Départ : {packageItem.departureDate}
            </p>

            <p>
              🛬 Retour : {packageItem.returnDate}
            </p>

            <p>
              📍 Lieu Départ : {packageItem.departureLocation}
            </p>

            <p>
              🏨 Adresse Hôtel : {packageItem.hotelAddress}
            </p>

            <p>
              🚌 Transport : {packageItem.transport}
            </p>

            <p>
              🎯 Excursion : {packageItem.excursionLocation}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4 pt-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Prix
              </p>

              <p className="text-2xl font-bold text-blue-600">
                {packageItem.price.toLocaleString()} DZD
              </p>
            </div>

            <Link
              href={`/dashboard/packages/${packageItem.id}`}
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

          <button
            onClick={() =>
              setExpanded(!expanded)
            }
            className="
              w-full
              border
              border-blue-200
              text-blue-600
              hover:bg-blue-50
              transition
              py-3
              rounded-full
              font-semibold
            "
          >
            {expanded
              ? "Afficher moins"
              : "Afficher plus"}
          </button>
        </div>
      </div>
    </div>
  );
}
