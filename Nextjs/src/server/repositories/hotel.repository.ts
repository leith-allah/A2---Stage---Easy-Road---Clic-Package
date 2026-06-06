
import { prisma } from "@/server/db/prisma";

export const hotelRepository = {

  findAll() {

    return prisma.hotel.findMany({

      orderBy: {
        nom_hot: "asc",
      },

    });

  },

  findById(
    id: number
  ) {

    return prisma.hotel.findUnique({

      where: {
        id_hot: BigInt(id),
      },

    });

  },

  create(data: {

    nom_hot: string;

    nb_etoiles_hot: number;

    pays_hot: string;

    ville_hot: string;

    adresse_hot: string;

  }) {

    return prisma.hotel.create({

      data,

    });

  },

  update(
    id: number,
    data: {

      nom_hot?: string;

      nb_etoiles_hot?: number;

      pays_hot?: string;

      ville_hot?: string;

      adresse_hot?: string;

    }
  ) {

    return prisma.hotel.update({

      where: {
        id_hot: BigInt(id),
      },

      data,

    });

  },

  delete(
    id: number
  ) {

    return prisma.hotel.delete({

      where: {
        id_hot: BigInt(id),
      },

    });

  },

};
