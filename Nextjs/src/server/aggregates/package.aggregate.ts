
import { Flight } from "@/server/entities/flight.entity";
import { Hotel } from "@/server/entities/hotel.entity";
import { Transport } from "@/server/entities/transport.entity";
import { Excursion } from "@/server/entities/excursion.entity";

import { Supplements } from "../entities/value-objects/supplements.value-object";
import {
  PackageStatus,
  PackageStatusValue,
} from "../entities/value-objects/package-status.value-object";

import { PackageStock } from "../entities/value-objects/package-stock.value-object";

export class PackageAggregate {

  constructor(

    public readonly id: number,

    public name: string,

    public country: string,

    public destination: string,

    public image: string | null,

    public description: string | null,

    public departureDate: Date,

    public returnDate: Date,

    public basePrice: number,

    public readonly stock: PackageStock,

    public readonly status: PackageStatus,

    public supplements: Supplements,

    public readonly ownerId: number,

    public flights: Flight[],

    public hotels: Hotel[],

    public transports: Transport[],

    public excursions: Excursion[],

  ) {}

  // =======================================
  // Métier
  // =======================================

  publish() {

    this.status.publish();

  }

  archive() {

    this.status.archive();

  }

  draft() {

    this.status.draft();

  }

  isPublished() {

    return this.status.isPublished();

  }

  isArchived() {

    return this.status.isArchived();

  }

  reserveSeats(

    quantity: number,

  ) {

    this.stock.reserve(quantity);

  }

  releaseSeats(

    quantity: number,

  ) {

    this.stock.release(quantity);

  }

  increaseStock(

    quantity: number,

  ) {

    this.stock.increase(quantity);

  }

  decreaseStock(

    quantity: number,

  ) {

    this.stock.decrease(quantity);

  }

  calculatePrice(options: {

    flightClass?: "economy" | "business" | "first";

    roomType?:
      | "single"
      | "double"
      | "triple"
      | "quadruple"
      | "suite";

    boardType?:
      | "bedOnly"
      | "bedBreakfast"
      | "halfBoard"
      | "fullBoard"
      | "allInclusive";

  }) {

    return (

      this.basePrice +

      this.supplements.calculate(options)

    );

  }

  getAvailableStock() {

    return this.stock.getAvailable();

  }

  getTotalStock() {

    return this.stock.getTotal();

  }

  getStatus() {

    return this.status.getValue();

  }

}
