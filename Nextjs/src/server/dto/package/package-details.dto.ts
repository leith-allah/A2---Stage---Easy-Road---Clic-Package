
export interface PackageDetailsDto {

  id: number;

  name: string;

  country: string;

  destination: string;

  image?: string;

  description?: string;

  departureDate: string;

  returnDate: string;

  basePrice: number;

  availableSeats: number;

  stockTotal: number;

  // Vol

  suppEconomy: number;

  suppBusiness: number;

  suppFirst: number;

  // Chambres

  suppSingle: number;

  suppDouble: number;

  suppTriple: number;

  suppQuadruple: number;

  suppSuite: number;

  // Pension

  suppBedOnly: number;

  suppBedBreakfast: number;

  suppHalfBoard: number;

  suppFullBoard: number;

  suppAllInclusive: number;

}
