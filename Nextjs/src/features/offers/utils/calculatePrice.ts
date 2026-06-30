
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

  if (flightClass === "Business") {

    total +=
      packageData.suppBusiness ?? 0;

  }

  if (flightClass === "First") {

    total +=
      packageData.suppFirst ?? 0;

  }

  switch (roomType) {

    case "Single":
      total +=
        packageData.suppSingle ?? 0;
      break;

    case "Double":
      total +=
        packageData.suppDouble ?? 0;
      break;

    case "Triple":
      total +=
        packageData.suppTriple ?? 0;
      break;

    case "Quadruple":
      total +=
        packageData.suppQuadruple ?? 0;
      break;

    case "Suite":
      total +=
        packageData.suppSuite ?? 0;
      break;
  }

  switch (pension) {

    case "BedBreakfast":
      total +=
        packageData.suppBedBreakfast ?? 0;
      break;

    case "HalfBoard":
      total +=
        packageData.suppHalfBoard ?? 0;
      break;

    case "FullBoard":
      total +=
        packageData.suppFullBoard ?? 0;
      break;

    case "AllInclusive":
      total +=
        packageData.suppAllInclusive ?? 0;
      break;
  }

  return total * travellers;
}
