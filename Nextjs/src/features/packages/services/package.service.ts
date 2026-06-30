
import { api } from "@/lib/api";

import { PackageDto }
from "@/server/dto/package/package.dto";


export type Package = {
  id: number;

  name: string;

  country: string;

  destination: string;

  image?: string;

  description?: string;

  departureDate: string;

  returnDate: string;

  basePrice: number;

  availableSeats: number;
};

function mapPackage(
  dto: PackageDto
): Package {

  return {

    id: dto.id,

    name: dto.name,

    country: dto.country,

    destination: dto.destination,

    image: dto.image ?? undefined,

    description:
      dto.description ?? undefined,

    departureDate:
      dto.departureDate,

    returnDate:
      dto.returnDate,

    basePrice:
      dto.basePrice,

    availableSeats:
      dto.availableSeats,
  };
}

export async function fetchPackages() {

  const data =
    await api("/packages");

  console.log(
    "API Packages :",
    data
  );

  return data.map(mapPackage);
}

export async function fetchPackageById(
  id: number
): Promise<Package> {

  const data =
    await api(`/packages/${id}`);

  return mapPackage(data);
}
