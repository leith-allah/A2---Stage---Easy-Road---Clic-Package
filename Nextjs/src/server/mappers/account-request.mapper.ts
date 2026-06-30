
export const AccountRequestMapper = {

  toDto(request: any) {

    return {

      id: Number(request.id_demande_creation),

      status: request.statut_demande_creation,

      firstName: request.prenom_user,

      lastName: request.nom_user,

      birthDate: request.ddn_user,

      nationality: request.nat_user,

      nin: request.nin_user,

      email: request.email_user,

      role: request.role_demande,

      comment: request.commentaire_demande,

      createdAt: request.date_heure_demande,

    };

  },

};
