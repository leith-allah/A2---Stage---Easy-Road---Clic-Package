
import {
    FlightClass,
    RoomType,
    BoardType,
} from "@/server/entities/value-objects/supplements.value-object";

export interface SupplementFormData {

    // ---------- Vol ----------

    defaultFlightClass: FlightClass;

    ECONOMY: number;

    BUSINESS: number;

    FIRST: number;

    // ---------- Chambre ----------

    defaultRoomType: RoomType;

    SINGLE: number;

    DOUBLE: number;

    TRIPLE: number;

    QUADRUPLE: number;

    SUITE: number;

    // ---------- Pension ----------

    defaultBoardType: BoardType;

     BED_ONLY: number;

     BED_BREAKFAST: number;

     HALF_BOARD: number;

     FULL_BOARD: number;

     ALL_INCLUSIVE: number;

}
