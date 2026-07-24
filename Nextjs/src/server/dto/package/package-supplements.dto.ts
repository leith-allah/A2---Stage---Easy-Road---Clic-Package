
import {
    FlightClass,
    RoomType,
    BoardType,
} from "@/server/entities/value-objects/supplements.value-object";


export interface PackageSupplementsDto {

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

    defaultFlightClass: FlightClass;

    defaultRoomType: RoomType;

    defaultBoardType: BoardType;

}
