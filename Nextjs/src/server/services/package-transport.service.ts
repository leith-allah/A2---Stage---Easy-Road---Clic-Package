
import { transportRepository }
from "@/server/repositories/transport.repository";

import { packageTransportRepository }
from "@/server/repositories/package-transport.repository";

import { NotFoundException }
from "@/server/exceptions/not-found.exception";

import { PrismaPackageRepository }
from "@/server/repositories/prisma/prisma-package.repository";

const packageRepository =
    new PrismaPackageRepository();

export const packageTransportService = {

  async addTransportToPackage(
    packageId: number,
    transportId: number
  ) {

    const pkg =
      await packageRepository.findById(
        packageId
      );

    if (!pkg) {

      throw new NotFoundException(
        "Package introuvable"
      );

    }

    const transport =
      await transportRepository.findById(
        transportId
      );

    if (!transport) {

      throw new NotFoundException(
        "Transport introuvable"
      );

    }

    return packageTransportRepository.addTransportToPackage(
      packageId,
      transportId
    );

  },

  async removeTransportFromPackage(
    packageId: number,
    transportId: number
  ) {

    return packageTransportRepository.removeTransportFromPackage(
      packageId,
      transportId
    );

  },

  async getTransportsByPackage(
    packageId: number
  ) {

    const pkg =
      await packageRepository.findById(
        packageId
      );

    if (!pkg) {

      throw new NotFoundException(
        "Package introuvable"
      );

    }

    return packageTransportRepository.getTransportsByPackage(
      packageId
    );

  },

};
