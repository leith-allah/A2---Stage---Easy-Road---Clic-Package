
import {
  FlightClass,
  RoomType,
  BoardType,
} from "@/server/entities/value-objects/supplements.value-object";

export interface CreateAchatPackageDto {

  packageId: number;

  nbVoyageurs: number;

  classeVol: FlightClass;

  typeChambre: RoomType;

  pension: BoardType;

}
