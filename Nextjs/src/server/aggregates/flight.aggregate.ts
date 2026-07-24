
import { Flight } from "@/server/entities/flight.entity";

export class FlightAggregate {

  constructor(
    private readonly flight: Flight,
  ) {}

  // =======================================
  // Métier
  // =======================================

  activate(): void {
    this.flight.activate();
  }

  inactivate(): void {
    this.flight.inactivate();
  }

  archive(): void {
    this.flight.archive();
  }

  // =======================================
  // Getter
  // =======================================

  get entity(): Flight {
    return this.flight;
  }

}
