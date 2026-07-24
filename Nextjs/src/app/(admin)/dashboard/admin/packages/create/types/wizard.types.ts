
export interface PackageFormData {
  nom_pack: string;
  pays_pack: string;
  destination_pack: string;
  description_pack?: string;
  image_pack?: string;

  date_depart_pack: string;
  date_retour_pack: string;

  prix_base_pack: number;

  stock_total_pack: number;
  stock_dispo_pack: number;

  supp_ECONOMY_pack?: number;
  supp_BUSINESS_pack?: number;
  supp_FIRST_pack?: number;

  supp_SINGLE_pack?: number;
  supp_DOUBLE_pack?: number;
  supp_TRIPLE_pack?: number;
  supp_QUADRUPLE_pack?: number;
  supp_SUITE_pack?: number;

  supp_BED_ONLY_pack?: number;
  supp_BED_BREAKFAST_pack?: number;
  supp_HALF_BOARD_pack?: number;
  supp_FULL_BOARD_pack?: number;
  supp_ALL_INCLUSIVE_pack?: number;
}

export interface WizardState {
  packageId?: number;

  package?: PackageFormData;

  flightId?: number;

  hotelId?: number;

  transportId?: number;

  excursionId?: number;
}
