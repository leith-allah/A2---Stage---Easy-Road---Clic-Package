
"use client";

import { useRouter } from "next/navigation";
import { Heart, Pencil } from "lucide-react";
import { useFavoriteContext } from "@/providers/FavoriteProvider";
import { useAuthContext } from "@/providers/AuthProvider";

export type PackageCardProps = {
  id: number;
  name: string;
  country: string;
  destination: string;
  image?: string | null;
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
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavoriteContext();
  const { user } = useAuthContext();

  // 🔒 Seuls les rôles d'administration peuvent voir le bouton d'édition
  const canEdit =
    !!user && ["OWNER", "SUPER_ADMIN", "ADMIN"].includes(user.role);

  return (
    <article
      onClick={() => router.push(`/dashboard/packages/${id}`)}
      className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-md
        hover:shadow-xl
        transition
        cursor-pointer
        relative
        group
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

        {/* 🔒 Bouton Édition : Redirection programmatique sans imbrication <a> */}
        {canEdit && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/dashboard/packages/${id}/edit`);
            }}
            className="
              absolute
              top-4
              left-4
              bg-white/90
              hover:bg-white
              text-slate-700
              hover:text-blue-600
              rounded-full
              p-2.5
              shadow-lg
              hover:scale-110
              transition
              flex
              items-center
              justify-center
            "
            title="Modifier le package"
          >
            <Pencil size={18} />
          </button>
        )}

        {/* Bouton Favoris (Cœur) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(id);
          }}
          className="
            absolute
            top-4
            right-4
            bg-white/90
            hover:bg-white
            rounded-full
            p-2.5
            shadow-lg
            hover:scale-110
            transition
          "
          title="Ajouter aux favoris"
        >
          <Heart
            size={20}
            fill={isFavorite(id) ? "red" : "none"}
            color={isFavorite(id) ? "red" : "black"}
          />
        </button>
      </div>

      <div className="p-6 space-y-3">
        <p className="text-blue-600 font-semibold">{country}</p>

        <h2 className="text-2xl font-bold">{name}</h2>

        <p className="text-gray-500">{destination}</p>

        <div className="pt-3">
          <p className="text-sm text-gray-500">Départ :</p>
          <p className="font-semibold">
            {new Date(departureDate).toLocaleDateString("fr-FR")}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Retour :</p>
          <p className="font-semibold">
            {new Date(returnDate).toLocaleDateString("fr-FR")}
          </p>
        </div>

        <div className="pt-4 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Prix à partir de</p>
            <p
              className="
                text-2xl
                font-bold
                text-blue-600
              "
            >
              {basePrice.toLocaleString()} DZD
            </p>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-sm">Places</p>
            <p className="font-bold">{availableSeats}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
