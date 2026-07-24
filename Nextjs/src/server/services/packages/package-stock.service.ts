
import { NotFoundException } from "@/server/exceptions/not-found.exception";

import { PrismaPackageRepository }
from "@/server/repositories/prisma/prisma-package.repository";

const packageRepository =
    new PrismaPackageRepository();

export const packageStockService = {

    async decreaseStock(

        id: number,

        quantity: number,

    ) {

        const pkg =
            await packageRepository.findByIdIncludingArchived(id);

        if (!pkg) {

            throw new NotFoundException(
                "Package introuvable",
            );

        }

        pkg.decreaseStock(quantity);

        return await packageRepository.updateAggregate(pkg);

    },

    async increaseStock(

        id: number,

        quantity: number,

    ) {

        const pkg =
            await packageRepository.findByIdIncludingArchived(id);

        if (!pkg) {

            throw new NotFoundException(
                "Package introuvable",
            );

        }

        pkg.increaseStock(quantity);

        return await packageRepository.updateAggregate(pkg);

    },

};
