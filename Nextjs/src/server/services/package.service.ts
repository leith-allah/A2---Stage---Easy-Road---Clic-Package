
import { packageRepository }
from "@/server/repositories/package.repository";

import { NotFoundException }
from "@/server/exceptions/not-found.exception";

export const packageService = {

  async getPackages() {

    return packageRepository.findAll();
  },

  async getPackageById(
    id: number
  ) {

    const pkg =
      await packageRepository.findById(
        id
      );

    if (!pkg) {

      throw new NotFoundException(
        "Package introuvable"
      );
    }

    return pkg;
  },

};
