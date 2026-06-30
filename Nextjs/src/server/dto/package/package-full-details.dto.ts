
export interface PackageFullDetailsDto {

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

  status: string;

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

  flights: any[];

  hotels: any[];

  transports: any[];

  excursions: any[];
}
