
import { CreatePackageWizardDto }
from "@/server/dto/package/create-package-wizard.dto";

import { PrismaFlightRepository }
from "@/server/repositories/prisma/prisma-flight.repository";

import { PrismaHotelRepository }
from "@/server/repositories/prisma/prisma-hotel.repository";

import { PrismaTransportRepository }
from "@/server/repositories/prisma/prisma-transport.repository";

import { PrismaExcursionRepository }
from "@/server/repositories/prisma/prisma-excursion.repository";

import { FlightBuilder }
from "@/server/builders/flight.builder";

import { HotelBuilder }
from "@/server/builders/hotel.builder";

import { TransportBuilder }
from "@/server/builders/transport.builder";

import { ExcursionBuilder }
from "@/server/builders/excursion.builder";

import { PackageBuilder }
from "@/server/builders/package.builder";

import { PackageAggregate }
from "@/server/aggregates/package.aggregate";

import { PackageRepository }
from "@/server/repositories/interfaces/package.repository.interface";

import { getCurrentUserId }
from "@/server/auth/session";


export class PackageWizardService {

  constructor(

    private readonly packageRepository: PackageRepository,

    private readonly flightRepository =
      new PrismaFlightRepository(),

    private readonly hotelRepository =
      new PrismaHotelRepository(),

    private readonly transportRepository =
      new PrismaTransportRepository(),

    private readonly excursionRepository =
      new PrismaExcursionRepository(),

  ) {}

  async createPackage(

    dto: CreatePackageWizardDto,

  ): Promise<PackageAggregate> {

    const ownerId =
      await getCurrentUserId();

    /*
    =========================================
    Construction des objets métier
    =========================================
    */

    const flights = await Promise.all(

      dto.flights.map(async (flightDto) => {

        const aggregate =
          FlightBuilder.fromDto(flightDto);

        return await this.flightRepository.createAggregate(
          aggregate
        );

      })

    );

    const hotels = await Promise.all(

      dto.hotels.map(async (hotelDto) => {

        const aggregate =
          HotelBuilder.fromDto(hotelDto);

        return await this.hotelRepository.createAggregate(
          aggregate
        );

      })

    );

    const transports = await Promise.all(

      dto.transports.map(async (transportDto) => {

        const aggregate =
          TransportBuilder.fromDto(transportDto);

        return await this.transportRepository.createAggregate(
          aggregate
        );

      })

    );

    const excursions = await Promise.all(

      dto.excursions.map(async (excursionDto) => {

        const aggregate =
          ExcursionBuilder.fromDto(excursionDto);

        return await this.excursionRepository.createAggregate(
          aggregate
        );

      })

    );

    /*
    =========================================
    Construction Aggregate
    =========================================
    */

    const aggregate =

      PackageBuilder.fromWizard(

        dto,

        ownerId,

        flights,

        hotels,

        transports,

        excursions,

      );

    /*
    =========================================
    Persistance
    =========================================
    */

    return await

      this.packageRepository.createAggregate(

        aggregate,

      );

  }

}

import { PrismaPackageRepository }
from "@/server/repositories/prisma/prisma-package.repository";

export const packageWizardService =
  new PackageWizardService(
    new PrismaPackageRepository(),
  );
