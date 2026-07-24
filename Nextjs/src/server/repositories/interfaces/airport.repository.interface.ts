
import { Airport } from "@/server/entities/airport.entity";

export interface AirportRepository {

  findAll(): Promise<Airport[]>;

  findById(
    id: number,
  ): Promise<Airport | null>;

}
