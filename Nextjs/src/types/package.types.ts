
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
}
