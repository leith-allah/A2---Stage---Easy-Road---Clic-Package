
import { PackageAggregate }
from "@/server/aggregates/package.aggregate";

import {PackagePersistence}
from "@/server/persistence/package.persistence";

import {Supplements}
from "@/server/entities/value-objects/supplements.value-object";

import {PackageStock}
from "@/server/entities/value-objects/package-stock.value-object";

import {
  PackageStatus,
  PackageStatusValue,
}
from "@/server/entities/value-objects/package-status.value-object";




export class PackageAggregateMapper {

  // ==================================================
  // Aggregate -> Persistence
  // ==================================================

  static toPersistence(

    aggregate: PackageAggregate,

  ): PackagePersistence {

    return {

      id: aggregate.id,

      name: aggregate.name,

      country: aggregate.country,

      destination: aggregate.destination,

      image: aggregate.image,

      description: aggregate.description,

      departureDate: aggregate.departureDate,

      returnDate: aggregate.returnDate,

      basePrice: aggregate.basePrice,

      totalStock: aggregate.getTotalStock(),

      availableStock: aggregate.getAvailableStock(),

      status: aggregate.getStatus(),

      defaultFlightClass: aggregate.defaultFlightClass,

      defaultRoomType: aggregate.defaultRoomType,

      defaultBoardType: aggregate.defaultBoardType,

      ownerId: aggregate.ownerId,

      supplements: {

        ECONOMY: aggregate.supplements.ECONOMY,

        BUSINESS: aggregate.supplements.BUSINESS,

        FIRST: aggregate.supplements.FIRST,

        SINGLE: aggregate.supplements.SINGLE,

        DOUBLE: aggregate.supplements.DOUBLE,

        TRIPLE: aggregate.supplements.TRIPLE,

        QUADRUPLE: aggregate.supplements.QUADRUPLE,

        SUITE: aggregate.supplements.SUITE,

        BED_ONLY: aggregate.supplements.BED_ONLY,

        BED_BREAKFAST: aggregate.supplements.BED_BREAKFAST,

        HALF_BOARD: aggregate.supplements.HALF_BOARD,

        FULL_BOARD: aggregate.supplements.FULL_BOARD,

        ALL_INCLUSIVE: aggregate.supplements.ALL_INCLUSIVE,

      },

      flights: aggregate.flights,

      hotels: aggregate.hotels,

      transports: aggregate.transports,

      excursions: aggregate.excursions,

    };

  }

  // ==================================================
  // Persistence -> Aggregate
  // ==================================================

  static fromPersistence(

    persistence: PackagePersistence,

  ): PackageAggregate {

    return new PackageAggregate(

      persistence.id,

      persistence.name,

      persistence.country,

      persistence.destination,

      persistence.image,

      persistence.description,

      persistence.departureDate,

      persistence.returnDate,

      persistence.basePrice,

      new PackageStock(

        persistence.totalStock,

        persistence.availableStock,

      ),

      new PackageStatus(

        persistence.status as PackageStatusValue,

      ),

      new Supplements(

        persistence.supplements.ECONOMY,

        persistence.supplements.BUSINESS,

        persistence.supplements.FIRST,

        persistence.supplements.SINGLE,

        persistence.supplements.DOUBLE,

        persistence.supplements.TRIPLE,

        persistence.supplements.QUADRUPLE,

        persistence.supplements.SUITE,

        persistence.supplements.BED_ONLY,

        persistence.supplements.BED_BREAKFAST,

        persistence.supplements.HALF_BOARD,

        persistence.supplements.FULL_BOARD,

        persistence.supplements.ALL_INCLUSIVE,

      ),

      persistence.defaultFlightClass,

      persistence.defaultRoomType,

      persistence.defaultBoardType,

      persistence.ownerId,

      persistence.flights,

      persistence.hotels,

      persistence.transports,

      persistence.excursions,

    );

  }

}
