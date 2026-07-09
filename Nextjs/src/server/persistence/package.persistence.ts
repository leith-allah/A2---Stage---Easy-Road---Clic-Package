
import { Flight } from "@/server/entities/flight.entity";
import { Hotel } from "@/server/entities/hotel.entity";
import { Transport } from "@/server/entities/transport.entity";
import { Excursion } from "@/server/entities/excursion.entity";

export interface PackagePersistence {

  id: number;

  name: string;

  country: string;

  destination: string;

  image: string | null;

  description: string | null;

  departureDate: Date;

  returnDate: Date;

  basePrice: number;

  totalStock: number;

  availableStock: number;

  status: string;

  ownerId: number;

  supplements: {

    economy: number;

    business: number;

    first: number;

    single: number;

    double: number;

    triple: number;

    quadruple: number;

    suite: number;

    bedOnly: number;

    bedBreakfast: number;

    halfBoard: number;

    fullBoard: number;

    allInclusive: number;

  };

  flights: Flight[];

  hotels: Hotel[];

  transports: Transport[];

  excursions: Excursion[];

}
