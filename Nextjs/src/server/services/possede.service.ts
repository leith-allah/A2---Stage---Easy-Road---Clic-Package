
import { possedeRepository }
from "@/server/repositories/possede.repository";

import { PossedeMapper }
from "@/server/mappers/possede.mapper";

export const possedeService = {

  async getAll() {

    const data =
      await possedeRepository.findAll();

    return data.map(
      PossedeMapper.toDto
    );

  },

  async create(
    id_pack: number,
    id_vol: number
  ) {

    const data =
      await possedeRepository.create(
        id_pack,
        id_vol
      );

    return PossedeMapper.toDto(
      data
    );

  },

  async delete(
    id_pack: number,
    id_vol: number
  ) {

    return possedeRepository.delete(
      id_pack,
      id_vol
    );

  },

};
