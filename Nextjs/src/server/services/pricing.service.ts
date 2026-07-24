
import {
  FlightClass,
  RoomType,
  BoardType,
} from "@/server/entities/value-objects/supplements.value-object";

import { PackageAggregate }
from "@/server/aggregates/package.aggregate";

export const pricingService = {

  calculatePackagePrice(

    packageData: PackageAggregate,

    options: {

      nbVoyageurs: number;

      classeVol: FlightClass;

      typeChambre: RoomType;

      pension: BoardType;

    }

  ) {

    const unitPrice =

      packageData.calculatePrice({

        flightClass:
          options.classeVol,

        roomType:
          options.typeChambre,

        boardType:
          options.pension,

      });

    return (

      unitPrice *

      options.nbVoyageurs

    );

  },

};
