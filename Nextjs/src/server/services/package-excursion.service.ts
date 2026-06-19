
import { packageRepository }
from "@/server/repositories/package.repository";

import { excursionRepository }
from "@/server/repositories/excursion.repository";

import { packageExcursionRepository }
from "@/server/repositories/package-excursion.repository";

import { NotFoundException }
from "@/server/exceptions/not-found.exception";

export const packageExcursionService = {

  async addExcursionToPackage(
    packageId: number,
    excursionId: number
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

    const excursion =
      await excursionRepository.findById(
        excursionId
      );

    if (!excursion) {

      throw new NotFoundException(
        "Excursion introuvable"
      );

    }

    return packageExcursionRepository.addExcursionToPackage(
      packageId,
      excursionId
    );

  },

  async removeExcursionFromPackage(
    packageId: number,
    excursionId: number
  ) {

    return packageExcursionRepository.removeExcursionFromPackage(
      packageId,
      excursionId
    );

  },

  async getExcursionsByPackage(
    packageId: number
  ) {

    return packageExcursionRepository.getExcursionsByPackage(
      packageId
    );

  },

};
