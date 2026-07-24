
export type FlightClass =

  | "ECONOMY"

  | "BUSINESS"

  | "FIRST";

export type RoomType =

  | "SINGLE"

  | "DOUBLE"

  | "TRIPLE"

  | "QUADRUPLE"

  | "SUITE";

export type BoardType =

  | "BED_ONLY"

  | "BED_BREAKFAST"

  | "HALF_BOARD"

  | "FULL_BOARD"

  | "ALL_INCLUSIVE";

export class Supplements {

  constructor(

    public ECONOMY = 0,

    public BUSINESS = 0,

    public FIRST = 0,

    public SINGLE = 0,

    public DOUBLE = 0,

    public TRIPLE = 0,

    public QUADRUPLE = 0,

    public SUITE = 0,

    public BED_ONLY = 0,

    public BED_BREAKFAST = 0,

    public HALF_BOARD = 0,

    public FULL_BOARD = 0,

    public ALL_INCLUSIVE = 0,

  ) {

    this.validatePositive();

  }

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

  private validatePositive() {

      const values = [

          this.ECONOMY,
          this.BUSINESS,
          this.FIRST,

          this.SINGLE,
          this.DOUBLE,
          this.TRIPLE,
          this.QUADRUPLE,
          this.SUITE,

          this.BED_ONLY,
          this.BED_BREAKFAST,
          this.HALF_BOARD,
          this.FULL_BOARD,
          this.ALL_INCLUSIVE,

      ];

      if(values.some(v => v < 0)) {

          throw new Error(
              "Les suppléments doivent être positifs."
          );

      }

  }

}
