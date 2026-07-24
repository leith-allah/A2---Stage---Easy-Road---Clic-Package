
import { Airline } from "@/server/entities/airline.entity";

export interface AirlineRepository {

  findAll(): Promise<Airline[]>;

  findById(
    id: number,
  ): Promise<Airline | null>;

}
