
import { PackageType } from "../types/package.types";

export function filterPackages(
  packages: PackageType[],
  filter: string
) {
  const items = [...packages];

  switch (filter) {
    case "country":
      return items.sort((a, b) =>
        a.country.localeCompare(b.country)
      );

    case "duration":
      return items.sort(
        (a, b) => a.duration - b.duration
      );

    case "price-asc":
      return items.sort(
        (a, b) => a.price - b.price
      );

    case "price-desc":
      return items.sort(
        (a, b) => b.price - a.price
      );

    case "departure-date":
      return items.sort(
        (a, b) =>
          new Date(a.departureDate).getTime() -
          new Date(b.departureDate).getTime()
      );

    default:
      return items;
  }
}
