
"use client";

import PackageCard from "./PackageCard";

type PackageItem = {
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

export default function PackageGrid({
  packages,
}: {
  packages: PackageItem[];
}) {
  return (
    <div
      className="
        grid
        gap-8
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {packages.map((pkg) => (
        <PackageCard
          key={pkg.id}
          id={pkg.id}
          name={pkg.name}
          country={pkg.country}
          destination={pkg.destination}
          image={pkg.image}
          basePrice={pkg.basePrice}
          availableSeats={pkg.availableSeats}
          departureDate={pkg.departureDate}
          returnDate={pkg.returnDate}
        />
      ))}
    </div>
  );
}
