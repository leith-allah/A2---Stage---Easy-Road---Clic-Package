
import { UpdatePackageDto } from "./update-package.dto";

import { UpdateFlightDto }
from "../flight/update-flight.dto";

import { UpdateHotelDto }
from "../hotel/update-hotel.dto";

import { UpdateTransportDto }
from "../transport/update-transport.dto";

import { UpdateExcursionDto }
from "../excursion/update-excursion.dto";

export interface UpdatePackageWizardDto {

    package: UpdatePackageDto;

    flights?: UpdateFlightDto[];

    hotels?: UpdateHotelDto[];

    transports?: UpdateTransportDto[];

    excursions?: UpdateExcursionDto[];

}
