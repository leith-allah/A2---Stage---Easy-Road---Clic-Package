
import { prisma } from "@/server/db/prisma";

import { PACKAGE_STATUS } from "@/server/constants/package-status";

import { NotFoundException } from "@/server/exceptions/not-found.exception";

import { PrismaPackageRepository }
from "@/server/repositories/prisma/prisma-package.repository";

const packageRepository =
    new PrismaPackageRepository();

export const packageStatusService = {

    async publishPackage(
        id: number,
    ) {

        const pkg =
            await packageRepository.findByIdIncludingArchived(id);

        if (!pkg) {

            throw new NotFoundException(
                "Package introuvable"
            );

        }

        if (pkg.isArchived()) {

            throw new Error(
                "Impossible de publier un package archivé"
            );

        }

        pkg.publish();

        return await packageRepository.updateAggregate(pkg);

    },

    async disablePackage(
        id: number,
    ) {

        const pkg =
            await packageRepository.findByIdIncludingArchived(id);

        if (!pkg) {

            throw new NotFoundException(
                "Package introuvable"
            );

        }

        pkg.disable();

            return await packageRepository.updateAggregate(pkg);

    },

    async activatePackage(
        id: number,
    ) {

        const pkg =
            await packageRepository.findByIdIncludingArchived(id);

        if (!pkg) {

            throw new NotFoundException(
                "Package introuvable"
            );

        }

        if (pkg.isArchived()) {

            throw new Error(
                "Impossible de réactiver un package archivé"
            );

        }

        pkg.publish();

        return await packageRepository.updateAggregate(pkg);

    },

    async archivePackage(
        id: number,
    ) {

        const pkg =
            await packageRepository.findByIdIncludingArchived(id);

        if (!pkg) {

            throw new NotFoundException(
                "Package introuvable"
            );

        }

        pkg.archive();

        return await packageRepository.updateAggregate(pkg);

    },

    async restorePackage(
        id: number,
    ) {

        const pkg =
            await packageRepository.findByIdIncludingArchived(id);

        if (!pkg) {

            throw new NotFoundException(
                "Package introuvable",
            );

        }

        if (pkg.getAvailableStock() <= 0) {

            pkg.disable();

        } else {

            pkg.draft();

        }

        return await packageRepository.updateAggregate(pkg);

    },

    async archiveExpiredPackages() {

        await prisma.package_voyage.updateMany({

            where: {

                statut_pack: {

                    not:
                        PACKAGE_STATUS.ARCHIVED,

                },

                date_depart_pack: {

                    lt:
                        new Date(),

                },

            },

            data: {

                statut_pack:
                    PACKAGE_STATUS.ARCHIVED,

            },

        });

        await prisma.package_voyage.updateMany({

            where: {

                stock_dispo_pack: 0,

                statut_pack:
                    PACKAGE_STATUS.ACTIVE,

            },

            data: {

                statut_pack:
                    PACKAGE_STATUS.INACTIVE,

            },

        });

    },

    async publishAllDraftPackages() {

        const result =
            await prisma.package_voyage.updateMany({

                where: {

                    statut_pack:
                        PACKAGE_STATUS.DRAFT,

                },

                data: {

                    statut_pack:
                        PACKAGE_STATUS.ACTIVE,

                },

            });

        return {

            success: true,

            updated:
                result.count,

        };

    },

};
