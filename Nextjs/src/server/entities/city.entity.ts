
export class City {

  constructor(

    private readonly id: number,

    private readonly iataCode: string | null,

    private readonly name: string,

    private readonly country: string,

    private readonly latitude: number,

    private readonly longitude: number,

    private readonly timezone: string,

  ) {}

  // =======================================
  // Getters
  // =======================================

  getId(): number {
    return this.id;
  }

  getIataCode(): string | null {
    return this.iataCode;
  }

  getName(): string {
    return this.name;
  }

  getCountry(): string {
    return this.country;
  }

  getLatitude(): number {
    return this.latitude;
  }

  getLongitude(): number {
    return this.longitude;
  }

  getTimezone(): string {
    return this.timezone;
  }

}
