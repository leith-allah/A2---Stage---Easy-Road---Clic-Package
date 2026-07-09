
import { PackageAggregate }

from "@/server/aggregates/package.aggregate";

import {

  PackagePersistence,

}

from "@/server/persistence/package.persistence";

import {

  Supplements,

}

from "@/server/entities/value-objects/supplements.value-object";

import {

  PackageStock,

}

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

      ownerId: aggregate.ownerId,

      supplements: {

        economy: aggregate.supplements.economy,

        business: aggregate.supplements.business,

        first: aggregate.supplements.first,

        single: aggregate.supplements.single,

        double: aggregate.supplements.double,

        triple: aggregate.supplements.triple,

        quadruple: aggregate.supplements.quadruple,

        suite: aggregate.supplements.suite,

        bedOnly: aggregate.supplements.bedOnly,

        bedBreakfast: aggregate.supplements.bedBreakfast,

        halfBoard: aggregate.supplements.halfBoard,

        fullBoard: aggregate.supplements.fullBoard,

        allInclusive: aggregate.supplements.allInclusive,

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

        persistence.supplements.economy,

        persistence.supplements.business,

        persistence.supplements.first,

        persistence.supplements.single,

        persistence.supplements.double,

        persistence.supplements.triple,

        persistence.supplements.quadruple,

        persistence.supplements.suite,

        persistence.supplements.bedOnly,

        persistence.supplements.bedBreakfast,

        persistence.supplements.halfBoard,

        persistence.supplements.fullBoard,

        persistence.supplements.allInclusive,

      ),

      persistence.ownerId,

      persistence.flights,

      persistence.hotels,

      persistence.transports,

      persistence.excursions,

    );

  }

}
