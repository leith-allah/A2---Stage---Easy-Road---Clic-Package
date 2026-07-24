
import { PackageAggregate } from "@/server/aggregates/package.aggregate";

import { PackageDto } from "@/server/dto/package/package.dto";

export class PackageMapper {

  static toDto(
    aggregate: PackageAggregate
  ): PackageDto {

    return {

      id: aggregate.id,

      name: aggregate.name,

      country: aggregate.country,

      destination: aggregate.destination,

      image: aggregate.image ?? undefined,

      description: aggregate.description ?? undefined,

      departureDate:
        aggregate.departureDate.toISOString(),

      returnDate:
        aggregate.returnDate.toISOString(),

      basePrice:
        aggregate.basePrice,

      availableSeats:
        aggregate.getAvailableStock(),

      status:
        aggregate.getStatus(),

      totalSeats:
        aggregate.getTotalStock(),

      suppEconomy:
        aggregate.supplements.ECONOMY,

      suppBusiness:
        aggregate.supplements.BUSINESS,

      suppFirst:
        aggregate.supplements.FIRST,

      suppSingle:
        aggregate.supplements.SINGLE,

      suppDouble:
        aggregate.supplements.DOUBLE,

      suppTriple:
        aggregate.supplements.TRIPLE,

      suppQuadruple:
        aggregate.supplements.QUADRUPLE,

      suppSuite:
        aggregate.supplements.SUITE,

      suppBedOnly:
        aggregate.supplements.BED_ONLY,

      suppBedBreakfast:
        aggregate.supplements.BED_BREAKFAST,

      suppHalfBoard:
        aggregate.supplements.HALF_BOARD,

      suppFullBoard:
        aggregate.supplements.FULL_BOARD,

      suppAllInclusive:
        aggregate.supplements.ALL_INCLUSIVE,

    };

  }
}
