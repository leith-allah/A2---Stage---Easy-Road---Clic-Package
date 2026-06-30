
import { prisma } from "@/server/db/prisma";

export const completePackageRepository = {

  async createCompletePackage(data: any) {

    return prisma.$transaction(async (tx) => {

      /*
       * TODO
       * Création du Vol
       */

      /*
       * TODO
       * Création Hôtel
       */

      /*
       * TODO
       * Création Transport
       */

      /*
       * TODO
       * Création Excursion
       */

      /*
       * TODO
       * Création Package
       */

      /*
       * TODO
       * Création Possede
       */

      /*
       * TODO
       * Création Heberge
       */

      /*
       * TODO
       * Création Utilise
       */

      /*
       * TODO
       * Création Propose
       */

      return {

        success: true,

      };

    });

  },

};
