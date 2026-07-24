
import { PackageAggregate } from "@/server/aggregates/package.aggregate";

import { Flight } from "@/server/entities/flight.entity";
import { Hotel } from "@/server/entities/hotel.entity";
import { Transport } from "@/server/entities/transport.entity";
import { Excursion } from "@/server/entities/excursion.entity";

import { Supplements }
from "@/server/entities/value-objects/supplements.value-object";

import {
  PackageStatus,
  PackageStatusValue,
}
from "@/server/entities/value-objects/package-status.value-object";

import { PackageStock }
from "@/server/entities/value-objects/package-stock.value-object";

import { CreatePackageWizardDto }
from "@/server/dto/package/create-package-wizard.dto";

import { UpdatePackageWizardDto }
from "@/server/dto/package/update-package-wizard.dto";


export class PackageBuilder {

  static fromWizard(

    dto: CreatePackageWizardDto,

    ownerId: number,

    flights: Flight[],

    hotels: Hotel[],

    transports: Transport[],

    excursions: Excursion[],

  ): PackageAggregate {

    const supplements = new Supplements(

        dto.supplements.ECONOMY ?? 0,
        dto.supplements.BUSINESS ?? 0,
        dto.supplements.FIRST ?? 0,

        dto.supplements.SINGLE ?? 0,
        dto.supplements.DOUBLE ?? 0,
        dto.supplements.TRIPLE ?? 0,
        dto.supplements.QUADRUPLE ?? 0,
        dto.supplements.SUITE ?? 0,

        dto.supplements.BED_ONLY ?? 0,
        dto.supplements.BED_BREAKFAST ?? 0,
        dto.supplements.HALF_BOARD ?? 0,
        dto.supplements.FULL_BOARD ?? 0,
        dto.supplements.ALL_INCLUSIVE ?? 0,

    );

    const stock = new PackageStock(

      dto.package.totalStock,

      dto.package.totalStock,

    );

    const status = new PackageStatus(

      PackageStatusValue.DRAFT,

    );

    return new PackageAggregate(

      0,

      dto.package.name,

      dto.package.country,

      dto.package.destination,

      dto.package.image ?? null,

      dto.package.description ?? null,

      new Date(dto.package.departureDate),

      new Date(dto.package.returnDate),

      dto.package.basePrice,

      stock,

      status,

      supplements,

      dto.supplements.defaultFlightClass,

      dto.supplements.defaultRoomType,

      dto.supplements.defaultBoardType,

      ownerId,

      flights,

      hotels,

      transports,

      excursions,

    );

  }

  static updateFromWizard(

      existing: PackageAggregate,

      dto: UpdatePackageWizardDto,

      flights: Flight[],

      hotels: Hotel[],

      transports: Transport[],

      excursions: Excursion[],

  ): PackageAggregate {

      const p = dto.package;

      const supplements = new Supplements(

          p.supplements?.ECONOMY
              ?? existing.supplements.ECONOMY,

          p.supplements?.BUSINESS
              ?? existing.supplements.BUSINESS,

          p.supplements?.FIRST
              ?? existing.supplements.FIRST,

          p.supplements?.SINGLE
              ?? existing.supplements.SINGLE,

          p.supplements?.DOUBLE
              ?? existing.supplements.DOUBLE,

          p.supplements?.TRIPLE
              ?? existing.supplements.TRIPLE,

          p.supplements?.QUADRUPLE
              ?? existing.supplements.QUADRUPLE,

          p.supplements?.SUITE
              ?? existing.supplements.SUITE,

          p.supplements?.BED_ONLY
              ?? existing.supplements.BED_ONLY,

          p.supplements?.BED_BREAKFAST
              ?? existing.supplements.BED_BREAKFAST,

          p.supplements?.HALF_BOARD
              ?? existing.supplements.HALF_BOARD,

          p.supplements?.FULL_BOARD
              ?? existing.supplements.FULL_BOARD,

          p.supplements?.ALL_INCLUSIVE
              ?? existing.supplements.ALL_INCLUSIVE,

      );

      const stock = new PackageStock(

          p.totalStock
              ?? existing.getTotalStock(),

          p.totalStock
              ?? existing.getAvailableStock(),

      );

      return new PackageAggregate(

          existing.id,

          p.name
              ?? existing.name,

          p.country
              ?? existing.country,

          p.destination
              ?? existing.destination,

          p.image
              ?? existing.image,

          p.description
              ?? existing.description,

          p.departureDate
              ? new Date(p.departureDate)
              : existing.departureDate,

          p.returnDate
              ? new Date(p.returnDate)
              : existing.returnDate,

          p.basePrice
              ?? existing.basePrice,

          stock,

          existing.status,

          supplements,

          p.defaultFlightClass
              ?? existing.defaultFlightClass,

          p.defaultRoomType
              ?? existing.defaultRoomType,

          p.defaultBoardType
              ?? existing.defaultBoardType,

          existing.ownerId,

          flights,

          hotels,

          transports,

          excursions,

      );

  }

}
