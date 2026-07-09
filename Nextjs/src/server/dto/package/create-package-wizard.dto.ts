
import { CreatePackageDto }
from "./create-package.dto";

import { CreateFlightDto }
from "../flight/create-flight.dto";

import { CreateHotelDto }
from "../hotel/create-hotel.dto";

import { CreateTransportDto }
from "../transport/create-transport.dto";

import { CreateExcursionDto }
from "../excursion/create-excursion.dto";

import { CreateSupplementsDto }
from "./create-supplements.dto";

export interface CreatePackageWizardDto {

  package: CreatePackageDto;

  flights: CreateFlightDto[];

  hotels: CreateHotelDto[];

  transports: CreateTransportDto[];

  excursions: CreateExcursionDto[];

  supplements: CreateSupplementsDto;

}
