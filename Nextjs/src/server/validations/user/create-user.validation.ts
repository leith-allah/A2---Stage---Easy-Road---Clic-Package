
import { z }
from "zod";

export const createUserSchema =

  z.object({

    nin_user:
      z.string().min(5),

    nom_user:
      z.string().min(2),

    prenom_user:
      z.string().min(2),

    ddn_user:
      z.string(),

    nat_user:
      z.string(),

    email_pro_user:
      z.email(),

    mdp_user:
      z.string().min(8),

    id_role:
      z.number(),

    id_bureau:
      z.number(),

  });
  