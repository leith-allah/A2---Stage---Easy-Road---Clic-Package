
import { FlightDto } from "../flight/flight.dto";
import { HotelDto } from "../hotel/hotel.dto";
import { TransportDto } from "../transport/transport.dto";
import { ExcursionDto } from "../excursion/excursion.dto";

export interface PackageFullDetailsDto {

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

  flights: FlightDto[];

  hotels: HotelDto[];

  transports: TransportDto[];

  excursions: ExcursionDto[];

}
