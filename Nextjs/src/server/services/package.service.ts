
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

import { PACKAGE_STATUS }
from "@/server/constants/package-status";


export const packageService = {

  async packageExists(
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

    if (
      new Date(dto.returnDate)
      <
      new Date(dto.departureDate)
    ) {

      throw new Error(
        "La date de retour doit être après la date de départ"
      );

    }

    return packageRepository.create({

      mle_pack:
        crypto.randomUUID(),

      statut_pack:
        PACKAGE_STATUS.DRAFT,

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

  async publishPackage(
    id: number
  ) {

    const pkg =
      await this.packageExists(id);

    if (
      pkg.statut_pack ===
      PACKAGE_STATUS.ARCHIVED
    ) {

      throw new Error(
        "Impossible de publier un package archivé"
      );

    }

    return packageRepository.update(
      id,
      {
        statut_pack:
          PACKAGE_STATUS.ACTIVE,
      }
    );

  },

  async disablePackage(
    id: number
  ) {

    await this.packageExists(
      id
    );

    return packageRepository.update(
      id,
      {
        statut_pack:
          PACKAGE_STATUS.INACTIVE,
      }
    );

  },

  async activatePackage(
    id: number
  ) {

    const pkg =
      await this.packageExists(
        id
      );

    if (
      pkg.statut_pack ===
      PACKAGE_STATUS.ARCHIVED
    ) {
      throw new Error(
        "Impossible de réactiver un package archivé"
      );
    }

    return packageRepository.update(
      id,
      {
        statut_pack:
          PACKAGE_STATUS.ACTIVE,
      }
    );
  },

  async updatePackage(
    id: number,
    dto: UpdatePackageDto
  ) {

    await this.packageExists(id);

    if (
      dto.departureDate &&
      dto.returnDate &&
      new Date(dto.returnDate)
        <
      new Date(dto.departureDate)
    ) {

      throw new Error(
        "La date de retour doit être après la date de départ"
      );

    }

    let packageStatus:
      string | undefined;

    if (
      dto.availableSeats !== undefined
    ) {

      packageStatus =
        dto.availableSeats <= 0
          ? PACKAGE_STATUS.INACTIVE
          : PACKAGE_STATUS.ACTIVE;

    }

    return packageRepository.update(
      id,
      {
        statut_pack:
          packageStatus,

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

        stock_total_pack:
          dto.availableSeats,

        stock_dispo_pack:
          dto.availableSeats,
      }
    );
  },

  async deletePackage(
    id: number
  ) {

    await this.packageExists(
      id
    );

    await packageRepository.delete(
      id
    );

    return {
      success: true,
    };
  },
};
