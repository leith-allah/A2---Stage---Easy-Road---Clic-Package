

import { UpdatePackageDto } from "@/server/dto/package/update-package.dto";

import { NotFoundException } from "@/server/exceptions/not-found.exception";

import { Supplements } from "@/server/entities/value-objects/supplements.value-object";

import { PrismaPackageRepository }
from "@/server/repositories/prisma/prisma-package.repository";

const packageRepository =
    new PrismaPackageRepository();

export const packageCommandService = {

    async updatePackage(
        id: number,
        dto: UpdatePackageDto,
    ) {

        const pkg =
            await packageRepository.findByIdIncludingArchived(id);

        if (!pkg) {

            throw new NotFoundException(
                "Package introuvable",
            );

        }

        pkg.updateInformations({

            name: dto.name,

            country: dto.country,

            destination: dto.destination,

            image: dto.image,

            description: dto.description,

            departureDate: dto.departureDate
                ? new Date(dto.departureDate)
                : undefined,

            returnDate: dto.returnDate
                ? new Date(dto.returnDate)
                : undefined,

            basePrice: dto.basePrice,

            supplements: dto.supplements
                ? new Supplements(

                    dto.supplements.ECONOMY ?? pkg.supplements.ECONOMY,
                    dto.supplements.BUSINESS ?? pkg.supplements.BUSINESS,
                    dto.supplements.FIRST ?? pkg.supplements.FIRST,

                    dto.supplements.SINGLE ?? pkg.supplements.SINGLE,
                    dto.supplements.DOUBLE ?? pkg.supplements.DOUBLE,
                    dto.supplements.TRIPLE ?? pkg.supplements.TRIPLE,
                    dto.supplements.QUADRUPLE ?? pkg.supplements.QUADRUPLE,
                    dto.supplements.SUITE ?? pkg.supplements.SUITE,

                    dto.supplements.BED_ONLY ?? pkg.supplements.BED_ONLY,
                    dto.supplements.BED_BREAKFAST ?? pkg.supplements.BED_BREAKFAST,
                    dto.supplements.HALF_BOARD ?? pkg.supplements.HALF_BOARD,
                    dto.supplements.FULL_BOARD ?? pkg.supplements.FULL_BOARD,
                    dto.supplements.ALL_INCLUSIVE ?? pkg.supplements.ALL_INCLUSIVE,

                )
                : undefined,

            defaultFlightClass: dto.defaultFlightClass,

            defaultRoomType: dto.defaultRoomType,

            defaultBoardType: dto.defaultBoardType,

        });

        if (dto.totalStock !== undefined) {

            const currentTotal = pkg.getTotalStock();

            if (dto.totalStock > currentTotal) {

                pkg.increaseStock(dto.totalStock - currentTotal);

            }

            if (dto.totalStock < currentTotal) {

                pkg.decreaseStock(currentTotal - dto.totalStock);

            }

        }

        return await packageRepository.updateAggregate(pkg);

    },

    async deletePackage(
        id: number,
    ) {

        const pkg =
            await packageRepository.findByIdIncludingArchived(id);

        if (!pkg) {

            throw new NotFoundException(
                "Package introuvable"
            );

        }

        await packageRepository.archive(id);

        return {

            success: true,

        };

    },

};
