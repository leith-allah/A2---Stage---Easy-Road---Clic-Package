
export class Transport {

  constructor(

    public readonly id: number,

    public route: string,

    public company: string | null,

  ) {}

  hasCompany(): boolean {

    return this.company !== null;

  }

}
