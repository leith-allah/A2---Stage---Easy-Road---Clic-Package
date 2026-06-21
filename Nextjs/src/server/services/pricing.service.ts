
export const pricingService = {

  calculatePackagePrice(

    packageData: any,

    options: {

      nbVoyageurs: number;

      classeVol: string;

      typeChambre: string;

      pension: string;

    }

  ) {

    let unitPrice =

      Number(
        packageData.prix_base_pack
      );

    switch (
      options.classeVol
    ) {

      case "BUSINESS":

        unitPrice +=

          Number(
            packageData.supp_business_pack
          );

        break;

      case "FIRST":

        unitPrice +=

          Number(
            packageData.supp_first_pack
          );

        break;

      default:

        unitPrice +=

          Number(
            packageData.supp_economy_pack
          );

    }

    switch (
      options.typeChambre
    ) {

      case "SINGLE":

        unitPrice +=

          Number(
            packageData.supp_single_pack
          );

        break;

      case "DOUBLE":

        unitPrice +=

          Number(
            packageData.supp_double_pack
          );

        break;

      case "TRIPLE":

        unitPrice +=

          Number(
            packageData.supp_triple_pack
          );

        break;

      case "QUADRUPLE":

        unitPrice +=

          Number(
            packageData.supp_quadruple_pack
          );

        break;

      case "SUITE":

        unitPrice +=

          Number(
            packageData.supp_suite_pack
          );

        break;

    }

    switch (
      options.pension
    ) {

      case "BED_BREAKFAST":

        unitPrice +=

          Number(
            packageData.supp_bed_breakfast_pack
          );

        break;

      case "HALF_BOARD":

        unitPrice +=

          Number(
            packageData.supp_half_board_pack
          );

        break;

      case "FULL_BOARD":

        unitPrice +=

          Number(
            packageData.supp_full_board_pack
          );

        break;

      case "ALL_INCLUSIVE":

        unitPrice +=

          Number(
            packageData.supp_all_inclusive_pack
          );

        break;

      default:

        unitPrice +=

          Number(
            packageData.supp_bed_only_pack
          );

    }

    return (

      unitPrice *

      options.nbVoyageurs

    );

  },

};
