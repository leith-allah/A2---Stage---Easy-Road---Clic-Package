
import { PackageAggregate }
from "@/server/aggregates/package.aggregate";

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

        departureDate:
            pkg.departureDate.toISOString(),

        returnDate:
            pkg.returnDate.toISOString(),

        basePrice:
            pkg.basePrice,

        availableSeats:
            pkg.getAvailableStock(),

        stockTotal:
            pkg.getTotalStock(),

        status:
            pkg.getStatus(),

        suppEconomy:
            pkg.supplements.ECONOMY,

        suppBusiness:
            pkg.supplements.BUSINESS,

        suppFirst:
            pkg.supplements.FIRST,

        suppSingle:
            pkg.supplements.SINGLE,

        suppDouble:
            pkg.supplements.DOUBLE,

        suppTriple:
            pkg.supplements.TRIPLE,

        suppQuadruple:
            pkg.supplements.QUADRUPLE,

        suppSuite:
            pkg.supplements.SUITE,

        suppBedOnly:
            pkg.supplements.BED_ONLY,

        suppBedBreakfast:
            pkg.supplements.BED_BREAKFAST,

        suppHalfBoard:
            pkg.supplements.HALF_BOARD,

        suppFullBoard:
            pkg.supplements.FULL_BOARD,

        suppAllInclusive:
            pkg.supplements.ALL_INCLUSIVE,

        flights,

        hotels,

        transports,

        excursions,

    };

}

}
