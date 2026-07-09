
export interface CreatePackageDto {

  // --------------------
  // Informations générales
  // --------------------

  name: string;

  country: string;

  destination: string;

  image?: string;

  description?: string;

  // --------------------
  // Voyage
  // --------------------

  departureDate: string;

  returnDate: string;

  // --------------------
  // Prix
  // --------------------

  basePrice: number;

  // --------------------
  // Stock
  // --------------------

  totalStock: number;

  // --------------------
  // Suppléments Vol
  // --------------------

  suppEconomy?: number;

  suppBusiness?: number;

  suppFirst?: number;

  // --------------------
  // Suppléments Chambre
  // --------------------

  suppSingle?: number;

  suppDouble?: number;

  suppTriple?: number;

  suppQuadruple?: number;

  suppSuite?: number;

  // --------------------
  // Suppléments Pension
  // --------------------

  suppBedOnly?: number;

  suppBedBreakfast?: number;

  suppHalfBoard?: number;

  suppFullBoard?: number;

  suppAllInclusive?: number;

}
