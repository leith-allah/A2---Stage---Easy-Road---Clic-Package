
import { Flight } from "@/server/entities/flight.entity";
import { Hotel } from "@/server/entities/hotel.entity";
import { Transport } from "@/server/entities/transport.entity";
import { Excursion } from "@/server/entities/excursion.entity";

import {
    FlightClass,
    RoomType,
    BoardType,
} from "@/server/entities/value-objects/supplements.value-object";


export interface PackagePersistence {

  id: number;

  name: string;

  country: string;

  destination: string;

  image: string | null;

  description: string | null;

  departureDate: Date;

  returnDate: Date;

  basePrice: number;

  totalStock: number;

  availableStock: number;

  status: string;

  defaultFlightClass: FlightClass;

  defaultRoomType: RoomType;
  
  defaultBoardType: BoardType;

  ownerId: number;

  supplements: {

    ECONOMY: number;

    BUSINESS: number;

    FIRST: number;

    SINGLE: number;

    DOUBLE: number;

    TRIPLE: number;

    QUADRUPLE: number;

    SUITE: number;

    BED_ONLY: number;

    BED_BREAKFAST: number;

    HALF_BOARD: number;

    FULL_BOARD: number;

    ALL_INCLUSIVE: number;

  };

  flights: Flight[];

  hotels: Hotel[];

  transports: Transport[];

  excursions: Excursion[];

}
