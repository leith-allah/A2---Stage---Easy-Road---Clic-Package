
import { FlightService }
from "@/server/services/flight.service";

import { CreateFlightDto }
from "@/server/dto/flight/create-flight.dto";

import { UpdateFlightDto }
from "@/server/dto/flight/update-flight.dto";

export class FlightController {

  constructor(

    private readonly service: FlightService,

  ) {}

  async findAll() {

    return this.service.findAll();

  }

  async findById(
    id: number,
  ) {

    return this.service.findById(id);

  }

  async create(
    dto: CreateFlightDto,
  ) {

    return this.service.create(dto);

  }

  async update(

    id: number,

    dto: UpdateFlightDto,

  ) {

    return this.service.update(

      id,

      dto,

    );

  }

  async delete(
    id: number,
  ) {

    return this.service.delete(id);

  }

}
