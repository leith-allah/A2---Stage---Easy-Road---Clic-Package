
import { packageRepository }
from "@/server/repositories/package.repository";

import { hotelRepository }
from "@/server/repositories/hotel.repository";

import { packageHotelRepository }
from "@/server/repositories/package-hotel.repository";

import { NotFoundException }
from "@/server/exceptions/not-found.exception";

export const packageHotelService = {

  async addHotelToPackage(
    packageId: number,
    hotelId: number
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

    const hotel =
      await hotelRepository.findById(
        hotelId
      );

    if (!hotel) {

      throw new NotFoundException(
        "Hotel introuvable"
      );

    }

    return packageHotelRepository.addHotelToPackage(
      packageId,
      hotelId
    );

  },

  async removeHotelFromPackage(
    packageId: number,
    hotelId: number
  ) {

    return packageHotelRepository.removeHotelFromPackage(
      packageId,
      hotelId
    );

  },

  async getHotelsByPackage(
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

    return packageHotelRepository.getHotelsByPackage(
      packageId
    );

  },

};
