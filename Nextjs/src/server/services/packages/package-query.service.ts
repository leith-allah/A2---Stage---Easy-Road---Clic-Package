
import { PackageMapper } from "@/server/mappers/package.mapper";
import { PackageFullDetailsMapper } from "@/server/mappers/package-full-details.mapper";

import { packageHotelService } from "@/server/services/package-hotel.service";
import { packageTransportService } from "@/server/services/package-transport.service";
import { packageExcursionService } from "@/server/services/package-excursion.service";

import { FlightMapper } from "@/server/mappers/flight.mapper";
import { HotelMapper } from "@/server/mappers/hotel.mapper";
import { TransportMapper } from "@/server/mappers/transport.mapper";
import { ExcursionMapper } from "@/server/mappers/excursion.mapper";

import { PACKAGE_STATUS } from "@/server/constants/package-status";

import { NotFoundException } from "@/server/exceptions/not-found.exception";

import { PrismaPackageRepository }
from "@/server/repositories/prisma/prisma-package.repository";

const packageRepository =
    new PrismaPackageRepository();

export const packageQueryService = {

    async packageExists(
        id: number
    ) {

        const pkg =
            await packageRepository.findByIdIncludingArchived(id);

        if (!pkg) {

            throw new NotFoundException(
                "Package introuvable"
            );

        }

        return pkg;

    },

    async getPackages(
        filters?: {
            country?: string;
            destination?: string;
            status?: string;
        }
    ) {

        const packages =

            filters?.country ||
            filters?.destination ||
            filters?.status

                ? await packageRepository.findFiltered(filters)

                : await packageRepository.findAll();

        return packages.map(

            pkg => PackageMapper.toDto(pkg)

        );

    },

    async getPackageById(
        id: number
    ) {

        const pkg =
            await packageRepository.findById(id);

        if (!pkg) {

            throw new NotFoundException(
                "Package introuvable"
            );

        }


        const dto =
            PackageFullDetailsMapper.toDto(

                pkg,

                pkg.flights.map(f =>
                    FlightMapper.toDto(f)
                ),

                pkg.hotels.map(h =>
                    HotelMapper.toDto(h)
                ),

                pkg.transports.map(t =>
                    TransportMapper.toDto(t)
                ),

                pkg.excursions.map(e =>
                    ExcursionMapper.toDto(e)
                ),

            );

            return dto;

    },

    async getArchivedPackages() {

        const packages =
            await packageRepository.findArchived();

        return packages.map(

            pkg => PackageMapper.toDto(pkg)

        );

    },

};
