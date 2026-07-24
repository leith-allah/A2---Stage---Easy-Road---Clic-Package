
import { Flight } from "@/server/entities/flight.entity";
import { FlightAggregate } from "@/server/aggregates/flight.aggregate";

export interface FlightRepository {

  findAll(): Promise<Flight[]>;

  findById(
    id: number,
  ): Promise<Flight | null>;

  createAggregate(
    aggregate: FlightAggregate,
  ): Promise<Flight>;

  updateAggregate(
    aggregate: FlightAggregate,
  ): Promise<Flight>;

  delete(
    id: number,
  ): Promise<void>;

}
