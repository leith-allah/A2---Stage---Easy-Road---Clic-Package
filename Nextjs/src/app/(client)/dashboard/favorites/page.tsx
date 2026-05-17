
"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import BackButton from "@/src/components/navigation/BackButton";

import SearchBar from "@/src/components/ui/SearchBar";
import FilterBar from "@/src/components/ui/FilterBar";

import FavoriteButton from "@/src/features/favorites/components/FavoriteButton";

export default function FavoritesPage() {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("recent");

  const favorites = [
    {
      id: 1,
      title: "Package Dubai Luxury",
      destination: "Dubai, Émirats Arabes Unis",
      country: "Dubai",
      type: "Luxury",
      price: 350000,
      duration: "7 Jours",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    },
    {
      id: 2,
      title: "Package Istanbul Premium",
      destination: "Istanbul, Turquie",
      country: "Turquie",
      type: "Premium",
      price: 180000,
      duration: "5 Jours",
      image:
        "https://images.unsplash.com/photo-1527838832700-5059252407fa",
    },
    {
      id: 3,
      title: "Package Maldives Escape",
      destination: "Maldives",
      country: "Maldives",
      type: "Relax",
      price: 520000,
      duration: "10 Jours",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
  ];

  const filteredFavorites = useMemo(() => {
    let result = [...favorites];

    // Recherche intelligente
    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((favorite) => {
        return (
          favorite.title.toLowerCase().includes(keyword) ||
          favorite.destination.toLowerCase().includes(keyword) ||
          favorite.country.toLowerCase().includes(keyword) ||
          favorite.type.toLowerCase().includes(keyword) ||
          favorite.price.toString().includes(keyword) ||
          favorite.duration.toLowerCase().includes(keyword)
        );
      });
    }

    // Filtres
    switch (filter) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;

      case "country-asc":
        result.sort((a, b) =>
          a.country.localeCompare(b.country)
        );
        break;

      default:
        break;
    }

    return result;
  }, [search, filter]);

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Retour */}
        <div className="mb-6">
          <BackButton href="/dashboard" />
        </div>

        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-12">

          {/* Texte */}
          <div>
            <h1 className="text-5xl font-bold text-blue-600">
              Mes Favoris
            </h1>

            <p className="text-gray-600 mt-3 text-lg">
              Retrouvez rapidement tous les packages
              enregistrés dans vos favoris.
            </p>
          </div>

          {/* Recherche + Filtre */}
          <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">

            <div className="w-full md:w-80">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Rechercher un favori..."
              />
            </div>

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
                {
                  label: "Pays (A-Z)",
                  value: "country-asc",
                },
              ]}
            />
          </div>
        </div>

        {/* Liste des favoris */}
        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >
          {filteredFavorites.map((favorite) => (
            <div
              key={favorite.id}
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
              <div className="relative h-60 w-full">
                <img
                  src={favorite.image}
                  alt={favorite.title}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

                {/* Bouton Favori */}
                <div className="absolute top-4 right-4">
                  <FavoriteButton initialFavorite={true} />
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6 space-y-4">

                <div>
                  <h2 className="text-2xl font-bold">
                    {favorite.title}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {favorite.destination}
                  </p>
                </div>

                {/* Infos */}
                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-gray-500 text-sm">
                      Durée
                    </p>

                    <p className="font-semibold">
                      {favorite.duration}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-500 text-sm">
                      Prix
                    </p>

                    <p
                      className="
                        text-xl
                        font-bold
                        text-blue-600
                      "
                    >
                      {favorite.price.toLocaleString()} DZD
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4 pt-2">

                  <Link
                    href={`/packages/${favorite.id}`}
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      transition
                      text-white
                      text-center
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
                      border-red-300
                      text-red-500
                      hover:bg-red-50
                      transition
                      py-3
                      rounded-full
                      font-semibold
                    "
                  >
                    Retirer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aucun résultat */}
        {filteredFavorites.length === 0 && (
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
              Aucun résultat
            </h3>

            <p className="text-gray-600">
              Aucun favori ne correspond à votre recherche.
            </p>
          </div>
        )}

        {/* Synchronisation */}
        <div
          className="
            mt-16
            bg-white
            rounded-3xl
            shadow-md
            p-10
            text-center
          "
        >
          <h3 className="text-2xl font-bold mb-3">
            Synchronisation des favoris
          </h3>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Vos favoris seront automatiquement
            synchronisés entre tous vos appareils
            et accessibles depuis votre compte
            Easy Package.
          </p>
        </div>
      </div>
    </section>
  );
}
