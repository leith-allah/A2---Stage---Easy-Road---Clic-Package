
"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavoriteContext } from "@/providers/FavoriteProvider";

export type PackageCardProps = {
  id: number;
  name: string;
  country: string;
  destination: string;
  image?: string |null;
  basePrice: number;
  availableSeats: number;
  departureDate: string;
  returnDate: string;
};

export default function PackageCard({
  id,
  name,
  country,
  destination,
  image,
  basePrice,
  availableSeats,
  departureDate,
  returnDate,
}: PackageCardProps) {

  const {
    isFavorite,
    toggleFavorite,
  } = useFavoriteContext();

  return (

    <Link href={`/dashboard/packages/${id}`}>

      <article
        className="
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-md
          hover:shadow-xl
          transition
          cursor-pointer
        "
      >

        <div className="relative">

          <img
            src={
              image?.trim()
                ? image
                : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            }
            alt={name}
            className="
              w-full
              h-64
              object-cover
            "
          />

          <button

            onClick={(e) => {

              e.preventDefault();
              e.stopPropagation();

              toggleFavorite(id);

            }}

            className="
              absolute
              top-4
              right-4
              bg-white
              rounded-full
              p-2
              shadow-lg
              hover:scale-110
              transition
            "

          >

            <Heart

              size={22}

              fill={
                isFavorite(id)
                  ? "red"
                  : "none"
              }

              color={
                isFavorite(id)
                  ? "red"
                  : "black"
              }

            />

          </button>

        </div>

        <div className="p-6 space-y-3">

          <p className="text-blue-600 font-semibold">
            {country}
          </p>

          <h2 className="text-2xl font-bold">
            {name}
          </h2>

          <p className="text-gray-500">
            {destination}
          </p>

          <div className="pt-3">

            <p className="text-sm text-gray-500">
              Départ :
            </p>

            <p className="font-semibold">
              {new Date(
                departureDate
              ).toLocaleDateString("fr-FR")}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Retour :
            </p>

            <p className="font-semibold">
              {new Date(
                returnDate
              ).toLocaleDateString("fr-FR")}
            </p>

          </div>

          <div className="pt-4 flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Prix à partir de
              </p>

              <p className="
                text-2xl
                font-bold
                text-blue-600
              ">

                {basePrice.toLocaleString()} DZD

              </p>

            </div>

            <div className="text-right">

              <p className="text-gray-500 text-sm">
                Places
              </p>

              <p className="font-bold">
                {availableSeats}
              </p>

            </div>

          </div>

        </div>

      </article>

    </Link>

  );

}
