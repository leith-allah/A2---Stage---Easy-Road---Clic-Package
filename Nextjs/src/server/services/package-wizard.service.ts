
import { prisma } from "@/server/db/prisma";

import { CreatePackageWizardDto }
from "@/server/dto/package/create-package-wizard.dto";

import { UpdatePackageWizardDto }
from "@/server/dto/package/update-package-wizard.dto";

import { FlightMapper } from "@/server/mappers/flight.mapper";
import { HotelMapper } from "@/server/mappers/hotel.mapper";
import { TransportMapper } from "@/server/mappers/transport.mapper";
import { ExcursionMapper } from "@/server/mappers/excursion.mapper";

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

    // 🔒 TRANSACTION ATOMIQUE : Tout est exécuté ensemble dans 'tx'
    return await prisma.$transaction(async (tx) => {

      /* --- 1. VOLS --- */
      const flights = await Promise.all(
        (dto.flights || []).map(async (flightDto) => {
          const airline = await this.airlineRepository.findById(flightDto.airlineId);
          if (!airline) throw new Error(`Compagnie ${flightDto.airlineId} introuvable`);

          const departureAirport = await this.airportRepository.findById(flightDto.departureAirportId);
          if (!departureAirport) throw new Error(`Aéroport départ ${flightDto.departureAirportId} introuvable`);

          const arrivalAirport = await this.airportRepository.findById(flightDto.arrivalAirportId);
          if (!arrivalAirport) throw new Error(`Aéroport arrivée ${flightDto.arrivalAirportId} introuvable`);

          // tx.vol.create avec include charge les relations au format BDD exact
          const depTime = new Date(flightDto.departureDateTime);
          const arrTime = new Date(flightDto.arrivalDateTime);

          const createdVol = await tx.vol.upsert({
            where: {
              num_vol_depart_vol: {
                num_vol: flightDto.flightNumber,
                depart_vol: depTime,
              },
            },
            update: {
              arrivee_vol: arrTime,
              id_compagnie: flightDto.airlineId,
              id_aeroport_depart: flightDto.departureAirportId,
              id_aeroport_arrivee: flightDto.arrivalAirportId,
            },
            create: {
              num_vol: flightDto.flightNumber,
              depart_vol: depTime,
              arrivee_vol: arrTime,
              id_compagnie: flightDto.airlineId,
              id_aeroport_depart: flightDto.departureAirportId,
              id_aeroport_arrivee: flightDto.arrivalAirportId,
            },
            include: {
              compagnie_aerienne: true,
              aeroport_vol_id_aeroport_departToaeroport: {
                include: { ville: { include: { pays: true } } },
              },
              aeroport_vol_id_aeroport_arriveeToaeroport: {
                include: { ville: { include: { pays: true } } },
              },
            },
          });

          return FlightMapper.toEntity(createdVol);
        })
      );

      /* --- 2. HÔTELS --- */
      const hotels = await Promise.all(
        (dto.hotels || []).map(async (hotelDto) => {
          const createdHotel = await tx.hotel.create({
            data: {
              nom_hot: hotelDto.name,
              pays_hot: hotelDto.country,
              ville_hot: hotelDto.city,
              adresse_hot: hotelDto.address,
              nb_etoiles_hot: hotelDto.stars,
            },
          });
          return HotelMapper.toEntity(createdHotel);
        })
      );

      /* --- 3. TRANSPORTS --- */
      const transports = await Promise.all(
        (dto.transports || []).map(async (transportDto) => {
          const createdTransport = await tx.transport.create({
            data: {
              trajet_transp: transportDto.route,
              societe_transp: transportDto.company,
            },
          });
          return TransportMapper.toEntity(createdTransport);
        })
      );

      /* --- 4. EXCURSIONS --- */
      const excursions = await Promise.all(
        (dto.excursions || []).map(async (excursionDto) => {
          const createdExcursion = await tx.excursion.create({
            data: {
              nom_exc: excursionDto.name,
              lieu_exc: excursionDto.location,
              description_exc: excursionDto.description,
            },
          });
          return ExcursionMapper.toEntity(createdExcursion);
        })
      );

      /* --- 5. PACKAGE --- */
      const aggregate = PackageBuilder.fromWizard(
        dto,
        ownerId,
        flights,
        hotels,
        transports,
        excursions
      );

      return await this.packageRepository.createAggregate(aggregate, tx);
    });

  }

