
import { CreatePackageWizardDto }
from "@/server/dto/package/create-package-wizard.dto";

import { UpdatePackageWizardDto }
from "@/server/dto/package/update-package-wizard.dto";

import { CreateFlightDto } 
from "@/server/dto/flight/create-flight.dto";

import { CreateHotelDto } 
from "@/server/dto/hotel/create-hotel.dto";

import { CreateTransportDto } 
from "@/server/dto/transport/create-transport.dto";

import { CreateExcursionDto } 
from "@/server/dto/excursion/create-excursion.dto";

import { PrismaFlightRepository }
from "@/server/repositories/prisma/prisma-flight.repository";

import { PrismaHotelRepository }
from "@/server/repositories/prisma/prisma-hotel.repository";

import { PrismaTransportRepository }
from "@/server/repositories/prisma/prisma-transport.repository";

import {
    PrismaExcursionRepository,
} from "@/server/repositories/prisma/prisma-excursion.repository";

import {
    PrismaAirlineRepository,
} from "@/server/repositories/prisma/prisma-airline.repository";

import {
    PrismaAirportRepository,
} from "@/server/repositories/prisma/prisma-airport.repository";

import {
    FlightBuilder,
} from "@/server/builders/flight.builder";

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

import { FlightAggregate } 
from "@/server/aggregates/flight.aggregate";

import { PackageRepository }
from "@/server/repositories/interfaces/package.repository.interface";

import { Hotel } from "@/server/entities/hotel.entity";
import { Transport } from "@/server/entities/transport.entity";
import { Excursion } from "@/server/entities/excursion.entity";

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

    private readonly airlineRepository =
        new PrismaAirlineRepository(),

    private readonly airportRepository =
        new PrismaAirportRepository(),

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

            const airline =
                await this.airlineRepository.findById(
                    flightDto.airlineId,
                );

            if (!airline) {

                throw new Error(
                    `Compagnie ${flightDto.airlineId} introuvable`,
                );

            }

            const departureAirport =
                await this.airportRepository.findById(
                    flightDto.departureAirportId,
                );

            if (!departureAirport) {

                throw new Error(
                    `Aéroport départ ${flightDto.departureAirportId} introuvable`,
                );

            }

            const arrivalAirport =
                await this.airportRepository.findById(
                    flightDto.arrivalAirportId,
                );

            if (!arrivalAirport) {

                throw new Error(
                    `Aéroport arrivée ${flightDto.arrivalAirportId} introuvable`,
                );

            }

            const flight =
                FlightBuilder.fromDto(

                    flightDto,

                    airline,

                    departureAirport,

                    arrivalAirport,

                );

            const aggregate =
                new FlightAggregate(
                    flight,
                );

            return await this.flightRepository.createAggregate(
                aggregate,
            );

        }),

    );

    /*
    =========================================
    Construction Aggregate
    =========================================
    */

    const hotels: Hotel[] = [];

    const transports: Transport[] = [];

    const excursions: Excursion[] = [];

    const aggregate = PackageBuilder.fromWizard(

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

  async updatePackage(

      id: number,

      dto: UpdatePackageWizardDto,

  ): Promise<PackageAggregate> {

      throw new Error(
          "Update Package Wizard non implémenté pour le moment."
      );

  }
  }


import { PrismaPackageRepository }
from "@/server/repositories/prisma/prisma-package.repository";

export const packageWizardService =
  new PackageWizardService(
    new PrismaPackageRepository(),
  );
