
import { Flight } from "@/server/entities/flight.entity";

export interface FlightRepository {

  findAll(): Promise<Flight[]>;

  findById(
    id: number,
  ): Promise<Flight | null>;

  createAggregate(
    flight: Flight,
  ): Promise<Flight>;

  updateAggregate(
    flight: Flight,
  ): Promise<Flight>;

  delete(
    id: number,
  ): Promise<void>;

}
