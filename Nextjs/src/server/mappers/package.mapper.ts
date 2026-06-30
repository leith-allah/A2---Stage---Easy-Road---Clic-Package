
import { Package } from "@/server/entities/package.entity";

import { PackageDto } from "@/server/dto/package/package.dto";

export class PackageMapper {

  static fromPrisma(
    prismaPackage: any
  ): Package {

    return {

      id:
        Number(
          prismaPackage.id_pack
        ),

      name:
        prismaPackage.nom_pack,

      country:
        prismaPackage.pays_pack,

      destination:
        prismaPackage.destination_pack,

      image:
        prismaPackage.image_pack,

      description:
        prismaPackage.description_pack,

      departureDate:
        prismaPackage.date_depart_pack,

      returnDate:
        prismaPackage.date_retour_pack,

      basePrice:
        Number(
          prismaPackage.prix_base_pack
        ),

      availableSeats:
        prismaPackage.stock_dispo_pack,

      createdAt:
        prismaPackage.date_heure_creation_pack,

      status:
        prismaPackage.statut_pack,

      totalSeats:
        prismaPackage.stock_total_pack,

      suppEconomy:
        Number(prismaPackage.supp_economy_pack),

      suppBusiness:
        Number(prismaPackage.supp_business_pack),

      suppFirst:
        Number(prismaPackage.supp_first_pack),

      suppSingle:
        Number(prismaPackage.supp_single_pack),

      suppDouble:
        Number(prismaPackage.supp_double_pack),

      suppTriple:
        Number(prismaPackage.supp_triple_pack),

      suppQuadruple:
        Number(prismaPackage.supp_quadruple_pack),

      suppSuite:
        Number(prismaPackage.supp_suite_pack),

      suppBedOnly:
        Number(prismaPackage.supp_bed_only_pack),

      suppBedBreakfast:
        Number(prismaPackage.supp_bed_breakfast_pack),

      suppHalfBoard:
        Number(prismaPackage.supp_half_board_pack),

      suppFullBoard:
        Number(prismaPackage.supp_full_board_pack),

      suppAllInclusive:
        Number(prismaPackage.supp_all_inclusive_pack),
    };
  }

  static toDto(
    entity: Package
  ): PackageDto {

    return {

      id:
        entity.id,

      name:
        entity.name,

      country:
        entity.country,

      destination:
        entity.destination,

      image:
        entity.image,

      description:
        entity.description,

      departureDate:
        entity.departureDate.toISOString(),

      returnDate:
        entity.returnDate.toISOString(),

      basePrice:
        entity.basePrice,

      availableSeats:
        entity.availableSeats,

      status:
        entity.status,

      totalSeats:
        entity.totalSeats,

      suppEconomy:
        entity.suppEconomy,

      suppBusiness:
        entity.suppBusiness,

      suppFirst:
        entity.suppFirst,

      suppSingle:
        entity.suppSingle,

      suppDouble:
        entity.suppDouble,

      suppTriple:
        entity.suppTriple,

      suppQuadruple:
        entity.suppQuadruple,

      suppSuite:
        entity.suppSuite,

      suppBedOnly:
        entity.suppBedOnly,

      suppBedBreakfast:
        entity.suppBedBreakfast,

      suppHalfBoard:
        entity.suppHalfBoard,

      suppFullBoard:
        entity.suppFullBoard,

      suppAllInclusive:
        entity.suppAllInclusive,
    };
  }

}
