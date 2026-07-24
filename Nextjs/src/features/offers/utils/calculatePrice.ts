
import {
  FlightClass,
  RoomType,
  PensionType,
}
from "@/features/purchases/types/purchase-options.types";

type Params = {

  packageData: any;

  travellers: number;

  flightClass: FlightClass;

  roomType: RoomType;

  pension: PensionType;
};

export function calculatePrice({
  packageData,
  travellers,
  flightClass,
  roomType,
  pension,
}: Params) {

  let total =
    packageData.basePrice;

  if (flightClass === "BUSINESS") {

    total +=
      packageData.suppBusiness ?? 0;

  }

  if (flightClass === "FIRST") {

    total +=
      packageData.suppFirst ?? 0;

  }

  switch (roomType) {

    case "SINGLE":
      total +=
        packageData.suppSingle ?? 0;
      break;

    case "DOUBLE":
      total +=
        packageData.suppDouble ?? 0;
      break;

    case "TRIPLE":
      total +=
        packageData.suppTriple ?? 0;
      break;

    case "QUADRUPLE":
      total +=
        packageData.suppQuadruple ?? 0;
      break;

    case "SUITE":
      total +=
        packageData.suppSuite ?? 0;
      break;
  }

  switch (pension) {

    case "BED_BREAKFAST":
      total +=
        packageData.suppBedBreakfast ?? 0;
      break;

    case "HALF_BOARD":
      total +=
        packageData.suppHalfBoard ?? 0;
      break;

    case "FULL_BOARD":
      total +=
        packageData.suppFullBoard ?? 0;
      break;

    case "ALL_INCLUSIVE":
      total +=
        packageData.suppAllInclusive ?? 0;
      break;
  }

  return total * travellers;
}
