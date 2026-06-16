
import { z }
from "zod";

export const updateUserSchema =

  z.object({

    nom_user:
      z.string().min(2).optional(),

    prenom_user:
      z.string().min(2).optional(),

    nat_user:
      z.string().optional(),

    email_pro_user:
      z.email().optional(),

    statut_user:
      z.string().optional(),

    id_role:
      z.number().optional(),

    id_bureau:
      z.number().nullable().optional(),

  });
  