async updatePackage(
    id: number,
    dto: UpdatePackageWizardDto
  ): Promise<PackageAggregate> {
    const existing = await this.packageRepository.findById(id);
    if (!existing) {
      throw new Error(`Package avec l'ID ${id} introuvable.`);
    }

    // 🔒 TRANSACTION ATOMIQUE GLOBALE
    return await prisma.$transaction(async (tx) => {
      /* --- 1. VOLS --- */
      const flights = dto.flights
        ? await Promise.all(
            dto.flights.map(async (flightDto, index) => {
              const prevFlight = existing.flights[index];

              // Utilisation des getters de l'entité Flight si prevFlight existe
              const airlineId = flightDto.airlineId ?? prevFlight?.getAirline().getId();
              const depAirportId = flightDto.departureAirportId ?? prevFlight?.getDepartureAirport().getId();
              const arrAirportId = flightDto.arrivalAirportId ?? prevFlight?.getArrivalAirport().getId();
              const flightNum = flightDto.flightNumber ?? prevFlight?.getFlightNumber();
              const depTime = flightDto.departureDateTime 
                ? new Date(flightDto.departureDateTime) 
                : prevFlight?.getDepartureDateTime();
              const arrTime = flightDto.arrivalDateTime 
                ? new Date(flightDto.arrivalDateTime) 
                : prevFlight?.getArrivalDateTime();

              if (!airlineId || !depAirportId || !arrAirportId || !flightNum || !depTime || !arrTime) {
                throw new Error(`Vol #${index + 1} invalide ou incomplet.`);
              }

              const airline = await this.airlineRepository.findById(airlineId);
              if (!airline) throw new Error(`Compagnie ${airlineId} introuvable`);

              const departureAirport = await this.airportRepository.findById(depAirportId);
              if (!departureAirport) throw new Error(`Aéroport départ ${depAirportId} introuvable`);

              const arrivalAirport = await this.airportRepository.findById(arrAirportId);
              if (!arrivalAirport) throw new Error(`Aéroport arrivée ${arrAirportId} introuvable`);

              const createdVol = await tx.vol.upsert({
                where: {
                  num_vol_depart_vol: {
                    num_vol: flightNum,
                    depart_vol: depTime,
                  },
                },
                update: {
                  arrivee_vol: arrTime,
                  id_compagnie: airlineId,
                  id_aeroport_depart: depAirportId,
                  id_aeroport_arrivee: arrAirportId,
                },
                create: {
                  num_vol: flightNum,
                  depart_vol: depTime,
                  arrivee_vol: arrTime,
                  id_compagnie: airlineId,
                  id_aeroport_depart: depAirportId,
                  id_aeroport_arrivee: arrAirportId,
                },
                include: {
                  compagnie_aerienne: true,
                  aeroport_vol_id_aeroport_departToaeroport: {
                    include: { ville: { include: { pays: true } } },
                  },
                  aeroport_vol_id_aeroport_arriveeToaeroport: {
                    include: { ville: { include: { pays: true } } },
                  },
                },
              });

              return FlightMapper.toEntity(createdVol);
            })
          )
        : existing.flights;

      /* --- 2. HÔTELS --- */
      const hotels = dto.hotels
        ? await Promise.all(
            dto.hotels.map(async (hotelDto, index) => {
              const prevHotel = existing.hotels[index];

              const name = hotelDto.name ?? prevHotel?.name;
              const country = hotelDto.country ?? prevHotel?.country;
              const city = hotelDto.city ?? prevHotel?.city;
              const address = hotelDto.address ?? prevHotel?.address ?? "";
              const stars = hotelDto.stars ?? prevHotel?.stars ?? 0;

              if (!name || !country || !city) {
                throw new Error(`Hôtel #${index + 1} invalide ou incomplet.`);
              }

              const createdHotel = await tx.hotel.create({
                data: {
                  nom_hot: name,
                  pays_hot: country,
                  ville_hot: city,
                  adresse_hot: address,
                  nb_etoiles_hot: stars,
                },
              });

              return HotelMapper.toEntity(createdHotel);
            })
          )
        : existing.hotels;

      /* --- 3. TRANSPORTS --- */
      const transports = dto.transports
        ? await Promise.all(
            dto.transports.map(async (transportDto, index) => {
              const prevTransport = existing.transports[index];

              const route = transportDto.route ?? prevTransport?.route;
              const company = transportDto.company ?? prevTransport?.company ?? "";

              if (!route) {
                throw new Error(`Transport #${index + 1} invalide.`);
              }

              const createdTransport = await tx.transport.create({
                data: {
                  trajet_transp: route,
                  societe_transp: company,
                },
              });

              return TransportMapper.toEntity(createdTransport);
            })
          )
        : existing.transports;

      /* --- 4. EXCURSIONS --- */
      const excursions = dto.excursions
        ? await Promise.all(
            dto.excursions.map(async (excursionDto, index) => {
              const prevExcursion = existing.excursions[index];

              const name = excursionDto.name ?? prevExcursion?.name;
              const location = excursionDto.location ?? prevExcursion?.location;
              const description = excursionDto.description ?? prevExcursion?.description ?? "";

              if (!name || !location) {
                throw new Error(`Excursion #${index + 1} invalide.`);
              }

              const createdExcursion = await tx.excursion.create({
                data: {
                  nom_exc: name,
                  lieu_exc: location,
                  description_exc: description,
                },
              });

              return ExcursionMapper.toEntity(createdExcursion);
            })
          )
        : existing.excursions;

      /* --- 5. METTRE À JOUR L'AGRÉGAT ET SAUVEGARDER --- */
      const updatedAggregate = PackageBuilder.updateFromWizard(
        existing,
        dto,
        flights,
        hotels,
        transports,
        excursions
      );

      return await this.packageRepository.updateAggregate(
        updatedAggregate,
        tx
      );
    });
  }

}


import { PrismaPackageRepository }
from "@/server/repositories/prisma/prisma-package.repository";

export const packageWizardService =
  new PackageWizardService(
    new PrismaPackageRepository(),
  );
