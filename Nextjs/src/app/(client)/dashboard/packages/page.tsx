
"use client";

import PackagesList
from "@/features/packages/components/PackagesList";

export default function PackagesPage() {

  return (
    <section className="space-y-8">

      <div>

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Packages Disponibles
        </h1>

        <p className="text-gray-500 mt-2">
          Découvrez nos meilleures offres de voyage.
        </p>

      </div>

      <PackagesList />

    </section>
  );
}
