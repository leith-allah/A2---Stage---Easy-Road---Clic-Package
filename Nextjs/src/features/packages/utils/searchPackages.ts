
import { PackageType } from "@/types/package.types";

export function searchPackages(
  packages: PackageType[],
  search: string
) {
  return packages.filter((item) => {
    const query = search.toLowerCase();

    return (
      item.title.toLowerCase().includes(query) ||
      item.country.toLowerCase().includes(query) ||
      item.city.toLowerCase().includes(query) ||
      item.airline.toLowerCase().includes(query) ||
      item.hotel.toLowerCase().includes(query) ||
      item.excursion.toLowerCase().includes(query) ||
      item.transport.toLowerCase().includes(query)
    );
  });
}
