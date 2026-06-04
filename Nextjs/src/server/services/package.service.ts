
import { packageRepository }
from "@/server/repositories/package.repository";

import { PackageMapper }
from "@/server/mappers/package.mapper";

import { CreatePackageDto }
from "@/server/dto/package/create-package.dto";

import { UpdatePackageDto }
from "@/server/dto/package/update-package.dto";

import { NotFoundException }
from "@/server/exceptions/not-found.exception";

export const packageService = {

  async getPackages() {

    const packages =
      await packageRepository.findAll();

    return packages.map(
      (pkg) =>
        PackageMapper.toDto(
          PackageMapper.fromPrisma(pkg)
        )
    );
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

    return PackageMapper.toDto(
      PackageMapper.fromPrisma(pkg)
    );
  },


  async createPackage(
    dto: CreatePackageDto
  ) {

    return packageRepository.create({

      mle_pack:
        crypto.randomUUID(),

      statut_pack:
        "ACTIF",

      nom_pack:
        dto.name,

      pays_pack:
        dto.country,

      destination_pack:
        dto.destination,

      image_pack:
        dto.image,

      description_pack:
        dto.description,

      date_depart_pack:
        new Date(dto.departureDate),

      date_retour_pack:
        new Date(dto.returnDate),

      prix_base_pack:
        dto.basePrice,

      stock_total_pack:
        dto.availableSeats,

      stock_dispo_pack:
        dto.availableSeats,

      date_heure_creation_pack:
        new Date(),
    });
  },

  async updatePackage(
    id: number,
    dto: UpdatePackageDto
  ) {

    return packageRepository.update(
      id,
      {
        nom_pack:
          dto.name,

        pays_pack:
          dto.country,

        destination_pack:
          dto.destination,

        image_pack:
          dto.image,

        description_pack:
          dto.description,

        date_depart_pack:
          dto.departureDate
            ? new Date(dto.departureDate)
            : undefined,

        date_retour_pack:
          dto.returnDate
            ? new Date(dto.returnDate)
            : undefined,

        prix_base_pack:
          dto.basePrice,

        stock_dispo_pack:
          dto.availableSeats,
      }
    );
  },


  async deletePackage(
    id: number
  ) {

    await packageRepository.delete(
      id
    );

    return {
      success: true,
    };
  },

};
