
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

import { prisma }
from "@/server/db/prisma";


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

  async getPackages(
    filters?: {
      country?: string;
      destination?: string;
      status?: string;
    }
  ) {

    await this.archiveExpiredPackages();

    const packages =

      filters?.country ||
      filters?.destination ||
      filters?.status

        ? await packageRepository.findFiltered(
            filters
          )
        : await packageRepository.findAll();

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

    await this.archiveExpiredPackages();

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


  async getArchivedPackages() {

    const packages =
      await packageRepository.findArchived();

    return packages.map(
      (pkg) =>
        PackageMapper.toDto(
          PackageMapper.fromPrisma(pkg)
        )
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

      supp_economy_pack:
        dto.suppEconomy ?? 0,

      supp_business_pack:
        dto.suppBusiness ?? 0,

      supp_first_pack:
        dto.suppFirst ?? 0,

      supp_single_pack:
        dto.suppSingle ?? 0,

      supp_double_pack:
        dto.suppDouble ?? 0,

      supp_triple_pack:
        dto.suppTriple ?? 0,

      supp_quadruple_pack:
        dto.suppQuadruple ?? 0,

      supp_suite_pack:
        dto.suppSuite ?? 0,

      supp_bed_only_pack:
        dto.suppBedOnly ?? 0,

      supp_bed_breakfast_pack:
        dto.suppBedBreakfast ?? 0,

      supp_half_board_pack:
        dto.suppHalfBoard ?? 0,

      supp_full_board_pack:
        dto.suppFullBoard ?? 0,

      supp_all_inclusive_pack:
        dto.suppAllInclusive ?? 0,

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

        supp_economy_pack:
          dto.suppEconomy,

        supp_business_pack:
          dto.suppBusiness,

        supp_first_pack:
          dto.suppFirst,

        supp_single_pack:
          dto.suppSingle,

        supp_double_pack:
          dto.suppDouble,

        supp_triple_pack:
          dto.suppTriple,

        supp_quadruple_pack:
          dto.suppQuadruple,

        supp_suite_pack:
          dto.suppSuite,

        supp_bed_only_pack:
          dto.suppBedOnly,

        supp_bed_breakfast_pack:
          dto.suppBedBreakfast,

        supp_half_board_pack:
          dto.suppHalfBoard,

        supp_full_board_pack:
          dto.suppFullBoard,

        supp_all_inclusive_pack:
          dto.suppAllInclusive,
      }
    );
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

  async archivePackage(
    id: number
  ) {

    await this.packageExists(
      id
    );

    return packageRepository.update(
      id,
      {
        statut_pack:
          PACKAGE_STATUS.ARCHIVED,
      }
    );

  },

  async restorePackage(
    id: number
  ) {

    const pkg =
      await this.packageExists(
        id
      );

    if (
      pkg.stock_dispo_pack <= 0
    ) {

      return packageRepository.update(
        id,
        {
          statut_pack:
            PACKAGE_STATUS.INACTIVE,
        }
      );

    }

    return packageRepository.update(
      id,
      {
        statut_pack:
          PACKAGE_STATUS.DRAFT,
      }
    );

  },

  async decreaseStock(
    id: number,
    quantity: number
  ) {

    const pkg =
      await this.packageExists(
        id
      );

    const newStock =
      Math.max(
        0,
        pkg.stock_dispo_pack
        - quantity
      );

    return packageRepository.update(
      id,
      {
        stock_dispo_pack:
          newStock,

        statut_pack:
          newStock <= 0
            ? PACKAGE_STATUS.INACTIVE
            : pkg.statut_pack,
      }
    );

  },

  async increaseStock(
    id: number,
    quantity: number
  ) {

    const pkg =
      await this.packageExists(
        id
      );

    const newStock =
      pkg.stock_dispo_pack
      + quantity;

    return packageRepository.update(
      id,
      {
        stock_dispo_pack:
          newStock,

        statut_pack:
          newStock > 0 &&
          pkg.statut_pack ===
            PACKAGE_STATUS.INACTIVE
              ? PACKAGE_STATUS.ACTIVE
              : pkg.statut_pack,
      }
    );

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
