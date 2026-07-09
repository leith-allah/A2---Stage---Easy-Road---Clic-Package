
export class Excursion {

  constructor(

    public readonly id: number,

    public name: string,

    public location: string,

    public description: string,

  ) {}

  hasDescription(): boolean {

    return this.description.trim().length > 0;

  }

}
