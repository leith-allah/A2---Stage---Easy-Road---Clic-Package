
import { utiliseRepository }
from "@/server/repositories/utilise.repository";

import { UtiliseMapper }
from "@/server/mappers/utilise.mapper";

export const utiliseService = {

  async getAll() {

    const data =
      await utiliseRepository.findAll();

    return data.map(
      UtiliseMapper.toDto
    );

  },

  async create(
    id_pack: number,
    id_transp: number
  ) {

    const data =
      await utiliseRepository.create(
        id_pack,
        id_transp
      );

    return UtiliseMapper.toDto(
      data
    );

  },

  async delete(
    id_pack: number,
    id_transp: number
  ) {

    return utiliseRepository.delete(
      id_pack,
      id_transp
    );

  },

};
