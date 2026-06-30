
import { Prisma } from "@prisma/client";

export type AchatWithRelations =
  Prisma.achat_packageGetPayload<{
    include: {
      package_voyage: true;
    };
  }>;


type AchatPackageMapped = {

  id: number;

  bookingNumber: string;

  packageId: number;

  packageTitle: string;

  destination: string;

  image: string;

  travelers: number;

  total: number;

  departureDate: Date | string;

  returnDate: Date | string;

  status: string;

  createdAt: Date;

};


export const AchatPackageMapper = {

  fromPrisma(
    data: AchatWithRelations
  ): AchatPackageMapped {

    return {

      id:
        Number(data.id_achat_pack),

      bookingNumber:
        data.ref_achat_pack,

      packageId:
        Number(data.id_pack),

      packageTitle:
        data.package_voyage?.nom_pack || "",

      destination:
        data.package_voyage?.destination_pack || "",

      image:
        data.package_voyage?.image_pack || "",

      travelers:
        data.nb_voyageurs,

      total:
        Number(data.total_achat_pack),

      departureDate:
        data.package_voyage?.date_depart_pack || "",

      returnDate:
        data.package_voyage?.date_retour_pack || "",

      status:
        data.statut_achat_pack,

      createdAt:
        data.date_heure_achat_pack,

    };

  },

  toDto(
    data: AchatPackageMapped
  ): AchatPackageMapped {

    return data;

  },

};
