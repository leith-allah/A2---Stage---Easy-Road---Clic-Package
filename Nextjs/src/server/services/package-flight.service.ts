
import { packageRepository }
from "@/server/repositories/package.repository";

import { flightRepository }
from "@/server/repositories/flight.repository";

import { packageFlightRepository }
from "@/server/repositories/package-flight.repository";

import { NotFoundException }
from "@/server/exceptions/not-found.exception";

export const packageFlightService = {

  async addFlightToPackage(
    packageId: number,
    flightId: number
  ) {

    const packageExists =
      await packageRepository.findById(
        packageId
      );

    if (!packageExists) {

      throw new NotFoundException(
        "Package introuvable"
      );

    }

    const flightExists =
      await flightRepository.findById(
        flightId
      );

    if (!flightExists) {

      throw new NotFoundException(
        "Vol introuvable"
      );

    }

    return packageFlightRepository.addFlightToPackage(
      packageId,
      flightId
    );

  },

  async removeFlightFromPackage(
    packageId: number,
    flightId: number
  ) {

    return packageFlightRepository.removeFlightFromPackage(
      packageId,
      flightId
    );

  },

  async getFlightsByPackage(
    packageId: number
  ) {

    const packageExists =
      await packageRepository.findById(
        packageId
      );

    if (!packageExists) {

      throw new NotFoundException(
        "Package introuvable"
      );

    }

    return packageFlightRepository.getFlightsByPackage(
      packageId
    );

  },

};
