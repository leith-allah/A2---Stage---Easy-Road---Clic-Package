
"use client";

import { useMemo, useState } from "react";

import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";

import PackageCard from "@/features/packages/client/components/PackageCard";

import { mockPackages } from "@/features/packages/data/mockPackages";

import { searchPackages } from "@/features/packages/utils/searchPackages";
import { filterPackages } from "@/features/packages/utils/filterPackages";

export default function OffersPage() {
  const [search, setSearch] = useState("");

  const [filter, setFilter] =
    useState("recent");

  const filteredPackages = useMemo(() => {
    const searched = searchPackages(
      mockPackages,
      search
    );

    return filterPackages(
      searched,
      filter
    );
  }, [search, filter]);

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-blue-600">
            Nos Offres
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Découvrez les meilleurs packages
            de voyage pour votre agence.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Rechercher un pays, hôtel, vol..."
            />
          </div>

          <FilterBar
            value={filter}
            onChange={setFilter}
            options={[
              {
                label: "Pays A-Z",
                value: "country",
              },
              {
                label: "Durée",
                value: "duration",
              },
              {
                label: "Prix Croissant",
                value: "price-asc",
              },
              {
                label: "Prix Décroissant",
                value: "price-desc",
              },
              {
                label: "Date Départ",
                value: "departure-date",
              },
            ]}
          />
        </div>

        {/* Grid */}
        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >
          {filteredPackages.map(
            (packageItem) => (
              <PackageCard
                key={packageItem.id}
                packageItem={packageItem}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
