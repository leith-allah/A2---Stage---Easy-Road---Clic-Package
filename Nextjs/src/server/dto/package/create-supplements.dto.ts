
export interface CreateSupplementsDto {

  // ==========================
  // Vol
  // ==========================

  economy?: number;

  business?: number;

  first?: number;

  // ==========================
  // Chambre
  // ==========================

  single?: number;

  double?: number;

  triple?: number;

  quadruple?: number;

  suite?: number;

  // ==========================
  // Pension
  // ==========================

  bedOnly?: number;

  bedBreakfast?: number;

  halfBoard?: number;

  fullBoard?: number;

  allInclusive?: number;

}
