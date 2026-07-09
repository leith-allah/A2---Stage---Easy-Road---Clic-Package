
import { ExcursionService } from "@/server/services/excursion.service";

import { CreateExcursionDto } from "@/server/dto/excursion/create-excursion.dto";

import { UpdateExcursionDto } from "@/server/dto/excursion/update-excursion.dto";

export class ExcursionController {

  constructor(

    private readonly service: ExcursionService,

  ) {}

  async getAll() {

    return this.service.getAllExcursions();

  }

  async getById(

    id: number,

  ) {

    return this.service.getExcursionById(id);

  }

  async create(

    dto: CreateExcursionDto,

  ) {

    return this.service.createExcursion(dto);

  }

  async update(

    id: number,

    dto: UpdateExcursionDto,

  ) {

    return this.service.updateExcursion(

      id,

      dto,

    );

  }

  async delete(

    id: number,

  ) {

    return this.service.deleteExcursion(id);

  }

}
