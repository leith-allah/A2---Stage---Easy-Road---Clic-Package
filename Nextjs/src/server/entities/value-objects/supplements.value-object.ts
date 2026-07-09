
export type FlightClass =

  | "economy"

  | "business"

  | "first";

export type RoomType =

  | "single"

  | "double"

  | "triple"

  | "quadruple"

  | "suite";

export type BoardType =

  | "bedOnly"

  | "bedBreakfast"

  | "halfBoard"

  | "fullBoard"

  | "allInclusive";

export class Supplements {

  constructor(

    public economy = 0,

    public business = 0,

    public first = 0,

    public single = 0,

    public double = 0,

    public triple = 0,

    public quadruple = 0,

    public suite = 0,

    public bedOnly = 0,

    public bedBreakfast = 0,

    public halfBoard = 0,

    public fullBoard = 0,

    public allInclusive = 0,

  ) {}

  getFlightSupplement(

    flightClass: FlightClass,

  ): number {

    return this[flightClass];

  }

  getRoomSupplement(

    room: RoomType,

  ): number {

    return this[room];

  }

  getBoardSupplement(

    board: BoardType,

  ): number {

    return this[board];

  }

  calculate(options: {

    flightClass?: FlightClass;

    roomType?: RoomType;

    boardType?: BoardType;

  }): number {

    let total = 0;

    if (options.flightClass) {

      total += this.getFlightSupplement(

        options.flightClass,

      );

    }

    if (options.roomType) {

      total += this.getRoomSupplement(

        options.roomType,

      );

    }

    if (options.boardType) {

      total += this.getBoardSupplement(

        options.boardType,

      );

    }

    return total;

  }

}
