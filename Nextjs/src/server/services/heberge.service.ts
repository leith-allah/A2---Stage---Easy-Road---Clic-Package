
import { hebergeRepository }
from "@/server/repositories/heberge.repository";

import { HebergeMapper }
from "@/server/mappers/heberge.mapper";

export const hebergeService = {

  async getAll() {

    const data =
      await hebergeRepository.findAll();

    return data.map(
      HebergeMapper.toDto
    );

  },

  async create(
    id_pack: number,
    id_hot: number
  ) {

    const data =
      await hebergeRepository.create(
        id_pack,
        id_hot
      );

    return HebergeMapper.toDto(
      data
    );

  },

  async delete(
    id_pack: number,
    id_hot: number
  ) {

    return hebergeRepository.delete(
      id_pack,
      id_hot
    );

  },

};
