
export interface CreateAccountRequestDto {

  nom_user: string;

  prenom_user: string;

  ddn_user: Date;

  nat_user: string;

  nin_user: string;

  email_user: string;

  mdp_user: string;

  role_demande: string;

  commentaire_demande?: string;

}
