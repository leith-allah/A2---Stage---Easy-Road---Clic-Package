
export interface PackageDto {

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

  status?: string;

  totalSeats?: number;

  suppEconomy?: number;
  suppBusiness?: number;
  suppFirst?: number;

  suppSingle?: number;
  suppDouble?: number;
  suppTriple?: number;
  suppQuadruple?: number;
  suppSuite?: number;

  suppBedOnly?: number;
  suppBedBreakfast?: number;
  suppHalfBoard?: number;
  suppFullBoard?: number;
  suppAllInclusive?: number;
}
