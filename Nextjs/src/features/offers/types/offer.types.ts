
export type FlightClass =
  | "ECONOMY"
  | "BUSINESS"
  | "FIRST";

export type RoomType =
  | "SINGLE"
  | "DOUBLE"
  | "TRIPLE"
  | "QUADRUPLE"
  | "SUITE";

export type PensionType =
  | "BED_ONLY"
  | "BED_BREAKFAST"
  | "HALF_BOARD"
  | "FULL_BOARD"
  | "ALL_INCLUSIVE";

export interface Offer {
  id: number;

  // Général
  title: string;
  country: string;
  destination: string;
  description: string;

  // Média
  image: string;

  // Dates
  departureDate: string;
  returnDate: string;

  // Prix & stock
  basePrice: number;
  stock: number;

  // Vol
  airline: string;
  departureLocation: string;

  departureTime: string;
  arrivalTime: string;

  returnDepartureTime: string;
  returnArrivalTime: string;

  flightNumber: string;

  // Hôtel
  hotelName: string;
  hotelStars: number;
  hotelAddress: string;

  // Transport
  transportCompany: string;
  transportRoute: string;

  // Excursion
  excursionName: string;
  excursionLocation: string;
  excursionDescription: string;

  // Options disponibles
  availableFlightClasses: FlightClass[];

  availableRoomTypes: RoomType[];

  availablePensions: PensionType[];
}
