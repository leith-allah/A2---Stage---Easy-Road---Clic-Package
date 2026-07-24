
export interface PackageDetailsDto {

  id: number;

  name: string;

  country: string;

  destination: string;

  image?: string | null;

  description?: string | null;

  departureDate: string;

  returnDate: string;

  basePrice: number;

  availableSeats: number;

  stockTotal: number;

  suppEconomy: number;
  suppBusiness: number;
  suppFirst: number;

  suppSingle: number;
  suppDouble: number;
  suppTriple: number;
  suppQuadruple: number;
  suppSuite: number;

  suppBedOnly: number;
  suppBedBreakfast: number;
  suppHalfBoard: number;
  suppFullBoard: number;
  suppAllInclusive: number;

}
