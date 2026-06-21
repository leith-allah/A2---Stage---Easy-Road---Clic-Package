
export const AchatPackageMapper = {

  fromPrisma(data: any) {

    return {

      id: Number(data.id_achat_pack),

      reference: data.ref_achat_pack,

      packageId: Number(data.id_pack),

      userId: Number(data.id_user),

      travelers: data.nb_voyageurs,

      flightClass:
        data.classe_vol_achat_pack,

      roomType:
        data.type_chambre_achat_pack,

      pension:
        data.pension_achat_pack,

      total:
        Number(data.total_achat_pack),

      status:
        data.statut_achat_pack,

      createdAt:
        data.date_heure_achat_pack,

    };

  },

  toDto(data: any) {

    return data;

  },

};
