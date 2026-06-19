
import { proposeRepository }
from "@/server/repositories/propose.repository";

import { ProposeMapper }
from "@/server/mappers/propose.mapper";

export const proposeService = {

  async getAll() {

    const data =
      await proposeRepository.findAll();

    return data.map(
      ProposeMapper.toDto
    );

  },

  async create(
    id_pack: number,
    id_exc: number
  ) {

    const data =
      await proposeRepository.create(
        id_pack,
        id_exc
      );

    return ProposeMapper.toDto(
      data
    );

  },

  async delete(
    id_pack: number,
    id_exc: number
  ) {

    return proposeRepository.delete(
      id_pack,
      id_exc
    );

  },

};
