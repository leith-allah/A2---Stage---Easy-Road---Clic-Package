
import { prisma }
from "@/server/db/prisma";

export const agencyOfficeRepository = {

  findAll() {

    return prisma.bureau_agence.findMany({

      include: {
        agence: true,
      },

    });

  },

  findById(
    id: number
  ) {

    return prisma.bureau_agence.findUnique({

      where: {
        id_bureau: BigInt(id),
      },

      include: {
        agence: true,
      },

    });

  },

  create(data: {

    agencyId: number;

    code: string;

    type: string;

    country: string;

    city: string;

    address: string;

    approvalNumber: string;

    rib?: string;

    iban?: string;

  }) {

    return prisma.bureau_agence.create({

      data: {

        mle_bureau:
          data.code,

        type_bureau:
          data.type,

        dc_bureau:
          new Date(),

        pays_bureau:
          data.country,

        ville_bureau:
          data.city,

        adresse_bureau:
          data.address,

        num_agr_bureau:
          data.approvalNumber,

        rib_agence:
          data.rib,

        iban_agence:
          data.iban,

        dcc_bureau:
          new Date(),

        id_agence:
          BigInt(
            data.agencyId
          ),

      },

    });

  },

  update(
    id: number,
    data: {

      type?: string;

      country?: string;

      city?: string;

      address?: string;

      rib?: string;

      iban?: string;

    }
  ) {

    return prisma.bureau_agence.update({

      where: {
        id_bureau: BigInt(id),
      },

      data: {

        ...(data.type && {
          type_bureau: data.type,
        }),

        ...(data.country && {
          pays_bureau: data.country,
        }),

        ...(data.city && {
          ville_bureau: data.city,
        }),

        ...(data.address && {
          adresse_bureau: data.address,
        }),

        ...(data.rib && {
          rib_agence: data.rib,
        }),

        ...(data.iban && {
          iban_agence: data.iban,
        }),

      },

    });

  },

  delete(
    id: number
  ) {

    return prisma.bureau_agence.delete({

      where: {
        id_bureau: BigInt(id),
      },

    });

  },

};
