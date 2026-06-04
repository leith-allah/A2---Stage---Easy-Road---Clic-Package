
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
    };
  }

}
