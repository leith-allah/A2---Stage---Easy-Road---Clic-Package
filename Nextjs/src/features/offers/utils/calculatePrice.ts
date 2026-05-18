
import {
  FlightClass,
  PensionType,
  RoomType,
} from "../types/offer.types";

type Params = {
  basePrice: number;

  travelers: number;

  flightClass: FlightClass;

  roomType: RoomType;

  pension: PensionType;
};

export function calculatePrice({
  basePrice,
  travelers,
  flightClass,
  roomType,
  pension,
}: Params) {
  let total = basePrice;

  // Classe vol
  if (flightClass === "Business") {
    total += 120000;
  }

  if (flightClass === "First") {
    total += 250000;
  }

  // Chambre
  if (roomType === "Deluxe") {
    total += 50000;
  }

  if (roomType === "Suite") {
    total += 120000;
  }

  // Pension
  if (pension === "Demi-pension") {
    total += 30000;
  }

  if (pension === "Pension complète") {
    total += 60000;
  }

  return total * travelers;
}
