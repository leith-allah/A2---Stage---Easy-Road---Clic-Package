
import { City } from "./city.entity";

export class Airport {

  constructor(

    private readonly id: number,

    private readonly iataCode: string,

    private readonly icaoCode: string,

    private readonly name: string,

    private readonly latitude: number,

    private readonly longitude: number,

    private readonly city: City,

  ) {}

  // =======================================
  // Getters
  // =======================================

  getId(): number {
    return this.id;
  }

  getIataCode(): string {
    return this.iataCode;
  }

  getIcaoCode(): string {
    return this.icaoCode;
  }

  getName(): string {
    return this.name;
  }

  getLatitude(): number {
    return this.latitude;
  }

  getLongitude(): number {
    return this.longitude;
  }

  getCity(): City {
    return this.city;
  }

}
