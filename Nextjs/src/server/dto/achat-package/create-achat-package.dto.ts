
export interface CreateAchatPackageDto {

  packageId: number;

  nbVoyageurs: number;

  classeVol:
    | "ECONOMY"
    | "BUSINESS"
    | "FIRST";

  typeChambre:
    | "SINGLE"
    | "DOUBLE"
    | "TRIPLE"
    | "QUADRUPLE"
    | "SUITE";

  pension:
    | "BED_ONLY"
    | "BED_BREAKFAST"
    | "HALF_BOARD"
    | "FULL_BOARD"
    | "ALL_INCLUSIVE";

}
