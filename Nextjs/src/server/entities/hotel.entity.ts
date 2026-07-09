
export class Hotel {

  constructor(

    public readonly id: number,

    public name: string,

    public country: string,

    public city: string,

    public address: string,

    public stars: number,

  ) {}

  isLuxury(): boolean {

    return this.stars >= 5;

  }

}
