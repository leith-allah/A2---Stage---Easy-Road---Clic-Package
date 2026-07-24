
export class Airline {

  constructor(

    private readonly id: number,

    private readonly iataCode: string,

    private readonly icaoCode: string,

    private readonly name: string,

    private readonly website: string | null,

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

  getWebsite(): string | null {
    return this.website;
  }

}
