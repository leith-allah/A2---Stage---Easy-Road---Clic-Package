
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

import {
  PackageStock,
}
from "@/server/entities/value-objects/package-stock.value-object";

import {
  CreatePackageWizardDto,
}
from "@/server/dto/package/create-package-wizard.dto";

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

      dto.supplements.economy ?? 0,
      dto.supplements.business ?? 0,
      dto.supplements.first ?? 0,

      dto.supplements.single ?? 0,
      dto.supplements.double ?? 0,
      dto.supplements.triple ?? 0,
      dto.supplements.quadruple ?? 0,
      dto.supplements.suite ?? 0,

      dto.supplements.bedOnly ?? 0,
      dto.supplements.bedBreakfast ?? 0,
      dto.supplements.halfBoard ?? 0,
      dto.supplements.fullBoard ?? 0,
      dto.supplements.allInclusive ?? 0,

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

      ownerId,

      flights,

      hotels,

      transports,

      excursions,

    );

  }

}
