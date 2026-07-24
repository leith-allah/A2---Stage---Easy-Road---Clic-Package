
import { prisma } from "@/server/db/prisma";

export const favoriteRepository = {

  findByUser(userId: number) {

    return prisma.favorise.findMany({

      where: {
        id_user: BigInt(userId),
      },

      select: {

        id_pack: true,

      },

      orderBy: {

        date_ajout_fav: "desc",

      },

    });

  },

  find(userId: number, packageId: number) {

    return prisma.favorise.findFirst({

      where: {

        id_user: BigInt(userId),

        id_pack: BigInt(packageId),

      },

    });

  },

  create(userId: number, packageId: number) {

    return prisma.favorise.create({

      data: {

        id_user: BigInt(userId),

        id_pack: BigInt(packageId),

        date_ajout_fav: new Date(),

      },

    });

  },

  delete(userId: number, packageId: number) {

    return prisma.favorise.delete({

      where: {

        id_user_id_pack: {

          id_user: BigInt(userId),

          id_pack: BigInt(packageId),

        },

      },

    });

  },

};
