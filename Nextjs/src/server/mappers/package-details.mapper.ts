
import { PackageDetailsDto }
from "@/server/dto/package/package-details.dto";

export class PackageDetailsMapper {

  static toDto(pkg: any): PackageDetailsDto {

    return {

      id: Number(pkg.id_pack),

      name: pkg.nom_pack,

      country: pkg.pays_pack,

      destination: pkg.destination_pack,

      image: pkg.image_pack,

      description: pkg.description_pack,

      departureDate:
        pkg.date_depart_pack.toISOString(),

      returnDate:
        pkg.date_retour_pack.toISOString(),

      basePrice:
        Number(pkg.prix_base_pack),

      availableSeats:
        pkg.stock_dispo_pack,

      stockTotal:
        pkg.stock_total_pack,

      suppEconomy:
        Number(pkg.supp_ECONOMY_pack),

      suppBusiness:
        Number(pkg.supp_BUSINESS_pack),

      suppFirst:
        Number(pkg.supp_FIRST_pack),

      suppSingle:
        Number(pkg.supp_SINGLE_pack),

      suppDouble:
        Number(pkg.supp_DOUBLE_pack),

      suppTriple:
        Number(pkg.supp_TRIPLE_pack),

      suppQuadruple:
        Number(pkg.supp_QUADRUPLE_pack),

      suppSuite:
        Number(pkg.supp_SUITE_pack),

      suppBedOnly:
        Number(pkg.supp_BED_ONLY_pack),

      suppBedBreakfast:
        Number(pkg.supp_BED_BREAKFAST_pack),

      suppHalfBoard:
        Number(pkg.supp_HALF_BOARD_pack),

      suppFullBoard:
        Number(pkg.supp_FULL_BOARD_pack),

      suppAllInclusive:
        Number(pkg.supp_ALL_INCLUSIVE_pack),

    };

  }

}
