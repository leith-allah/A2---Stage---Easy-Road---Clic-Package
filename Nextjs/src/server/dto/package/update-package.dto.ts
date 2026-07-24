
import {
    FlightClass,
    RoomType,
    BoardType,
} from "@/server/entities/value-objects/supplements.value-object";


export interface UpdatePackageDto {

  name?: string;

  country?: string;

  destination?: string;

  image?: string;

  description?: string;

  departureDate?: string;

  returnDate?: string;

  basePrice?: number;

  totalStock?: number;

  defaultFlightClass?: FlightClass;
  defaultRoomType?: RoomType;
  defaultBoardType?: BoardType;

  supplements?: {

      ECONOMY?: number;

      BUSINESS?: number;

      FIRST?: number;

      SINGLE?: number;

      DOUBLE?: number;

      TRIPLE?: number;

      QUADRUPLE?: number;

      SUITE?: number;

      BED_ONLY?: number;

      BED_BREAKFAST?: number;

      HALF_BOARD?: number;

      FULL_BOARD?: number;

      ALL_INCLUSIVE?: number;

  };
  
}
