
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
        Number(pkg.supp_economy_pack),

      suppBusiness:
        Number(pkg.supp_business_pack),

      suppFirst:
        Number(pkg.supp_first_pack),

      suppSingle:
        Number(pkg.supp_single_pack),

      suppDouble:
        Number(pkg.supp_double_pack),

      suppTriple:
        Number(pkg.supp_triple_pack),

      suppQuadruple:
        Number(pkg.supp_quadruple_pack),

      suppSuite:
        Number(pkg.supp_suite_pack),

      suppBedOnly:
        Number(pkg.supp_bed_only_pack),

      suppBedBreakfast:
        Number(pkg.supp_bed_breakfast_pack),

      suppHalfBoard:
        Number(pkg.supp_half_board_pack),

      suppFullBoard:
        Number(pkg.supp_full_board_pack),

      suppAllInclusive:
        Number(pkg.supp_all_inclusive_pack),

    };

  }

}
