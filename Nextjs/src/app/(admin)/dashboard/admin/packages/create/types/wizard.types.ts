
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

  supp_economy_pack?: number;
  supp_business_pack?: number;
  supp_first_pack?: number;

  supp_single_pack?: number;
  supp_double_pack?: number;
  supp_triple_pack?: number;
  supp_quadruple_pack?: number;
  supp_suite_pack?: number;

  supp_bed_only_pack?: number;
  supp_BEDbed_breakfast_pack?: number;
  supp_half_board_pack?: number;
  supp_full_board_pack?: number;
  supp_all_inclusive_pack?: number;

  // Options par défaut
  default_flight_class_pack?: string;
  default_room_type_pack?: string;
  default_board_type_pack?: string;

  defaultFlightClass?: string;
  defaultRoomType?: string;
  defaultBoardType?: string;
}

export interface WizardState {
  packageId?: number;

  package?: PackageFormData;

  flightId?: number;

  hotelId?: number;

  transportId?: number;

  excursionId?: number;
}
