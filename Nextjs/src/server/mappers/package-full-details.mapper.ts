
import { PackageAggregate } from "@/server/aggregates/package.aggregate";
import { PackageFullDetailsDto } from "@/server/dto/package/package-full-details.dto";

export class PackageFullDetailsMapper {
  static toDto(
    pkg: PackageAggregate,
    flights: any[],
    hotels: any[],
    transports: any[],
    excursions: any[]
  ): PackageFullDetailsDto {
    return {
      id: pkg.id,
      name: pkg.name,
      country: pkg.country,
      destination: pkg.destination,
      image: pkg.image ?? undefined,
      description: pkg.description ?? undefined,
      departureDate: pkg.departureDate.toISOString(),
      returnDate: pkg.returnDate.toISOString(),
      basePrice: pkg.basePrice,
      availableSeats: pkg.getAvailableStock(),
      stockTotal: pkg.getTotalStock(),
      status: pkg.getStatus(),

      // Mapping des valeurs par défaut
      defaultFlightClass: pkg.defaultFlightClass,
      defaultRoomType: pkg.defaultRoomType,
      defaultBoardType: pkg.defaultBoardType,

      supplements: {
        ECONOMY: pkg.supplements.ECONOMY,
        BUSINESS: pkg.supplements.BUSINESS,
        FIRST: pkg.supplements.FIRST,
        SINGLE: pkg.supplements.SINGLE,
        DOUBLE: pkg.supplements.DOUBLE,
        TRIPLE: pkg.supplements.TRIPLE,
        QUADRUPLE: pkg.supplements.QUADRUPLE,
        SUITE: pkg.supplements.SUITE,
        BED_ONLY: pkg.supplements.BED_ONLY,
        BED_BREAKFAST: pkg.supplements.BED_BREAKFAST,
        HALF_BOARD: pkg.supplements.HALF_BOARD,
        FULL_BOARD: pkg.supplements.FULL_BOARD,
        ALL_INCLUSIVE: pkg.supplements.ALL_INCLUSIVE,
      },

      suppEconomy: pkg.supplements.ECONOMY,
      suppBusiness: pkg.supplements.BUSINESS,
      suppFirst: pkg.supplements.FIRST,
      suppSingle: pkg.supplements.SINGLE,
      suppDouble: pkg.supplements.DOUBLE,
      suppTriple: pkg.supplements.TRIPLE,
      suppQuadruple: pkg.supplements.QUADRUPLE,
      suppSuite: pkg.supplements.SUITE,
      suppBedOnly: pkg.supplements.BED_ONLY,
      suppBedBreakfast: pkg.supplements.BED_BREAKFAST,
      suppHalfBoard: pkg.supplements.HALF_BOARD,
      suppFullBoard: pkg.supplements.FULL_BOARD,
      suppAllInclusive: pkg.supplements.ALL_INCLUSIVE,

      flights,
      hotels,
      transports,
      excursions,
    };
  }
}
